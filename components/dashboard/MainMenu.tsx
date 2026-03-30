"use client";

import Link from "next/link";
import { Icons } from "./icons";

interface Props {
  hasResume: boolean;
}

export default function MainMenu({ hasResume }: Props) {
  return (
    <section className="grid md:grid-cols-2 gap-6">

      <div className="space-y-4">
        {hasResume && (
          <Link href="/quiz?mode=resume" className="flex justify-between p-6 bg-yellow-600 rounded-2xl">
            <span>Resume</span>
            <Icons.Play fill="white" />
          </Link>
        )}

        <Link href="/quiz" className="flex justify-between p-6 bg-indigo-600 rounded-2xl">
          <span>Start Training</span>
          <Icons.Play fill="white" />
        </Link>
      </div>

      <Link href="/history" className="p-6 bg-slate-800 rounded-2xl">
        Review History
      </Link>

    </section>
  );
}