import { useState } from "react";

export default function SessionSetup({ onStart }) {
  const [role, setRole] = useState("AI/ML Engineer");
  const [difficulty, setDifficulty] = useState("medium");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onStart(role, difficulty);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-md w-96 mx-auto mt-20"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">AI Interviewer</h2>

      <label className="block mb-2 font-semibold">Role:</label>
      <input
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 w-full rounded mb-4"
      />

      <label className="block mb-2 font-semibold">Difficulty:</label>
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="border p-2 w-full rounded mb-6"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded text-white ${
          loading
            ? "bg-purple-400 cursor-not-allowed"
            : "bg-purple-500 hover:bg-purple-600"
        }`}
      >
        {loading ? "Starting..." : "Start"}
      </button>

      {/* Loading bar */}
      {loading && (
        <div className="w-full h-1 bg-gray-200 mt-2 rounded overflow-hidden">
          <div className="h-1 bg-purple-500 animate-pulse w-3/4"></div>
        </div>
      )}
    </form>
  );
}
