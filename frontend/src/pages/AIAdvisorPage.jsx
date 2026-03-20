import React, { useEffect, useMemo, useRef, useState } from "react";
import { Brain, Bot, Send, Sparkles, RotateCcw } from "lucide-react";
import { getCarbonHistory } from "../services/carbonService";
import { sendAIMessage } from "../services/aiService";

const STARTER_PROMPTS = [
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

function MessageBubble({ type, content, insight }) {
  const aiMessage = type === "ai";

  return (
    <div className={`flex ${aiMessage ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm shadow-sm ${aiMessage
          ? "bg-emerald-50 text-emerald-900 rounded-bl-md"
          : "bg-slate-100 text-slate-800 rounded-br-md"
          }`}
      >
        <p>{content}</p>
        {aiMessage && insight && (
          <div className="mt-3 space-y-2 border-t border-emerald-100 pt-3">
            <div className="rounded-lg bg-white px-3 py-2 text-xs text-slate-700">
              <span className="font-semibold text-slate-900">Suggestion:</span> {insight.suggestion}
            </div>
            <div className="rounded-lg bg-white px-3 py-2 text-xs text-slate-700">
              <span className="font-semibold text-slate-900">Impact:</span> {insight.impact}
            </div>
            <div className="rounded-lg bg-white px-3 py-2 text-xs text-slate-700">
              <span className="font-semibold text-slate-900">Tip:</span> {insight.tip}
            </div>
          </div>
        )}
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
      const response = await sendAIMessage({
        message,
        context,
      });

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: response.reply || "Here is a sustainability recommendation.",
          insight: response.insight || null,
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
    <div className="mx-auto w-full max-w-6xl">
      <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Brain className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                AI Climate Advisor
              </h1>
              <p className="text-sm text-slate-500 sm:text-base">
                Personalized recommendations powered by your latest footprint data.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetChat}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Chat
          </button>
        </div>
      </section>

      <section className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Eco Score</p>
          <p className="mt-2 text-2xl font-extrabold text-slate-900">
            {loadingContext ? "--" : Math.round(context.ecoScore || 0)}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Weekly CO2</p>
          <p className="mt-2 text-2xl font-extrabold text-slate-900">
            {loadingContext ? "--" : `${Number(context.totalCO2 || 0).toFixed(1)} kg`}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Advisor Status</p>
          <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
            <Sparkles className="h-4 w-4" />
            Online
          </p>
        </div>
      </section>

      {error && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
          {error}
        </div>
      )}

      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4 text-sm font-semibold text-slate-700">
          <Bot className="h-4 w-4 text-emerald-600" />
          Conversation
        </div>

        <div className="max-h-[52vh] space-y-3 overflow-y-auto px-4 py-4 sm:px-5">
          {messages.map((message, index) => (
            <MessageBubble key={`${message.type}-${index}`} {...message} />
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Bot className="h-3.5 w-3.5" />
              </span>
              AI advisor is thinking...
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        <div className="border-t border-slate-200 px-4 pb-4 pt-3 sm:px-5">
          <div className="mb-3 flex flex-wrap gap-2">
            {STARTER_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
                className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
              >
                {prompt}
              </button>
            ))}
          </div>

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
              placeholder="Ask for a personalized sustainability action plan..."
              className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-emerald-400"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AIAdvisorPage;
