"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAdminAccount } from "./actions";
import { signIn } from "next-auth/react";

export default function SetupForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError("");
    setLoading(true);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await createAdminAccount(formData);

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
    <form action={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
          {error}
        </div>
      )}

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
          Email
        </label>
        <input
          type="email"
          name="email"
          className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-ink-faint/60 focus:border-sage focus:ring-2 focus:ring-sage/20"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-faint">
          Password
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
        {loading ? "Setting up..." : "Create Account & Sign In"}
      </button>
    </form>
  );
}
