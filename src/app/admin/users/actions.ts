"use server";

import { getUserByEmail, getInvitationByEmail, deleteInvitation, createInvitation as dbCreateInvitation } from "@/lib/db";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

import { headers } from "next/headers";

export async function createInvitation(formData: FormData) {
  const email = formData.get("email") as string;
  
  if (!email) {
    return { error: "Email is required" };
  }

  // Check if user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "User already exists with this email" };
  }

  // Check if invitation already exists
  const existingInvite = await getInvitationByEmail(email);
  if (existingInvite) {
    await deleteInvitation(existingInvite.id);
  }

  const token = crypto.randomUUID();

  try {
    await dbCreateInvitation(email, token, "AUTHOR");

    revalidatePath("/admin/users");
    
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const inviteLink = `${protocol}://${host}/admin/invite/${token}`;
    
    return { success: true, link: inviteLink };
  } catch (error: any) {
    return { error: error.message };
  }
}



