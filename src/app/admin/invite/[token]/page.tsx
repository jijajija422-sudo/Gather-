import { getInvitationByToken, deleteInvitation } from "@/lib/db";
import AcceptInviteForm from "./AcceptInviteForm";

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function InvitePage({ params }: PageProps) {
  const { token } = await params;
  
  const invite = await getInvitationByToken(token);

  if (!invite) {
    return (
      <div className="min-h-screen flex items-center justify-center -mt-20">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
          <h2 className="text-xl font-serif text-red-600 mb-2">Invalid Invitation</h2>
          <p className="text-gray-600">This invitation link is invalid or has expired.</p>
        </div>
      </div>
    );
  }

  if (new Date() > new Date(invite.expiresAt)) {
    await deleteInvitation(invite.id);
    return (
      <div className="min-h-screen flex items-center justify-center -mt-20">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
          <h2 className="text-xl font-serif text-red-600 mb-2">Expired Invitation</h2>
          <p className="text-gray-600">This invitation link has expired. Please ask the Admin for a new one.</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex items-center justify-center -mt-20">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-serif text-center mb-2">Join Gather</h2>
        <p className="text-sm text-gray-500 text-center mb-8">
          You&apos;ve been invited to contribute as an Author. Set up your account below.
        </p>
        <AcceptInviteForm email={invite.email} token={token} />
      </div>
    </div>
  );
}
