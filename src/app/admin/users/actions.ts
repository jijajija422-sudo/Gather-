"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

export async function createInvitation(formData: FormData) {
  const email = formData.get("email") as string;
  
  if (!email) {
    return { error: "Email is required" };
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "User already exists with this email" };
  }

  // Check if invitation already exists
  const existingInvite = await prisma.invitation.findUnique({ where: { email } });
  if (existingInvite) {
    await prisma.invitation.delete({ where: { email } });
  }

  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  try {
    await prisma.invitation.create({
      data: {
        email,
        token,
        role: "AUTHOR",
        expiresAt,
      },
    });

    revalidatePath("/admin/users");
    
    const inviteLink = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/admin/invite/${token}`;
    return { success: true, link: inviteLink };
  } catch (error: any) {
    return { error: error.message };
  }
}
