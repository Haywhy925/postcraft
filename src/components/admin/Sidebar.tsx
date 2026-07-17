"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FiFileText, FiHome, FiMenu, FiUsers, FiX } from "react-icons/fi";
import Logo from "../navbar/Logo";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import { createClient } from "@/lib/supabase/client";

const links = [
  { name: "Dashboard", href: "/admin", icon: FiHome },
  { name: "Authors", href: "/admin/authors", icon: FiUsers },
  { name: "Posts", href: "/admin/posts", icon: FiFileText },
];

const supabase = createClient();

function Sidebar() {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    router.replace("/login");
  }

  return (
    <>
      <div
        className="md:hidden flex items-center justify-between p-4 border-b
       border-border bg-background"
      >
        <Logo />
        <button onClick={() => setOpen(true)}>
          <FiMenu size={22} className="text-text z-100" />
        </button>
      </div>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={`${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        fixed top-0 left-0 h-screen w-64 bg-card border-r border-border 
        p-5 flex flex-col z-50 transform transition duration-300`}
      >
        <div className="flex items-center justify-between mb-8">
          <Logo />
          <button onClick={() => setOpen(false)} className="md:hidden">
            <FiX size={22} className="text-text" />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {links.map((link) => {
            const isActive = pathName === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg py-6 px-4 text-lg 
              transition  ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-surface text-gray-400 hover:text-white"
              }`}
              >
                <Icon size={18} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3
 px-4 py-2 text-sm text-gray-400 hover:text-white transition "
          >
            <BiLogOut size={20} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
