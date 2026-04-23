// src/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiFetch = async (path: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token");
    console.log("トークン:", token);

    const res = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token && {
                Authorization: `Bearer ${token}`,
            }),
            ...options.headers,
        },
    });

    return res;
};