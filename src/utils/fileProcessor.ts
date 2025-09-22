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
  const MAX_TRANSIT_DURATION_POINTS = 50;
  const PERIODICITY_TOLERANCE = 0.1;

  // --- 1. Identify Transit Events ---
  const potentialTransits: { startTime: number; endTime: number; depth: number; points: number }[] = [];
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
        });
  }

  // --- 2. Filter out unlikely events ---
  const validTransits = potentialTransits.filter(t => t.points <= MAX_TRANSIT_DURATION_POINTS);

  if (validTransits.length < 2) {
    return { exoplanetDetected: false, confidence: 0.15, transitDepth: 0, period: 0, processedData: data, foldedData: [] };
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
  let confidence = (periodicityScore * 0.6) + (transitCountScore * 0.4);
  const exoplanetDetected = confidence > 0.65;
  if (!exoplanetDetected) {
      confidence = Math.min(confidence, 0.45);
  }

  // --- 5. Final Metrics & Data for Visualization ---
  const avgTransitDepth = validTransits.reduce((acc, t) => acc + t.depth, 0) / validTransits.length;
  const dataWithTransits = data.map(point => ({...point, transit: validTransits.some(t => point.time >= t.startTime && point.time <= t.endTime)}));

  // *** NEW: Calculate Folded Data ***
  const foldedData: LightCurveData[] = [];
  if (exoplanetDetected && avgPeriod > 0) {
      const t0 = validTransits[0].startTime; // Epoch
      for (const point of data) {
          // Calculate phase and center it around 0
          let phase = ((point.time - t0) % avgPeriod) / avgPeriod;
          if (phase > 0.5) phase -= 1;
          
          foldedData.push({
              time: phase * avgPeriod, // time axis is now centered on the transit
              flux: point.flux
          });
      }
      // Sort by phase for a clean plot
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
    const values = lines[i].split(/[,\s]+/).map(v => v.trim()); // Handle comma or space separated
    if (values.length >= 2) {
      const time = parseFloat(values[0]);
      const flux = parseFloat(values[1]);
      if (!isNaN(time) && !isNaN(flux)) {
        data.push({ time, flux });
      }
    }
  }
  return data;
};

export const generateSampleData = (type: 'kepler' | 'tess'): LightCurveData[] => {
  const data: LightCurveData[] = [];
  const isPlanet = type === 'kepler';
  const duration = isPlanet ? 90 : 27;
  const points = 2000;
  
  const period = 3.2;
  const transitWidth = 0.1;
  const transitDepth = 0.015;

  for (let i = 0; i < points; i++) {
    const time = (i / points) * duration;
    let flux = 1.0 + (Math.random() - 0.5) * 0.002;

    if (isPlanet) {
        const timeInPeriod = time % period;
        if (timeInPeriod < transitWidth || timeInPeriod > period - transitWidth) {
            flux -= transitDepth;
        }
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