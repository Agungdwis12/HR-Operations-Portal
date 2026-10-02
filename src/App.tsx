import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Context
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Layout
import { DashboardLayout } from "./layouts/DashboardLayout";
import { AuthLayout } from "./layouts/AuthLayout";

// Auth
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { VerifyOTP } from "./pages/auth/VerifyOTP";
import { ResetPassword } from "./pages/auth/ResetPassword";

// Dashboard
import PayrollDashboard from "./pages/PayrollDashboard";
import BappDashboard from "./pages/BappDashboard";
import CostDashboard from "./pages/CostDashboard";

// Other
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";

const ProtectedRoute: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-right" />

          <Routes>
            {/* ROOT */}
            <Route path="/" element={<Navigate to="/dashboard/payroll" replace />} />

            {/* AUTH */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />

              <Route path="register" element={<Register />} />

              <Route path="forgot-password" element={<ForgotPassword />} />

              <Route path="verify-otp" element={<VerifyOTP />} />

              <Route path="reset-password" element={<ResetPassword />} />
            </Route>

            {/* PROTECTED APP */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              {/* Dashboard Payroll */}
              <Route path="/dashboard/payroll" element={<PayrollDashboard />} />

              {/* BAPP */}
              <Route path="/dashboard/bapp" element={<BappDashboard />} />

              {/* Cost */}
              <Route path="/dashboard/cost" element={<CostDashboard />} />

              {/* Profile */}
              <Route path="/profile" element={<Profile />} />

              {/* Settings */}
              <Route path="/settings" element={<Settings />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/dashboard/payroll" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
