import React from "react";
import botImg from "../assets/bot.jpg";
import userImg from "../assets/user.jpg";

export default function ChatUI({ messages }) {
  return (
    <div className="flex flex-col h-[88vh] bg-[#FFFFFF]">
      {/* Header */}
      <div className="p-4 bg-[#1B3C53] text-white font-bold text-xl shadow">
        AI Interview Coach
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-end ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "bot" && (
              <img
                src={botImg}
                alt="bot"
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <div
              className={`px-4 py-2 rounded-2xl max-w-lg ${
                msg.sender === "user"
                  ? "bg-[#234C6A] text-white rounded-br-none"
                  : "bg-[#456882] text-white rounded-bl-none"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <span className="block text-[10px] text-gray-200 mt-1">
                {msg.time}
              </span>
            </div>
            {msg.sender === "user" && (
              <img
                src={userImg}
                alt="user"
                className="w-8 h-8 rounded-full ml-2"
              />
            )}
          </div>
        ))}
      </div>

      {/* Input area
      <div className="p-4 bg-white border-t flex">
        <input
          type="text"
          placeholder="Type your answer..."
          className="flex-grow border rounded px-4 py-2 mr-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // TODO: hook into your handleAnswer
            }
          }}
        />
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </div> */}
    </div>
  );
}
