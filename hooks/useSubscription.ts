// hooks/useSubscription.ts
"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type Subscription = {
    status: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
};

export function useSubscription() {
    const [isPremium, setIsPremium] = useState(false);
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchSubscription = async () => {
        try {
            const res = await apiFetch("/subscription/me");
            const data = await res.json();

            setIsPremium(data.isPremium);
            setSubscription(data.subscription);
        } finally {
            setLoading(false);
        }
    };

    const checkout = async () => {
        const res = await apiFetch("/subscription/checkout", {
            method: "POST",
        });

        const data = await res.json();

        if (!data.url) {
            console.error("Checkout URLがない", data);
            return;
        }

        // 👇 これが本質
        window.location.href = data.url;
    };

    const cancel = async () => {
        await apiFetch("/subscription/cancel", { method: "POST" });
        await fetchSubscription();
    };

    useEffect(() => {
        fetchSubscription();
    }, []);

    return {
        isPremium,
        subscription,
        loading,
        checkout,
        cancel,
        refetch: fetchSubscription,
    };
}