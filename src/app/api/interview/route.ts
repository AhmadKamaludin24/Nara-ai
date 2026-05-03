import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const {
      role,
      level,
      topic,
      overallScore,
      communication,
      technical,
      confidence,
      feedbackInsight,
      strengths,
      weaknesses,
      transcripts, // Array of { role, message }
      elapsedSeconds,
    } = body;

    // Run in a transaction to ensure both interview creation and quota deduction succeed
    const [interview] = await prisma.$transaction([
      prisma.interview.create({
        data: {
          userId: session.user.id,
          role,
          level,
          topic,
          overallScore,
          communication,
          technical,
          confidence,
          feedbackInsight,
          strengths,
          weaknesses,
          transcripts: {
            create: transcripts.map((t: any) => ({
              role: t.role,
              message: t.message,
            })),
          },
        },
      }),
      prisma.user.update({
        where: { id: session.user.id },
        data: {
          trialSeconds: {
            decrement: elapsedSeconds || 0,
          },
        },
      }),
    ]);

    return NextResponse.json(interview);
  } catch (error) {
    console.error("[INTERVIEW_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
