"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const BarChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PieChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function UserDetail({ params }) {
  // const userId = params.id;
  const { id: userId } = use(params);

  const [user, setUser] = useState(null);
  const [targets, setTargets] = useState([]);
  const [allTargets, setAllTargets] = useState([]);
  const [formData, setFormData] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    target: "",
    achievement: "",
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  console.log("userId", userId);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/user1/${userId}`);
      const data = await res.json();
      setUser(data);
    };

    const fetchTargets = async () => {
      const res = await fetch(
        `/api/targets1?userId=${userId}&month=${selectedMonth}&year=${selectedYear}`
      );
      const data = await res.json();
      setTargets(data.currentTargets);
      setAllTargets(data.allTargets);
    };

    if (userId) {
      fetchUser();
      fetchTargets();
    }
  }, [userId, selectedMonth, selectedYear, loader]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const response = await fetch("/api/targets1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        ...formData,
      }),
    });

    if (response.ok) {
      const newTarget = await response.json();
      setTargets([...targets, newTarget]);
      setFormData({
        ...formData,
        target: "",
        achievement: "",
      });
    }
    setLoader(false);
  };

  if (!user) return <div className="text-red-500">Loading...</div>;

  const currentMonthTarget = targets.find(
    (t) =>
      t.month == new Date().getMonth() + 1 && t.year == new Date().getFullYear()
  );

  const chartData = currentMonthTarget
    ? [
        { name: "Achieved", value: parseInt(currentMonthTarget.achievement) },
        {
          name: "Remaining",
          value:
            parseInt(currentMonthTarget.target) -
            parseInt(currentMonthTarget.achievement),
        },
      ]
    : [];

  const chartOptions = {
    labels: ["Achieved", "Remaining"],
    colors: ["green", "red"],
  };
  console.log("targets", targets);
  const barChartData = {
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "15%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      xaxis: {
        categories: allTargets.map((target) =>
          new Date(target.year, target.month - 1, 1).toLocaleString("default", {
            month: "short",
            year: "numeric",
          })
        ),
      },
      yaxis: {
        title: {
          text: "Amount",
        },
      },
      fill: {
        opacity: 1,
      },
      colors: ["red", "green"],
      legend: {
        position: "top",
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
    series: [
      {
        name: "Target",
        data: allTargets.map((target) => target.target),
      },
      {
        name: "Achievement",
        data: allTargets.map((target) => target.achievement),
      },
    ],
  };
  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-6">{user.name} Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Set Target & Achievement
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">Month</label>
                <select
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.month}
                  onChange={(e) =>
                    setFormData({ ...formData, month: e.target.value })
                  }
                  required
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {new Date(2000, month - 1, 1).toLocaleString("default", {
                        month: "long",
                      })}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Year</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Target</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-lg"
                value={formData.target}
                onChange={(e) =>
                  setFormData({ ...formData, target: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Achievement</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-lg"
                value={formData.achievement}
                onChange={(e) =>
                  setFormData({ ...formData, achievement: e.target.value })
                }
                required
              />
            </div>
            {loader ? (
              <h1>Loading...</h1>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            )}
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Current Month Performance
          </h2>
          {currentMonthTarget ? (
            <>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-gray-600">Target</h3>
                  <p className="text-2xl font-bold">
                    {currentMonthTarget.target}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-gray-600">Achievement</h3>
                  <p className="text-2xl font-bold">
                    {currentMonthTarget.achievement}
                  </p>
                </div>
              </div>
              <div className="h-64">
                <PieChart
                  options={chartOptions}
                  series={chartData.map((d) => d.value)}
                  type="pie"
                  height="100%"
                />
              </div>
            </>
          ) : (
            <p>No data available for current month</p>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">View Previous Months</h2>
        {/* <div className="flex gap-4 mb-6">
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
        </div> */}

        {allTargets.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-6 text-sm font-semibold text-left">
                    Month
                  </th>
                  <th className="py-3 px-6 text-sm font-semibold text-left">
                    Target
                  </th>
                  <th className="py-3 px-6 text-sm font-semibold text-left">
                    Achievement
                  </th>
                  <th className="py-3 px-6 text-sm font-semibold text-left">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allTargets.map((target, i) => {
                  const percentage = Math.round(
                    (target.achievement / target.target) * 100
                  );
                  return (
                    <tr
                      key={i}
                      className="hover:bg-gray-50 transition duration-200"
                    >
                      <td className="py-3 px-6 whitespace-nowrap text-sm text-gray-800">
                        {new Date(
                          target.year,
                          target.month - 1,
                          1
                        ).toLocaleString("default", {
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3 px-6 text-sm text-gray-700">
                        {target.target}
                      </td>
                      <td className="py-3 px-6 text-sm text-gray-700">
                        {target.achievement}
                      </td>
                      <td
                        className={`py-3 px-6 text-sm font-medium ${
                          percentage >= 100
                            ? "text-green-600"
                            : percentage >= 70
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {percentage}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">
                Performance Over Time
              </h3>
              {allTargets.length > 0 ? (
                <div className="h-80">
                  <BarChart
                    options={barChartData.options}
                    series={barChartData.series}
                    type="bar"
                    height="100%"
                  />
                </div>
              ) : (
                <p className="text-gray-500">
                  No data available for visualization
                </p>
              )}
            </div>{" "}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            No data available for selected period
          </p>
        )}
      </div>
    </div>
  );
}
