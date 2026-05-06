const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiFetch = async (path: string, options: RequestInit = {}) => {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    const res = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
        credentials: "include", // ← 常に Cookie を送受信
    });

    // if (res.status === 401) {
    //     if (typeof window !== "undefined") {
    //         window.location.href = "/login";
    //     }
    // }

    return res;
};