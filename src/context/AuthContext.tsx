import React, { createContext, useContext, useState, useEffect } from "react";

import { UserRole } from "../types";

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
  loginWithProvider: (provider: "google" | "microsoft") => Promise<boolean>;
  register: (details: Partial<AuthUser>) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  verifyOTP: (otp: string) => Promise<boolean>;
  resetPassword: (password: string) => Promise<boolean>;
  switchRole: (role: UserRole) => void;
  resetEmailForOTP: string;
}

// =====================================================
// DEFAULT USER
// =====================================================

const DEFAULT_USER: AuthUser = {
  id: "user-001",
  employeeId: "E001",
  name: "Andi Pratama",
  email: "andi@infomedia.test",
  role: "Employee",
  avatar: "https://i.pravatar.cc/150?img=11",
  department: "HR",
  designation: "HR Staff",
  phone: "081234567801",
};

// =====================================================
// DEMO EMPLOYEE ACCOUNTS
// =====================================================

const DEMO_USERS: AuthUser[] = [
  {
    id: "user-001",
    employeeId: "E001",
    name: "Andi Pratama",
    email: "andi@infomedia.test",
    role: "Employee",
    avatar: "https://i.pravatar.cc/150?img=11",
    department: "HR",
    designation: "HR Staff",
    phone: "081234567801",
  },
  {
    id: "user-002",
    employeeId: "E002",
    name: "Budi Santoso",
    email: "budi@infomedia.test",
    role: "Employee",
    avatar: "https://i.pravatar.cc/150?img=12",
    department: "IT",
    designation: "Software Engineer",
    phone: "081234567802",
  },
  {
    id: "user-003",
    employeeId: "E003",
    name: "Citra Lestari",
    email: "citra@infomedia.test",
    role: "Employee",
    avatar: "https://i.pravatar.cc/150?img=13",
    department: "Finance",
    designation: "Finance Analyst",
    phone: "081234567803",
  },
  {
    id: "user-005",
    employeeId: "E005",
    name: "Eka Wulandari",
    email: "eka@infomedia.test",
    role: "Employee",
    avatar: "https://i.pravatar.cc/150?img=15",
    department: "HR",
    designation: "Payroll Specialist",
    phone: "081234567805",
  },
];

// =====================================================
// CONTEXT
// =====================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// =====================================================
// PROVIDER
// =====================================================

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem("ems_auth_user");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_USER;
      }
    }

    return DEFAULT_USER;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [resetEmailForOTP, setResetEmailForOTP] = useState<string>("agung@gmail.com");

  // ===================================================
  // SAVE LOGIN USER TO LOCAL STORAGE
  // ===================================================

  useEffect(() => {
    if (user) {
      localStorage.setItem("ems_auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("ems_auth_user");
    }
  }, [user]);

  // ===================================================
  // LOGIN
  // ===================================================

  const login = async (email: string): Promise<boolean> => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    // Cari akun demo berdasarkan email
    const demoUser = DEMO_USERS.find((item) => item.email.toLowerCase() === email.toLowerCase());

    let loggedUser: AuthUser;

    if (demoUser) {
      // Jika email adalah akun demo Employee
      loggedUser = demoUser;
    } else {
      // Jika bukan akun demo,
      // tetap gunakan default user
      loggedUser = {
        ...DEFAULT_USER,
        email,
        name:
          email
            .split("@")[0]
            .replace(".", " ")
            .replace(/\b\w/g, (letter) => letter.toUpperCase()) || DEFAULT_USER.name,
      };
    }

    setUser(loggedUser);
    setIsLoading(false);

    return true;
  };

  // ===================================================
  // LOGIN WITH GOOGLE / MICROSOFT
  // ===================================================

  const loginWithProvider = async (provider: "google" | "microsoft"): Promise<boolean> => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const loggedUser: AuthUser = {
      ...DEFAULT_USER,
      name: provider === "google" ? "Google Authenticated User" : "Microsoft SSO User",
      email: `${provider}.user@nexuscorp.com`,
    };

    setUser(loggedUser);
    setIsLoading(false);

    return true;
  };

  // ===================================================
  // REGISTER
  // ===================================================

  const register = async (details: Partial<AuthUser>): Promise<boolean> => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newUser: AuthUser = {
      id: `user-${Date.now()}`,

      employeeId: details.employeeId || `EMP-${Math.floor(1000 + Math.random() * 9000)}`,

      name: details.name || "New Registered User",

      email: details.email || "new.user@nexuscorp.com",

      role: details.role || "Employee",

      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",

      department: details.department || "Engineering",

      designation: details.designation || "Software Engineer",

      phone: details.phone || "+1 (555) 000-0000",
    };

    setUser(newUser);
    setIsLoading(false);

    return true;
  };

  // ===================================================
  // FORGOT PASSWORD
  // ===================================================

  const forgotPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 600));

    setResetEmailForOTP(email);
    setIsLoading(false);

    return true;
  };

  // ===================================================
  // VERIFY OTP
  // ===================================================

  const verifyOTP = async (otp: string): Promise<boolean> => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsLoading(false);

    return otp.length === 6;
  };

  // ===================================================
  // RESET PASSWORD
  // ===================================================

  const resetPassword = async (): Promise<boolean> => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsLoading(false);

    return true;
  };

  // ===================================================
  // LOGOUT
  // ===================================================

  const logout = () => {
    setUser(null);
  };

  // ===================================================
  // SWITCH ROLE
  // ===================================================

  const switchRole = (role: UserRole) => {
    if (user) {
      setUser({
        ...user,
        role,
      });
    }
  };

  // ===================================================
  // PROVIDER
  // ===================================================

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

// =====================================================
// USE AUTH
// =====================================================

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
