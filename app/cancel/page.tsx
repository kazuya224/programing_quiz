"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CancelPage() {
const router = useRouter();

useEffect(() => {
const timer = setTimeout(() => {
router.push("/");
}, 5000);


return () => clearTimeout(timer);

}, []);

return ( <div className="flex flex-col items-center justify-center min-h-screen text-white"> <h1 className="text-2xl font-bold">決済をキャンセルしました</h1> <p className="mt-2">5秒後にホームへ戻ります...</p> </div>
);
}
