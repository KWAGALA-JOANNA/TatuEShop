/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from "react";
import { Analytics, AnalyticsDataSource } from "../api/analytics";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AnalyticsComponent = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState("monthly");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-03-13");

  const dataSource = new AnalyticsDataSource("https://api.example.com");
  const analyticsInstance = new Analytics(dataSource);

  const fetchAnalyticsData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await analyticsInstance.fetchData(startDate, endDate);
      setAnalytics(data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch analytics data.");
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate, analyticsInstance]); // Include dependencies here

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange, startDate, endDate, fetchAnalyticsData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      <div className="flex items-center gap-4 mb-6">
        <select
          value={timeRange}
          onChange={(e) => {
            analyticsInstance.setTimeRange(e.target.value);
            setTimeRange(e.target.value);
          }}
          className="border p-2 rounded"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          onClick={fetchAnalyticsData}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 bg-white shadow rounded-xl">
          <h2 className="text-xl font-bold mb-2">Revenue Over Time</h2>
          <LineChart width={500} height={300} data={analytics?.timeSeries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            <Line type="monotone" dataKey="orders" stroke="#82ca9d" />
          </LineChart>
        </div>

        <div className="p-4 bg-white shadow rounded-xl">
          <h2 className="text-xl font-bold mb-2">Category Breakdown</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={analytics?.categories}
              dataKey="revenue"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {analytics?.categories?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`hsl(${index * 50}, 70%, 50%)`}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsComponent;
