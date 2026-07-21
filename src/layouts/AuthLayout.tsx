import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Building, ShieldCheck, Users, Zap, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Toaster } from 'react-hot-toast';

export const AuthLayout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden font-sans">
      <Toaster position="top-right" />

      {/* Dynamic Animated Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/25 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/25 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-[140px] pointer-events-none" />

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all text-white z-20"
        title="Toggle Light/Dark Theme"
      >
        {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-200" />}
      </button>

      {/* Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-white/10 bg-slate-900/60 backdrop-blur-2xl shadow-2xl z-10 my-auto">
        {/* Left Side: Animated Brand Illustration & Enterprise Stats */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-blue-900/40 via-indigo-900/40 to-slate-900/80 p-8 sm:p-10 flex-col justify-between border-r border-white/10 relative">
          <div className="relative z-10">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <Building className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                NEXUS<span className="text-blue-400">EMS</span>
              </span>
            </Link>

            <div className="mt-12 space-y-4">
              <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-300 bg-blue-500/20 rounded-full border border-blue-400/30">
                Enterprise HR Suite 2026
              </span>
              <h1 className="text-2xl font-bold text-white leading-tight">
                Empowering Modern Workforces with Intelligent Analytics.
              </h1>
              <p className="text-xs text-slate-300 leading-relaxed">
                Streamline global employee directories, payroll automation, leave tracking, and real-time performance insights in one unified dashboard.
              </p>
            </div>
          </div>

          {/* Key Metric Highlights */}
          <div className="relative z-10 grid grid-cols-2 gap-3 mt-8 pt-6 border-t border-white/10">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center space-x-2 text-blue-400">
                <Users className="w-4 h-4" />
                <span className="text-xs font-semibold">100k+ Active</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Employees Managed</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center space-x-2 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-semibold">99.99% SOC2</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Security Compliant</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs col-span-2">
              <div className="flex items-center space-x-2 text-amber-400">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-semibold">Automated Payroll & Attendance</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Zero-touch tax & monthly leave calculation</p>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 mt-6 relative z-10">
            © 2026 Nexus Corp. Enterprise Ready.
          </p>
        </div>

        {/* Right Side: Auth Form Views */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
