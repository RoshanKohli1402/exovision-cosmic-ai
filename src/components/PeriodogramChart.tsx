import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';


interface PeriodogramChartProps {
  detectedPeriod: number;
}

// Simulate periodogram data for the multi-planet sample
const simulatedPeriodogramData = [
  { period: 1.0, power: 0.1 },
  { period: 2.5, power: 0.2 },
  { period: 3.8, power: 0.85 }, // Peak for planet 1
  { period: 5.0, power: 0.3 },
  { period: 7.1, power: 1.0 },  // Strongest peak for planet 2
  { period: 10.0, power: 0.15 },
].sort((a,b) => a.period - b.period);


const PeriodogramChart: React.FC<PeriodogramChartProps> = ({ detectedPeriod }) => {
  return (
    <div>
        <h3 className="font-heading text-lg font-bold text-foreground mb-2 text-center">Signal Periodogram</h3>
        <p className="text-center text-sm text-muted-foreground mb-4">Shows the strength of repeating signals at different periods.</p>
        <div className="h-64 p-4 bg-card/30 backdrop-blur-sm rounded-lg border border-border">
            <ResponsiveContainer width="100%" height="100%">
            <LineChart data={simulatedPeriodogramData} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="period" type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} label={{ value: "Period (days)", position: 'insideBottom', offset: -10 }}/>
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} label={{ value: "Signal Power", angle: -90, position: 'insideLeft' }}/>
                <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} 
                    formatter={(value: number) => [`${value.toFixed(2)}`, "Power"]} 
                    labelFormatter={(label: number) => `Period: ${label.toFixed(2)} days`}
                />
                <Line type="monotone" dataKey="power" stroke="hsl(var(--secondary))" strokeWidth={2} dot={{ r: 4 }} />
                <ReferenceLine x={detectedPeriod} stroke="hsl(var(--primary))" strokeDasharray="3 3" label={{ value: 'Detected Signal', fill: 'hsl(var(--primary-foreground))' }} />
            </LineChart>
            </ResponsiveContainer>
        </div>
         <p className="text-center text-xs text-muted-foreground mt-2">
            The dotted line shows the strongest period your AI found. Other peaks may indicate more planets!
        </p>
    </div>
  );
};

export default PeriodogramChart;