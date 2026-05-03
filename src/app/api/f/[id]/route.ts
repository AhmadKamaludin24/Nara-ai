import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Public API — no auth required, returns only safe public fields
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const interview = await prisma.interview.findUnique({
      where: { id },
      select: {
        id: true,
        role: true,
        level: true,
        overallScore: true,
        communication: true,
        technical: true,
        confidence: true,
        feedbackInsight: true,
        strengths: true,
        weaknesses: true,
        createdAt: true,
        // Expose user's name but not their id/email
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!interview) {
      return new NextResponse("Not Found", { status: 404 });
    }

    return NextResponse.json(interview);
  } catch (error) {
    console.error("[PUBLIC_INTERVIEW_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
