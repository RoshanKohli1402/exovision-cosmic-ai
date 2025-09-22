import React from 'react';
import { 
  Brain, 
  Database, 
  Cpu, 
  Zap,
  Orbit,
  Target,
  FileCode, // Added for consistency
  Layers, // Added for consistency
  CheckCircle,
  TrendingUp,
  Clock,
  Rocket,
  BarChart3 // <-- THE FIX IS HERE
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
            ExoVision's solution is a modular, high-performance pipeline that transforms raw telescope data into exoplanet discoveries, accessible through an intuitive web interface.
          </p>
        </div>
      </section>

      {/* Heuristic Model Pipeline */}
      <section className="py-20 px-4 relative bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center mb-16 text-foreground">
            The Heuristic Detection Pipeline
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <CosmicCard className="p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="relative mb-6">
                <Database className="w-12 h-12 mx-auto text-primary" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
              </div>
              <h3 className="font-heading text-xl font-bold mb-4 text-foreground">Data Ingestion & Cleaning</h3>
              <p className="font-body text-muted-foreground mb-4">
                Raw light curves from Kepler and TESS are parsed, normalized, and cleaned of obvious instrumental noise and outliers.
              </p>
              <ul className="font-body text-sm text-muted-foreground text-left space-y-1 list-disc list-inside">
                <li>Detrending</li>
                <li>Normalization</li>
                <li>Outlier removal</li>
              </ul>
            </CosmicCard>
            
            <CosmicCard className="p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="relative mb-6">
                <Orbit className="w-12 h-12 mx-auto text-secondary" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-secondary">2</span>
                </div>
              </div>
              <h3 className="font-heading text-xl font-bold mb-4 text-foreground">Heuristic Analysis</h3>
              <p className="font-body text-muted-foreground mb-4">
                Our custom algorithm scans the data for transit-like events based on a set of astronomical rules.
              </p>
              <ul className="font-body text-sm text-muted-foreground text-left space-y-1 list-disc list-inside">
                <li>Transit dip detection</li>
                <li>Duration filtering</li>
                <li>Periodicity verification</li>
              </ul>
            </CosmicCard>
            
            <CosmicCard className="p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="relative mb-6">
                <Cpu className="w-12 h-12 mx-auto text-accent" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-accent">3</span>
                </div>
              </div>
              <h3 className="font-heading text-xl font-bold mb-4 text-foreground">Scoring & Visualization</h3>
              <p className="font-body text-muted-foreground mb-4">
                A confidence score is calculated and results are visualized, including a "folded" light curve for clear signal analysis.
              </p>
              <ul className="font-body text-sm text-muted-foreground text-left space-y-1 list-disc list-inside">
                <li>Confidence scoring</li>
                <li>Metric calculation</li>
                <li>Interactive charting</li>
              </ul>
            </CosmicCard>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center mb-16 text-foreground">
            Engines of Discovery
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CosmicCard className="p-6 text-center hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/20 rounded-lg flex items-center justify-center">
                <Layers className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2 text-foreground">React & Vite</h3>
              <p className="font-body text-sm text-muted-foreground">Modern, high-performance web front-end.</p>
            </CosmicCard>
            
            <CosmicCard className="p-6 text-center hover:scale-105 transition-transform duration-300">
               <div className="w-12 h-12 mx-auto mb-4 bg-secondary/20 rounded-lg flex items-center justify-center">
                <FileCode className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2 text-foreground">TypeScript</h3>
              <p className="font-body text-sm text-muted-foreground">For robust, scalable, and error-free code.</p>
            </CosmicCard>
            
            <CosmicCard className="p-6 text-center hover:scale-105 transition-transform duration-300">
               <div className="w-12 h-12 mx-auto mb-4 bg-accent/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2 text-foreground">Recharts</h3>
              <p className="font-body text-sm text-muted-foreground">For interactive and clear data visualizations.</p>
            </CosmicCard>
            
            <CosmicCard className="p-6 text-center hover:scale-105 transition-transform duration-300">
               <div className="w-12 h-12 mx-auto mb-4 bg-primary/20 rounded-lg flex items-center justify-center">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2 text-foreground">Tailwind & Shadcn</h3>
              <p className="font-body text-sm text-muted-foreground">For a beautiful, responsive, and thematic UI.</p>
            </CosmicCard>
          </div>
        </div>
      </section>

      {/* Performance & Impact */}
      <section className="py-20 px-4 relative bg-black/20">
        <div className="max-w-4xl mx-auto">
          <CosmicCard className="p-12 text-center hover:scale-105 transition-transform duration-300">
            <h2 className="font-heading text-3xl font-bold mb-8 text-foreground">
              Mission Impact & Scalability
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <Clock className="w-10 h-10 mx-auto mb-2 text-primary" />
                <div className="font-heading text-3xl font-bold text-primary mb-2">Seconds</div>
                <div className="font-body text-muted-foreground">Analysis time per light curve, down from hours of manual work.</div>
              </div>
              <div>
                <CheckCircle className="w-10 h-10 mx-auto mb-2 text-secondary" />
                <div className="font-heading text-3xl font-bold text-secondary mb-2">95%+</div>
                <div className="font-body text-muted-foreground">Target accuracy for our future deep learning models.</div>
              </div>
              <div>
                <TrendingUp className="w-10 h-10 mx-auto mb-2 text-accent" />
                <div className="font-heading text-3xl font-bold text-accent mb-2">Infinite</div>
                <div className="font-body text-muted-foreground">Scalability with our planned cloud backend architecture.</div>
              </div>
            </div>
          </CosmicCard>
        </div>
      </section>
    </div>
  );
};

export default Solution;