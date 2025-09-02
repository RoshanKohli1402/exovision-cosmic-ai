import React from 'react';
import { 
  Brain, 
  Database, 
  Cpu, 
  Zap,
  Orbit,
  Target,
  ArrowRight,
  Star,
  Telescope,
  Globe
} from 'lucide-react';
import CosmicCard from '@/components/CosmicCard';

const Solution = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <Brain className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Our Interstellar Blueprint
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            A revolutionary AI-powered pipeline that transforms raw telescope data into exoplanet discoveries, 
            accelerating humanity's search for habitable worlds.
          </p>
        </div>
      </section>

      {/* AI Pipeline */}
      <section className="py-20 px-4 relative bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center mb-16 text-foreground">
            The AI Detection Pipeline
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <CosmicCard className="p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="relative mb-6">
                <Database className="w-12 h-12 mx-auto text-primary" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
              </div>
              <h3 className="font-heading text-xl font-bold mb-4 text-foreground">Data Preprocessing</h3>
              <p className="font-body text-muted-foreground mb-4">
                Clean and prepare raw light curves from telescope data, removing systematic noise and artifacts.
              </p>
              <ul className="font-body text-sm text-muted-foreground text-left space-y-1">
                <li>• Detrending & normalization</li>
                <li>• Outlier removal</li>
                <li>• Gap interpolation</li>
                <li>• Quality flagging</li>
              </ul>
            </CosmicCard>
            
            <CosmicCard className="p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="relative mb-6">
                <Brain className="w-12 h-12 mx-auto text-secondary" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-secondary">2</span>
                </div>
              </div>
              <h3 className="font-heading text-xl font-bold mb-4 text-foreground">Feature Extraction</h3>
              <p className="font-body text-muted-foreground mb-4">
                Extract meaningful patterns and signatures from light curves using advanced signal processing.
              </p>
              <ul className="font-body text-sm text-muted-foreground text-left space-y-1">
                <li>• Transit depth & duration</li>
                <li>• Periodicity analysis</li>
                <li>• Shape characteristics</li>
                <li>• Statistical moments</li>
              </ul>
            </CosmicCard>
            
            <CosmicCard className="p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="relative mb-6">
                <Cpu className="w-12 h-12 mx-auto text-accent" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-accent">3</span>
                </div>
              </div>
              <h3 className="font-heading text-xl font-bold mb-4 text-foreground">ML Classification</h3>
              <p className="font-body text-muted-foreground mb-4">
                AI models identify exoplanet transit signatures with superhuman accuracy and speed.
              </p>
              <ul className="font-body text-sm text-muted-foreground text-left space-y-1">
                <li>• Deep neural networks</li>
                <li>• Ensemble methods</li>
                <li>• Confidence scoring</li>
                <li>• False positive filtering</li>
              </ul>
            </CosmicCard>
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center mb-16 text-foreground">
            Star Maps & Cosmic Signals
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <CosmicCard className="p-8 hover:scale-105 transition-transform duration-300">
              <h3 className="font-heading text-2xl font-bold mb-6 text-foreground">Data Sources</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Star className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-body text-muted-foreground">Kepler Space Telescope Archives</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Telescope className="w-6 h-6 text-secondary flex-shrink-0" />
                  <span className="font-body text-muted-foreground">TESS Mission Light Curves</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Database className="w-6 h-6 text-accent flex-shrink-0" />
                  <span className="font-body text-muted-foreground">MAST Archive Integration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-body text-muted-foreground">Ground-based Survey Data</span>
                </div>
              </div>
            </CosmicCard>
            
            <CosmicCard className="p-8 hover:scale-105 transition-transform duration-300">
              <h3 className="font-heading text-2xl font-bold mb-6 text-foreground">Processing Pipeline</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Zap className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-body text-muted-foreground">Detrending & Normalization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Orbit className="w-6 h-6 text-secondary flex-shrink-0" />
                  <span className="font-body text-muted-foreground">Orbital Period Folding</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-accent flex-shrink-0" />
                  <span className="font-body text-muted-foreground">Signal Enhancement</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Brain className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-body text-muted-foreground">AI-Powered Detection</span>
                </div>
              </div>
            </CosmicCard>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-4 relative bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center mb-16 text-foreground">
            Engines of Discovery
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CosmicCard className="p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/20 rounded-lg flex items-center justify-center">
                <span className="font-heading font-bold text-primary">Py</span>
              </div>
              <h3 className="font-heading text-lg font-bold mb-2 text-foreground">Python</h3>
              <p className="font-body text-sm text-muted-foreground">Core processing engine</p>
            </CosmicCard>
            
            <CosmicCard className="p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 mx-auto mb-4 bg-secondary/20 rounded-lg flex items-center justify-center">
                <Telescope className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2 text-foreground">Lightkurve</h3>
              <p className="font-body text-sm text-muted-foreground">Astronomical data analysis</p>
            </CosmicCard>
            
            <CosmicCard className="p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 mx-auto mb-4 bg-accent/20 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2 text-foreground">TensorFlow</h3>
              <p className="font-body text-sm text-muted-foreground">Machine learning models</p>
            </CosmicCard>
            
            <CosmicCard className="p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/20 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2 text-foreground">Streamlit</h3>
              <p className="font-body text-sm text-muted-foreground">Interactive prototype</p>
            </CosmicCard>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <CosmicCard className="p-12 text-center hover:scale-105 transition-transform duration-300">
            <h2 className="font-heading text-3xl font-bold mb-8 text-foreground">
              Revolutionary Performance
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="font-heading text-4xl font-bold text-primary mb-2">10,000x</div>
                <div className="font-body text-muted-foreground">Faster than manual analysis</div>
              </div>
              <div>
                <div className="font-heading text-4xl font-bold text-secondary mb-2">95%</div>
                <div className="font-body text-muted-foreground">Accuracy in detection</div>
              </div>
              <div>
                <div className="font-heading text-4xl font-bold text-accent mb-2">24/7</div>
                <div className="font-body text-muted-foreground">Continuous processing</div>
              </div>
            </div>
          </CosmicCard>
        </div>
      </section>
    </div>
  );
};

export default Solution;