import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CosmicCardProps {
  children: React.ReactNode;
  className?: string;
  glowing?: boolean;
  floating?: boolean;
}

const CosmicCard = ({ children, className, glowing = false, floating = false }: CosmicCardProps) => {
  return (
    <Card
      className={cn(
        "bg-card/50 backdrop-blur-sm border-border/50 shadow-card",
        "hover:bg-card/70 hover:border-border/70 transition-all duration-300",
        glowing && "shadow-glow animate-glow-pulse",
        floating && "animate-float",
        className
      )}
    >
      {children}
    </Card>
  );
};

export default CosmicCard;