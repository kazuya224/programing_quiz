"use client";

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const safeCode = code ?? "";
  const lines = safeCode.trim().split("\n");

  const tokenize = (line: string) => {
    // 簡易トークナイザー（以前のロジックを反映）
    const keywords = ["const", "let", "var", "function", "return", "if", "else", "import", "export", "async", "await"];
    const parts = line.split(/(\s+|\(|\)|\{|\}|\[|\]|\.|\;|\'|\"|\`)/);

    return parts.map((part, i) => {
      if (keywords.includes(part)) return <span key={i} style={{ color: "#569cd6" }}>{part}</span>;
      if (/^[0-9]+$/.test(part)) return <span key={i} style={{ color: "#b5cea8" }}>{part}</span>;
      if (/^['"`].*['"`]$/.test(part)) return <span key={i} style={{ color: "#ce9178" }}>{part}</span>;
      if (part.startsWith("//")) return <span key={i} style={{ color: "#6a9955" }}>{part}</span>;
      return <span key={i} style={{ color: "#d4d4d4" }}>{part}</span>;
    });
  };

  return (
    <div className="bg-[#1e1e1e] font-mono text-sm leading-6 py-4 overflow-x-auto border border-slate-700">
      {lines.map((line, idx) => (
        <div key={idx} className="flex hover:bg-white/5 transition-colors px-4">
          <span className="w-8 text-right text-slate-600 mr-4 select-none italic">
            {idx + 1}
          </span>
          <pre className="whitespace-pre">
            {tokenize(line)}
          </pre>
        </div>
      ))}
    </div>
  );
}