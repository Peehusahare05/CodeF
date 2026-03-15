import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { apiFetch } from "../utils/api";

const SUGGESTIONS = [
  "How can I reduce electricity emissions?",
  "Tips to lower my carbon footprint",
  "Eco-friendly travel suggestions",
  "How to improve Eco Score",
];

const WELCOME = {
  type: "ai",
  content: `Hello! I’m Eco AI, your sustainability assistant. I can help you reduce your carbon footprint and improve your Eco Score. Ask me about energy usage, transport emissions, or eco-friendly habits.`,
};

function Message({ type, content, insight }) {
  return (
    <div
      className={`flex ${type === "user" ? "justify-end" : "justify-start"} mb-2 w-full`}
    >
      {type === "ai" && (
        <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
          <Bot className="w-5 h-5 text-green-600" />
        </span>
      )}
      <div
        className={`max-w-[85%] sm:max-w-[75%] ${type === "user" ? "bg-gray-100 text-slate-800" : "bg-green-50 text-green-900"} px-3 py-2 text-sm sm:px-4 rounded-2xl shadow-sm ${type === "user" ? "rounded-br-md" : "rounded-bl-md"} animate-slideup`}
      >
        {content}
        {insight && (
          <div className="mt-2 space-y-1">
            <div className="bg-green-100 rounded-xl px-3 py-1 text-sm font-semibold text-green-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Suggestion: {insight.suggestion}
            </div>
            <div className="bg-blue-50 rounded-xl px-3 py-1 text-xs text-blue-700">
              Impact: {insight.impact}
            </div>
            <div className="bg-yellow-50 rounded-xl px-3 py-1 text-xs text-yellow-700">
              Tip: {insight.tip}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const EcoAIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const msgEndRef = useRef(null);

  useEffect(() => {
    if (open && msgEndRef.current) {
      msgEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = async (msg) => {
    if (!msg.trim()) return;
    setMessages((prev) => [...prev, { type: "user", content: msg }]);
    setInput("");
    setLoading(true);

    try {
      // Build optional context from localStorage
      const stored = localStorage.getItem("ecotrack_result");
      const result = stored ? JSON.parse(stored) : {};
      const context = {
        ecoScore: result.ecoScore,
        totalCO2: result.totalCO2,
        transportType: result.inputs?.transportType,
      };

      const res = await apiFetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, context }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: data.reply || "Here's a sustainability tip for you!",
          insight: data.insight || null,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: "Sorry, I couldn't connect to the server. Make sure the backend is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-green-500 to-green-400 shadow-lg transition-all hover:scale-105 hover:shadow-2xl sm:bottom-6 sm:right-6 sm:h-16 sm:w-16 group"
          onClick={() => setOpen(true)}
          title="Ask Eco AI"
        >
          <Bot className="w-8 h-8 text-white drop-shadow" />
          <span className="absolute bottom-20 right-0 bg-slate-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
            Ask Eco AI
          </span>
        </button>
      )}
      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-4 left-3 right-3 z-50 flex max-h-[80vh] flex-col rounded-2xl border border-slate-100 bg-white shadow-2xl animate-chatopen sm:bottom-6 sm:left-auto sm:right-6 sm:w-[350px] sm:max-w-[95vw]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 rounded-t-2xl bg-gradient-to-tr from-green-100 via-green-50 to-white border-b border-green-200">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                <Bot className="w-6 h-6 text-green-700" />
              </span>
              <div>
                <div className="font-bold text-green-800 text-base">
                  Eco AI Assistant
                </div>
                <div className="text-xs text-green-600">
                  Your sustainability guide
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-full hover:bg-green-100 transition-all"
            >
              <X className="w-5 h-5 text-green-700" />
            </button>
          </div>
          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-white"
            style={{ minHeight: 200, maxHeight: 340 }}
          >
            {messages.map((msg, i) => (
              <Message key={i} {...msg} />
            ))}
            {loading && (
              <div className="flex justify-start mb-2 w-full animate-pulse">
                <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <Bot className="w-5 h-5 text-green-600" />
                </span>
                <div className="bg-green-50 text-green-900 px-4 py-2 rounded-2xl shadow-sm animate-slideup">
                  Eco AI is typing…
                </div>
              </div>
            )}
            <div ref={msgEndRef} />
          </div>
          {/* Suggestion Chips */}
          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                className="bg-green-50 hover:bg-green-100 text-green-700 rounded-full px-4 py-1 text-xs font-medium shadow transition-all hover:scale-105"
                onClick={() => sendMessage(s)}
              >
                {s}
              </button>
            ))}
          </div>
          {/* Input */}
          <form
            className="flex items-center gap-2 px-4 py-3 border-t border-slate-100 bg-white"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              type="text"
              className="flex-1 rounded-full bg-gray-100 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 transition-all"
              placeholder="Ask about sustainability tips..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="rounded-full bg-green-600 hover:bg-green-700 text-white p-2 shadow-lg transition-all disabled:opacity-50"
              disabled={loading || !input.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
      {/* Animations */}
      <style>{`
        @keyframes chatopen { 0% { opacity: 0; transform: scale(0.9) translateY(40px);} 100% { opacity: 1; transform: scale(1) translateY(0);} }
        .animate-chatopen { animation: chatopen 0.3s cubic-bezier(.4,2,.6,1) both; }
        @keyframes slideup { 0% { opacity: 0; transform: translateY(20px);} 100% { opacity: 1; transform: translateY(0);} }
        .animate-slideup { animation: slideup 0.25s cubic-bezier(.4,2,.6,1) both; }
      `}</style>
    </>
  );
};

export default EcoAIChatbot;
