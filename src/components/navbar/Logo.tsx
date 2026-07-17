import Link from "next/link";
import { LuFeather } from "react-icons/lu";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex items-center gap-2 p-2 rounded-xl bg-primary text-white">
        <LuFeather size={18} />
      </div>
      <span className="text-lg font-semibold text-white/90">PostCraft</span>
    </Link>
  );
}

export default Logo;
