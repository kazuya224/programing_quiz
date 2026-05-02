"use client";

import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useCallback, useRef, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const handleCredentialResponse = useCallback(async (response: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await apiFetch("/auth/google", {
        method: "POST",
        body: JSON.stringify({ token: response.credential }),
      });

      if (!res.ok) {
        setError("ログインに失敗しました。もう一度お試しください。");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/home");
    } catch (err) {
      console.error(err);
      setError("通信エラーが発生しました。");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const initializeGoogle = useCallback(() => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
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

  // Googleボタンのクリックを検知してローディング開始
  const handleWrapperClick = useCallback(() => {
    setIsLoading(true);
    setError(null);

    // ポップアップがキャンセルされた場合に備えてタイムアウトでリセット
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 120_000); // 2分

    // callbackが来たらタイマーをクリアするために上書き
    // (handleCredentialResponse側でもsetIsLoading(true)するので二重呼び出しは問題なし)
    return () => clearTimeout(timer);
  }, []);

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

          {/* ローディング表示 */}
          {isLoading && (
            <div className="flex flex-col items-center gap-3 py-2 mb-2">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-500">ログイン中...</p>
            </div>
          )}

          {/* ボタンはDOMに残しつつ、ローディング中は非表示 */}
          <div
            onClick={handleWrapperClick}
            style={{ display: isLoading ? "none" : "block" }}
          >
            <div id="googleButton" />
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-500">{error}</p>
          )}
        </div>
      </div>
    </>
  );
}