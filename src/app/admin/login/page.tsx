import { redirect } from "next/navigation";
import { getAdminUserCount } from "@/lib/db";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const adminCount = await getAdminUserCount();

  if (adminCount === 0) {
    redirect("/admin/setup");
  }

  return <LoginForm />;
}


