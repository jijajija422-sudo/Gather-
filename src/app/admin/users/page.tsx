import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
import InviteForm from "./InviteForm";
import Link from "next/link";
import { ArrowLeft, Users, UserPlus, Shield, PenSquare } from "lucide-react";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMIN") {
    redirect("/admin");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { posts: true } },
    },
  });

  const pendingInvites = await prisma.invitation.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <Link
          href="/admin"
          className="mb-4 inline-flex items-center gap-2 text-sm text-ink-faint transition-colors hover:text-sage-dark"
        >
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </Link>
        <h1 className="font-serif text-3xl font-bold text-ink">
          Manage Authors
        </h1>
        <p className="mt-1 text-ink-light">
          Invite writers to contribute to your publication.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Invite Panel */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
            <h2 className="mb-5 flex items-center gap-2 font-serif text-lg font-semibold text-ink">
              <UserPlus className="h-5 w-5 text-sage" /> Invite Author
            </h2>
            <InviteForm />
          </div>
        </div>

        {/* Users List */}
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-ink/5 px-6 py-4">
              <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-ink">
                <Users className="h-5 w-5 text-sage" /> Team
              </h2>
              <span className="text-xs text-ink-faint">
                {users.length} {users.length === 1 ? "member" : "members"}
              </span>
            </div>

            <div className="divide-y divide-ink/5">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/10 text-sm font-semibold text-sage-dark">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-ink">{user.name}</p>
                      <p className="text-xs text-ink-faint">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-ink-faint">
                      {user._count.posts} {user._count.posts === 1 ? "post" : "posts"}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                        user.role === "ADMIN"
                          ? "bg-ink/5 text-ink"
                          : "bg-sage/10 text-sage-dark"
                      }`}
                    >
                      {user.role === "ADMIN" ? (
                        <Shield className="h-3 w-3" />
                      ) : (
                        <PenSquare className="h-3 w-3" />
                      )}
                      {user.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Invites */}
          {pendingInvites.length > 0 && (
            <div className="mt-4 overflow-hidden rounded-2xl border border-amber-100 bg-amber-50/50">
              <div className="px-6 py-3 border-b border-amber-100">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                  Pending Invitations
                </p>
              </div>
              <div className="divide-y divide-amber-100">
                {pendingInvites.map((invite) => (
                  <div
                    key={invite.id}
                    className="flex items-center justify-between px-6 py-3"
                  >
                    <span className="text-sm text-amber-800">{invite.email}</span>
                    <span className="text-xs text-amber-600">
                      Expires{" "}
                      {new Date(invite.expiresAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
