"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function acceptInvitation(formData: FormData) {
  const token = formData.get("token") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  if (!token || !name || !password) {
    return { error: "All fields are required" };
  }

  const invite = await prisma.invitation.findUnique({
    where: { token },
  });

  if (!invite) {
    return { error: "Invalid invitation" };
  }

  if (new Date() > invite.expiresAt) {
    await prisma.invitation.delete({ where: { token } });
    return { error: "Invitation has expired" };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await prisma.$transaction([
      prisma.user.create({
        data: {
          name,
          email: invite.email,
          passwordHash,
          role: invite.role,
        },
      }),
      prisma.invitation.delete({
        where: { token },
      })
    ]);

    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
