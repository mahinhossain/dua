"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  FiUsers,
  FiActivity,
  FiTrendingUp,
  FiCalendar,
  FiUser,
} from "react-icons/fi";

const PieChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [targets, setTargets] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [usersRes, targetsRes] = await Promise.all([
          fetch("/api/user1"),
          fetch("/api/targets1"),
        ]);

        const usersData = await usersRes.json();
        const targetsData = await targetsRes.json();

        setUsers(usersData);
        setTargets(targetsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
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
    const user = users.find((u) => u._id === target.userId);
    return {
      name: user?.name || "Unknown",
      value: parseInt(target.achievement),
      target: parseInt(target.target),
    };
  });

  const chartOptions = {
    labels: chartData.map((d) => d.name),
    colors: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      markers: {
        width: 12,
        height: 12,
        radius: 6,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Math.round(val) + "%";
      },
      style: {
        fontSize: "12px",
        fontFamily: "Inter, sans-serif",
      },
      dropShadow: {
        enabled: false,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Performance Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Monitor and analyze team performance metrics
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600 mr-4">
                <FiUsers size={24} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Total Users
                </h3>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {users.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-50 text-green-600 mr-4">
                <FiActivity size={24} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Active This Month
                </h3>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
                  {currentMonthTargets.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-amber-50 text-amber-600 mr-4">
                <FiTrendingUp size={24} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Avg Achievement
                </h3>
                <p className="text-2xl font-semibold text-gray-900 mt-1">
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
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Current Month Performance
              </h2>
              <span className="text-sm text-gray-500">
                {new Date().toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="h-80">
              {chartData.length > 0 ? (
                <PieChart
                  options={chartOptions}
                  series={chartData.map((d) => d.value)}
                  type="donut"
                  height="100%"
                  width="100%"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <FiUser size={48} className="mb-4 opacity-50" />
                  <p>No performance data available for current month</p>
                </div>
              )}
            </div>
          </div>

          {/* Historical Data */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Historical Performance
              </h2>
              <div className="flex items-center space-x-2">
                <FiCalendar className="text-gray-400" />
                <span className="text-sm text-gray-500">Select Period</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <select
                className="flex-1 min-w-[150px] px-4 py-2 text-sm rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
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
                className="flex-1 min-w-[120px] px-4 py-2 text-sm rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                placeholder="Year"
                min="2000"
                max={new Date().getFullYear()}
              />
            </div>

            {selectedPeriodTargets.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Target
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Achievement
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Progress
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
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
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user?.name || "Unknown"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {target.target.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {target.achievement.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-20 mr-2">
                                <div className="relative pt-1">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <span
                                        className={`text-xs font-semibold inline-block ${
                                          percentage >= 100
                                            ? "text-green-600"
                                            : "text-blue-600"
                                        }`}
                                      >
                                        {percentage}%
                                      </span>
                                    </div>
                                  </div>
                                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
                                    <div
                                      style={{
                                        width: `${Math.min(percentage, 100)}%`,
                                      }}
                                      className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                                        percentage >= 100
                                          ? "bg-green-500"
                                          : "bg-blue-500"
                                      }`}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                              {target.target > 0 && (
                                <div className="w-16 h-16">
                                  <PieChart
                                    options={{
                                      labels: ["Achieved", "Remaining"],
                                      colors: ["#10B981", "#E5E7EB"],
                                      legend: { show: false },
                                      dataLabels: { enabled: false },
                                      chart: { type: "donut" },
                                      plotOptions: {
                                        pie: {
                                          donut: {
                                            size: "70%",
                                            labels: {
                                              show: true,
                                              total: {
                                                show: true,
                                                showAlways: true,
                                                formatter: function () {
                                                  return percentage + "%";
                                                },
                                                color: "#374151",
                                                fontSize: "12px",
                                                fontFamily: "Inter, sans-serif",
                                              },
                                            },
                                          },
                                        },
                                      },
                                    }}
                                    series={[
                                      Math.min(
                                        target.achievement,
                                        target.target
                                      ),
                                      Math.max(
                                        target.target - target.achievement,
                                        0
                                      ),
                                    ]}
                                    type="donut"
                                    width="100%"
                                    height="100%"
                                  />
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <FiCalendar size={48} className="mb-4 opacity-50" />
                <p>No data available for selected period</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
