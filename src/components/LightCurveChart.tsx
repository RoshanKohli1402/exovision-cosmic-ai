// src/components/LightCurveChart.tsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea
} from 'recharts';
import { LightCurveData } from '@/utils/fileProcessor';

interface LightCurveChartProps {
  data: LightCurveData[];
  onExport?: () => void; // Optional export handler
  showTooltip?: boolean; // New prop
  hideXAxisLabel?: boolean; // New prop
  xAxisLabel?: string; // New prop
  yAxisLabel?: string; // New prop
  showTransits?: boolean; // New prop to control transit highlighting
  lineColor?: string; // New prop to control line color
}

const LightCurveChart: React.FC<LightCurveChartProps> = ({
  data,
  onExport,
  showTooltip = true, // Default to true
  hideXAxisLabel = false, // Default to false
  xAxisLabel = "Time (days)", // Default label
  yAxisLabel = "Normalized Flux", // Default label
  showTransits = true, // Default to true
  lineColor = "hsl(var(--primary))" // Default line color
}) => {
  const transitAreas: { x1: number; x2: number }[] = [];
  if (showTransits) {
    let inTransit = false;
    let currentTransitStart = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].transit && !inTransit) {
        currentTransitStart = data[i].time;
        inTransit = true;
      } else if (!data[i].transit && inTransit) {
        transitAreas.push({ x1: currentTransitStart, x2: data[i].time });
        inTransit = false;
      }
    }
    // Handle transit at the very end of the data
    if (inTransit && data.length > 0) {
      transitAreas.push({ x1: currentTransitStart, x2: data[data.length - 1].time });
    }
  }

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis
            dataKey="time"
            type="number"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => value.toFixed(2)}
            hide={hideXAxisLabel}
            label={{ value: xAxisLabel, position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => value.toFixed(4)}
            label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }}
            domain={['dataMin', 'dataMax']}
          />
          {showTooltip && (
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
              formatter={(value: number) => value.toFixed(4)}
              labelFormatter={(label: number) => `Time: ${label.toFixed(2)}`}
            />
          )}
          <Line type="monotone" dataKey="flux" stroke={lineColor} strokeWidth={1} dot={false} />
          {transitAreas.map((area, index) => (
            <ReferenceArea
              key={index}
              x1={area.x1}
              x2={area.x2}
              stroke="hsl(var(--primary))"
              strokeOpacity={0.1}
              fill="hsl(var(--primary))"
              fillOpacity={0.1}
              ifOverflow="hidden"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LightCurveChart;