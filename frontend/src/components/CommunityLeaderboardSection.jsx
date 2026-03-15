// CommunityLeaderboardSection.jsx
import React from "react";
import LeaderboardCard from "./LeaderboardCard";

const users = [
  { rank: 1, name: "Rahul Sharma", points: 92, avatar: "R" },
  { rank: 2, name: "Priya K", points: 88, avatar: "P" },
  { rank: 3, name: "Arjun V", points: 85, avatar: "A" },
];

const CommunityLeaderboardSection = () => (
  <section className="bg-white py-16" id="leaderboard">
    <div className="section-wrap max-w-3xl">
      <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 md:text-3xl">
        Join a Community Driving Sustainable Change
      </h2>
      <div className="surface-card bg-gray-50 p-6">
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
