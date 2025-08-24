
import React from 'react';
import type { TimeSeriesData } from '../types';
import { Sentiment } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LIGHT_THEME_CHART_COLORS, DARK_THEME_CHART_COLORS } from '../constants';

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
  theme: 'light' | 'dark';
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data, theme }) => {
    const COLORS = theme === 'light' ? LIGHT_THEME_CHART_COLORS : DARK_THEME_CHART_COLORS;
    const tickColor = theme === 'light' ? '#6b7280' : '#9ca3af';

  return (
    <div className="p-4 h-80 bg-white dark:bg-gray-800/50 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Sentiment Over Time</h3>
       {data.length > 1 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#e5e7eb' : '#374151'} />
            <XAxis dataKey="time" tick={{ fill: tickColor, fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fill: tickColor, fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'light' ? '#ffffff' : '#1f2937',
                borderColor: theme === 'light' ? '#e5e7eb' : '#4b5563',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey={Sentiment.POSITIVE} stroke={COLORS[Sentiment.POSITIVE]} strokeWidth={2} dot={false}/>
            <Line type="monotone" dataKey={Sentiment.NEGATIVE} stroke={COLORS[Sentiment.NEGATIVE]} strokeWidth={2} dot={false}/>
            <Line type="monotone" dataKey={Sentiment.NEUTRAL} stroke={COLORS[Sentiment.NEUTRAL]} strokeWidth={2} dot={false}/>
          </LineChart>
        </ResponsiveContainer>
      ) : (
         <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
          <p>Waiting for more data points to show trend...</p>
        </div>
      )}
    </div>
  );
};

export default TimeSeriesChart;
