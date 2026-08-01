"use server";

import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getInvitationByToken, createUser, deleteInvitation } from "@/lib/db";

export async function acceptInvitation(formData: FormData) {
  const token = formData.get("token") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  if (!token || !name || !password) {
    return { error: "All fields are required" };
  }

  const invite = await getInvitationByToken(token);

  if (!invite) {
    return { error: "Invalid invitation" };
  }

  if (new Date() > new Date(invite.expiresAt)) {
    await deleteInvitation(invite.id);
    return { error: "Invitation has expired" };
  }

  try {
    // Create user in Firebase Auth
    const userCred = await createUserWithEmailAndPassword(auth, invite.email, password);
    const uid = userCred.user.uid;

    // Save profile metadata in Firestore
    await createUser(uid, name, invite.email, invite.role);

    // Delete the invitation
    await deleteInvitation(invite.id);

    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to accept invitation";
    console.error("Firebase invite registration error:", message);
    return { error: message };
  }
}

