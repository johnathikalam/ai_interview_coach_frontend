import { useState } from "react";
import SessionSetup from "./components/SessionSetup";
import ChatUI from "./components/ChatUI";
import { startSession, answerQuestion } from "./api";

function App() {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");

  const handleStart = async (role, difficulty) => {
    const res = await startSession(role, difficulty);
    setSessionId(res.session_id);
    setCurrentQuestion(res.first_question);
    setMessages([
      { sender: "bot", text: res.first_question, time: new Date().toLocaleTimeString() },
    ]);
  };

  const handleAnswer = async (answer) => {
    if (!answer.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: answer, time: new Date().toLocaleTimeString() },
    ]);

    const res = await answerQuestion(sessionId, answer);

    // Add bot feedback
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: res.feedback, time: new Date().toLocaleTimeString() },
      { sender: "bot", text: res.next_question, time: new Date().toLocaleTimeString() },
    ]);

    setCurrentQuestion(res.next_question);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {!sessionId ? (
        <SessionSetup onStart={handleStart} />
      ) : (
        <div className="flex flex-col w-full max-w-3xl bg-[#FAF8F1] rounded-lg shadow">
          <ChatUI messages={messages} />
          <div className="p-4 border-t flex">
            <input
              type="text"
              placeholder="Type your answer..."
              className="flex-grow border rounded px-4 py-2 mr-2"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAnswer(e.target.value);
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector("input");
                handleAnswer(input.value);
                input.value = "";
              }}
              className="bg-[#234C6A] hover:bg-[#234C6A] text-white px-4 py-2 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
