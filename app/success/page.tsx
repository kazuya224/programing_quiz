"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSubscription } from "@/hooks/useSubscription";

export default function SuccessPage() {
const router = useRouter();
const { refetch } = useSubscription();

useEffect(() => {
// 🔥 サブスク状態更新（最重要）
refetch();


// 5秒後にホームへ
const timer = setTimeout(() => {
  router.push("/home");
}, 5000);

return () => clearTimeout(timer);


}, []);

return ( <div className="flex flex-col items-center justify-center min-h-screen text-white"> <h1 className="text-2xl font-bold">決済が完了しました 🎉</h1> <p className="mt-2">5秒後にホームへ戻ります...</p> </div>
);
}
