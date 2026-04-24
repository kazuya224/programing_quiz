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
  const [lastSeq, setLastSeq] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
const [correctOptionId, setCorrectOptionId] = useState<number | null>(null);
const [explanation, setExplanation] = useState<string>("");

  // データ取得
  
  const fetchQuestions = async (cursor?: number) => {
    try {
      const params = new URLSearchParams(window.location.search);
      const mode = params.get("mode");
      const language = params.get("language");
  
      if (!language) return;
  
      const size = 20;
  
      let url = "";
  
      if (mode === "review") {
        url = `/questions/mistakes?language=${language}&size=${size}`;
      } else if (mode === "resume") {
        url = `/questions/resume?language=${language}&size=${size}`;
      } else {
        const genre = params.get("genre");
        const genreParam = genre ? `&genre=${genre}` : "";
        url = `/questions?language=${language}${genreParam}&size=${size}`;
      }
  
      // 👇 ここが今回のポイント（cursor追加）
      if (cursor) {
        url += `&cursor=${cursor}`;
      }
  
      const res = await apiFetch(url);
  
      if (!res.ok) {
        const err = await res.text();
        console.error(err);
        return;
      }
  
      const data = await res.json();
      console.log(`[Response] Received ${data.questions?.length ?? 0} questions.`);
  
      if (!data.questions || data.questions.length === 0) {
        setHasMore(false);
        return;
      }
  
      if (cursor) {
        // 追加読み込み（「次の問題へ」など）の時は、既存のリストに足す
        setQuestions(prev => [...prev, ...data.questions]);
      } else {
        // 初回読み込み（useEffectから呼ばれた時）は、既存を無視して上書きする
        // これにより2回実行されても、2件の結果で上書きされるだけなので2件のまま保持される
        setQuestions(data.questions);
      }
      setLastSeq(data.nextCursor);
      setHasMore(data.hasMore);
  
    } catch (e) {
      console.error("Fetch error:", e);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // 解答データをDBに保存するロジック
  const handleSubmit = async () => {
    if (selected === null) return;
  
    const selectedOption = q.options
      .sort((a, b) => a.optionOrder - b.optionOrder)[selected];
  
    const payload = {
      questionId: q.questionId,
      selectedOptionId: selectedOption.optionId,
      confidence: confidence
    };
  
    try {
      const res = await apiFetch("/answers", {
        method: "POST",
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        console.error("保存失敗");
        return;
      }
  
      const result = await res.json();
  
      // 👇 ここが超重要
      setIsCorrect(result.correct);
      setCorrectOptionId(result.correctOptionId);
      setExplanation(result.explanation);
  
      setSubmitted(true);
  
    } catch (err) {
      console.error(err);
    }
  };

  // 【機能1】次の問題へ進むロジック
  const handleNext = () => {
    // 残り5問になったら次を取得
    if(hasMore && questions.length - qIndex <= 5) {
      fetchQuestions(lastSeq!);
    }

    if(qIndex < questions.length - 1) {
      setQIndex((prev) => prev + 1);
      setSelected(null);
      setConfidence(null);
      setSubmitted(false);
      setTimeLeft(60);
    } else {
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
          
          <div className="flex items-center gap-4">
            {/* <Timer seconds={timeLeft} total={60} /> */}
            
            {/* 中断ボタンを追加 */}
            <button 
              onClick={() => {
                if (confirm("学習を中断してホームに戻りますか？")) {
                  router.push("/");
                }
              }}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-bold text-slate-400 hover:text-rose-400 transition-all"
            >
              一時中断
            </button>
          </div>
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
              key={opt.optionId}
              text={opt.optionText}
              index={idx}
              selected={selected === idx}
              submitted={submitted}
              isCorrect={correctOptionId === opt.optionId}
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
                <p className="text-slate-300 leading-relaxed">{explanation}</p>
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