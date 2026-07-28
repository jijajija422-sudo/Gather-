"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function createAdminAccount(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required" };
  }

  // Double check that no users exist to prevent malicious calls
  const userCount = await prisma.user.count();
  if (userCount > 0) {
    return { error: "Admin account already exists. Setup is locked." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "ADMIN",
      },
    });

    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
