import React, { useEffect, useState } from 'react';
import { 
  Telescope, 
  Rocket, 
  BookOpen, 
  ArrowRight,
  Star,
  Target,
  Database,
  Brain,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CosmicButton from '@/components/CosmicButton';
import CosmicCard from '@/components/CosmicCard';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Telescope className="w-16 h-16 mx-auto mb-6 text-primary hover:text-primary/80 transition-colors" />
          </div>
          <h1 className={`font-heading text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            ExoVision AI
          </h1>
          <h2 className={`font-heading text-2xl md:text-4xl font-bold mb-8 text-foreground transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Charting New Worlds Beyond Our Solar System
          </h2>
          <p className={`font-body text-lg md:text-xl mb-12 text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Our AI-driven platform empowers researchers to analyze vast astronomical datasets, accelerating humanity's search for habitable planets.
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link to="/prototype">
              <CosmicButton variant="primary" size="lg" className="text-lg px-8 py-4 hover:scale-105 transition-transform">
                <Rocket className="w-5 h-5 mr-2" />
                Launch Prototype
              </CosmicButton>
            </Link>
            <Link to="/problem">
              <CosmicButton variant="outline" size="lg" className="text-lg px-8 py-4 hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5 mr-2" />
                Read the Mission Brief
              </CosmicButton>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
              How ExoVision Works
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
              <CosmicCard className="p-8 text-center h-full hover:scale-105 transition-transform duration-300">
                <Database className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-heading text-xl font-bold mb-3 text-foreground">1. Upload Data</h3>
                <p className="font-body text-muted-foreground">
                  Ingest raw light curve data from telescopes like Kepler and TESS through a simple, intuitive interface.
                </p>
              </CosmicCard>
            
              <CosmicCard className="p-8 text-center h-full hover:scale-105 transition-transform duration-300">
                <Brain className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <h3 className="font-heading text-xl font-bold mb-3 text-foreground">2. Analyze with AI</h3>
                <p className="font-body text-muted-foreground">
                  Our custom heuristic model intelligently scans for periodic dips, filters noise, and scores potential transit signals.
                </p>
              </CosmicCard>

              <CosmicCard className="p-8 text-center h-full hover:scale-105 transition-transform duration-300">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="font-heading text-xl font-bold mb-3 text-foreground">3. Visualize Results</h3>
                <p className="font-body text-muted-foreground">
                  Receive instant, actionable insights with interactive charts, a model confidence score, and key planetary metrics.
                </p>
              </CosmicCard>
          </div>
        </div>
      </section>

      {/* Explore the Mission Section */}
      <section className="py-20 px-4 relative bg-black/20">
        <div className="max-w-6xl mx-auto">
         <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Explore the Mission
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/problem">
              <CosmicCard className="p-8 text-center h-full hover:scale-105 transition-transform duration-300 cursor-pointer">
                <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="font-heading text-xl font-bold mb-3 text-foreground">The Challenge</h3>
                <p className="font-body text-muted-foreground">
                  Discover the cosmic challenge we're solving with AI.
                </p>
                <ArrowRight className="w-5 h-5 mx-auto mt-4 text-primary" />
              </CosmicCard>
            </Link>
            
            <Link to="/solution">
              <CosmicCard className="p-8 text-center h-full hover:scale-105 transition-transform duration-300 cursor-pointer">
                <Star className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <h3 className="font-heading text-xl font-bold mb-3 text-foreground">Our Solution</h3>
                <p className="font-body text-muted-foreground">
                  Explore our AI-powered detection system and architecture.
                </p>
                <ArrowRight className="w-5 h-5 mx-auto mt-4 text-secondary" />
              </CosmicCard>
            </Link>
            
            <Link to="/prototype">
              <CosmicCard className="p-8 text-center h-full hover:scale-105 transition-transform duration-300 cursor-pointer">
                <Rocket className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="font-heading text-xl font-bold mb-3 text-foreground">Try the Prototype</h3>
                <p className="font-body text-muted-foreground">
                  Upload light curve data and see our model in action.
                </p>
                <ArrowRight className="w-5 h-5 mx-auto mt-4 text-accent" />
              </CosmicCard>
            </Link>
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
            <Link to="/team">
              <CosmicButton variant="primary" size="lg" className="text-lg px-8 py-4 hover:scale-105 transition-transform">
                <Star className="w-5 h-5 mr-2" />
                Meet the Team
              </CosmicButton>
            </Link>
            <Link to="/contact">
              <CosmicButton variant="outline" size="lg" className="text-lg px-8 py-4 hover:scale-105 transition-transform">
                <ArrowRight className="w-5 h-5 mr-2" />
                Contact Mission Control
              </CosmicButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;