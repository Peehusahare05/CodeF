import React, { useEffect, useState } from "react";
import {
  Leaf,
  Trophy,
  Users,
  Zap,
  ChevronDown,
  Medal,
  Bike,
  Bolt,
  Recycle,
} from "lucide-react";
import StatCard from "../components/StatCard";
import TopRankCard from "../components/TopRankCard";
import LeaderboardRow from "../components/LeaderboardRow";
import BadgeCard from "../components/BadgeCard";
import CTASection from "../components/CTASection";
import { apiFetch } from "../utils/api";

// badge sets assigned by rank position
const BADGE_SETS = [
  ["eco", "bike", "bolt"],
  ["eco", "bolt"],
  ["eco", "recycle"],
  ["bike"],
  ["bolt"],
  ["eco"],
  ["recycle"],
];

const RANK_BADGE = ["gold", "silver", "bronze"];

const badges = [
  {
    icon: <Medal className="w-6 h-6 text-green-600" />,
    title: "Eco Champion",
    desc: "Consistency for 30 days",
    bg: "bg-green-50",
  },
  {
    icon: <Bike className="w-6 h-6 text-blue-500" />,
    title: "Green Traveler",
    desc: "Low carbon commutes",
    bg: "bg-blue-50",
  },
  {
    icon: <Bolt className="w-6 h-6 text-yellow-500" />,
    title: "Energy Saver",
    desc: "Reduced power usage",
    bg: "bg-yellow-50",
  },
  {
    icon: <Recycle className="w-6 h-6 text-green-400" />,
    title: "Waste Reducer",
    desc: "Recycling milestones",
    bg: "bg-green-100",
  },
];

// ── Static fallback data (shown when API returns no users yet) ──────────────
const FALLBACK = [
  { rank: 1, name: "Rahul Sharma", avgEcoScore: 92, submissions: 5 },
  { rank: 2, name: "Priya K", avgEcoScore: 88, submissions: 4 },
  { rank: 3, name: "Arjun V", avgEcoScore: 85, submissions: 3 },
  { rank: 4, name: "Neha Sharma", avgEcoScore: 82, submissions: 6 },
  { rank: 5, name: "Arpit Gupta", avgEcoScore: 80, submissions: 2 },
  { rank: 6, name: "Sneha Patil", avgEcoScore: 78, submissions: 4 },
];

const LeaderboardPage = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/api/carbon/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setLeaders(data.data);
        } else {
          setLeaders(FALLBACK);
        }
      })
      .catch(() => setLeaders(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const displayed = leaders.length > 0 ? leaders : FALLBACK;

  // Compute dynamic stats from leaderboard
  const totalCO2Saved = displayed.reduce((s, u) => s + (u.totalCO2 || 0), 0).toFixed(0);
  const activeUsers = displayed.length;
  const avgScore =
    displayed.length > 0
      ? Math.round(displayed.reduce((s, u) => s + u.avgEcoScore, 0) / displayed.length)
      : 0;

  const statsData = [
    {
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      title: "Total CO₂ Tracked",
      value: `${totalCO2Saved} kg`,
      iconBg: "bg-green-50",
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "Active Eco Citizens",
      value: String(activeUsers),
      iconBg: "bg-blue-50",
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Average Eco Score",
      value: `${avgScore} / 100`,
      iconBg: "bg-yellow-50",
    },
  ];

  // Split top 3 from rest
  const top3Raw = displayed.slice(0, 3);
  // Reorder to show rank2, rank1, rank3 (podium style)
  const top3Podium =
    top3Raw.length === 3
      ? [top3Raw[1], top3Raw[0], top3Raw[2]]
      : top3Raw;

  const rest = displayed.slice(3);

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Page Header */}
      <section className="pb-6 pt-2 md:pt-4">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-green-600" />
              <span className="text-xs font-semibold text-green-600 tracking-widest">
                GLOBAL RANKING
              </span>
            </div>
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Community Leaderboard
            </h1>
            <p className="max-w-lg text-sm text-slate-600 md:text-base">
              Discover the top eco-conscious users making the biggest impact in
              reducing their carbon footprint.
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-3">
            <button className="btn-secondary w-full gap-2 px-4 py-2 sm:w-auto">
              Campus Leaderboard <ChevronDown className="w-4 h-4" />
            </button>
            <button className="btn-secondary w-full gap-2 px-4 py-2 sm:w-auto">
              City Leaderboard <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="mb-8 grid grid-cols-1 gap-4 md:mb-10 md:grid-cols-3 md:gap-6">
        {statsData.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </section>

      {/* Top 3 Podium */}
      {!loading && top3Podium.length > 0 && (
        <section className="mb-8 md:mb-10">
          <div className="flex flex-col items-stretch justify-center gap-5 md:flex-row md:items-end md:gap-6">
            {top3Podium.map((u) => (
              <TopRankCard
                key={u.rank}
                rank={u.rank}
                name={u.name}
                score={u.avgEcoScore}
                badge={RANK_BADGE[u.rank - 1] || "bronze"}
                large={u.rank === 1}
              />
            ))}
          </div>
        </section>
      )}

      {/* Community Rankings Table */}
      {!loading && rest.length > 0 && (
        <section className="mb-10 md:mb-12">
          <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900 md:mb-4 md:text-lg">
            <Trophy className="w-5 h-5 text-green-600" />
            Community Rankings
          </h2>
          <div className="surface-card overflow-hidden">
            <div className="hidden sm:grid sm:grid-cols-12 gap-2 border-b bg-slate-50 px-4 py-3 text-[11px] font-semibold text-slate-500 md:px-6 md:text-xs">
              <div className="col-span-1">RANK</div>
              <div className="col-span-4">USER</div>
              <div className="col-span-4">BADGES</div>
              <div className="col-span-3 text-right">SCORE</div>
            </div>
            {rest.map((u, i) => (
              <LeaderboardRow
                key={u.rank}
                rank={u.rank}
                name={u.name}
                score={u.avgEcoScore}
                badges={BADGE_SETS[i % BADGE_SETS.length]}
              />
            ))}
          </div>
        </section>
      )}

      {loading && (
        <div className="py-12 text-center text-sm text-slate-400 md:py-16">Loading leaderboard...</div>
      )}

      {/* Badges */}
      <section className="mb-10 md:mb-12">
        <h2 className="mb-3 text-base font-bold text-slate-900 md:mb-4 md:text-lg">
          Sustainability Achievement Badges
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {badges.map((b, i) => (
            <BadgeCard key={i} {...b} />
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default LeaderboardPage;
