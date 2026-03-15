"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // 追加
import { Question, Confidence } from "@/types/quiz";
import { Timer } from "@/components/ui/Timer";
import ProgressBar from "@/components/ui/ProgressBar"; // 追加
import { OptionButton } from "@/components/quiz/OptionButton";
import DifficultyBadge from "@/components/ui/DifficultyBadge";
import CodeBlock from "@/components/quiz/CodeBlock";
import { ConfidenceSelector } from "@/components/quiz/ConfidenceSelector";
import { apiFetch } from "@/lib/api";

export default function QuizPage() {
  const router = useRouter(); // ホームに戻る用
  const [questions, setQuestions] = useState<Question[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<Confidence>(null);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  // データ取得
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await apiFetch('/questions');
        const data = await res.json();

        // data が配列であることを確認。もしオブジェクトの中にリストがある場合は適宜修正
        const questionsArray = Array.isArray(data) ? data : (data.content || []);

        const formatted = questionsArray;
        setQuestions(formatted);
      } catch (e) {
        console.error("Fetch error:", e);
      }
    };
    fetchQuestions();
  }, []);

  // 解答データをDBに保存するロジック
  const handleSubmit = async() => {
    const userId = localStorage.getItem("userId");
    if(!userId) {
      alert("ログインが必要です");
      router.push("/login");
      return;
    }

    const selectedOption = q.options
    .sort((a, b) => a.optionOrder - b.optionOrder)[selected!];

    const isCorrect = selectedOption?.isCorrect ?? false;

    const confidenceMap: Record<string, number> = {
      sure: 1,
      guess: 2
    };
    if (!confidence) {
      alert("自信度を選択してください");
      return;
    }

    try {
      await apiFetch("/questions/history", {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
          questionId: q.id,
          isCorrect: isCorrect,
          confidence: confidence
        }),
      });
      console.log("リクエスト", userId, q.id, isCorrect, confidence);
      setSubmitted(true);
    } catch(err) {
      console.error("保存失敗:", err);
    alert("データの保存に失敗しました");
    }
  };

  // 【機能1】次の問題へ進むロジック
  const handleNext = () => {
    if (qIndex < questions.length - 1) {
      setQIndex((prev) => prev + 1);
      // 状態リセット（仕組み化：次の問題への初期化）
      setSelected(null);
      setConfidence(null);
      setSubmitted(false);
      setTimeLeft(60);
    } else {
      // 全問終了
      alert("全問題が終了しました！ホームに戻ります。");
      router.push("/");
      router.refresh();
    }
  };

  if (questions.length === 0) return <div className="p-8 text-center text-slate-500">Loading Questions...</div>;

  const q = questions[qIndex];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* 【機能2】進捗バーの表示 */}
        <ProgressBar current={qIndex} total={questions.length} />

        {/* Header */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <DifficultyBadge level={q.difficultyLevel} />
            <h1 className="text-xl font-bold text-slate-200">{q.title}</h1>
          </div>
          <Timer seconds={timeLeft} total={60} />
        </div>

        {/* 問題・コード部分は変更なし */}
        <section className="space-y-4">
          <p className="text-lg leading-relaxed text-slate-300">{q.questionText}</p>
          <div className="rounded-xl overflow-hidden border border-slate-700 shadow-2xl">
            <CodeBlock code={q.codeSnippet} language={q.language} />
          </div>
        </section>

        {/* Options */}
        <section className="grid gap-3">
          {q.options
          .sort((a, b) => a.optionOrder - b.optionOrder)
          .map((opt, idx) => (
            <OptionButton
              key={opt.id}
              text={opt.optionText}
              index={idx}
              selected={selected === idx}
              submitted={submitted}
              isCorrect={opt.isCorrect}
              onClick={() => setSelected(idx)}
            />
          ))}
        </section>

        {/* Footer */}
        <footer className="pt-6 border-t border-slate-800">
          {!submitted ? (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <ConfidenceSelector 
                currentConfidence={confidence} 
                onSelect={setConfidence} 
                disabled={false} 
              />
              <button 
                onClick={handleSubmit}
                disabled={selected === null || !confidence}
                className="px-10 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
              >
                回答を確定する
              </button>
            </div>
          ) : (
            <div className="w-full space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                <div className="flex items-center gap-2 mb-2 text-indigo-400">
                  <span className="text-lg">💡</span>
                  <h3 className="font-bold uppercase tracking-wider text-sm">Explanation</h3>
                </div>
                <p className="text-slate-300 leading-relaxed">{q.explanation}</p>
              </div>
              <button 
                onClick={handleNext}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-extrabold transition-all shadow-lg shadow-indigo-500/20"
              >
                {qIndex < questions.length - 1 ? "次の問題へ" : "結果を確認する"}
              </button>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
}