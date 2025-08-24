import React, { useState } from 'react';
import type { SentimentDistribution } from '../types';
import { Sentiment } from '../types';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Sector, PieProps as RechartsPieProps } from 'recharts';
import { LIGHT_THEME_CHART_COLORS, DARK_THEME_CHART_COLORS } from '../constants';

interface SentimentChartProps {
  data: SentimentDistribution[];
  theme: 'light' | 'dark';
}

// A custom shape renderer to make the hovered slice pop out.
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius + 6}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
};

// This is a workaround for a known issue in older versions of recharts types where activeIndex is missing.
// We are extending the PieProps to include the missing property.
interface PiePropsWithActiveIndex extends RechartsPieProps {
  activeIndex?: number;
}
const TypedPie = Pie as React.ComponentType<PiePropsWithActiveIndex>;


const SentimentChart: React.FC<SentimentChartProps> = ({ data, theme }) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const COLORS = theme === 'light' ? LIGHT_THEME_CHART_COLORS : DARK_THEME_CHART_COLORS;
  const chartData = data.filter(d => d.value > 0);

  const handlePieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const handlePieLeave = () => {
    setActiveIndex(undefined);
  };

  return (
    <div className="p-4 h-80 bg-white dark:bg-gray-800/50 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Sentiment Distribution</h3>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <TypedPie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              onMouseEnter={handlePieEnter}
              onMouseLeave={handlePieLeave}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name as Sentiment]} />
              ))}
            </TypedPie>
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'light' ? '#ffffff' : '#374151',
                borderColor: theme === 'light' ? '#d1d5db' : '#4b5563',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              }}
            />
            <Legend onMouseEnter={handlePieEnter} onMouseLeave={handlePieLeave} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
          <p>No data to display. Start analysis to see results.</p>
        </div>
      )}
    </div>
  );
};

export default SentimentChart;