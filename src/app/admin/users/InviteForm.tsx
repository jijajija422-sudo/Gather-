"use client";

import { useState } from "react";
import { createInvitation } from "./actions";
import { Copy, Check } from "lucide-react";

export default function InviteForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successLink, setSuccessLink] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError("");
    setSuccessLink("");
    setLoading(true);

    const result = await createInvitation(formData);

    setLoading(false);

    if (result?.error) {
      setError(result.error);
    } else if (result?.link) {
      setSuccessLink(result.link);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(successLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      {successLink && (
        <div className="rounded-xl border border-sage/20 bg-sage/5 p-4">
          <p className="mb-2 text-sm font-medium text-sage-dark">
            ✓ Invitation created!
          </p>
          <p className="mb-3 text-xs text-ink-light">
            Share this link with the author:
          </p>
          <div className="flex gap-2">
            <input
              readOnly
              value={successLink}
              className="w-full rounded-lg border border-sage/20 bg-white px-3 py-2 text-xs text-ink outline-none"
              onClick={(e) => e.currentTarget.select()}
            />
            <button
              type="button"
              onClick={handleCopy}
              className="shrink-0 rounded-lg bg-sage px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-sage-dark cursor-pointer"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ink-faint">
          Author Email
        </label>
        <input
          name="email"
          type="email"
          placeholder="colleague@example.com"
          className="w-full rounded-xl border border-ink/10 bg-cream/50 px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-ink-faint/60 focus:border-sage focus:ring-2 focus:ring-sage/20"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-ink py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-ink/85 hover:shadow-md disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Invite Link"}
      </button>
    </form>
  );
}
