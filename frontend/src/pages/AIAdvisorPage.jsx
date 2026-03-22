import React, { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Send } from "lucide-react";
import { getCarbonHistory } from "../services/carbonService";
import { sendAIMessage } from "../services/aiService";

const EXAMPLE_PROMPTS = [
  "What is my biggest carbon reduction opportunity this week?",
  "How can I improve my eco score by 10 points?",
  "Give me a low-effort home electricity action plan.",
  "Suggest transport changes for city commuting.",
];

const INITIAL_MESSAGE = {
  type: "ai",
  content:
    "I am your Eco AI Advisor. Ask for practical, personalized steps to lower emissions and improve your eco score.",
};

function MessageBubble({ type, content }) {
  const aiMessage = type === "ai";

  return (
    <div className={`flex ${aiMessage ? "justify-start" : "justify-end"} px-3 sm:px-0`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm transition-all ${aiMessage
          ? "rounded-bl-md border border-emerald-100 bg-emerald-50 text-emerald-900"
          : "rounded-br-md border border-slate-200 bg-slate-100 text-slate-800"
          }`}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
      </div>
    </div>
  );
}

const AIAdvisorPage = () => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [latestResults, setLatestResults] = useState(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  useEffect(() => {
    const loadLatestResults = async () => {
      try {
        setError("");
        const response = await getCarbonHistory(1, 1);
        const latest = response?.data?.[0]?.results || null;
        setLatestResults(latest);
      } catch (err) {
        setError(err.message || "Could not load your latest footprint context.");
      }
    };

    loadLatestResults();
  }, []);

  const context = useMemo(() => {
    if (!latestResults) return {};

    return {
      ecoScore: Number(latestResults.ecoScore ?? 0),
      totalCO2: Number(latestResults.totalCO2 ?? 0),
    };
  }, [latestResults]);

  const sendMessage = async (text) => {
    const message = text.trim();
    if (!message || loading) return;

    setMessages((prev) => [...prev, { type: "user", content: message }]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const history = messages
        .slice(-10)
        .filter((item) => item.type === "user" || item.type === "ai")
        .map((item) => ({
          role: item.type === "ai" ? "assistant" : "user",
          content: item.content,
        }));

      const response = await sendAIMessage({
        message,
        ecoScore: context.ecoScore,
        co2: context.totalCO2,
        context,
        history,
      });

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: response.reply || "Here is a sustainability recommendation.",
        },
      ]);
    } catch (err) {
      setError(err.message || "Failed to get AI guidance.");
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: "I could not process that right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden bg-slate-50 font-sans lg:p-4">
      {/* Error Alert */}
      {error && (
        <div className="mx-3 mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700 sm:mx-4 sm:mt-4 sm:rounded-xl sm:p-4 sm:text-sm lg:mx-0 lg:mt-0">
          {error}
        </div>
      )}

      {/* Chat Section - Main Container */}
      <section className="flex min-h-0 flex-1 min-w-0 flex-col overflow-hidden border border-slate-200 bg-white shadow-sm lg:rounded-2xl">
        {/* Chat Header */}
        <div className="shrink-0 border-b border-slate-200 bg-white px-3 py-3 sm:px-4 sm:py-4 lg:px-5 lg:py-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 sm:text-sm">
            <Bot className="h-3.5 w-3.5 shrink-0 text-emerald-600 sm:h-4 sm:w-4" />
            <span>Conversation</span>
          </div>
        </div>

        {/* Messages Area - Scrollable */}
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3 sm:space-y-4 sm:px-4 sm:py-4 lg:px-5 lg:py-5">
          {messages.map((message, index) => (
            <MessageBubble key={`${message.type}-${index}`} {...message} />
          ))}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center gap-2 px-3 text-xs text-slate-500 sm:text-sm">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 sm:h-6 sm:w-6">
                <Bot className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              </span>
              <span>AI advisor is thinking...</span>
            </div>
          )}

          {/* Scroll Anchor */}
          <div ref={scrollRef} className="h-0 w-0" />
        </div>

        {/* Input Section */}
        <div className="shrink-0 border-t border-slate-200 bg-white px-3 py-3 sm:px-4 sm:py-4 lg:px-5 lg:py-5">
          {/* Suggestion Chips - Wrapped */}
          <div className="mb-3 flex flex-wrap gap-2 sm:mb-4">
            {EXAMPLE_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
                disabled={loading}
                className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50 sm:px-3 sm:py-1.5 sm:text-xs lg:px-4 lg:py-2"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            className="flex items-center gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask for sustainability advice..."
              className="h-9 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-xs outline-none transition focus:border-emerald-400 sm:h-10 sm:rounded-xl sm:px-4 sm:text-sm"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10 sm:rounded-xl"
            >
              <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AIAdvisorPage;
