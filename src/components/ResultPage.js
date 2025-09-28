import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { getSummary } from "../api";

export default function ResultPage({ sessionId, onRestart }) {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function fetchSummary() {
      const res = await getSummary(sessionId);
      setSummary(res);
    }
    fetchSummary();
  }, [sessionId]);

  if (!summary) return <p className="text-center mt-10">Loading final report...</p>;

  return (
    <div className="p-8 bg-white rounded shadow-lg max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Interview Report</h2>

      <div className="flex justify-between mb-6">
        <p className="text-lg font-semibold">Total Score: {summary.total_score}</p>
        <p className="text-lg font-semibold">
          Average Score: {summary.avg_score.toFixed(2)} / 10
        </p>
      </div>

      <h3 className="text-xl font-bold">Final Feedback</h3>
      <p className="mt-2 text-gray-700">
        <ReactMarkdown>{summary.summary}</ReactMarkdown>
        </p>

      <h3 className="text-xl font-bold mt-6">Areas to Improve</h3>
      <ul className="list-disc ml-6 mt-2">
        {summary.improvements.map((imp, i) => (
          <li key={i}>{imp}</li>
        ))}
      </ul>

      <div className="mt-6 flex justify-center">
        <button
          onClick={onRestart}
          className="bg-[#456882] hover:bg-[#234C6A] text-white px-6 py-2 rounded"
        >
          Restart Interview
        </button>
      </div>
    </div>
  );
}
