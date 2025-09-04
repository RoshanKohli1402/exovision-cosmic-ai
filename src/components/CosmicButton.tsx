import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CosmicButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const CosmicButton = ({ 
  children, 
  variant = 'primary', 
  size = 'default', 
  className, 
  onClick,
  disabled 
}: CosmicButtonProps) => {
  const baseClasses = "font-body font-medium transition-all duration-300 border";
  
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 border-primary shadow-glow hover:shadow-cosmic",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-secondary shadow-md hover:shadow-glow",
    outline: "bg-card/30 backdrop-blur-sm border-2 border-primary/50 text-primary hover:bg-primary/20 hover:border-primary hover:shadow-glow"
  };

  return (
    <Button
      className={cn(baseClasses, variantClasses[variant], className)}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default CosmicButton;