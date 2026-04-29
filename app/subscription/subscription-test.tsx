//app/subscription/subscription-test.tsx
"use client";

import { useSubscription } from "@/hooks/useSubscription";

export default function SubscriptionTestPage() {
  const { isPremium, subscription, loading, checkout, cancel } = useSubscription();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl mb-4">サブスク状態</h1>

      <p>状態: {isPremium ? "Premium" : "Free"}</p>

      {subscription && (
        <div className="mt-4">
          <p>Status: {subscription.status}</p>
          <p>期限: {subscription.currentPeriodEnd}</p>
          <p>解約予定: {subscription.cancelAtPeriodEnd ? "Yes" : "No"}</p>
        </div>
      )}

      <div className="mt-6 space-x-4">
        <button
          onClick={checkout}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          課金（テスト）
        </button>

        <button
          onClick={cancel}
          className="bg-red-500 px-4 py-2 rounded"
        >
          解約
        </button>
      </div>
    </div>
  );
}