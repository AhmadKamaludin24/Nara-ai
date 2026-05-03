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
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    const totalInterviews = await prisma.interview.count({
      where: { userId: session.user.id }
    });

    const avgScoreResult = await prisma.interview.aggregate({
      where: { userId: session.user.id },
      _avg: {
        overallScore: true
      }
    });

    const avgScore = Math.round(avgScoreResult._avg.overallScore || 0);
    const practiceHours = parseFloat((interviews.length > 0 ? (interviews.length * 0.5).toFixed(1) : "0"));

    return NextResponse.json({
      userName: session.user.name,
      interviews,
      stats: {
        totalInterviews,
        avgScore,
        practiceHours
      }
    });
  } catch (error) {
    console.error("[DASHBOARD_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
