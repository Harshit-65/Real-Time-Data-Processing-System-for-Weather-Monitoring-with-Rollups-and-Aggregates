import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const GraphBar = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="avgTemp" fill="#8884d8" name="Average Temperature" />
        <Bar dataKey="minTemp" fill="#82ca9d" name="Min Temperature" />
        <Bar dataKey="maxTemp" fill="#ffc658" name="Max Temperature" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GraphBar;
