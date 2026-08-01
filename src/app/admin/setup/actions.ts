"use server";

import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAdminUserCount, createUser } from "@/lib/db";

export async function createAdminAccount(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required" };
  }

  // Double check that no admin users exist to prevent malicious calls
  const adminCount = await getAdminUserCount();
  if (adminCount > 0) {
    return { error: "Admin account already exists. Setup is locked." };
  }


  try {
    // Create user in Firebase Auth
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;

    // Save profile metadata in Firestore
    await createUser(uid, name, email, "ADMIN");

    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create account";
    console.error("Firebase admin registration error:", message);
    return { error: message };
  }
}

