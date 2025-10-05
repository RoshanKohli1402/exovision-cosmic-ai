export interface LightCurveData {
  time: number;
  flux: number;
  transit?: boolean; // For highlighting in charts
}

interface HeuristicResult {
  exoplanetDetected: boolean;
  confidence: number;
  transitDepth: number;
  period: number;
  classification: 'Exoplanet Candidate' | 'Eclipsing Binary' | 'Stellar Flare' | 'Asteroid Fly-by' | 'Noise/Other';
  message: string;
  processedData: LightCurveData[];
  foldedData: LightCurveData[];
}

// --- NEW: Define the structure for the Random Forest API response ---
export interface RandomForestPrediction {
  classification: string;
  confidence: number;
  featureImportances?: { [key: string]: number };
  predictedPeriod?: number;
  rawProbabilities?: { [key: string]: number };
  message?: string;
}

// --- THIS IS THE CRITICAL NEW FUNCTION ---
const API_URL = 'http://10.57.171.32:5000/predict'; // The IP address you provided

export const runRandomForestModel = async (data: LightCurveData[]): Promise<RandomForestPrediction> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Send the raw time and flux data to the backend
      body: JSON.stringify({
        time: data.map(d => d.time),
        flux: data.map(d => d.flux)
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `API request failed with status ${response.status}`);
    }

    const prediction: RandomForestPrediction = await response.json();
    return prediction;

  } catch (error) {
    console.error('Error running Random Forest model via API:', error);
    // Re-throw the error so the UI can catch it and display a message
    if (error instanceof TypeError) { // This often indicates a network error
        throw new Error("Network error: Could not connect to the AI backend. Is the server running and accessible?");
    }
    throw error;
  }
};


/**
 * AI MODEL: Heuristic-Based Transit Detection (Enhanced)
 */
