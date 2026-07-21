import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Download, FileSpreadsheet, FileText, BarChart3, Filter, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { CHART_DATA } from '../data/dummyData';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { formatCurrency } from '../utils/cn';
import toast from 'react-hot-toast';

export const Reports: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || 'Admin';
  const canViewReports = ['Admin', 'HR Manager', 'Department Head'].includes(role);

  if (!canViewReports) {
    return (
      <div className="p-8 max-w-md mx-auto text-center space-y-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl my-12">
        <ShieldCheck className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Access Restricted</h2>
        <p className="text-xs text-slate-500">
          Your current role (<span className="font-bold text-indigo-600 dark:text-indigo-400">{role}</span>) does not have authorization to view executive reports.
        </p>
        <Link to="/dashboard">
          <Button variant="gradient" size="sm" className="mt-2">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  const handleExport = (type: string) => {
    toast.success(`Exporting enterprise HR analytics report as ${type}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Analytics & Executive Reports
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Generate executive summaries, headcount growth, payroll ledger reports, and audit logs.
          </p>
        </div>
        <div className="flex items-center space-x-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('PDF')}
            icon={<FileText className="w-4 h-4 text-rose-500" />}
          >
            Export PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleExport('Excel')}
            icon={<FileSpreadsheet className="w-4 h-4 text-emerald-500" />}
          >
            Export Excel
          </Button>
        </div>
      </div>

      {/* Department Budget vs Headcount Table */}
      <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center">
          <BarChart3 className="w-4 h-4 mr-2 text-blue-500" /> Department Financial & Headcount Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 font-semibold uppercase text-[11px]">
              <tr>
                <th className="px-4 py-3">Division Name</th>
                <th className="px-4 py-3">Active Headcount</th>
                <th className="px-4 py-3">Annual Budget</th>
                <th className="px-4 py-3">Cost per Employee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {CHART_DATA.departmentBreakdown.map((dept, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">{dept.name}</td>
                  <td className="px-4 py-3 font-semibold">{dept.employees} Staff</td>
                  <td className="px-4 py-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    {formatCurrency(dept.budget)}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-300">
                    {formatCurrency(Math.round(dept.budget / dept.employees))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
