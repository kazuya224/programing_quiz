"use client";

import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const CONTACT_URL = "https://docs.google.com/forms/d/e/1FAIpQLSclBJrv_B5qlFqizt7dgT-Ft4vIzcjv3li8_AS7HfxaDudh2w/viewform?usp=header";

  return (
    <footer className="flex justify-between text-xs text-slate-500 mt-10">
      <p>SYSTEM STATUS: OK</p>
      <div className="flex gap-4">
        <button
          onClick={() => window.open(CONTACT_URL, "_blank")}
          className="text-blue-400 underline text-sm"
        >
          お問い合わせ
        </button>

        <button
          onClick={() => {
            localStorage.clear();
            router.push("/login");
          }}
          className="text-red-400"
        >
          LOGOUT
        </button>
      </div>
    </footer>
  );
}