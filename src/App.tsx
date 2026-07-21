import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layouts
import { DashboardLayout } from './layouts/DashboardLayout';
import { AuthLayout } from './layouts/AuthLayout';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { VerifyOTP } from './pages/auth/VerifyOTP';
import { ResetPassword } from './pages/auth/ResetPassword';

// Main Application Pages
import { Dashboard } from './pages/Dashboard';
import { Employees } from './pages/Employees';
import { EmployeeDetails } from './pages/EmployeeDetails';
import { AddEmployee } from './pages/AddEmployee';
import { EditEmployee } from './pages/EditEmployee';
import { Departments } from './pages/Departments';
import { Attendance } from './pages/Attendance';
import { Payroll } from './pages/Payroll';
import { LeaveManagement } from './pages/LeaveManagement';
import { Performance } from './pages/Performance';
import { Reports } from './pages/Reports';
import { CalendarPage } from './pages/CalendarPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { MessagesPage } from './pages/MessagesPage';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { NotFound } from './pages/NotFound';

// Protected Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#0f172a',
                color: '#f8fafc',
                fontSize: '12px',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '12px 16px',
              },
            }}
          />

          <Routes>
            {/* Redirect Root to Dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Authentication Layout Routes */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="verify-otp" element={<VerifyOTP />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>

            {/* Protected Dashboard Layout Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/employees/add" element={<AddEmployee />} />
              <Route path="/employees/edit/:id" element={<EditEmployee />} />
              <Route path="/employees/:id" element={<EmployeeDetails />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/payroll" element={<Payroll />} />
              <Route path="/leaves" element={<LeaveManagement />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
