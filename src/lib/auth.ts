import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Resend } from "resend";
import { generateVerificationEmail } from "./email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,

  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60 * 24, // 24 jam

    sendVerificationEmail: async ({ user, url }) => {
      const { error } = await resend.emails.send({
        from: `NARA.AI <noreply@${process.env.RESEND_DOMAIN}>`,
        to: user.email,
        subject: "Verifikasi Email Kamu — NARA.AI",
        html: generateVerificationEmail({
          name: user.name,
          verificationUrl: url,
          websiteUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        }),
      });

      if (error) {
        console.error("[RESEND_ERROR]", error);
        throw new Error("Gagal mengirim email verifikasi. Coba lagi nanti.");
      }
    },
  },
});
