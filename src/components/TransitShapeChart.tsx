// src/components/TransitShapeChart.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LightCurveData } from '@/utils/fileProcessor';

interface TransitShapeChartProps {
  data: LightCurveData[]; // Expects data from a single, averaged transit
  period: number;
}

const TransitShapeChart: React.FC<TransitShapeChartProps> = ({ data, period }) => {
  if (!data || data.length === 0) {
    return <p className="text-muted-foreground text-center">No transit data to display.</p>;
  }

  // Find the minimum flux point (center of transit)
  const minFluxPoint = data.reduce((min, p) => (p.flux < min.flux ? p : min), data[0]);
  const centerTime = minFluxPoint.time;

  // Re-normalize time for a clearer phase plot centered at 0
  const normalizedData = data.map(p => ({
    time: p.time - centerTime, // Center around 0
    flux: p.flux // Use raw flux as it's already normalized by median
  }));

  return (
    <div>
        <h3 className="font-heading text-lg font-bold text-foreground mb-2 text-center">Average Transit Profile</h3>
        <p className="text-center text-sm text-muted-foreground mb-4">Averaged shape of the detected transits, centered at 0 phase.</p>
        <div className="h-48 p-4 bg-card/30 backdrop-blur-sm rounded-lg border border-border">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={normalizedData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="time" type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} label={{ value: "Phase-Shifted Time", position: 'insideBottom', offset: -5 }} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} label={{ value: "Normalized Flux", angle: -90, position: 'insideLeft' }} domain={['dataMin', 'dataMax']} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                    <Line type="monotone" dataKey="flux" stroke="hsl(var(--secondary))" strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2">
            Period: {period.toFixed(2)} days
        </p>
    </div>
  );
};

export default TransitShapeChart;