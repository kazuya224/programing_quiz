"use client"

import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignupPage() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await apiFetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify({ userName, password }),
            });
          //   const res = await apiFetch("/auth/signup", {
          //     method: "POST",
          //     body: JSON.stringify({ userName, password }),
          // });
            if(!res.ok) {
                const message = await res.text();
                throw new Error(message || "登録に失敗しました");
            }
            alert("アカウントを作成しました。ログインしてください。");
            router.push("/login");
        } catch(err: any) {
            setError(err.message);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <form onSubmit={handleSignup} className="p-8 bg-white shadow-md rounded-lg w-96">
            <h1 className="text-2xl font-bold mb-6 text-center">アカウント作成</h1>
            
            {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
    
            <input
              type="text"
              placeholder="ユーザー名"
              className="w-full p-2 mb-4 border rounded"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="パスワード"
              className="w-full p-2 mb-6 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 font-bold"
            >
              登録する
            </button>
          </form>
        </div>
      );
}