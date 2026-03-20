import React, { useEffect, useState } from "react";
import {
  Leaf,
  Shield,
  Users,
  Zap,
  Filter,
  Medal,
  Bike,
  Bolt,
  Recycle,
} from "lucide-react";
import StatCard from "../components/StatCard";
import TopUserCard from "../components/TopUserCard";
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

const badges = [
  {
    icon: <Medal className="w-4 h-4" />,
    title: "Eco Champion",
    desc: "30-day consistency streak",
  },
  {
    icon: <Bike className="w-4 h-4" />,
    title: "Green Commute",
    desc: "Low-impact travel habits",
  },
  {
    icon: <Bolt className="w-4 h-4" />,
    title: "Energy Saver",
    desc: "Lower household energy usage",
  },
  {
    icon: <Recycle className="w-4 h-4" />,
    title: "Waste Reducer",
    desc: "Steady recycling milestones",
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
  const [campusFilter, setCampusFilter] = useState("All Campuses");
  const [cityFilter, setCityFilter] = useState("All Cities");

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
      icon: <Leaf className="h-4 w-4" />,
      title: "Total CO₂ Tracked",
      value: `${totalCO2Saved} kg`,
    },
    {
      icon: <Users className="h-4 w-4" />,
      title: "Active Users",
      value: String(activeUsers),
    },
    {
      icon: <Zap className="h-4 w-4" />,
      title: "Average Eco Score",
      value: `${avgScore} / 100`,
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
  const filteredTop3 = top3Podium.filter(() => true);
  const filteredRest = rest.filter(() => true);

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Page Header */}
      <section className="pb-7 pt-2 md:pb-8 md:pt-3">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
              <Shield className="h-3.5 w-3.5" />
              Live Rankings
            </span>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Community Leaderboard
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-600 md:text-base">
              Track top-performing eco users, compare weekly progress, and compete on consistency.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <label className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Filter className="h-4 w-4" />
              </span>
              <select
                value={campusFilter}
                onChange={(e) => setCampusFilter(e.target.value)}
                className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-sm font-medium text-slate-700 outline-none transition-colors focus:border-slate-400"
              >
                <option>All Campuses</option>
                <option>North Campus</option>
                <option>South Campus</option>
                <option>Central Campus</option>
              </select>
            </label>

            <label className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Filter className="h-4 w-4" />
              </span>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-sm font-medium text-slate-700 outline-none transition-colors focus:border-slate-400"
              >
                <option>All Cities</option>
                <option>Mumbai</option>
                <option>Pune</option>
                <option>Delhi</option>
              </select>
            </label>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="mb-8 grid grid-cols-1 gap-4 md:mb-10 md:grid-cols-3 md:gap-6">
        {statsData.map((item) => (
          <StatCard key={item.title} icon={item.icon} title={item.title} value={item.value} />
        ))}
      </section>

      {/* Top 3 */}
      {!loading && filteredTop3.length > 0 && (
        <section className="mb-8 md:mb-10">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900 md:text-lg">Top 3 Performers</h2>
            <span className="text-xs font-medium text-slate-500">Updated this week</span>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {filteredTop3.map((u) => (
              <TopUserCard
                key={u.rank}
                rank={u.rank}
                name={u.name}
                score={u.avgEcoScore}
                isLeader={u.rank === 1}
              />
            ))}
          </div>
        </section>
      )}

      {/* Community Rankings Table */}
      {!loading && filteredRest.length > 0 && (
        <section className="mb-10 md:mb-12">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-900 md:text-lg">Full Rankings</h2>
            <span className="text-xs text-slate-500">Rank | User | Eco Score | Badge</span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_34px_-28px_rgba(15,23,42,0.75)]">
            <div className="hidden grid-cols-12 gap-3 border-b border-slate-100 bg-slate-50/80 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-500 sm:grid md:px-5">
              <div className="col-span-1">RANK</div>
              <div className="col-span-5">USER</div>
              <div className="col-span-3">ECO SCORE</div>
              <div className="col-span-2 text-right">BADGE</div>
            </div>
            {filteredRest.map((u, i) => (
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
        <h2 className="mb-3 text-base font-semibold text-slate-900 md:mb-4 md:text-lg">Achievement Badges</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
          {badges.map((badge) => (
            <BadgeCard key={badge.title} icon={badge.icon} title={badge.title} desc={badge.desc} />
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default LeaderboardPage;
