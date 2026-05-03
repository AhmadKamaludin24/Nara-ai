import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const interviews = await prisma.interview.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "asc" },
      take: 10,
    });

    const metrics = await prisma.interview.aggregate({
      where: { userId: session.user.id },
      _avg: {
        communication: true,
        technical: true,
        confidence: true,
        overallScore: true,
      }
    });

    return NextResponse.json({
      interviews,
      metrics: metrics._avg
    });
  } catch (error) {
    console.error("[PERFORMANCE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
