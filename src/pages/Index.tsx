import React from 'react';
import { 
  Telescope, 
  Brain, 
  Database, 
  Cpu, 
  Rocket, 
  Globe, 
  Users, 
  ArrowRight,
  Star,
  Orbit,
  Zap,
  Target,
  ChevronRight
} from 'lucide-react';
import StarField from '@/components/StarField';
import CosmicButton from '@/components/CosmicButton';
import CosmicCard from '@/components/CosmicCard';
import cosmicBackground from '@/assets/cosmic-background.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero text-foreground overflow-x-hidden">
      <StarField />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${cosmicBackground})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className="mb-8 animate-float">
            <Telescope className="w-16 h-16 mx-auto mb-6 text-cosmic-glow animate-glow-pulse" />
          </div>
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-cosmic-glow to-accent bg-clip-text text-transparent">
            ExoVision
          </h1>
          <h2 className="font-heading text-2xl md:text-4xl font-bold mb-8 text-foreground">
            Charting New Worlds Beyond Our Solar System
          </h2>
          <p className="font-body text-lg md:text-xl mb-12 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            An AI-powered telescope for the digital age — accelerating humanity's search for habitable planets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CosmicButton variant="primary" size="lg" className="text-lg px-8 py-4">
              <Rocket className="w-5 h-5 mr-2" />
              Launch Mission
            </CosmicButton>
            <CosmicButton variant="outline" size="lg" className="text-lg px-8 py-4">
              <Globe className="w-5 h-5 mr-2" />
              Explore Prototype
            </CosmicButton>
          </div>
        </div>
      </section>

      {/* The Cosmic Challenge */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
              The Cosmic Challenge
            </h2>
            <div className="w-24 h-1 bg-gradient-cosmic mx-auto mb-8" />
          </div>
          
          <CosmicCard className="p-8 md:p-12 text-center max-w-4xl mx-auto" glowing>
            <Target className="w-12 h-12 mx-auto mb-6 text-accent" />
            <p className="font-body text-lg md:text-xl leading-relaxed text-muted-foreground">
              Space telescopes like Kepler and TESS generate massive datasets containing millions of light curves. 
              Hidden within this cosmic data are the faint signals of distant exoplanets transiting their host stars. 
              Manual detection is like finding needles in a cosmic haystack — we need AI to accelerate discovery 
              and unlock the secrets of potentially habitable worlds.
            </p>
          </CosmicCard>
        </div>
      </section>

      {/* Our Interstellar Blueprint */}
      <section className="py-20 px-4 relative bg-star-field/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Our Interstellar Blueprint
            </h2>
            <div className="w-24 h-1 bg-gradient-cosmic mx-auto mb-8" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <CosmicCard className="p-6 text-center" floating>
              <Database className="w-10 h-10 mx-auto mb-4 text-primary" />
              <h3 className="font-heading text-xl font-bold mb-3 text-foreground">Data Preprocessing</h3>
              <p className="font-body text-muted-foreground">
                Clean and prepare raw light curves from telescope data
              </p>
            </CosmicCard>
            
            <CosmicCard className="p-6 text-center" floating>
              <Brain className="w-10 h-10 mx-auto mb-4 text-secondary" />
              <h3 className="font-heading text-xl font-bold mb-3 text-foreground">Feature Extraction</h3>
              <p className="font-body text-muted-foreground">
                Extract meaningful patterns and signatures from light curves
              </p>
            </CosmicCard>
            
            <CosmicCard className="p-6 text-center" floating>
              <Cpu className="w-10 h-10 mx-auto mb-4 text-accent" />
              <h3 className="font-heading text-xl font-bold mb-3 text-foreground">ML Classification</h3>
              <p className="font-body text-muted-foreground">
                AI models identify exoplanet transit signatures
              </p>
            </CosmicCard>
          </div>
        </div>
      </section>

      {/* Star Maps & Cosmic Signals */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Star Maps & Cosmic Signals
            </h2>
            <div className="w-24 h-1 bg-gradient-cosmic mx-auto mb-8" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <CosmicCard className="p-8" glowing>
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
              </div>
            </CosmicCard>
            
            <CosmicCard className="p-8" glowing>
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
              </div>
            </CosmicCard>
          </div>
        </div>
      </section>

      {/* Engines of Discovery */}
      <section className="py-20 px-4 relative bg-star-field/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Engines of Discovery
            </h2>
            <div className="w-24 h-1 bg-gradient-cosmic mx-auto mb-8" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CosmicCard className="p-6 text-center" floating>
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/20 rounded-lg flex items-center justify-center">
                <span className="font-heading font-bold text-primary">Py</span>
              </div>
              <h3 className="font-heading text-lg font-bold mb-2 text-foreground">Python</h3>
              <p className="font-body text-sm text-muted-foreground">Core processing engine</p>
            </CosmicCard>
            
            <CosmicCard className="p-6 text-center" floating>
              <div className="w-12 h-12 mx-auto mb-4 bg-secondary/20 rounded-lg flex items-center justify-center">
                <Telescope className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2 text-foreground">Lightkurve</h3>
              <p className="font-body text-sm text-muted-foreground">Astronomical data analysis</p>
            </CosmicCard>
            
            <CosmicCard className="p-6 text-center" floating>
              <div className="w-12 h-12 mx-auto mb-4 bg-accent/20 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2 text-foreground">TensorFlow</h3>
              <p className="font-body text-sm text-muted-foreground">Machine learning models</p>
            </CosmicCard>
            
            <CosmicCard className="p-6 text-center" floating>
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/20 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2 text-foreground">Streamlit</h3>
              <p className="font-body text-sm text-muted-foreground">Interactive prototype</p>
            </CosmicCard>
          </div>
        </div>
      </section>

      {/* Mission Impact */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Mission Impact
            </h2>
            <div className="w-24 h-1 bg-gradient-cosmic mx-auto mb-8" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <CosmicCard className="p-8 text-center" glowing>
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-cosmic rounded-full flex items-center justify-center">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-4 text-foreground">Accelerate Discovery</h3>
              <p className="font-body text-muted-foreground">
                Process years of telescope data in hours, identifying potential exoplanets for follow-up observations.
              </p>
            </CosmicCard>
            
            <CosmicCard className="p-8 text-center" glowing>
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-cosmic rounded-full flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-4 text-foreground">Find Earth 2.0</h3>
              <p className="font-body text-muted-foreground">
                Support the search for potentially habitable worlds in the cosmos, advancing astrobiology research.
              </p>
            </CosmicCard>
            
            <CosmicCard className="p-8 text-center" glowing>
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-cosmic rounded-full flex items-center justify-center">
                <Telescope className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-4 text-foreground">Future Missions</h3>
              <p className="font-body text-muted-foreground">
                Enhance capabilities for JWST, HabEx, and future space telescopes in exoplanet characterization.
              </p>
            </CosmicCard>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 relative bg-star-field/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Mission Control Team
            </h2>
            <div className="w-24 h-1 bg-gradient-cosmic mx-auto mb-8" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((member) => (
              <CosmicCard key={member} className="p-6 text-center" floating>
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-cosmic rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-2 text-foreground">Team Member {member}</h3>
                <p className="font-body text-sm text-muted-foreground mb-2">Mission Specialist</p>
                <p className="font-body text-xs text-muted-foreground">Astrophysics & AI Research</p>
              </CosmicCard>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Join the Journey to the Stars
          </h2>
          <p className="font-body text-lg md:text-xl mb-12 text-muted-foreground leading-relaxed">
            Be part of humanity's greatest adventure. Follow our mission as we chart new worlds 
            and search for life beyond Earth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <CosmicButton variant="primary" size="lg" className="text-lg px-8 py-4">
              <Star className="w-5 h-5 mr-2" />
              Join the Journey
            </CosmicButton>
            <CosmicButton variant="outline" size="lg" className="text-lg px-8 py-4">
              <ArrowRight className="w-5 h-5 mr-2" />
              Contact Mission Control
            </CosmicButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50 bg-star-field/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Telescope className="w-8 h-8 text-primary" />
              <span className="font-heading text-xl font-bold text-foreground">ExoVision</span>
            </div>
            <div className="text-center md:text-right">
              <p className="font-body text-sm text-muted-foreground mb-1">
                NASA Space Apps Challenge 2025
              </p>
              <p className="font-body text-xs text-muted-foreground">
                Charting new worlds beyond our solar system
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;