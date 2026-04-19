"use client";

import { Icons } from "./icons";
import { useState, useRef, useEffect } from "react";
import { apiFetch } from "@/lib/api";

interface Props {
  userName: string;
  streak: number;
}

export default function Header({ userName, streak }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(userName);
  const [displayName, setDisplayName] = useState(userName);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    const trimmed = editValue.trim();
    if (!trimmed || trimmed === displayName) {
      setEditValue(displayName);
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    try {
      const userId = localStorage.getItem("userId");
      const res = await apiFetch(`/auth/${userId}/username`, {
        method: "PATCH",
        body: JSON.stringify({ userName: trimmed }),
      });
      // const res = await apiFetch(`/api/auth/${userId}/username`, {
      //   method: "PATCH",
      //   body: JSON.stringify({ userName: trimmed }),
      // });

      if (!res.ok) throw new Error("更新失敗");

      setDisplayName(trimmed);
      localStorage.setItem("userName", trimmed);
    } catch (err) {
      console.error(err);
      setEditValue(displayName); // 失敗時は元に戻す
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditValue(displayName);
      setIsEditing(false);
    }
  };

  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
      <div>
        <h1 className="text-4xl font-black text-white">
          ENGINEERING <span className="text-indigo-500">MASTERY</span>
        </h1>
        <p className="text-slate-400 mt-2 flex items-center gap-1">
          おかえりなさい、
          {isEditing ? (
            <input
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              disabled={isSaving}
              className="text-indigo-400 font-bold bg-slate-800 border border-indigo-500 rounded px-2 py-0.5 w-36 focus:outline-none focus:ring-1 focus:ring-indigo-400"
              maxLength={20}
            />
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              title="クリックしてユーザー名を変更"
              className="text-indigo-400 font-bold hover:text-indigo-300 hover:underline underline-offset-2 transition-colors cursor-pointer"
            >
              {displayName}
            </button>
          )}
          さん。
          {isSaving && <span className="text-xs text-slate-500 ml-1">保存中...</span>}
        </p>
      </div>

      <div className="flex items-center gap-3 bg-slate-800 px-5 py-3 rounded-2xl">
        <Icons.Flame />
        <div>
          <p className="text-xs text-slate-400">連続学習日数</p>
          <p className="text-xl font-bold">{streak} Days</p>
        </div>
      </div>
    </header>
  );
}