import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Bell, Shield, Globe, Monitor, Save } from 'lucide-react';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';

export const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [payrollAlerts, setPayrollAlerts] = useState(true);
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [language, setLanguage] = useState('English (US)');

  const handleSaveSettings = () => {
    toast.success('System configuration and preferences saved!');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          System Configuration & Preferences
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Customize theme interface, alert channels, security enforcement, and localized parameters.
        </p>
      </div>

      {/* Theme Settings */}
      <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center">
          <Monitor className="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" /> Interface Theme Appearance
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Dark / Light Display Mode</p>
            <p className="text-[11px] text-slate-500">Currently active theme: <span className="font-bold uppercase text-indigo-600 dark:text-indigo-400">{theme}</span></p>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:scale-105 transition-transform cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </button>
        </div>
      </div>

      {/* Notifications Settings */}
      <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center">
          <Bell className="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" /> Broadcast & Alert Preferences
        </h3>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-slate-700 dark:text-slate-300 font-medium">Email digests for leave requests</span>
            <input
              type="checkbox"
              checked={emailNotifs}
              onChange={e => setEmailNotifs(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-slate-700 dark:text-slate-300 font-medium">Monthly payroll disbursement alerts</span>
            <input
              type="checkbox"
              checked={payrollAlerts}
              onChange={e => setPayrollAlerts(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Security & Localization */}
      <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center">
          <Globe className="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" /> Localization & Language
        </h3>

        <div className="max-w-xs">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">System Language</label>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
          >
            <option>English (US)</option>
            <option>Spanish (ES)</option>
            <option>French (FR)</option>
            <option>German (DE)</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="gradient" onClick={handleSaveSettings} icon={<Save className="w-4 h-4" />}>
          Save Preferences
        </Button>
      </div>
    </div>
  );
};
