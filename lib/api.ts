const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiFetch = async (path: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token");

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    // ✅ 公開エンドポイントはAuthorizationヘッダーを付けない
    const isPublic = path.includes("/auth/google") || path.includes("/auth/login");

    if (token && token !== "undefined" && !isPublic) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
    });

    if (res.status === 401) {
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
    }

    return res;
};