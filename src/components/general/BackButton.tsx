"use client";

import { useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";

function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-sm flex items-center gap-1.5 text-gray-400 hover:text-white mb-6 cursor-pointer transition"
    >
      <LuArrowLeft size={14} /> Back
    </button>
  );
}

export default BackButton;
