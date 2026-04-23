"use client";

import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function LoginPage() {
  const router = useRouter();

  const handleCredentialResponse = async (response: any) => {
    console.log("🔥 callback来た", response);
    try {
      const res = await apiFetch("/auth/google", {
        method: "POST",
        body: JSON.stringify({
          token: response.credential,
        }),
      });
      
      
      const data = await res.json();
      
      localStorage.setItem("token", data.token);
      
      // 🔥 ここ修正
      if (data.newUser) {
        router.push("/");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const initializeGoogle = () => {
    window.google?.accounts.id.initialize({
      client_id: "450998180907-r7r2loc02s1gghfmf76tgtc0lnkdpcog.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    window.google?.accounts.id.renderButton(
      document.getElementById("googleButton"),
      { theme: "outline", size: "large" }
    );
  };

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
          <div id="googleButton"></div>
        </div>
      </div>
    </>
  );
}