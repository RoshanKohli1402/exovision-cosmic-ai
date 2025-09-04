import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import CosmicButton from './CosmicButton';
import AuthModal from './AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import LoginTransition from './LoginTransition';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const location = useLocation();
  const { user, logout, login, isAuthenticated } = useAuth();

  const navigation = [
    { path: '/', label: 'Home' },
    { path: '/problem', label: 'Problem' },
    { path: '/solution', label: 'Solution' },
    { path: '/prototype', label: 'Prototype' },
    { path: '/team', label: 'Team' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <>
      <LoginTransition />
      <header className="relative z-20 bg-card/20 backdrop-blur-xl border-b border-border/30 shadow-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-cosmic rounded-full flex items-center justify-center group-hover:animate-cosmic-pulse">
                <div className="w-4 h-4 bg-white rounded-full" />
              </div>
              <span className="text-xl font-heading font-bold text-primary group-hover:text-cosmic-glow transition-colors">
                ExoVision
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActivePath(item.path) 
                      ? 'text-primary shadow-glow' 
                      : 'text-foreground/70'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Authentication Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-card/50 rounded-lg border border-primary/20">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {user?.name}
                    </span>
                  </div>
                  <CosmicButton
                    variant="outline"
                    size="sm"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </CosmicButton>
                </div>
              ) : (
                <CosmicButton
                  variant="primary"
                  onClick={() => setAuthModalOpen(true)}
                  className="animate-cosmic-pulse"
                >
                  <User className="h-4 w-4 mr-2" />
                  Mission Access
                </CosmicButton>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-card/50 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-foreground" />
              ) : (
                <Menu className="h-5 w-5 text-foreground" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border/30 mt-4 animate-fade-in">
              <nav className="space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block text-sm font-medium transition-colors hover:text-primary ${
                      isActivePath(item.path) 
                        ? 'text-primary' 
                        : 'text-foreground/70'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-border/30">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 px-3 py-2 bg-card/50 rounded-lg border border-primary/20">
                        <User className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">
                          {user?.name}
                        </span>
                      </div>
                      <CosmicButton
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </CosmicButton>
                    </div>
                  ) : (
                    <CosmicButton
                      variant="primary"
                      onClick={() => {
                        setAuthModalOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full animate-cosmic-pulse"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Mission Access
                    </CosmicButton>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        onLogin={login}
      />
    </>
  );
};

export default Header;