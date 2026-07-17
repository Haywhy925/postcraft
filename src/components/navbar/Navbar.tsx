import Link from "next/link";
import Logo from "./Logo";
import { LuArrowRight } from "react-icons/lu";

function Navbar() {
  return (
    <nav className="bg-surface border border-border w-[95%] max-w-3xl mx-auto mt-5 rounded-full">
      <div className="flex items-center justify-between h-16 px-4">
        <Logo />

        <Link
          href="/login"
          className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/50 cursor-pointer transition"
        >
          Login
          <LuArrowRight size={16} />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
