import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await params;

    const interview = await prisma.interview.findUnique({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        transcripts: true,
      },
    });

    if (!interview) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(interview);
  } catch (error) {
    console.error("[INTERVIEW_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
