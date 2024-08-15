import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const GraphLine = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
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
        <Line type="monotone" dataKey="avgTemp" stroke="#8884d8" activeDot={{ r: 8 }} name="Average Temperature" strokeWidth={4}/>
        <Line type="monotone" dataKey="minTemp" stroke="#82ca9d" name="Min Temperature" />
        <Line type="monotone" dataKey="maxTemp" stroke="#ffc658" name="Max Temperature" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GraphLine;
