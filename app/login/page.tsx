"use client"

import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const handleLogin = async(e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            const res = await apiFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify({userName, password}),
            });
            if(!res.ok) {
                throw new Error("ユーザー名またはパスワードが正しくありません");
            }
            console.log("リクエスト", userName,password);
            console.log("レスポンス", res);
            const user = await res.json();
            localStorage.setItem("userId", user.userId);
            localStorage.setItem("userName", user.userName);
            router.push("/")
        } catch (err: any) {
            setError(err.message);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <form onSubmit={handleLogin} className="p-8 bg-white shadow-md rounded-lg w-96">
            <h1 className="text-2xl font-bold mb-6 text-center">ログイン</h1>
            
            {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}
    
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
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 font-bold"
            >
              ログイン
            </button>
            <p className="mt-4 text-sm text-center">
              アカウントをお持ちでない方は
              <a href="/signup" className="text-blue-600 ml-1 underline">こちら</a>
            </p>
          </form>
        </div>
      );
}