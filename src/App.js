import { useState } from "react";
import SessionSetup from "./components/SessionSetup";
import ChatUI from "./components/ChatUI";
import ResultPage from "./components/ResultPage";
import { startSession, answerQuestion } from "./api";

function App() {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleStart = async (role, difficulty, numQuestions) => {
    const res = await startSession(role, difficulty, numQuestions);
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

    // Add bot feedback + next question
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: res.feedback, time: new Date().toLocaleTimeString() },
      { sender: "bot", text: res.next_question, time: new Date().toLocaleTimeString() },
    ]);

    setCurrentQuestion(res.next_question);

    // Detect if interview is complete
    if (res.next_question.includes("Interview complete")) {
      setInterviewComplete(true);
    }
  };

  // Restart function
  const handleRestart = () => {
    setSessionId(null);
    setMessages([]);
    setCurrentQuestion("");
    setInterviewComplete(false);
    setAnswer("");
  };

  // Switch between pages
  if (!sessionId) {
    return <SessionSetup onStart={handleStart} />;
  }

  if (interviewComplete) {
    return <ResultPage sessionId={sessionId} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col w-full max-w-3xl bg-[#FFFFFF] rounded-lg shadow">
        <ChatUI messages={messages} />
        <div className="p-4 border-t flex">
          <input
            type="text"
            placeholder="Type your answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)} // controlled input
            className="flex-grow border rounded px-4 py-2 mr-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAnswer(answer);
                setAnswer("");
              }
            }}
          />
          <button
            onClick={() => {
              handleAnswer(answer);
              setAnswer("");
            }}
            className="bg-[#234C6A] hover:bg-[#1d3b52] text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
