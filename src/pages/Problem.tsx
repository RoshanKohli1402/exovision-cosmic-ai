import React from 'react';
import { 
  Target, 
  Database, 
  Search, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Telescope
} from 'lucide-react';
import CosmicCard from '@/components/CosmicCard';

const Problem = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <Target className="w-16 h-16 mx-auto mb-6 text-accent" />
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-foreground">
            The Cosmic Challenge
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Space telescopes generate petabytes of data, but finding exoplanets within this cosmic haystack 
            requires revolutionary AI approaches to accelerate discovery.
          </p>
        </div>
      </section>

      {/* The Scale of Data */}
      <section className="py-20 px-4 relative bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center mb-16 text-foreground">
            The Data Deluge
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <CosmicCard className="p-8 text-center hover:scale-105 transition-transform duration-300">
              <Database className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-heading text-2xl font-bold mb-4 text-foreground">200,000+</h3>
              <p className="font-body text-muted-foreground">
                Stars observed by Kepler mission generating millions of light curves
              </p>
            </CosmicCard>
            
            <CosmicCard className="p-8 text-center hover:scale-105 transition-transform duration-300">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="font-heading text-2xl font-bold mb-4 text-foreground">530+ TB</h3>
              <p className="font-body text-muted-foreground">
                Raw data collected from space telescopes requiring processing
              </p>
            </CosmicCard>
            
            <CosmicCard className="p-8 text-center hover:scale-105 transition-transform duration-300">
              <Telescope className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="font-heading text-2xl font-bold mb-4 text-foreground">0.01%</h3>
              <p className="font-body text-muted-foreground">
                Estimated fraction of stars with detectable exoplanet transits
              </p>
            </CosmicCard>
          </div>
        </div>
      </section>

      {/* Current Limitations */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center mb-16 text-foreground">
            Current Detection Limitations
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <CosmicCard className="p-8 hover:scale-105 transition-transform duration-300">
              <Clock className="w-10 h-10 mb-4 text-primary" />
              <h3 className="font-heading text-2xl font-bold mb-4 text-foreground">Manual Analysis Bottleneck</h3>
              <p className="font-body text-muted-foreground mb-4">
                Traditional methods require astronomers to manually inspect thousands of light curves, 
                a process that can take months or years for comprehensive surveys.
              </p>
              <ul className="font-body text-sm text-muted-foreground space-y-2">
                <li>• Time-intensive visual inspection</li>
                <li>• Limited human pattern recognition</li>
                <li>• Inconsistent detection criteria</li>
                <li>• Scalability challenges</li>
              </ul>
            </CosmicCard>
            
            <CosmicCard className="p-8 hover:scale-105 transition-transform duration-300">
              <AlertTriangle className="w-10 h-10 mb-4 text-accent" />
              <h3 className="font-heading text-2xl font-bold mb-4 text-foreground">Signal Detection Challenges</h3>
              <p className="font-body text-muted-foreground mb-4">
                Exoplanet transit signals are extremely faint (0.01-1% brightness drops) and easily 
                masked by instrumental noise, stellar variability, and cosmic ray hits.
              </p>
              <ul className="font-body text-sm text-muted-foreground space-y-2">
                <li>• Signal-to-noise ratio challenges</li>
                <li>• False positive contamination</li>
                <li>• Systematic instrumental effects</li>
                <li>• Variable stellar backgrounds</li>
              </ul>
            </CosmicCard>
          </div>
        </div>
      </section>

      {/* The Search Challenge */}
      <section className="py-20 px-4 relative bg-black/20">
        <div className="max-w-4xl mx-auto">
          <CosmicCard className="p-12 text-center hover:scale-105 transition-transform duration-300">
            <Search className="w-16 h-16 mx-auto mb-6 text-secondary" />
            <h2 className="font-heading text-3xl font-bold mb-6 text-foreground">
              Finding Needles in a Cosmic Haystack
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
              Imagine searching for a 0.01% dimming event lasting a few hours within 4 years of continuous 
              observations from 200,000 stars. This is the scale of the exoplanet detection challenge 
              that requires AI-powered solutions to unlock the secrets of distant worlds.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="font-heading text-2xl font-bold text-primary mb-2">1 in 10,000</div>
                <div className="font-body text-sm text-muted-foreground">Stars may host detectable planets</div>
              </div>
              <div>
                <div className="font-heading text-2xl font-bold text-secondary mb-2">0.01%</div>
                <div className="font-body text-sm text-muted-foreground">Typical transit depth signal</div>
              </div>
              <div>
                <div className="font-heading text-2xl font-bold text-accent mb-2">Months</div>
                <div className="font-body text-sm text-muted-foreground">Manual analysis per target</div>
              </div>
            </div>
          </CosmicCard>
        </div>
      </section>

      {/* Why AI is Essential */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-heading text-4xl font-bold mb-8 text-foreground">
            Why AI is Our Only Hope
          </h2>
          <p className="font-body text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            The sheer volume of data and the subtle nature of exoplanet signals demand automated, 
            intelligent systems that can process years of observations in hours, identify patterns 
            invisible to human eyes, and prioritize the most promising candidates for follow-up study.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Problem;