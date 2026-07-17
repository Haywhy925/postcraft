"use client";

import Logo from "@/components/navbar/Logo";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface FormState {
  email: string;
  password: string;
}

const supabase = createClient();

function LoginComponent() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.SubmitEvent) {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Login successful");
    router.replace("/admin");
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full  max-w-md bg-card border border-border rounded-xl p-6">
        <div className="flex flex-col items-center gap-3">
          <Logo />
          <h3 className="text-xl font-semibold text-text text-center">
            Login to PostCraft
          </h3>
        </div>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              type="text"
              placeholder="you@example.com"
              className="w-full px-3 py-2 bg-surface border border-border rounded-lg outline-none 
  text-sm text-text placeholder-gray-500 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              type="password"
              placeholder="*********"
              className="w-full px-3 py-2 bg-surface border border-border rounded-lg outline-none 
  text-sm text-text placeholder-gray-500 focus:border-primary"
            />
          </div>
          <button className="w-full py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default LoginComponent;
