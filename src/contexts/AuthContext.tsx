import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '@/config/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      validateToken();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const validateToken = async () => {
    try {
      const response = await apiRequest('/api/auth/validate', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('token');
        setToken(null);
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApiResponse = async (response: Response) => {
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      const text = await response.text();
      throw new Error(text || 'Server error occurred');
    }
  };

  const login = async (email: string, password: string) => {
    const response = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await handleApiResponse(response);
      throw new Error(error.message || 'Login failed');
    }

    const { token: newToken, user: userData } = await handleApiResponse(response);
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      console.log('Attempting registration with:', { name, email });
      
      const response = await apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });

      console.log('Registration response status:', response.status);
      console.log('Registration response headers:', response.headers);

      if (!response.ok) {
        const errorData = await handleApiResponse(response);
        throw new Error(errorData.message || `Registration failed with status: ${response.status}`);
      }

      const result = await handleApiResponse(response);
      console.log('Registration successful:', result);
      return result;
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Network error or server is not responding');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const forgotPassword = async (email: string) => {
    const response = await apiRequest('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await handleApiResponse(response);
      throw new Error(error.message || 'Failed to send reset email');
    }
  };

  const resetPassword = async (token: string, password: string) => {
    const response = await apiRequest('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });

    if (!response.ok) {
      const error = await handleApiResponse(response);
      throw new Error(error.message || 'Password reset failed');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      register,
      logout,
      isLoading,
      forgotPassword,
      resetPassword
    }}>
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
