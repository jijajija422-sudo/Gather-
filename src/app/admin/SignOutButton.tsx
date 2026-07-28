"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-1.5 text-xs text-ink-faint hover:text-red-500 transition-colors cursor-pointer"
    >
      <LogOut size={14} />
      <span className="hidden sm:inline">Sign Out</span>
    </button>
  );
}
