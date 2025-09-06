export interface LightCurveData {
  time: number;
  flux: number;
  transit?: boolean;
}

export const parseCSVData = (csvContent: string): LightCurveData[] => {
  const lines = csvContent.split('\n').filter(line => line.trim() !== '');
  const data: LightCurveData[] = [];
  
  // Skip header if present
  const startIndex = lines[0].includes('time') || lines[0].includes('Time') ? 1 : 0;
  
  for (let i = startIndex; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    
    if (values.length >= 2) {
      const time = parseFloat(values[0]);
      const flux = parseFloat(values[1]);
      
      if (!isNaN(time) && !isNaN(flux)) {
        data.push({
          time,
          flux,
          transit: flux < 0.995 // Simple transit detection threshold
        });
      }
    }
  }
  
  return data;
};

export const generateSampleData = (type: 'kepler' | 'tess'): LightCurveData[] => {
  const data: LightCurveData[] = [];
  const duration = type === 'kepler' ? 90 : 27; // Days
  const points = 1000;
  
  for (let i = 0; i < points; i++) {
    const time = (i / points) * duration;
    let flux = 1.0 + (Math.random() - 0.5) * 0.001; // Base flux with noise
    
    // Add periodic transit if this is an exoplanet sample
    if (type === 'kepler') {
      const period = 3.2; // Days
      const transitWidth = 0.05; // Days
      const transitDepth = 0.01;
      
      const phase = (time % period) / period;
      if (phase < transitWidth / period || phase > (1 - transitWidth / period)) {
        flux -= transitDepth * Math.exp(-Math.pow((phase - 0.5) * period / transitWidth, 2));
      }
    }
    
    data.push({
      time,
      flux,
      transit: flux < 0.995
    });
  }
  
  return data;
};

export const readFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(new Error('File reading error'));
    reader.readAsText(file);
  });
};