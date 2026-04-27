export default function LegalPage() {
    return (
      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 24px", fontFamily: "sans-serif", lineHeight: 1.8, color: "#111" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "8px" }}>
          特定商取引法に基づく表記
        </h1>
        <p style={{ color: "#888", fontSize: "0.85rem", marginBottom: "40px" }}>
          最終更新日：2026年5月1日
        </p>
  
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
          <tbody>
          <Row label="販売事業者名" value="プログラミング問題演習サービス" />
          <Row label="運営統括責任者" value="請求があった場合には速やかに開示いたします" />
          <Row label="所在地" value="東京都（詳細は請求があった場合には速やかに開示いたします）" />
          <Row label="電話番号" value="請求があった場合には速やかに開示いたします" />
          <Row label="メールアドレス" value="kazuswbwc@gmail.com" />
          <Row label="販売商品" value="プログラミング学習用オンライン問題演習サービス" />
          <Row label="販売価格" value="月額770円（税込）" />
          <Row label="料金以外の必要費用" value="インターネット接続料金はお客様のご負担となります" />
          <Row label="支払い方法" value="クレジットカード（Visa / Mastercard / American Express）" />
          <Row label="支払い時期・課金タイミング" value="ご登録時に課金され、その後毎月同日に自動更新されます" />
          <Row label="サービス提供時期" value="決済完了後、即時ご利用いただけます" />
          <Row label="解約・キャンセルについて" value="いつでもマイページから解約可能です。解約後は次回更新日まで引き続きご利用いただけます" />
          <Row label="返金ポリシー" value="サービスの性質上、原則として返金は承っておりません。ただし、システム障害等により利用不能な期間が生じた場合は、個別に対応いたします" />
          <Row label="動作環境" value="最新版の Chrome / Firefox / Safari / Edge を推奨します" />
          </tbody>
        </table>
  
        <div style={{ marginTop: "48px", borderTop: "1px solid #ddd", paddingTop: "20px" }}>
          <a href="/" style={{ color: "#555", fontSize: "0.9rem" }}>← トップページに戻る</a>
        </div>
      </main>
    );
  }
  
  function Row({ label, value }: { label: string; value: string }) {
    return (
      <tr style={{ borderBottom: "1px solid #e5e5e5" }}>
        <th
          style={{
            textAlign: "left",
            padding: "14px 8px",
            verticalAlign: "top",
            color: "#555",
            fontWeight: "bold",
            width: "35%",
            background: "#fafafa",
          }}
        >
          {label}
        </th>
        <td style={{ padding: "14px 8px", verticalAlign: "top" }}>{value}</td>
      </tr>
    );
  }