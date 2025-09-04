import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Fingerprint, Shield, Zap, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (user: { email: string; name: string }) => void;
}

const AuthModal = ({ open, onOpenChange, onLogin }: AuthModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [matrixChars, setMatrixChars] = useState<string[]>([]);

  // Generate matrix rain effect
  useEffect(() => {
    const chars = '01010110101011010101110101';
    const matrixArray = Array.from({ length: 50 }, () => 
      chars[Math.floor(Math.random() * chars.length)]
    );
    setMatrixChars(matrixArray);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onLogin({ 
      email: loginData.email, 
      name: loginData.email.split('@')[0] 
    });
    setIsLoading(false);
    onOpenChange(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onLogin({ 
      email: signupData.email, 
      name: signupData.name 
    });
    setIsLoading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card/95 backdrop-blur-xl border-primary/30 shadow-cosmic">
        {/* Matrix Rain Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg">
          {matrixChars.map((char, i) => (
            <div
              key={i}
              className="absolute text-primary/20 text-xs font-mono animate-matrix-rain"
              style={{
                left: `${(i * 2) % 100}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${3 + (i % 3)}s`
              }}
            >
              {char}
            </div>
          ))}
        </div>

        {/* Hologram Scanner Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-hologram-flicker rounded-lg" />

        <DialogHeader className="relative z-10">
          <DialogTitle className="text-center text-2xl font-heading text-primary flex items-center justify-center gap-2">
            <Shield className="h-6 w-6 animate-cosmic-pulse" />
            Mission Access Terminal
          </DialogTitle>
        </DialogHeader>

        <div className="relative z-10">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="login" className="data-[state=active]:bg-primary/20">
                <Fingerprint className="h-4 w-4 mr-2" />
                Access Granted
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-primary/20">
                <Rocket className="h-4 w-4 mr-2" />
                Join Mission
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6 animate-particle-beam">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-foreground/90">Command Access ID</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="commander@exovision.space"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="bg-input/50 backdrop-blur-sm border-primary/30 focus:border-primary focus:ring-primary/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-foreground/90">Security Clearance</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••••••"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="bg-input/50 backdrop-blur-sm border-primary/30 focus:border-primary focus:ring-primary/50 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className={cn(
                    "w-full bg-primary hover:bg-primary/90 text-primary-foreground",
                    "shadow-glow hover:shadow-cosmic transition-all duration-300",
                    isLoading && "animate-cosmic-pulse"
                  )}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Initialize Mission Access
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Access Level: <span className="text-primary font-medium">Commander</span>
                </p>
              </div>
            </TabsContent>

            <TabsContent value="signup" className="space-y-6 animate-particle-beam">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-foreground/90">Mission Callsign</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Commander Nova"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    className="bg-input/50 backdrop-blur-sm border-primary/30 focus:border-primary focus:ring-primary/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-foreground/90">Command Access ID</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="nova@exovision.space"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    className="bg-input/50 backdrop-blur-sm border-primary/30 focus:border-primary focus:ring-primary/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-foreground/90">Security Protocol</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••••••"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      className="bg-input/50 backdrop-blur-sm border-primary/30 focus:border-primary focus:ring-primary/50 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className={cn(
                    "w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground",
                    "shadow-glow hover:shadow-cosmic transition-all duration-300",
                    isLoading && "animate-cosmic-pulse"
                  )}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Zap className="h-4 w-4 mr-2 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      <Rocket className="h-4 w-4 mr-2" />
                      Join the Mission
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  By joining, you agree to the <span className="text-primary">Interstellar Mission Protocol</span>
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;