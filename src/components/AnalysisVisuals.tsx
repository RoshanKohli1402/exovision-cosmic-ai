import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { type LightCurveData } from '@/utils/fileProcessor';

interface AnalysisVisualsProps {
  results: {
    confidence: number;
    transitDepth: number;
    period: number;
    foldedData?: LightCurveData[];
  };
}

const Gauge = ({ value }: { value: number }) => {
  const percentage = Math.round(value * 100);
  const strokeDashoffset = 283 * (1 - value); // 283 is the circumference (2 * pi * 45)

  let colorClass = 'text-yellow-500';
  if (percentage > 65) colorClass = 'text-green-500';
  if (percentage < 35) colorClass = 'text-red-500';

  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-muted/20"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className={`${colorClass} transition-all duration-500 ease-in-out`}
          strokeWidth="10"
          strokeDasharray="283"
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className={`absolute inset-0 flex items-center justify-center font-heading text-3xl font-bold ${colorClass}`}>
        {percentage}%
      </div>
    </div>
  );
};

const AnalysisVisuals: React.FC<AnalysisVisualsProps> = ({ results }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 text-center">
        <div>
          <h3 className="font-heading text-lg font-bold text-foreground mb-2">Model Confidence</h3>
          <Gauge value={results.confidence} />
        </div>
        <div className="space-y-4 text-left">
          <div className="p-3 bg-black/20 rounded-lg w-full">
            <p className="font-body text-sm text-muted-foreground mb-1">Avg. Transit Depth</p>
            <p className="font-heading text-2xl font-bold text-primary">
              {results.transitDepth > 0 ? `${results.transitDepth}%` : 'N/A'}
            </p>
          </div>
          <div className="p-3 bg-black/20 rounded-lg w-full">
            <p className="font-body text-sm text-muted-foreground mb-1">Est. Orbital Period</p>
            <p className="font-heading text-2xl font-bold text-secondary">
              {results.period > 0 ? `${results.period} days` : 'N/A'}
            </p>
          </div>
        </div>
      </div>
      
      {results.foldedData && results.foldedData.length > 0 && (
        <div>
          <h3 className="font-heading text-lg font-bold text-foreground mb-2 text-center">Folded Light Curve</h3>
          <p className="text-center text-sm text-muted-foreground mb-4">All transits overlaid to show the combined signal.</p>
          <div className="h-64 p-4 bg-card/30 backdrop-blur-sm rounded-lg border border-border">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={results.foldedData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="time" type="number" domain={['dataMin', 'dataMax']} stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(val) => val.toFixed(3)} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={['dataMin - 0.001', 'dataMax + 0.001']} allowDataOverflow={true} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  labelFormatter={(value) => `Phase: ${value.toFixed(4)}`}
                />
                <Line type="monotone" dataKey="flux" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisVisuals;