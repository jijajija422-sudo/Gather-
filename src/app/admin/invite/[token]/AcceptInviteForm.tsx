"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { acceptInvitation } from "./actions";
import { signIn } from "next-auth/react";
import { Sparkles } from "lucide-react";

export default function AcceptInviteForm({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError("");
    setLoading(true);

    const password = formData.get("password") as string;

    const result = await acceptInvitation(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sage/10 text-sage">
            <Sparkles className="h-7 w-7" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-ink">
            Join Gather
          </h1>
          <p className="mt-1 text-sm text-ink-faint">
            You&apos;ve been invited to contribute as an Author.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-5">
          <input type="hidden" name="token" value={token} />

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-faint">
              Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={email}
              className="w-full rounded-xl border border-ink/10 bg-cream/50 px-4 py-3 text-sm text-ink-faint outline-none cursor-not-allowed"
              readOnly
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-faint">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-ink-faint/60 focus:border-sage focus:ring-2 focus:ring-sage/20"
              placeholder="Jane Doe"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-faint">
              Create Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-ink-faint/60 focus:border-sage focus:ring-2 focus:ring-sage/20"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-ink py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-ink/85 hover:shadow-md disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Join & Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-ink-faint">
          By joining, you&apos;ll be able to write and publish posts.
        </p>
      </div>
    </div>
  );
}
