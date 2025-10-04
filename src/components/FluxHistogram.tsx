// src/components/FluxHistogram.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LightCurveData } from '@/utils/fileProcessor';

interface FluxHistogramProps {
  data: LightCurveData[]; // All light curve data
}

const FluxHistogram: React.FC<FluxHistogramProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-muted-foreground text-center">No data for histogram.</p>;
  }

  // Create histogram bins
  const fluxValues = data.map(p => p.flux);
  const minFlux = Math.min(...fluxValues);
  const maxFlux = Math.max(...fluxValues);
  const numBins = 20;
  const binWidth = (maxFlux - minFlux) / numBins;

  const bins = Array.from({ length: numBins }, (_, i) => ({
    range: minFlux + i * binWidth,
    count: 0,
  }));

  fluxValues.forEach(flux => {
    const binIndex = Math.floor((flux - minFlux) / binWidth);
    if (binIndex >= 0 && binIndex < numBins) {
      bins[binIndex].count++;
    } else if (binIndex === numBins && flux === maxFlux) { // Include max value in last bin
        bins[numBins - 1].count++;
    }
  });

  const histogramData = bins.map(bin => ({
    flux: bin.range.toFixed(4),
    count: bin.count,
  }));

  return (
    <div>
        <h3 className="font-heading text-lg font-bold text-foreground mb-2 text-center">Flux Distribution</h3>
        <p className="text-center text-sm text-muted-foreground mb-4">Distribution of light curve brightness values.</p>
        <div className="h-48 p-4 bg-card/30 backdrop-blur-sm rounded-lg border border-border">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={histogramData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="flux" stroke="hsl(var(--muted-foreground))" fontSize={12} interval="preserveStartEnd" ticks={histogramData.filter((_, i) => i % 5 === 0).map(d => d.flux)} label={{ value: "Normalized Flux", position: 'insideBottom', offset: -5 }}/>
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} label={{ value: "Count", angle: -90, position: 'insideLeft' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                    <Bar dataKey="count" fill="hsl(var(--primary))" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
};

export default FluxHistogram;