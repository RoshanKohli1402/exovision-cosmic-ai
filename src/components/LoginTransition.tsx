import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const LoginTransition = () => {
  const { showLoginTransition } = useAuth();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (showLoginTransition) {
      const phases = [
        { delay: 0, phase: 1 },      // Hyperspace lines
        { delay: 800, phase: 2 },    // Portal opening
        { delay: 1600, phase: 3 },   // Particle materialization
        { delay: 2400, phase: 4 }    // Welcome message
      ];

      phases.forEach(({ delay, phase: nextPhase }) => {
        setTimeout(() => setPhase(nextPhase), delay);
      });

      // Reset after animation
      setTimeout(() => setPhase(0), 3000);
    }
  }, [showLoginTransition]);

  if (!showLoginTransition) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center">
      {/* Hyperspace Lines Effect */}
      {phase >= 1 && (
        <div className="absolute inset-0">
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className="absolute bg-primary/80 animate-hyperspace"
              style={{
                width: '2px',
                height: '100vh',
                left: `${Math.random() * 100}%`,
                top: '0',
                transform: 'rotate(45deg)',
                animationDelay: `${i * 0.05}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Portal Opening */}
      {phase >= 2 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-96 h-96 border-4 border-primary/50 animate-portal-open"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.2), transparent 70%)',
              boxShadow: '0 0 100px hsl(var(--primary) / 0.5), inset 0 0 100px hsl(var(--primary) / 0.3)'
            }}
          />
        </div>
      )}

      {/* Particle Materialization */}
      {phase >= 3 && (
        <div className="absolute inset-0">
          {Array.from({ length: 100 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cosmic-glow rounded-full animate-particle-beam"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.02}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Welcome Message */}
      {phase >= 4 && (
        <div className="relative z-10 text-center animate-fade-in">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto border-2 border-primary rounded-full flex items-center justify-center animate-cosmic-pulse">
              <div className="w-8 h-8 bg-primary rounded-full" />
            </div>
          </div>
          <h2 className="text-3xl font-heading text-primary mb-2">
            Access Granted
          </h2>
          <p className="text-lg text-foreground/80">
            Welcome to ExoVision Mission Control
          </p>
          <div className="mt-4 flex justify-center space-x-1">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-primary rounded-full animate-cosmic-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginTransition;