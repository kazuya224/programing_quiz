// app/login
"use client";

import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useCallback } from "react";


export default function LoginPage() {
  const router = useRouter();

  const handleCredentialResponse = useCallback(async (response: any) => {
    try {
      const res = await apiFetch("/auth/google", {
        method: "POST",
        body: JSON.stringify({ token: response.credential }),
      });

      if (!res.ok) {
        console.error("❌ エラー", res.status);
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/home");
    } catch (err) {
      console.error(err);
    }
  }, [router]);

  const initializeGoogle = useCallback(() => {
    if (!window.google) return;
    
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!, // ← 環境変数化推奨
      callback: handleCredentialResponse,
    });

    const buttonEl = document.getElementById("googleButton");
    if (buttonEl) {
      window.google.accounts.id.renderButton(buttonEl, {
        theme: "outline",
        size: "large",
      });
    }
  }, [handleCredentialResponse]);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initializeGoogle}
      />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white shadow-md rounded-lg w-96 text-center">
          <h1 className="text-2xl font-bold mb-6">ログイン</h1>
          <div id="googleButton" />
        </div>
      </div>
    </>
  );
}