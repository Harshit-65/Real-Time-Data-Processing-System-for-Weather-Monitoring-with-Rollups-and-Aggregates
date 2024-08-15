import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Custom tooltip component
const CustomTooltip = ({ payload, label, active }) => {
  if (active && payload && payload.length) {
    const { avg_temp, min_temp, max_temp, dominant_condition } =
      payload[0].payload;

    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <p>{`Date: ${label}`}</p>
        <p>{`Average Temperature: ${avg_temp}°C`}</p>
        <p>{`Min Temperature: ${min_temp}°C`}</p>
        <p>{`Max Temperature: ${max_temp}°C`}</p>
        <p>{`Dominant Condition: ${dominant_condition}`}</p>
      </div>
    );
  }

  return null;
};

const GraphLine = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />

        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="avg_temp"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          name="Average Temperature"
          strokeWidth={4}
        />
        <Line
          type="monotone"
          dataKey="min_temp"
          stroke="#82ca9d"
          name="Min Temperature"
        />
        <Line
          type="monotone"
          dataKey="max_temp"
          stroke="#ffc658"
          name="Max Temperature"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GraphLine;
