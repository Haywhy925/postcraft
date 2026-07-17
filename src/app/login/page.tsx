import LoginComponent from "@/components/login/LoginComponent";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function LoginPage() {
  const cookieStore = await cookies();

  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/admin");
  }

  return <LoginComponent />;
}

export default LoginPage;
