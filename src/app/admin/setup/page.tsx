import { redirect } from "next/navigation";
import { getAdminUserCount } from "@/lib/db";
import SetupForm from "./SetupForm";
import { Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SetupPage() {
  const adminCount = await getAdminUserCount();

  if (adminCount > 0) {
    redirect("/admin/login");
  }



  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sage/10 text-sage">
            <Sparkles className="h-7 w-7" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-ink">
            Welcome to Gather
          </h1>
          <p className="mt-1 text-sm text-ink-faint">
            Create your admin account to get started.
          </p>
        </div>
        <SetupForm />
        <p className="mt-6 text-center text-xs text-ink-faint">
          This page is only shown once · First-time setup
        </p>
      </div>
    </div>
  );
}
