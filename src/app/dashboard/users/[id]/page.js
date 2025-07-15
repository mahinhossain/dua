'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import the chart to avoid SSR issues
const PieChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function UserDetail({ params }) {
  const [user, setUser] = useState(null);
  const [targets, setTargets] = useState([]);
  const [formData, setFormData] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    target: '',
    achievement: ''
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`/api/users/${params.id}`);
      const data = await res.json();
      setUser(data);
    };

    const fetchTargets = async () => {
      const res = await fetch(`/api/targets?userId=${params.id}&month=${selectedMonth}&year=${selectedYear}`);
      const data = await res.json();
      setTargets(data);
    };

    fetchUser();
    fetchTargets();
  }, [params.id, selectedMonth, selectedYear]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/targets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: params.id,
        ...formData
      }),
    });
    
    if (response.ok) {
      const newTarget = await response.json();
      setTargets([...targets, newTarget]);
      setFormData({
        ...formData,
        target: '',
        achievement: ''
      });
    }
  };

  if (!user) return <div>Loading...</div>;

  const currentMonthTarget = targets.find(t => 
    t.month == new Date().getMonth() + 1 && 
    t.year == new Date().getFullYear()
  );

  const chartData = currentMonthTarget ? [
    { name: 'Achieved', value: parseInt(currentMonthTarget.achievement) },
    { name: 'Remaining', value: parseInt(currentMonthTarget.target) - parseInt(currentMonthTarget.achievement) }
  ] : [];

  const chartOptions = {
    labels: ['Achieved', 'Remaining'],
    colors: ['#4CAF50', '#F44336'],
  };

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-6">{user.name}'s Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Set Target & Achievement</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">Month</label>
                <select
                  className="w-full px-3 py-2 border rounded-lg"
                  value={formData.month}
                  onChange={(e) => setFormData({...formData, month: e.target.value})}
                  required
                >
                  {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                    <option key={month} value={month}>
                      {new Date(2000, month - 1, 1).toLocaleString('default', {month: 'long'})}
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
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
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
                onChange={(e) => setFormData({...formData, target: e.target.value})}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Achievement</label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-lg"
                value={formData.achievement}
                onChange={(e) => setFormData({...formData, achievement: e.target.value})}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Current Month Performance</h2>
          {currentMonthTarget ? (
            <>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-gray-600">Target</h3>
                  <p className="text-2xl font-bold">{currentMonthTarget.target}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-gray-600">Achievement</h3>
                  <p className="text-2xl font-bold">{currentMonthTarget.achievement}</p>
                </div>
              </div>
              <div className="h-64">
                <PieChart
                  options={chartOptions}
                  series={chartData.map(d => d.value)}
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
        <div className="flex gap-4 mb-6">
          <select
            className="px-3 py-2 border rounded-lg"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {Array.from({length: 12}, (_, i) => i + 1).map(month => (
              <option key={month} value={month}>
                {new Date(2000, month - 1, 1).toLocaleString('default', {month: 'long'})}
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
        
        {targets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Month</th>
                  <th className="py-2 px-4 border-b">Target</th>
                  <th className="py-2 px-4 border-b">Achievement</th>
                  <th className="py-2 px-4 border-b">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {targets.map((target) => (
                  <tr key={target.id}>
                    <td className="py-2 px-4 border-b text-center">
                      {new Date(target.year, target.month - 1, 1).toLocaleString('default', {month: 'long', year: 'numeric'})}
                    </td>
                    <td className="py-2 px-4 border-b text-center">{target.target}</td>
                    <td className="py-2 px-4 border-b text-center">{target.achievement}</td>
                    <td className="py-2 px-4 border-b text-center">
                      {Math.round((target.achievement / target.target) * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No data available for selected period</p>
        )}
      </div>
    </div>
  );
}