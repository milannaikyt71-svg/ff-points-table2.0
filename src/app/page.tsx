"use client";

import { useState } from "react";

type Team = {
  name: string;
  eliminations: number;
  rank: number;
  totalPoints: number;
};

const rankPoints: { [key: number]: number } = {
  1: 12, 2: 9, 3: 8, 4: 7, 5: 6,
  6: 5, 7: 4, 8: 3, 9: 2, 10: 1,
  11: 0, 12: 0,
};

export default function Home() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamName, setTeamName] = useState("");
  const [elims, setElims] = useState(0);
  const [rank, setRank] = useState(1);

  const addResult = () => {
    if (!teamName) return;
    const totalPoints = elims + (rankPoints[rank] || 0);
    const newTeam: Team = { name: teamName, eliminations: elims, rank, totalPoints };
    setTeams([...teams, newTeam]);
    setTeamName(""); setElims(0); setRank(1);
  };

  const sortedTeams = [...teams].sort((a,b)=>b.totalPoints-a.totalPoints);
  const mvp = teams.length>0?teams.reduce((prev,curr)=>prev.eliminations>curr.eliminations?prev:curr):null;

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Free Fire Points Table</h1>
      <div className="bg-gray-900 p-6 rounded-xl mb-6">
        <h2 className="text-xl mb-4">Enter Match Result</h2>
        <input type="text" placeholder="Team Name" value={teamName} onChange={e=>setTeamName(e.target.value)} className="w-full p-2 mb-3 text-black rounded" />
        <input type="number" placeholder="Eliminations" value={elims} onChange={e=>setElims(Number(e.target.value))} className="w-full p-2 mb-3 text-black rounded" />
        <input type="number" placeholder="Rank (1-12)" value={rank} onChange={e=>setRank(Number(e.target.value))} min={1} max={12} className="w-full p-2 mb-3 text-black rounded" />
        <button onClick={addResult} className="bg-yellow-500 px-4 py-2 rounded font-bold text-black">Add Result</button>
      </div>
      <div className="bg-gray-900 p-6 rounded-xl">
        <h2 className="text-xl mb-4">Standings</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-2">#</th>
              <th className="p-2">Team</th>
              <th className="p-2">Elims</th>
              <th className="p-2">Rank</th>
              <th className="p-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team,index)=>(
              <tr key={index} className="border-b border-gray-800">
                <td className="p-2">{index+1}</td>
                <td className="p-2">{team.name}</td>
                <td className="p-2">{team.eliminations}</td>
                <td className="p-2">{team.rank}</td>
                <td className="p-2 font-bold">{team.totalPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {mvp && <div className="mt-6 p-4 bg-yellow-600 rounded text-black font-bold">MVP: {mvp.name} ({mvp.eliminations} Eliminations)</div>}
      </div>
    </main>
  );
        }
