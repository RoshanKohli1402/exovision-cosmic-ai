export interface LightCurveData {
  time: number;
  flux: number;
  transit?: boolean;
}

/**
 * AI MODEL: Heuristic-Based Transit Detection
 */
export const runHeuristicModel = (data: LightCurveData[]) => {
  // --- Model Parameters ---
  const TRANSIT_THRESHOLD = 0.998;
  const MIN_TRANSIT_DURATION_POINTS = 3;
  const MAX_TRANSIT_DURATION_POINTS = 50; // Increased to handle wider V-shape dips
  const PERIODICITY_TOLERANCE = 0.1;

  // --- 1. Identify Transit Events ---
  const potentialTransits: { startTime: number; endTime: number; depth: number; points: number, fluxData: number[] }[] = [];
  let currentTransit: LightCurveData[] = [];

  for (const point of data) {
    if (point.flux < TRANSIT_THRESHOLD) {
      currentTransit.push(point);
    } else {
      if (currentTransit.length >= MIN_TRANSIT_DURATION_POINTS) {
        potentialTransits.push({
          startTime: currentTransit[0].time,
          endTime: currentTransit[currentTransit.length - 1].time,
          depth: 1 - Math.min(...currentTransit.map(p => p.flux)),
          points: currentTransit.length,
          fluxData: currentTransit.map(p => p.flux)
        });
      }
      currentTransit = [];
    }
  }
   if (currentTransit.length >= MIN_TRANSIT_DURATION_POINTS) {
     potentialTransits.push({
          startTime: currentTransit[0].time,
          endTime: currentTransit[currentTransit.length - 1].time,
          depth: 1 - Math.min(...currentTransit.map(p => p.flux)),
          points: currentTransit.length,
          fluxData: currentTransit.map(p => p.flux)
        });
  }

  // --- 2. Filter out unlikely events ---
  const validTransits = potentialTransits.filter(t => {
      const isTooLong = t.points > MAX_TRANSIT_DURATION_POINTS;
      // V-shape check for eclipsing binaries
      const midPoint = t.fluxData[Math.floor(t.fluxData.length / 2)];
      const startPoint = t.fluxData[0];
      const isVShape = midPoint < startPoint - 0.01; // If the middle is significantly deeper
      return !isTooLong && !isVShape;
  });


  if (validTransits.length < 2) {
    return { exoplanetDetected: false, confidence: 0.15 + (Math.random() * 0.1), transitDepth: 0, period: 0, processedData: data, foldedData: [] };
  }

  // --- 3. Check for Periodicity ---
  const periods: number[] = [];
  for (let i = 1; i < validTransits.length; i++) {
    periods.push(validTransits[i].startTime - validTransits[i - 1].startTime);
  }
  const avgPeriod = periods.reduce((a, b) => a + b, 0) / periods.length;
  
  const consistentPeriods = periods.filter(p => Math.abs(p - avgPeriod) / avgPeriod < PERIODICITY_TOLERANCE);
  
  // --- 4. Calculate Confidence Score ---
  const periodicityScore = consistentPeriods.length / (validTransits.length - 1);
  const transitCountScore = Math.min(validTransits.length / 5, 1);
  let confidence = (periodicityScore * 0.7) + (transitCountScore * 0.3);
  const exoplanetDetected = confidence > 0.65;
  if (!exoplanetDetected) {
      confidence = Math.min(confidence, 0.45);
  }

  // --- 5. Final Metrics & Data for Visualization ---
  const avgTransitDepth = validTransits.reduce((acc, t) => acc + t.depth, 0) / validTransits.length;
  const dataWithTransits = data.map(point => ({...point, transit: validTransits.some(t => point.time >= t.startTime && point.time <= t.endTime)}));

  const foldedData: LightCurveData[] = [];
  if (exoplanetDetected && avgPeriod > 0) {
      const t0 = validTransits[0].startTime;
      for (const point of data) {
          let phase = ((point.time - t0) % avgPeriod) / avgPeriod;
          if (phase > 0.5) phase -= 1;
          foldedData.push({ time: phase * avgPeriod, flux: point.flux });
      }
      foldedData.sort((a, b) => a.time - b.time);
  }

  return {
    exoplanetDetected,
    confidence: parseFloat(confidence.toFixed(2)),
    transitDepth: parseFloat((avgTransitDepth * 100).toFixed(4)),
    period: parseFloat(avgPeriod.toFixed(2)),
    processedData: dataWithTransits,
    foldedData,
  };
};

// --- Helper functions ---
export const parseCSVData = (csvContent: string): LightCurveData[] => {
  const lines = csvContent.split('\n').filter(line => line.trim() !== '');
  const data: LightCurveData[] = [];
  const startIndex = lines[0].toLowerCase().includes('time') ? 1 : 0;
  
  for (let i = startIndex; i < lines.length; i++) {
    const values = lines[i].split(/[,\s]+/).map(v => v.trim());
    if (values.length >= 2) {
      const time = parseFloat(values[0]);
      const flux = parseFloat(values[1]);
      if (!isNaN(time) && !isNaN(flux)) { data.push({ time, flux }); }
    }
  }
  return data;
};

export const generateSampleData = (type: 'confirmed-planet' | 'noise' | 'eclipsing-binary' | 'weak-signal'): LightCurveData[] => {
  const data: LightCurveData[] = [];
  const points = 2000;
  let duration = 30;

  for (let i = 0; i < points; i++) {
    const time = (i / points) * duration;
    let flux = 1.0 + (Math.random() - 0.5) * 0.002; // Base noise

    switch(type) {
      case 'confirmed-planet': {
        const period = 3.2, transitWidth = 0.1, transitDepth = 0.015;
        const timeInPeriod = time % period;
        if (timeInPeriod < transitWidth || timeInPeriod > period - transitWidth) { flux -= transitDepth; }
        break;
      }
      case 'eclipsing-binary': {
        const period = 4.5, transitWidth = 0.2, transitDepth = 0.05;
        const timeInPeriod = time % period;
        if (timeInPeriod < transitWidth || timeInPeriod > period - transitWidth) {
          // Creates a V-shape, unlike a flat-bottomed planet transit
          const dipCenter = transitWidth / 2;
          const distanceFromCenter = Math.abs(timeInPeriod - dipCenter);
          flux -= transitDepth * (1 - (distanceFromCenter / dipCenter));
        }
        break;
      }
      case 'weak-signal': {
        const period = 2.8, transitWidth = 0.08, transitDepth = 0.003; // Very small depth
        const timeInPeriod = time % period;
        if (timeInPeriod < transitWidth || timeInPeriod > period - transitWidth) { flux -= transitDepth; }
        break;
      }
      case 'noise':
      default:
        // Just noise, do nothing else
        break;
    }
    
    data.push({ time, flux });
  }
  return data;
};

export const readFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => reject(new Error('File reading error'));
    reader.readAsText(file);
  });
};