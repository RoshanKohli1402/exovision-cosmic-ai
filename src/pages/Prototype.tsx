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
  X,
  MessageSquareText // New icon for message
} from 'lucide-react';
import CosmicCard from '@/components/CosmicCard';
import CosmicButton from '@/components/CosmicButton';
import LightCurveChart from '@/components/LightCurveChart';
import AnalysisVisuals from '@/components/AnalysisVisuals';
import PeriodogramChart from '@/components/PeriodogramChart'; 
import { parseCSVData, generateSampleData, readFileContent, runHeuristicModel, type LightCurveData } from '@/utils/fileProcessor';

const Prototype = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any>(null); // results will now contain classification and message
  const [dragOver, setDragOver] = useState(false);
  const [chartData, setChartData] = useState<LightCurveData[]>([]);
  const [showChart, setShowChart] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setDragOver(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); setDragOver(false); }, []);

  const handleFileDrop = (files: FileList | File[]) => {
      if (files && files.length > 0) {
          setUploadedFile(files[0]);
          setResults(null);
          setError(null);
          setShowChart(false);
      }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileDrop(Array.from(e.dataTransfer.files));
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) { handleFileDrop(Array.from(e.target.files)); }
  }, []);

  const triggerFileSelect = useCallback(() => { fileInputRef.current?.click(); }, []);

  const processFile = useCallback(async () => {
    if (!uploadedFile) return;
    
    setIsProcessing(true);
    setResults(null);
    setError(null);
    setShowChart(false);

    try {
      let rawData: LightCurveData[] = [];
      const isSample = uploadedFile.name.includes('sample');
      
      if (isSample) {
        // Extract sample type from filename
        const sampleTypeMatch = uploadedFile.name.match(/^(.*?)-sample\.csv/);
        const sampleType = sampleTypeMatch ? sampleTypeMatch[1] : 'noise';
        rawData = generateSampleData(sampleType as any); // Cast to any to match enum
      } else {
        const content = await readFileContent(uploadedFile);
        rawData = parseCSVData(content);
      }

      if (rawData.length === 0) {
          throw new Error("Could not parse data from file. Please check format (time, flux).");
      }
      
      // Simulate network delay for a more realistic feel
      setTimeout(() => {
        const analysis = runHeuristicModel(rawData);
        setResults({ ...analysis, processingTime: (Math.random() * 1.5 + 0.5).toFixed(1) });
        setChartData(analysis.processedData);
        setIsProcessing(false);
      }, 2500); // Increased delay for perceived "processing"

    } catch (err) {
      console.error('Error processing file:', err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      setIsProcessing(false);
    }
  }, [uploadedFile]);

  // Determine icon and color for the main result banner
  const getResultIcon = (classification: string) => {
    switch (classification) {
      case 'Exoplanet Candidate': return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'Eclipsing Binary': return <BarChart3 className="w-8 h-8 text-orange-500" />;
      case 'Stellar Flare': return <Zap className="w-8 h-8 text-red-500" />;
      case 'Asteroid Fly-by': return <AlertCircle className="w-8 h-8 text-blue-500" />;
      default: return <AlertCircle className="w-8 h-8 text-yellow-500" />;
    }
  };

  const getResultBannerColor = (classification: string) => {
    switch (classification) {
      case 'Exoplanet Candidate': return 'bg-green-500/10 border-green-500/20';
      case 'Eclipsing Binary': return 'bg-orange-500/10 border-orange-500/20';
      case 'Stellar Flare': return 'bg-red-500/10 border-red-500/20';
      case 'Asteroid Fly-by': return 'bg-blue-500/10 border-blue-500/20';
      default: return 'bg-yellow-500/10 border-yellow-500/20';
    }
  };


  return (
    <div className="min-h-screen pt-20">
      <section className="py-12 px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <Zap className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">ExoVision AI Prototype</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Upload light curve data and run our **baseline heuristic model** to identify potential exoplanet transits.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div>
            <CosmicCard className="p-8">
              <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">1. Upload Light Curve Data</h2>
              <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${ dragOver ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50' }`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="font-body text-muted-foreground mb-4">Drag & drop file or click to browse</p>
                <input ref={fileInputRef} type="file" accept=".csv,.txt,.dat" onChange={handleFileSelect} className="hidden" />
                <CosmicButton variant="outline" className="cursor-pointer hover:scale-105" onClick={triggerFileSelect}>
                  <FileText className="w-4 h-4 mr-2" /> Choose File
                </CosmicButton>
                <p className="font-body text-xs text-muted-foreground mt-4">Supported: CSV, TXT, DAT</p>
              </div>

              {uploadedFile && (
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <div className="truncate"><p className="font-body font-medium text-foreground truncate" title={uploadedFile.name}>{uploadedFile.name}</p><p className="font-body text-sm text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p></div>
                    </div>
                    <CosmicButton variant="primary" onClick={processFile} disabled={isProcessing} className="hover:scale-105 flex-shrink-0">
                      {isProcessing ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Analyzing...</>) : (<><Zap className="w-4 h-4 mr-2" />Run Analysis</>)}
                    </CosmicButton>
                  </div>
                </div>
              )}
             {error && ( <div className="mt-6 p-4 bg-destructive/10 rounded-lg text-destructive flex items-center gap-3"><AlertCircle className="w-5 h-5 flex-shrink-0" /><p className="font-body text-sm">{error}</p></div> )}

              <div className="mt-8">
                <h3 className="font-heading text-lg font-bold mb-4 text-foreground">Or Try Sample Data</h3>
                <div className="grid grid-cols-2 gap-4">
                  <CosmicButton variant="outline" className="text-left justify-start hover:scale-105" onClick={() => handleFileDrop([new File(['sample-data'], 'confirmed-planet-sample.csv', { type: 'text/csv' })])}>
                    <FileText className="w-4 h-4 mr-2" /> Confirmed Planet
                  </CosmicButton>
                  <CosmicButton variant="outline" className="text-left justify-start hover:scale-105" onClick={() => handleFileDrop([new File(['sample-data'], 'multi-planet-sample.csv', { type: 'text/csv' })])}>
                    <FileText className="w-4 h-4 mr-2" /> Multi-Planet System
                  </CosmicButton>
                   <CosmicButton variant="outline" className="text-left justify-start hover:scale-105" onClick={() => handleFileDrop([new File(['sample-data'], 'eclipsing-binary-sample.csv', { type: 'text/csv' })])}>
                    <FileText className="w-4 h-4 mr-2" /> False Positive (Binary)
                  </CosmicButton>
                  <CosmicButton variant="outline" className="text-left justify-start hover:scale-105" onClick={() => handleFileDrop([new File(['sample-data'], 'asteroid-sample.csv', { type: 'text/csv' })])}>
                    <FileText className="w-4 h-4 mr-2" /> Asteroid Fly-by
                  </CosmicButton>
                   <CosmicButton variant="outline" className="text-left justify-start hover:scale-105" onClick={() => handleFileDrop([new File(['sample-data'], 'weak-signal-sample.csv', { type: 'text/csv' })])}>
                    <FileText className="w-4 h-4 mr-2" /> Weak Signal Planet
                  </CosmicButton>
                  <CosmicButton variant="outline" className="text-left justify-start hover:scale-105" onClick={() => handleFileDrop([new File(['sample-data'], 'stellar-flare-sample.csv', { type: 'text/csv' })])}>
                    <FileText className="w-4 h-4 mr-2" /> Stellar Flare Activity
                  </CosmicButton>
                  <CosmicButton variant="outline" className="text-left justify-start hover:scale-105" onClick={() => handleFileDrop([new File(['sample-data'], 'noise-sample.csv', { type: 'text/csv' })])}>
                    <FileText className="w-4 h-4 mr-2" /> Random Noise
                  </CosmicButton>
                </div>
              </div>
            </CosmicCard>
          </div>

          {/* Analysis Results */}
          <div>
            <CosmicCard className="p-8 h-full">
              <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">2. Review Analysis</h2>
              {!results && !isProcessing && (<div className="flex flex-col items-center justify-center h-full text-center"><BarChart3 className="w-16 h-16 text-muted-foreground mb-4" /><p className="font-body text-muted-foreground">Results from the model will appear here.</p></div>)}
              {isProcessing && (<div className="flex flex-col items-center justify-center h-full text-center"><Loader2 className="w-16 h-16 text-primary animate-spin mb-4" /><p className="font-body text-foreground mb-2">Running Heuristic Model...</p><p className="font-body text-sm text-muted-foreground">Analyzing for periodic transit signals...</p></div>)}
              {results && (
                <div className="space-y-6">
                  <div className={`p-4 rounded-lg ${getResultBannerColor(results.classification)} border`}>
                    <div className="flex items-center space-x-3">
                      {getResultIcon(results.classification)}
                      <div>
                        <p className="font-heading font-bold text-foreground text-lg">{results.classification}</p>
                        <p className="font-body text-sm text-muted-foreground">Confidence: {results.confidence * 100}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-card/30 border border-border flex items-center space-x-3">
                      <MessageSquareText className="w-6 h-6 text-primary flex-shrink-0" />
                      <p className="font-body text-sm text-muted-foreground">{results.message}</p>
                  </div>
                  
                  <AnalysisVisuals results={results} />
                  
                  {/* Conditionally render the Periodogram */}
                  {results.classification === 'Exoplanet Candidate' && uploadedFile?.name.includes('multi-planet') && results.period > 0 && (
                    <div className="mt-6">
                        <PeriodogramChart detectedPeriod={results.period} />
                    </div>
                  )}
                  {results.classification === 'Eclipsing Binary' && uploadedFile?.name.includes('eclipsing-binary') && results.period > 0 && (
                    <div className="mt-6">
                        <PeriodogramChart detectedPeriod={results.period} />
                    </div>
                  )}

                  <div className="flex space-x-4 pt-4">
                    <CosmicButton variant="outline" className="flex-1 hover:scale-105" onClick={() => {/* export logic */}}>
                      <Download className="w-4 h-4 mr-2" /> Export JSON
                    </CosmicButton>
                    <CosmicButton variant="primary" className="flex-1 hover:scale-105" onClick={() => setShowChart(true)} disabled={chartData.length === 0}>
                      <BarChart3 className="w-4 h-4 mr-2" /> View Full Chart
                    </CosmicButton>
                  </div>
                </div>
              )}
            </CosmicCard>
          </div>
        </div>
      </div>

      {showChart && chartData.length > 0 && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <CosmicCard className="max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-4 border-b border-border flex items-center justify-between flex-shrink-0">
                <h2 className="font-heading text-2xl font-bold text-foreground truncate" title={uploadedFile?.name}>Light Curve: {uploadedFile?.name}</h2>
                <CosmicButton variant="outline" size="sm" onClick={() => setShowChart(false)}><X className="w-4 h-4" /></CosmicButton>
              </div>
              <div className="p-6 flex-grow overflow-auto">
                <LightCurveChart 
                  data={chartData}
                  onExport={() => {/* export logic */}}
                />
              </div>
          </CosmicCard>
        </div>
      )}
    </div>
  );
};


export default Prototype;