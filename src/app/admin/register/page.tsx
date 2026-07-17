"use client";

import Logo from "@/components/navbar/Logo";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface FormState {
  name: string;
  email: string;
  password: string;
}

function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleRegister(e: React.SubmitEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/authors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }

      toast.success("Author created");

      router.replace("/admin/authors");
    } catch (error) {
      console.error(error);
      toast.error("Failed to register author");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full  max-w-md bg-card border border-border rounded-xl p-6">
        <div className="flex flex-col items-center gap-3">
          <Logo />
          <h3 className="text-xl font-semibold text-text text-center">
            Add New Author
          </h3>
        </div>
        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Name</label>
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              type="text"
              placeholder="Author name"
              className="w-full px-3 py-2 bg-surface border border-border rounded-lg outline-none 
  text-sm text-text placeholder-gray-500 focus:border-primary"
            />
          </div>
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
          <button
            disabled={loading}
            className="w-full py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default RegisterPage;
