import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-cream/50">
      {/* Admin Top Bar */}
      {session?.user && (
        <div className="border-b border-ink/5 bg-white/60 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link
                href="/admin"
                className="font-serif text-lg font-bold text-ink hover:text-sage-dark transition-colors"
              >
                Gather
              </Link>
              <span className="text-[10px] uppercase tracking-[0.2em] text-sage font-semibold bg-sage/10 px-2.5 py-1 rounded-full">
                {session.user.role}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-ink-light hidden sm:block">
                {session.user.name}
              </span>
              <Link
                href="/"
                className="text-xs text-ink-faint hover:text-sage-dark transition-colors"
              >
                View Site →
              </Link>
              <SignOutButton />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-8">{children}</div>
    </div>
  );
}
