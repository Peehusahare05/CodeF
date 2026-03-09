// CommunityLeaderboardSection.jsx
import React from "react";
import LeaderboardCard from "./LeaderboardCard";

const users = [
  { rank: 1, name: "Rahul Sharma", points: 92, avatar: "R" },
  { rank: 2, name: "Priya K", points: 88, avatar: "P" },
  { rank: 3, name: "Arjun V", points: 85, avatar: "A" },
];

const CommunityLeaderboardSection = () => (
  <section className="py-20 px-4 bg-white" id="leaderboard">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-900 mb-8">
        Join a Community Driving Sustainable Change
      </h2>
      <div className="bg-slate-50 rounded-xl shadow p-8">
        {users.map((u) => (
          <LeaderboardCard
            key={u.rank}
            rank={u.rank}
            name={u.name}
            points={u.points}
            avatar={u.avatar}
          />
        ))}
      </div>
    </div>
  </section>
);

export default CommunityLeaderboardSection;
