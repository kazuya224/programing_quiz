"use client";

import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="flex justify-between text-xs text-slate-500 mt-10">
      <p>SYSTEM STATUS: OK</p>
      <button
        onClick={() => {
          localStorage.clear();
          router.push("/login");
        }}
        className="text-red-400"
      >
        LOGOUT
      </button>
    </footer>
  );
}