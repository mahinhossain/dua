"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const PieChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [targets, setTargets] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      const usersRes = await fetch("/api/users");
      const usersData = await usersRes.json();
      setUsers(usersData);

      const targetsRes = await fetch("/api/targets");
      const targetsData = await targetsRes.json();
      setTargets(targetsData);
    };

    fetchData();
  }, []);

  const currentMonthTargets = targets.filter(
    (t) =>
      t.month == new Date().getMonth() + 1 && t.year == new Date().getFullYear()
  );

  const selectedPeriodTargets = targets.filter(
    (t) => t.month == selectedMonth && t.year == selectedYear
  );

  const chartData = currentMonthTargets.map((target) => {
    const user = users.find((u) => u.id === target.userId);
    return {
      name: user?.name || "Unknown",
      value: parseInt(target.achievement),
      target: parseInt(target.target),
    };
  });

  const chartOptions = {
    labels: chartData.map((d) => d.name),
    colors: ["#4CAF50", "#2196F3", "#FFC107", "#9C27B0", "#607D8B"],
  };

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold">{users.length}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Active This Month</h2>
          <p className="text-3xl font-bold">{currentMonthTargets.length}</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Avg Achievement</h2>
          <p className="text-3xl font-bold">
            {currentMonthTargets.length > 0
              ? Math.round(
                  (currentMonthTargets.reduce(
                    (sum, t) => sum + t.achievement / t.target,
                    0
                  ) /
                    currentMonthTargets.length) *
                    100
                ) + "%"
              : "N/A"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Current Month Performance
          </h2>
          <div className="h-80">
            {chartData.length > 0 ? (
              <PieChart
                options={chartOptions}
                series={chartData.map((d) => d.value)}
                type="pie"
                height="100%"
              />
            ) : (
              <p>No data available for current month</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">View Previous Months</h2>
          <div className="flex gap-4 mb-6">
            <select
              className="px-3 py-2 border rounded-lg"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {new Date(2000, month - 1, 1).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
            <input
              type="number"
              className="px-3 py-2 border rounded-lg"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            />
          </div>

          {selectedPeriodTargets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">User</th>
                    <th className="py-2 px-4 border-b">Target</th>
                    <th className="py-2 px-4 border-b">Achievement</th>
                    <th className="py-2 px-4 border-b">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPeriodTargets.map((target) => {
                    const user = users.find((u) => u.id === target.userId);
                    return (
                      <tr key={target.id}>
                        <td className="py-2 px-4 border-b">
                          {user?.name || "Unknown"}
                        </td>
                        <td className="py-2 px-4 border-b">{target.target}</td>
                        <td className="py-2 px-4 border-b">
                          {target.achievement}
                        </td>
                        <td className="py-2 px-4 border-b">
                          {Math.round(
                            (target.achievement / target.target) * 100
                          )}
                          %
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No data available for selected period</p>
          )}
        </div>
      </div>
    </div>
  );
}
