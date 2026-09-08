import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#2A080B] border border-brand-gold/40 p-3 rounded-lg shadow-xl text-center">
        <p className="text-brand-cream/80 text-xs font-sans mb-1">{label}</p>
        <p className="font-cormorant text-xl font-bold text-brand-goldLight">₹{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function GoldRateChart({ data, lineColor = "#F4D068" }) {
  // calculate dynamic domain so the graph has good vertical spread
  const min = Math.min(...data.map(d => d.rate));
  const max = Math.max(...data.map(d => d.rate));
  const padding = (max - min) * 0.1 || min * 0.01; 

  return (
    <div className="w-full h-[250px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#D4AF37" opacity={0.15} vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="#F5ECE0" 
            opacity={0.5} 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            dy={10}
          />
          <YAxis 
            stroke="#F5ECE0" 
            opacity={0.5} 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `₹${value}`}
            domain={[Math.floor(min - padding), Math.ceil(max + padding)]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="rate" 
            stroke={lineColor} 
            strokeWidth={3}
            dot={{ r: 4, fill: '#800000', stroke: lineColor, strokeWidth: 2 }}
            activeDot={{ r: 6, fill: lineColor, stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
