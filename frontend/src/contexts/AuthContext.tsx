import React, { createContext, useContext, useState, useEffect } from 'react';
import { AUTH_ME_URL, AUTH_LOGOUT_URL } from '@/config/api.config';

interface Role {
  id: number;
  name: string;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  // Add any additional user fields from your API
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const response = await fetch(AUTH_ME_URL, {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setToken(storedToken);
          } else {
            // Token is invalid or expired
            await logout();
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          await logout();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (newToken: string) => {
    try {
      const response = await fetch(AUTH_ME_URL, {
        headers: {
          'Authorization': `Bearer ${newToken}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setToken(newToken);
        localStorage.setItem('token', newToken);
      } else {
        throw new Error('Invalid token');
      }
    } catch (error) {
      console.error('Login error:', error);
      await logout();
      throw error;
    }
  };

  const logout = async () => {
    try {
      const currentToken = token;
      if (currentToken) {
        // Call logout API if available
        await fetch(AUTH_LOGOUT_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${currentToken}`
          }
        }).catch(console.error); // Don't throw if logout API fails
      }
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
    isLoading,
    setUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 