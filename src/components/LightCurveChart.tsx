import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Download, ZoomIn, ZoomOut } from 'lucide-react';
import CosmicButton from './CosmicButton';

interface LightCurveData {
  time: number;
  flux: number;
  transit?: boolean;
}

interface LightCurveChartProps {
  data: LightCurveData[];
  title?: string;
  onExport?: () => void;
}

const LightCurveChart: React.FC<LightCurveChartProps> = ({ data, title = "Light Curve Analysis", onExport }) => {
  const formatTooltip = (value: any, name: string) => {
    if (name === 'flux') return [`${Number(value).toFixed(6)}`, 'Normalized Flux'];
    return [value, name];
  };

  const formatLabel = (value: number) => `Time: ${value.toFixed(4)} days`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-xl font-bold text-foreground">{title}</h3>
        <div className="flex space-x-2">
          {onExport && (
            <CosmicButton variant="outline" size="sm" onClick={onExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </CosmicButton>
          )}
        </div>
      </div>
      
      <div className="h-96 p-4 bg-card/30 backdrop-blur-sm rounded-lg border border-border">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => value.toFixed(2)}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => value.toFixed(4)}
              label={{ value: 'Normalized Flux', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
            />
            <Tooltip 
              formatter={formatTooltip}
              labelFormatter={formatLabel}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--foreground))'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="flux" 
              stroke="hsl(var(--primary))" 
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 4, stroke: 'hsl(var(--primary))', fill: 'hsl(var(--primary))' }}
            />
            {/* Add reference lines for detected transits */}
            {data.some(d => d.transit) && (
              <ReferenceLine 
                y={0.99} 
                stroke="hsl(var(--destructive))" 
                strokeDasharray="5 5" 
                label={{ value: "Transit Threshold", position: "top" }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-card/20 rounded-lg">
          <p className="text-sm text-muted-foreground">Data Points</p>
          <p className="font-bold text-primary">{data.length}</p>
        </div>
        <div className="p-3 bg-card/20 rounded-lg">
          <p className="text-sm text-muted-foreground">Duration</p>
          <p className="font-bold text-primary">{(Math.max(...data.map(d => d.time)) - Math.min(...data.map(d => d.time))).toFixed(2)} days</p>
        </div>
        <div className="p-3 bg-card/20 rounded-lg">
          <p className="text-sm text-muted-foreground">Transits</p>
          <p className="font-bold text-primary">{data.filter(d => d.transit).length}</p>
        </div>
      </div>
    </div>
  );
};

export default LightCurveChart;