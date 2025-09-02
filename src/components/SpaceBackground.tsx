import React from 'react';

const SpaceBackground = () => {
  // Generate floating satellites
  const satellites = Array.from({ length: 3 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 15,
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDuration: Math.random() * 40 + 60, // 60-100s
    direction: Math.random() > 0.5 ? 'normal' : 'reverse'
  }));

  // Generate floating debris
  const debris = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDuration: Math.random() * 50 + 80, // 80-130s
    opacity: Math.random() * 0.4 + 0.2
  }));

  // Generate nebula clouds
  const nebulas = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    size: Math.random() * 300 + 200,
    left: Math.random() * 120 - 10, // -10 to 110 to allow overflow
    top: Math.random() * 120 - 10,
    animationDuration: Math.random() * 80 + 120, // 120-200s
    hue: Math.random() * 60 + 240 // Purple to blue range
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Distant stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 200 }, (_, i) => (
          <div
            key={`star-${i}`}
            className="absolute bg-white rounded-full opacity-60"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle-subtle ${Math.random() * 4 + 3}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      {/* Nebula clouds */}
      {nebulas.map((nebula) => (
        <div
          key={`nebula-${nebula.id}`}
          className="absolute rounded-full blur-3xl opacity-10"
          style={{
            width: `${nebula.size}px`,
            height: `${nebula.size}px`,
            left: `${nebula.left}%`,
            top: `${nebula.top}%`,
            background: `radial-gradient(circle, hsl(${nebula.hue}, 70%, 50%) 0%, transparent 70%)`,
            animation: `float-nebula ${nebula.animationDuration}s ease-in-out infinite`
          }}
        />
      ))}

      {/* Floating satellites */}
      {satellites.map((satellite) => (
        <div
          key={`satellite-${satellite.id}`}
          className="absolute opacity-40"
          style={{
            left: `${satellite.left}%`,
            top: `${satellite.top}%`,
            animation: `orbit-slow ${satellite.animationDuration}s linear infinite ${satellite.direction}`
          }}
        >
          <div 
            className="bg-gradient-to-r from-primary to-secondary rounded-sm"
            style={{
              width: `${satellite.size}px`,
              height: `${satellite.size * 0.6}px`,
              position: 'relative'
            }}
          >
            {/* Satellite solar panels */}
            <div 
              className="absolute -left-1 top-1/2 -translate-y-1/2 bg-accent/60"
              style={{
                width: `${satellite.size * 0.3}px`,
                height: `${satellite.size * 0.8}px`
              }}
            />
            <div 
              className="absolute -right-1 top-1/2 -translate-y-1/2 bg-accent/60"
              style={{
                width: `${satellite.size * 0.3}px`,
                height: `${satellite.size * 0.8}px`
              }}
            />
          </div>
        </div>
      ))}

      {/* Space debris */}
      {debris.map((particle) => (
        <div
          key={`debris-${particle.id}`}
          className="absolute bg-muted-foreground rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            opacity: particle.opacity,
            animation: `drift ${particle.animationDuration}s linear infinite`
          }}
        />
      ))}

      {/* Shooting stars (rare) */}
      <div 
        className="absolute w-1 h-1 bg-white rounded-full opacity-80"
        style={{
          left: '10%',
          top: '20%',
          animation: 'shooting-star 8s ease-out infinite'
        }}
      />
      <div 
        className="absolute w-1 h-1 bg-primary rounded-full opacity-60"
        style={{
          left: '80%',
          top: '60%',
          animation: 'shooting-star 12s ease-out infinite 4s'
        }}
      />
    </div>
  );
};

export default SpaceBackground;