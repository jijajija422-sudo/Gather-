import { redirect } from "next/navigation";
import { getUserCount } from "@/lib/db";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const userCount = await getUserCount();

  if (userCount === 0) {
    redirect("/admin/setup");
  }

  return <LoginForm />;
}