export const runHeuristicModel = (data: LightCurveData[]): HeuristicResult => {
  // --- Model Parameters ---
  const BASELINE_FLUX_THRESHOLD = 0.998;
  const MIN_TRANSIT_DURATION_POINTS = 3;
  const MAX_TRANSIT_DURATION_POINTS = 50;
  const PERIODICITY_TOLERANCE = 0.05;
  const MIN_TRANSITS_FOR_PLANET = 2;
  const MIN_BRIGHTNESS_FOR_FLARE = 1.005;
  const MIN_FLARE_POINTS = 2;
  const V_SHAPE_THRESHOLD = 0.005;

  if (!data || data.length < 10) {
      return { exoplanetDetected: false, confidence: 0.0, transitDepth: 0, period: 0, classification: 'Noise/Other', message: "Not enough data points.", processedData: data, foldedData: [] };
  }

  const medianFlux = data.map(p => p.flux).sort()[Math.floor(data.length / 2)];
  const normalizedData = data.map(p => ({ ...p, flux: p.flux / medianFlux }));

  const potentialDips: { startTime: number; endTime: number; depth: number; points: number; fluxData: number[]; vShapeMetric?: number }[] = [];
  const potentialFlares: { startTime: number; endTime: number; peak: number; points: number }[] = [];
  let currentEvent: LightCurveData[] = [];

  for (let i = 0; i < normalizedData.length; i++) {
    const point = normalizedData[i];

    if (point.flux < BASELINE_FLUX_THRESHOLD) {
      currentEvent.push(point);
    } else if (point.flux > MIN_BRIGHTNESS_FOR_FLARE) {
        currentEvent.push(point);
    } else {
      if (currentEvent.length >= MIN_TRANSIT_DURATION_POINTS) {
        const eventFluxes = currentEvent.map(p => p.flux);
        const minFlux = Math.min(...eventFluxes);
        const maxFlux = Math.max(...eventFluxes);

        if (1 - minFlux > maxFlux - 1) {
            const startFlux = eventFluxes[0];
            const endFlux = eventFluxes[eventFluxes.length - 1];
            const avgEdgeFlux = (startFlux + endFlux) / 2;
            const vShapeMetric = avgEdgeFlux - minFlux;

            potentialDips.push({
                startTime: currentEvent[0].time,
                endTime: currentEvent[currentEvent.length - 1].time,
                depth: 1 - minFlux,
                points: currentEvent.length,
                fluxData: eventFluxes,
                vShapeMetric: vShapeMetric
            });
        } else {
             potentialFlares.push({
                startTime: currentEvent[0].time,
                endTime: currentEvent[currentEvent.length - 1].time,
                peak: maxFlux - 1,
                points: currentEvent.length
            });
        }
      }
      currentEvent = [];
    }
  }
  if (currentEvent.length >= MIN_TRANSIT_DURATION_POINTS) {
      const eventFluxes = currentEvent.map(p => p.flux);
      const minFlux = Math.min(...eventFluxes);
      const maxFlux = Math.max(...eventFluxes);
      if (1 - minFlux > maxFlux - 1) {
           const startFlux = eventFluxes[0];
            const endFlux = eventFluxes[eventFluxes.length - 1];
            const avgEdgeFlux = (startFlux + endFlux) / 2;
            const vShapeMetric = avgEdgeFlux - minFlux;
          potentialDips.push({
              startTime: currentEvent[0].time,
              endTime: currentEvent[currentEvent.length - 1].time,
              depth: 1 - minFlux,
              points: currentEvent.length,
              fluxData: eventFluxes,
              vShapeMetric: vShapeMetric
          });
      } else {
            potentialFlares.push({
                startTime: currentEvent[0].time,
                endTime: currentEvent[currentEvent.length - 1].time,
                peak: maxFlux - 1,
                points: currentEvent.length
            });
      }
  }

  const significantFlares = potentialFlares.filter(f => f.peak > 0.005 && f.points >= MIN_FLARE_POINTS);
  if (significantFlares.length >= 1) {
      return {
          exoplanetDetected: false, confidence: 0.9, transitDepth: 0, period: 0,
          classification: 'Stellar Flare', message: "Strong stellar flare activity detected.",
          processedData: normalizedData, foldedData: []
      };
  }

  const validDips = potentialDips.filter(t => t.points <= MAX_TRANSIT_DURATION_POINTS);

  if (validDips.length === 0) {
      return {
          exoplanetDetected: false, confidence: 0.1, transitDepth: 0, period: 0,
          classification: 'Noise/Other', message: "No significant dips or flares detected.",
          processedData: normalizedData, foldedData: []
      };
  }

  if (validDips.length === 1 && validDips[0].depth > 0.005) {
      return {
          exoplanetDetected: false, confidence: 0.95, transitDepth: validDips[0].depth, period: 0,
          classification: 'Asteroid Fly-by', message: "Single, non-periodic dip detected. Likely an asteroid transit or instrumental artifact.",
          processedData: normalizedData, foldedData: []
      };
  }
  
  const vShapedDips = validDips.filter(d => d.vShapeMetric && d.vShapeMetric > V_SHAPE_THRESHOLD);
  if (vShapedDips.length >= MIN_TRANSITS_FOR_PLANET) {
       const periods: number[] = [];
      for (let i = 1; i < vShapedDips.length; i++) {
        periods.push(vShapedDips[i].startTime - vShapedDips[i - 1].startTime);
      }
      const avgPeriod = periods.reduce((a, b) => a + b, 0) / periods.length;
      const consistentPeriods = periods.filter(p => Math.abs(p - avgPeriod) / avgPeriod < PERIODICITY_TOLERANCE);

      if (consistentPeriods.length >= MIN_TRANSITS_FOR_PLANET -1) {
           return {
                exoplanetDetected: false, confidence: 0.9, transitDepth: vShapedDips[0].depth, period: parseFloat(avgPeriod.toFixed(2)),
                classification: 'Eclipsing Binary', message: "Periodic, V-shaped dips detected. Consistent with an eclipsing binary.",
                processedData: normalizedData, foldedData: []
            };
      }
  }

  if (validDips.length < MIN_TRANSITS_FOR_PLANET) {
       return {
            exoplanetDetected: false, confidence: 0.2, transitDepth: 0, period: 0,
            classification: 'Noise/Other', message: "Insufficient periodic dips for exoplanet detection.",
            processedData: normalizedData, foldedData: []
        };
  }

  const periods: number[] = [];
  for (let i = 1; i < validDips.length; i++) {
    periods.push(validDips[i].startTime - validDips[i - 1].startTime);
  }
  const avgPeriod = periods.reduce((a, b) => a + b, 0) / periods.length;
  
  const consistentPeriods = periods.filter(p => Math.abs(p - avgPeriod) / avgPeriod < PERIODICITY_TOLERANCE);
  
  const periodicityScore = consistentPeriods.length / (validDips.length - 1);
  const transitCountScore = Math.min(validDips.length / 5, 1);

  let confidence = (periodicityScore * 0.7) + (transitCountScore * 0.3);
  confidence = parseFloat(Math.min(confidence, 0.99).toFixed(2));

  const exoplanetDetected = confidence > 0.65 && consistentPeriods.length >= MIN_TRANSITS_FOR_PLANET -1;

  const avgTransitDepth = validDips.reduce((acc, t) => acc + t.depth, 0) / validDips.length;

  const dataWithTransits = normalizedData.map(point => ({
      ...point,
      transit: exoplanetDetected && validDips.some(t => point.time >= t.startTime && point.time <= t.endTime)
  }));

  const foldedData: LightCurveData[] = [];
  if (exoplanetDetected && avgPeriod > 0) {
      const t0 = validDips[0].startTime;
      for (const point of dataWithTransits) {
          let phase = ((point.time - t0) % avgPeriod) / avgPeriod;
          if (phase > 0.5) phase -= 1;
          foldedData.push({ time: phase * avgPeriod, flux: point.flux });
      }
      foldedData.sort((a, b) => a.time - b.time);
  }

  return {
    exoplanetDetected,
    confidence: exoplanetDetected ? confidence : Math.max(confidence, 0.1),
    transitDepth: parseFloat((avgTransitDepth * 100).toFixed(4)),
    period: parseFloat(avgPeriod.toFixed(2)),
    classification: exoplanetDetected ? 'Exoplanet Candidate' : 'Noise/Other',
    message: exoplanetDetected ? "Periodic, flat-bottomed transits detected. High confidence for an exoplanet candidate." : "Dips detected, but lack strong periodicity or clear transit shape for exoplanet.",
    processedData: dataWithTransits,
    foldedData,
  };
};

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

