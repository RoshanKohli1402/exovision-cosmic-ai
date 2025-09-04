import React from 'react';

const SpaceBackground = () => {
  // Generate multiple star layers for depth
  const distantStars = Array.from({ length: 300 }, (_, i) => ({
    id: i,
    size: Math.random() * 1.5 + 0.5,
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDelay: Math.random() * 8,
    twinkleSpeed: Math.random() * 4 + 3
  }));

  // Generate space stations and satellites
  const satellites = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    size: Math.random() * 25 + 20,
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDuration: Math.random() * 40 + 80,
    direction: Math.random() > 0.5 ? 'normal' : 'reverse',
    type: Math.random() > 0.5 ? 'satellite' : 'station'
  }));

  // Generate asteroid belt
  const asteroids = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 3,
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDuration: Math.random() * 60 + 100,
    opacity: Math.random() * 0.5 + 0.3,
    rotation: Math.random() * 360
  }));

  // Generate large nebula clouds with color variations
  const nebulas = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    size: Math.random() * 400 + 250,
    left: Math.random() * 130 - 15,
    top: Math.random() * 130 - 15,
    animationDuration: Math.random() * 100 + 150,
    hue: Math.random() * 120 + 200, // Blue to purple range
    opacity: Math.random() * 0.15 + 0.05
  }));

  // Generate distant galaxies
  const galaxies = Array.from({ length: 2 }, (_, i) => ({
    id: i,
    size: Math.random() * 150 + 100,
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDuration: Math.random() * 150 + 200,
    hue: Math.random() * 60 + 280
  }));

  // Generate wormhole effect
  const wormhole = {
    size: 200,
    left: 85,
    top: 15,
    animationDuration: 10
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-star-field via-background to-black" />

      {/* Distant Galaxies */}
      {galaxies.map((galaxy) => (
        <div
          key={`galaxy-${galaxy.id}`}
          className="absolute opacity-20 blur-sm"
          style={{
            width: `${galaxy.size}px`,
            height: `${galaxy.size}px`,
            left: `${galaxy.left}%`,
            top: `${galaxy.top}%`,
            background: `radial-gradient(ellipse, hsl(${galaxy.hue}, 60%, 40%) 0%, hsl(${galaxy.hue}, 80%, 20%) 30%, transparent 70%)`,
            animation: `galaxy-rotate ${galaxy.animationDuration}s linear infinite`,
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
          }}
        />
      ))}

      {/* Wormhole Effect */}
      <div
        className="absolute opacity-30 blur-lg"
        style={{
          width: `${wormhole.size}px`,
          height: `${wormhole.size}px`,
          left: `${wormhole.left}%`,
          top: `${wormhole.top}%`,
          background: `radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, hsl(var(--accent) / 0.3) 40%, transparent 70%)`,
          animation: `wormhole ${wormhole.animationDuration}s ease-in-out infinite`,
          borderRadius: '50%'
        }}
      />

      {/* Multiple Star Layers */}
      {distantStars.map((star) => (
        <div
          key={`distant-star-${star.id}`}
          className="absolute bg-white rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.left}%`,
            top: `${star.top}%`,
            opacity: 0.4 + Math.random() * 0.4,
            animation: `twinkle-subtle ${star.twinkleSpeed}s ease-in-out infinite`,
            animationDelay: `${star.animationDelay}s`
          }}
        />
      ))}

      {/* Enhanced Nebula Clouds */}
      {nebulas.map((nebula) => (
        <div
          key={`nebula-${nebula.id}`}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${nebula.size}px`,
            height: `${nebula.size}px`,
            left: `${nebula.left}%`,
            top: `${nebula.top}%`,
            opacity: nebula.opacity,
            background: `radial-gradient(ellipse, hsl(${nebula.hue}, 70%, 50%) 0%, hsl(${nebula.hue + 30}, 60%, 40%) 40%, transparent 70%)`,
            animation: `float-nebula ${nebula.animationDuration}s ease-in-out infinite`
          }}
        />
      ))}

      {/* Advanced Satellites and Space Stations */}
      {satellites.map((satellite) => (
        <div
          key={`satellite-${satellite.id}`}
          className="absolute opacity-50"
          style={{
            left: `${satellite.left}%`,
            top: `${satellite.top}%`,
            animation: `orbit-slow ${satellite.animationDuration}s linear infinite ${satellite.direction}`
          }}
        >
          {satellite.type === 'station' ? (
            // Space Station Design
            <div className="relative">
              <div 
                className="bg-gradient-to-br from-primary/80 to-secondary/80 rounded-sm relative"
                style={{
                  width: `${satellite.size}px`,
                  height: `${satellite.size * 0.4}px`
                }}
              >
                {/* Central hub */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent/60 rounded-full"
                  style={{
                    width: `${satellite.size * 0.3}px`,
                    height: `${satellite.size * 0.3}px`
                  }}
                />
                {/* Rotating rings */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-primary/40 rounded-full animate-galaxy-rotate"
                  style={{
                    width: `${satellite.size * 0.8}px`,
                    height: `${satellite.size * 0.8}px`
                  }}
                />
              </div>
            </div>
          ) : (
            // Standard Satellite Design
            <div 
              className="bg-gradient-to-r from-primary/70 to-secondary/70 rounded-sm relative"
              style={{
                width: `${satellite.size}px`,
                height: `${satellite.size * 0.6}px`
              }}
            >
              {/* Solar panels */}
              <div 
                className="absolute -left-1 top-1/2 -translate-y-1/2 bg-accent/50"
                style={{
                  width: `${satellite.size * 0.3}px`,
                  height: `${satellite.size * 0.8}px`
                }}
              />
              <div 
                className="absolute -right-1 top-1/2 -translate-y-1/2 bg-accent/50"
                style={{
                  width: `${satellite.size * 0.3}px`,
                  height: `${satellite.size * 0.8}px`
                }}
              />
              {/* Communication array */}
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cosmic-glow/60 rounded-full"
                style={{
                  width: `${satellite.size * 0.1}px`,
                  height: `${satellite.size * 0.1}px`
                }}
              />
            </div>
          )}
        </div>
      ))}

      {/* Asteroid Belt */}
      {asteroids.map((asteroid) => (
        <div
          key={`asteroid-${asteroid.id}`}
          className="absolute bg-muted-foreground/60 rounded-full"
          style={{
            width: `${asteroid.size}px`,
            height: `${asteroid.size}px`,
            left: `${asteroid.left}%`,
            top: `${asteroid.top}%`,
            opacity: asteroid.opacity,
            animation: `drift ${asteroid.animationDuration}s ease-in-out infinite`,
            transform: `rotate(${asteroid.rotation}deg)`
          }}
        />
      ))}

      {/* Enhanced Shooting Stars */}
      <div 
        className="absolute w-1 h-1 bg-white rounded-full opacity-80"
        style={{
          left: '5%',
          top: '15%',
          animation: 'shooting-star 8s ease-out infinite',
          boxShadow: '0 0 6px hsl(var(--cosmic-glow))'
        }}
      />
      <div 
        className="absolute w-1 h-1 bg-primary rounded-full opacity-70"
        style={{
          left: '75%',
          top: '65%',
          animation: 'shooting-star 12s ease-out infinite 4s',
          boxShadow: '0 0 8px hsl(var(--primary))'
        }}
      />
      <div 
        className="absolute w-1 h-1 bg-accent rounded-full opacity-60"
        style={{
          left: '90%',
          top: '30%',
          animation: 'shooting-star 15s ease-out infinite 8s',
          boxShadow: '0 0 10px hsl(var(--accent))'
        }}
      />

      {/* Cosmic Dust Clouds */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={`dust-${i}`}
          className="absolute opacity-10 blur-sm"
          style={{
            width: `${Math.random() * 50 + 20}px`,
            height: `${Math.random() * 30 + 10}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `linear-gradient(45deg, hsl(var(--muted-foreground) / 0.3), transparent)`,
            animation: `drift ${Math.random() * 100 + 120}s ease-in-out infinite`,
            borderRadius: `${Math.random() * 50 + 25}%`
          }}
        />
      ))}
    </div>
  );
};

export default SpaceBackground;