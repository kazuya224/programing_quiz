const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiFetch = async (path: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token");
    console.log("トークン:", token);

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    // 🔥 ここが最重要
    if (token && token !== "undefined") {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers, // ← これを使う
    });

    return res;
};