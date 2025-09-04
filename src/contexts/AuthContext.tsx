import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  showLoginTransition: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [showLoginTransition, setShowLoginTransition] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('exovision-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('exovision-user', JSON.stringify(userData));
    setShowLoginTransition(true);
    
    // Hide transition after animation completes
    setTimeout(() => {
      setShowLoginTransition(false);
    }, 3000);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('exovision-user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    showLoginTransition
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};