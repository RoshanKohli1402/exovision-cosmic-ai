// src/components/AnalysisVisuals.tsx
import React from 'react';
import LightCurveChart from './LightCurveChart'; // For folded data
import TransitShapeChart from './TransitShapeChart'; // New component
import FluxHistogram from './FluxHistogram'; // New component
import { BarChart, Gauge } from 'lucide-react'; // Icons for stellar activity

interface AnalysisVisualsProps {
  results: {
    exoplanetDetected: boolean;
    confidence: number;
    transitDepth: number;
    period: number;
    classification: string;
    message: string;
    processedData: any[]; // The full light curve with transit highlights
    foldedData: any[]; // The phase-folded light curve
  };
}


const AnalysisVisuals: React.FC<AnalysisVisualsProps> = ({ results }) => {
  if (!results) {
    return <div className="text-center text-muted-foreground">No analysis results to display.</div>;
  }

  // Simulate a simplified average transit profile for TransitShapeChart
  // In a real scenario, you'd calculate this by averaging all detected transits
  const getAverageTransitProfile = (foldedData: any[], period: number) => {
    if (!foldedData || foldedData.length === 0 || period === 0) return [];

    // Simple approach: Take a window around the minimum flux in the folded data
    const sortedFolded = [...foldedData].sort((a,b) => a.time - b.time);
    const minFluxPoint = sortedFolded.reduce((min, p) => (p.flux < min.flux ? p : min), sortedFolded[0]);
    const minFluxTime = minFluxPoint.time;

    // Define a window around the transit, e.g., +/- 0.1 of the period
    const transitWindowSize = 0.2 * period;
    const transitStartTime = minFluxTime - transitWindowSize / 2;
    const transitEndTime = minFluxTime + transitWindowSize / 2;

    return sortedFolded.filter(p => p.time >= transitStartTime && p.time <= transitEndTime);
  };

  const averageTransitProfile = getAverageTransitProfile(results.foldedData, results.period);

  // Calculate stellar activity score (simple heuristic: standard deviation of flux)
  const calculateStellarActivity = (data: any[]) => {
      if (!data || data.length === 0) return 0;
      const fluxes = data.map((d: any) => d.flux);
      const mean = fluxes.reduce((sum: number, f: number) => sum + f, 0) / fluxes.length;
      const variance = fluxes.reduce((sum: number, f: number) => sum + (f - mean) ** 2, 0) / fluxes.length;
      const stdDev = Math.sqrt(variance);
      // Scale stdDev to a 0-100 score (e.g., 0.0005 stdDev = 50, 0.001 = 100)
      return Math.min(Math.round(stdDev * 100000 / 10), 100); // Max 100 for 0.001 std dev
  }
  const stellarActivityScore = calculateStellarActivity(results.processedData);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
      {/* 1. Key Metrics Card */}
      <div className="lg:col-span-1 bg-card/30 backdrop-blur-sm rounded-lg border border-border p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-heading text-lg font-bold text-foreground mb-4">Key Metrics</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Detection Confidence:</span>
              <span className="font-medium text-foreground">{results.confidence * 100}%</span>
            </div>
            {results.period > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Orbital Period:</span>
                <span className="font-medium text-foreground">{results.period.toFixed(2)} days</span>
              </div>
            )}
            {results.transitDepth > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transit Depth:</span>
                <span className="font-medium text-foreground">{results.transitDepth.toFixed(4)}%</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2">
                <span className="text-muted-foreground flex items-center gap-2"><Gauge className="w-4 h-4" />Stellar Activity Index:</span>
                <span className="font-medium text-foreground text-lg">{stellarActivityScore}/100</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
            *This is a heuristic analysis and does not constitute scientific confirmation.
        </p>
      </div>

      {/* 2. Folded Light Curve Chart */}
      {results.foldedData && results.foldedData.length > 0 && (
        <div className="lg:col-span-3">
          <h3 className="font-heading text-lg font-bold text-foreground mb-2 text-center">Phase-Folded Light Curve</h3>
          <p className="text-center text-sm text-muted-foreground mb-4">Light curve "folded" by the detected period to reveal repeating transits.</p>
          <div className="h-96 p-4 bg-card/30 backdrop-blur-sm rounded-lg border border-border p-6">
              <LightCurveChart 
                  data={results.foldedData} 
                  showTooltip={true} // Enable tooltip for folded chart
                  hideXAxisLabel={false}
                  xAxisLabel="Orbital Phase (Normalized Time)"
                  yAxisLabel="Normalized Flux"
                  showTransits={false} // Transits are implicitly shown by folding
                  lineColor="hsl(var(--primary))"
              />
          </div>
        </div>
      )}

      {/* 3. Transit Shape Analysis */}
      {results.exoplanetDetected && averageTransitProfile.length > 0 && (
        <div className="lg:col-span-1 h-full">
            <TransitShapeChart data={averageTransitProfile} period={results.period} />
        </div>
      )}

      {/* 4. Flux Histogram */}
      {results.processedData && results.processedData.length > 0 && (
        <div className="lg:col-span-1 h-full">
            <FluxHistogram data={results.processedData} />
        </div>
      )}

      {/* Placeholder for future XAI (Explainable AI) or other advanced visuals */}
      <div className="lg:col-span-1 bg-card/30 backdrop-blur-sm rounded-lg border border-border p-6 flex flex-col items-center justify-center text-center text-muted-foreground">
        <BarChart className="w-12 h-12 mb-3" />
        <p className="font-heading font-bold mb-2">Advanced Visuals Coming Soon!</p>
        <p className="text-sm">This space will feature Explainable AI (XAI) insights and model confidence maps once the full ML model is integrated.</p>
      </div>

    </div>
  );
};

export default AnalysisVisuals;