export const generateSampleData = (type: 'confirmed-planet' | 'noise' | 'eclipsing-binary' | 'weak-signal' | 'asteroid' | 'stellar-flare' | 'multi-planet'): LightCurveData[] => {
  const data: LightCurveData[] = [];
  const points = 2000;
  let duration = 30;

  for (let i = 0; i < points; i++) {
    const time = (i / points) * duration;
    let flux = 1.0 + (Math.random() - 0.5) * 0.001;

    switch(type) {
      case 'confirmed-planet': {
        const period = 3.2, transitWidth = 0.1, transitDepth = 0.015;
        const timeInPeriod = time % period;
        if (timeInPeriod < transitWidth / 2 || timeInPeriod > period - transitWidth / 2) {
             flux -= transitDepth;
        } else if (timeInPeriod >= transitWidth / 2 && timeInPeriod <= period - transitWidth / 2 && timeInPeriod <= transitWidth) {
             const ingressEgressDuration = 0.02;
             if (timeInPeriod < ingressEgressDuration) flux -= transitDepth * (timeInPeriod / ingressEgressDuration);
             else if (timeInPeriod > period - ingressEgressDuration) flux -= transitDepth * ((period - timeInPeriod) / ingressEgressDuration);
             else flux -= transitDepth;
        }
        break;
      }
      case 'eclipsing-binary': {
        const period = 4.5, transitWidth = 0.2, transitDepth = 0.05;
        const timeInPeriod = time % period;
        if (timeInPeriod < transitWidth || timeInPeriod > period - transitWidth) {
          const dipCenter = transitWidth / 2;
          const distanceFromCenter = Math.abs(timeInPeriod - dipCenter);
          flux -= transitDepth * (1 - (distanceFromCenter / dipCenter));
        }
        break;
      }
      case 'weak-signal': {
        const period = 2.8, transitWidth = 0.08, transitDepth = 0.003;
        const timeInPeriod = time % period;
        if (timeInPeriod < transitWidth / 2 || timeInPeriod > period - transitWidth / 2) { flux -= transitDepth; }
        break;
      }
      case 'asteroid': {
        if (time > 14.9 && time < 15.1) {
          const dipCenter = 15.0, transitWidth = 0.1, distanceFromCenter = Math.abs(time - dipCenter);
          flux -= 0.01 * (1 - (distanceFromCenter / transitWidth));
        }
        break;
      }
      case 'stellar-flare': {
        if ((time > 5 && time < 5.05) || (time > 22 && time < 22.05)) {
          flux += 0.015;
        }
        break;
      }
      case 'multi-planet': {
        const p1 = { period: 3.8, width: 0.08, depth: 0.005 };
        const timeInPeriod1 = time % p1.period;
        if (timeInPeriod1 < p1.width || timeInPeriod1 > p1.period - p1.width) { flux -= p1.depth; }

        const p2 = { period: 7.1, width: 0.12, depth: 0.01 };
        const timeInPeriod2 = time % p2.period;
        if (timeInPeriod2 < p2.width || timeInPeriod2 > p2.period - p2.width) { flux -= p2.depth; }
        break;
      }
      case 'noise':
      default:
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