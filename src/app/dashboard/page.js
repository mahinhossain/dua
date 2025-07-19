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
      const usersRes = await fetch("/api/user1");
      const usersData = await usersRes.json();
      setUsers(usersData);

      const targetsRes = await fetch("/api/targets1");
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

  console.log("currentMonthTargets", currentMonthTargets);
  const chartData = currentMonthTargets.map((target) => {
    const user = users.find((u) => u._id === target.userId);
    return {
      name: user?.name || "Unknown",
      value: parseInt(target.achievement),
      target: parseInt(target.target),
    };
  });

  console.log("chartData", chartData);
  const chartOptions = {
    labels: chartData.map((d) => d.name),
    colors: ["#4CAF50", "#2196F3", "#FFC107", "#9C27B0", "#607D8B"],
  };

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-6"> Admin Dashboard</h1>

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

        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            📅 View Previous Months
          </h2>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <select
              className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
              className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              placeholder="Enter year"
            />
          </div>

          {selectedPeriodTargets.length > 0 ? (
            <div className="overflow-x-auto rounded-lg border">
              <table className="min-w-full text-sm text-gray-800">
                <thead className="bg-gray-100 text-xs font-semibold uppercase tracking-wide text-gray-600">
                  <tr>
                    <th className="px-6 py-4 text-left">User</th>
                    <th className="px-6 py-4 text-left">Target</th>
                    <th className="px-6 py-4 text-left">Achievement</th>
                    <th className="px-6 py-4 text-left">Progress</th>
                    <th className="px-6 py-4 text-left">Charts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedPeriodTargets.map((target, i) => {
                    const user = users.find((u) => u._id === target.userId);
                    const percentage = Math.round(
                      (target.achievement / target.target) * 100
                    );

                    return (
                      <tr
                        key={i}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">{user?.name || "Unknown"}</td>
                        <td className="px-6 py-4">{target.target}</td>
                        <td className="px-6 py-4">{target.achievement}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                              percentage >= 100
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {percentage}%
                          </span>
                        </td>
                        <td>
                          {/* Individual user chart: show a small donut chart for achievement vs target */}
                          {target.target > 0 ? (
                            <PieChart
                              options={{
                                labels: ["Achieved", "Remaining"],
                                colors: ["red", "green"], // green for achieved, red for remaining
                                legend: { show: false },
                                dataLabels: { enabled: true },
                                chart: { type: "pie" },
                              }}
                              series={[
                                Math.min(target.achievement, target.target),
                                Math.max(target.target - target.achievement, 0),
                              ]}
                              type="pie"
                              width={180}
                              height={180}
                            />
                          ) : (
                            <span className="text-gray-400 text-xs">
                              No target
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">
              No data available for selected period.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
