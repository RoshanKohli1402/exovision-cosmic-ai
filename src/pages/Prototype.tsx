import React, { useState, useCallback, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  BarChart3, 
  Download, 
  Zap,
  AlertCircle,
  CheckCircle,
  Loader2,
  X
} from 'lucide-react';
import CosmicCard from '@/components/CosmicCard';
import CosmicButton from '@/components/CosmicButton';
import LightCurveChart from '@/components/LightCurveChart';
import { parseCSVData, generateSampleData, readFileContent, type LightCurveData } from '@/utils/fileProcessor';

const Prototype = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [dragOver, setDragOver] = useState(false);
  const [chartData, setChartData] = useState<LightCurveData[]>([]);
  const [showChart, setShowChart] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0]);
    }
  }, []);

  const triggerFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const processFile = useCallback(async () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    try {
      let data: LightCurveData[] = [];
      
      if (uploadedFile.name.includes('sample')) {
        // Generate sample data
        data = generateSampleData(uploadedFile.name.includes('kepler') ? 'kepler' : 'tess');
      } else {
        // Read and parse real file
        const content = await readFileContent(uploadedFile);
        data = parseCSVData(content);
      }
      
      setChartData(data);
      
      // Simulate AI processing
      setTimeout(() => {
        const transitCount = data.filter(d => d.transit).length;
        const hasTransits = transitCount > 10; // Require multiple transits for detection
        
        setResults({
          exoplanetDetected: hasTransits,
          confidence: hasTransits ? Math.random() * 0.3 + 0.7 : Math.random() * 0.4 + 0.3,
          transitDepth: hasTransits ? (data.filter(d => d.transit).reduce((acc, d) => acc + (1 - d.flux), 0) / transitCount * 100).toFixed(4) : (Math.random() * 0.02 + 0.005).toFixed(4),
          period: hasTransits ? (data.length / transitCount * (Math.max(...data.map(d => d.time)) - Math.min(...data.map(d => d.time))) / data.length).toFixed(2) : (Math.random() * 20 + 1).toFixed(2),
          processingTime: (Math.random() * 2 + 0.5).toFixed(1)
        });
        setIsProcessing(false);
      }, 3000);
    } catch (error) {
      console.error('Error processing file:', error);
      setIsProcessing(false);
    }
  }, [uploadedFile]);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-12 px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <Zap className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
            ExoVision AI Prototype
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Upload your light curve data and watch our AI identify potential exoplanet transits in real-time.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div>
            <CosmicCard className="p-8">
              <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">
                Upload Light Curve Data
              </h2>
              
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                  dragOver 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="font-body text-muted-foreground mb-4">
                  Drag and drop your light curve file here, or click to browse
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.txt,.fits,.dat"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <CosmicButton 
                  variant="outline" 
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={triggerFileSelect}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Choose File
                </CosmicButton>
                <p className="font-body text-xs text-muted-foreground mt-4">
                  Supported formats: CSV, TXT, FITS, DAT (Max 50MB)
                </p>
              </div>

              {/* Uploaded File Info */}
              {uploadedFile && (
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-body font-medium text-foreground">{uploadedFile.name}</p>
                        <p className="font-body text-sm text-muted-foreground">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <CosmicButton 
                      variant="primary" 
                      onClick={processFile}
                      disabled={isProcessing}
                      className="hover:scale-105 transition-transform"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Run AI Analysis
                        </>
                      )}
                    </CosmicButton>
                  </div>
                </div>
              )}

              {/* Sample Data */}
              <div className="mt-8">
                <h3 className="font-heading text-lg font-bold mb-4 text-foreground">
                  Try Sample Data
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <CosmicButton 
                    variant="outline" 
                    className="text-left justify-start hover:scale-105 transition-transform"
                    onClick={() => {
                      const sampleFile = new File(['kepler-sample-data'], 'kepler-sample.csv', { type: 'text/csv' });
                      setUploadedFile(sampleFile);
                    }}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Kepler Sample
                  </CosmicButton>
                  <CosmicButton 
                    variant="outline" 
                    className="text-left justify-start hover:scale-105 transition-transform"
                    onClick={() => {
                      const sampleFile = new File(['tess-sample-data'], 'tess-sample.csv', { type: 'text/csv' });
                      setUploadedFile(sampleFile);
                    }}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    TESS Sample
                  </CosmicButton>
                </div>
              </div>
            </CosmicCard>
          </div>

          {/* Analysis Results */}
          <div>
            <CosmicCard className="p-8 h-full">
              <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">
                Analysis Results
              </h2>
              
              {!results && !isProcessing && (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <BarChart3 className="w-16 h-16 text-muted-foreground mb-4" />
                  <p className="font-body text-muted-foreground">
                    Upload a light curve file and run AI analysis to see results
                  </p>
                </div>
              )}

              {isProcessing && (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
                  <p className="font-body text-foreground mb-2">Processing with AI...</p>
                  <p className="font-body text-sm text-muted-foreground">
                    Analyzing light curve patterns for exoplanet signatures
                  </p>
                </div>
              )}

              {results && (
                <div className="space-y-6">
                  {/* Detection Status */}
                  <div className={`p-4 rounded-lg ${results.exoplanetDetected ? 'bg-green-500/10 border border-green-500/20' : 'bg-yellow-500/10 border border-yellow-500/20'}`}>
                    <div className="flex items-center space-x-3">
                      {results.exoplanetDetected ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-yellow-500" />
                      )}
                      <div>
                        <p className="font-heading font-bold text-foreground">
                          {results.exoplanetDetected ? 'Exoplanet Transit Detected!' : 'No Clear Transit Signal'}
                        </p>
                        <p className="font-body text-sm text-muted-foreground">
                          Confidence: {(results.confidence * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-black/20 rounded-lg">
                      <p className="font-body text-sm text-muted-foreground mb-1">Transit Depth</p>
                      <p className="font-heading text-xl font-bold text-foreground">
                        {results.transitDepth}%
                      </p>
                    </div>
                    <div className="p-4 bg-black/20 rounded-lg">
                      <p className="font-body text-sm text-muted-foreground mb-1">Orbital Period</p>
                      <p className="font-heading text-xl font-bold text-foreground">
                        {results.period} days
                      </p>
                    </div>
                  </div>

                  {/* Processing Time */}
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="font-body text-sm text-muted-foreground mb-1">Processing Time</p>
                    <p className="font-heading text-lg font-bold text-primary">
                      {results.processingTime} seconds
                    </p>
                    <p className="font-body text-xs text-muted-foreground mt-1">
                      vs. hours/days for manual analysis
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <CosmicButton 
                      variant="outline" 
                      className="flex-1 hover:scale-105 transition-transform"
                      onClick={() => {
                        const dataStr = JSON.stringify(results, null, 2);
                        const dataBlob = new Blob([dataStr], { type: 'application/json' });
                        const url = URL.createObjectURL(dataBlob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = 'exoplanet-analysis-results.json';
                        link.click();
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Results
                    </CosmicButton>
                    <CosmicButton 
                      variant="primary" 
                      className="flex-1 hover:scale-105 transition-transform"
                      onClick={() => setShowChart(true)}
                      disabled={chartData.length === 0}
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Chart
                    </CosmicButton>
                  </div>
                </div>
              )}
            </CosmicCard>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <CosmicCard className="p-8">
            <h2 className="font-heading text-2xl font-bold mb-6 text-foreground text-center">
              How Our AI Works
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="font-heading font-bold text-primary">1</span>
                </div>
                <h3 className="font-heading text-lg font-bold mb-2 text-foreground">Upload</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Your light curve data is securely processed
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center">
                  <span className="font-heading font-bold text-secondary">2</span>
                </div>
                <h3 className="font-heading text-lg font-bold mb-2 text-foreground">Analyze</h3>
                <p className="font-body text-sm text-muted-foreground">
                  AI detects subtle transit patterns
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="font-heading font-bold text-accent">3</span>
                </div>
                <h3 className="font-heading text-lg font-bold mb-2 text-foreground">Classify</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Machine learning identifies exoplanets
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="font-heading font-bold text-primary">4</span>
                </div>
                <h3 className="font-heading text-lg font-bold mb-2 text-foreground">Results</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Get detailed analysis in seconds
                </p>
              </div>
            </div>
          </CosmicCard>
        </div>
      </div>

      {/* Chart Modal */}
      {showChart && chartData.length > 0 && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-2xl font-bold text-foreground">Light Curve Analysis</h2>
                <CosmicButton 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowChart(false)}
                >
                  <X className="w-4 h-4" />
                </CosmicButton>
              </div>
              <LightCurveChart 
                data={chartData}
                title={`${uploadedFile?.name} - Light Curve`}
                onExport={() => {
                  const csvContent = chartData.map(d => `${d.time},${d.flux}`).join('\n');
                  const blob = new Blob([`time,flux\n${csvContent}`], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = 'light-curve-data.csv';
                  link.click();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Prototype;