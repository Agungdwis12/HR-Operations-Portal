import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '../types';

export interface AuthUser {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  designation: string;
  phone?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  loginWithProvider: (provider: 'google' | 'microsoft') => Promise<boolean>;
  register: (details: Partial<AuthUser>) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  verifyOTP: (otp: string) => Promise<boolean>;
  resetPassword: (password: string) => Promise<boolean>;
  switchRole: (role: UserRole) => void;
  resetEmailForOTP: string;
}

const DEFAULT_USER: AuthUser = {
  id: 'user-001',
  employeeId: 'EMP-1001',
  name: 'Alexander Vance',
  email: 'alexander.vance@nexuscorp.com',
  role: 'Admin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  department: 'Engineering',
  designation: 'VP of Global Engineering',
  phone: '+1 (555) 234-5678',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('ems_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER; // Default logged in for smooth demo experience
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resetEmailForOTP, setResetEmailForOTP] = useState<string>('alexander.vance@nexuscorp.com');

  useEffect(() => {
    if (user) {
      localStorage.setItem('ems_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ems_auth_user');
    }
  }, [user]);

  const login = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(res => setTimeout(res, 800));
    
    const loggedUser: AuthUser = {
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()) || DEFAULT_USER.name,
    };
    setUser(loggedUser);
    setIsLoading(false);
    return true;
  };

  const loginWithProvider = async (provider: 'google' | 'microsoft'): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(res => setTimeout(res, 1000));
    const loggedUser: AuthUser = {
      ...DEFAULT_USER,
      name: provider === 'google' ? 'Google Authenticated User' : 'Microsoft SSO User',
      email: `${provider}.user@nexuscorp.com`,
    };
    setUser(loggedUser);
    setIsLoading(false);
    return true;
  };

  const register = async (details: Partial<AuthUser>): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(res => setTimeout(res, 1000));
    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      employeeId: details.employeeId || `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      name: details.name || 'New Registered User',
      email: details.email || 'new.user@nexuscorp.com',
      role: details.role || 'Employee',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      department: details.department || 'Engineering',
      designation: details.designation || 'Software Engineer',
      phone: details.phone || '+1 (555) 000-0000',
    };
    setUser(newUser);
    setIsLoading(false);
    return true;
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(res => setTimeout(res, 600));
    setResetEmailForOTP(email);
    setIsLoading(false);
    return true;
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(res => setTimeout(res, 600));
    setIsLoading(false);
    return otp.length === 6;
  };

  const resetPassword = async (): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(res => setTimeout(res, 800));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithProvider,
        register,
        logout,
        forgotPassword,
        verifyOTP,
        resetPassword,
        switchRole,
        resetEmailForOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
