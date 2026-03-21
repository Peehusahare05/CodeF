import React, { useEffect, useMemo, useRef, useState } from "react";
import { Brain, Bot, Send, Sparkles, RotateCcw, Menu, X } from "lucide-react";
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
  const [loadingContext, setLoadingContext] = useState(true);
  const [error, setError] = useState("");
  const [latestResults, setLatestResults] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
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
      } finally {
        setLoadingContext(false);
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
    }
  };

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
    setError("");
  };

  return (
    <div className="min-w-0 space-y-3 font-sans sm:space-y-4 lg:space-y-6">
      {/* Header Section - AI Climate Advisor */}
      <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4 lg:rounded-3xl lg:p-6">
        <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 sm:h-12 sm:w-12 sm:rounded-2xl">
              <Brain className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl lg:text-2xl">
                AI Climate Advisor
              </h1>
              <p className="truncate text-xs text-slate-500 sm:text-sm">
                Personalized sustainability guidance
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetChat}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm"
          >
            <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </section>

      {/* Summary Cards - Eco Score, CO2, Status */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-6">
        {/* Eco Score Card */}
        <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:rounded-xl sm:p-4 lg:rounded-2xl lg:p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Eco Score
          </p>
          <p className="mt-2 text-xl font-extrabold text-slate-900 sm:text-2xl lg:text-3xl">
            {loadingContext ? "--" : Math.round(context.ecoScore || 0)}
          </p>
        </div>

        {/* Weekly CO2 Card */}
        <div className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:rounded-xl sm:p-4 lg:rounded-2xl lg:p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Weekly CO2
          </p>
          <p className="mt-2 text-xl font-extrabold text-slate-900 sm:text-2xl lg:text-3xl">
            {loadingContext
              ? "--"
              : `${Number(context.totalCO2 || 0).toFixed(1)}`}
            <span className="text-xs font-semibold text-slate-500 sm:text-sm"> kg</span>
          </p>
        </div>

        {/* Advisor Status Card */}
        <div className="col-span-2 rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:col-span-1 sm:rounded-xl sm:p-4 lg:rounded-2xl lg:p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Advisor Status
          </p>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-2 py-1 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2">
            <Sparkles className="h-3.5 w-3.5 text-emerald-700 sm:h-4 sm:w-4" />
            <span className="text-xs font-semibold text-emerald-700 sm:text-sm">
              Online
            </span>
          </div>
        </div>
      </section>

      {/* Error Alert */}
      {error && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-700 sm:rounded-xl sm:p-4 sm:text-sm">
          {error}
        </div>
      )}

      {/* Chat Section - Main Container */}
      <section className="flex flex-col gap-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm sm:rounded-xl lg:rounded-2xl">
        {/* Chat Header */}
        <div className="flex items-center gap-2 border-b border-slate-200 px-3 py-3 text-xs font-semibold text-slate-700 sm:px-4 sm:py-4 sm:text-sm lg:px-5 lg:py-5">
          <Bot className="h-3.5 w-3.5 shrink-0 text-emerald-600 sm:h-4 sm:w-4" />
          <span>Conversation</span>
        </div>

        {/* Messages Area - Scrollable */}
        <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3 sm:space-y-4 sm:px-4 sm:py-4 lg:px-5 lg:py-5">
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
        <div className="border-t border-slate-200 px-3 py-3 sm:px-4 sm:py-4 lg:px-5 lg:py-5">
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
