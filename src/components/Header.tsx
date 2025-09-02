import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Telescope, Menu, X } from 'lucide-react';
import { useState } from 'react';
import CosmicButton from './CosmicButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/problem', label: 'Problem' },
    { path: '/solution', label: 'Solution' },
    { path: '/prototype', label: 'Prototype' },
    { path: '/team', label: 'Team' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <Telescope className="w-8 h-8 text-primary" />
            <span className="font-heading text-xl font-bold text-foreground">ExoVision</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-body text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path) 
                    ? 'text-primary' 
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <CosmicButton variant="outline" size="sm">
              Login
            </CosmicButton>
            <CosmicButton variant="primary" size="sm">
              Sign Up
            </CosmicButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/20">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-body text-sm font-medium transition-colors hover:text-primary px-2 py-1 ${
                    isActive(item.path) 
                      ? 'text-primary' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border/20">
                <CosmicButton variant="outline" size="sm">
                  Login
                </CosmicButton>
                <CosmicButton variant="primary" size="sm">
                  Sign Up
                </CosmicButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;