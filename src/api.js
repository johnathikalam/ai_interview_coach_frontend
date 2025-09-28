import axios from "axios";

const API_BASE = "http://127.0.0.1:8000"; // FastAPI backend

export const startSession = async (role, difficulty, numQuestions = 3) => {
  const res = await axios.post(`${API_BASE}/start_session`, {
    role,
    difficulty,
    num_questions: numQuestions,
  });
  return res.data;
};

export const answerQuestion = async (sessionId, answer) => {
  const res = await axios.post(`${API_BASE}/answer_question`, {
    session_id: sessionId,
    answer,
  });
  return res.data;
};

export const getHistory = async (sessionId) => {
  const res = await axios.post(`${API_BASE}/get_history`, {
    session_id: sessionId,
  });
  return res.data;
};

export const getSummary = async (sessionId) => {
  const res = await axios.post(`${API_BASE}/get_summary`, {
    session_id: sessionId,
  });
  return res.data;
};
