import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PAYROLL_RECORDS } from '../data/dummyData';
import { PayrollRecord } from '../types';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { CreditCard, Download, DollarSign, Send, CheckCircle, Search, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../utils/cn';
import toast from 'react-hot-toast';

export const Payroll: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || 'Admin';
  const canManagePayroll = ['Admin', 'HR Manager'].includes(role);
  const isEmployeeRole = role === 'Employee';

  const [payrollList, setPayrollList] = useState<PayrollRecord[]>(PAYROLL_RECORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRunModalOpen, setIsRunModalOpen] = useState(false);

  const totalNetPayroll = payrollList.reduce((acc, p) => acc + p.netSalary, 0);
  const totalTax = payrollList.reduce((acc, p) => acc + p.tax, 0);
  const totalBonus = payrollList.reduce((acc, p) => acc + p.bonus, 0);

  const handleDownloadPayslip = (employeeName: string, month: string) => {
    toast.success(`Downloading payslip PDF for ${employeeName} (${month})`);
  };

  const handleProcessBatch = () => {
    setPayrollList(prev =>
      prev.map(p => ({ ...p, status: 'Paid' }))
    );
    toast.success('July 2026 Payroll Batch disbursed to bank accounts!');
    setIsRunModalOpen(false);
  };

  const filteredPayroll = payrollList.filter(
    p =>
      p.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Payroll & Compensation
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Automated monthly salary calculation, bonuses, tax withholdings, and payslip generation.
          </p>
        </div>
        <div className="flex items-center space-x-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success('Exporting payroll ledger...')}
            icon={<Download className="w-4 h-4" />}
          >
            Export Ledger
          </Button>
          {canManagePayroll && (
            <Button
              variant="gradient"
              size="sm"
              onClick={() => setIsRunModalOpen(true)}
              icon={<Send className="w-4 h-4" />}
            >
              Process Batch
            </Button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Net Disbursement</p>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
            {formatCurrency(totalNetPayroll)}
          </h3>
          <p className="text-[10px] text-slate-400 mt-1">July 2026 Total</p>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Performance Bonuses</p>
          <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {formatCurrency(totalBonus)}
          </h3>
          <p className="text-[10px] text-slate-400 mt-1">25 Eligible Staff</p>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tax Withheld</p>
          <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
            {formatCurrency(totalTax)}
          </h3>
          <p className="text-[10px] text-slate-400 mt-1">IRS & State Tax</p>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Batch Status</p>
          <div className="mt-2 flex items-center space-x-2">
            <Badge variant="status">Paid</Badge>
            <span className="text-xs text-slate-500 font-medium">SOC2 Audit Passed</span>
          </div>
        </div>
      </div>

      {/* Filter and Table */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search employee or department..."
            className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 dark:bg-slate-800/60 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Month</th>
                <th className="px-4 py-3">Basic Salary</th>
                <th className="px-4 py-3">Bonus</th>
                <th className="px-4 py-3">Deductions</th>
                <th className="px-4 py-3">Net Salary</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPayroll.map(pay => (
                <tr key={pay.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 flex items-center space-x-3">
                    <img src={pay.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100">{pay.employeeName}</p>
                      <p className="text-[10px] text-slate-400">{pay.designation}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">{pay.department}</td>
                  <td className="px-4 py-3 text-slate-500 font-medium">{pay.month}</td>
                  <td className="px-4 py-3 font-mono">{formatCurrency(pay.basicSalary)}</td>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    +{formatCurrency(pay.bonus)}
                  </td>
                  <td className="px-4 py-3 font-mono text-rose-500">-{formatCurrency(pay.deductions)}</td>
                  <td className="px-4 py-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {formatCurrency(pay.netSalary)}
                  </td>
                  <td className="px-4 py-3"><Badge variant="status">{pay.status}</Badge></td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadPayslip(pay.employeeName, pay.month)}
                      icon={<Download className="w-3.5 h-3.5" />}
                    >
                      Payslip
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Batch Modal */}
      <Modal
        isOpen={isRunModalOpen}
        onClose={() => setIsRunModalOpen(false)}
        title="Authorize Payroll Disbursement Batch"
        description="Review total payroll calculations for July 2026 before executing direct deposit transfer."
      >
        <div className="space-y-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Eligible Employees:</span>
              <span className="font-bold">{payrollList.length} Staff</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Net Amount:</span>
              <span className="font-extrabold text-blue-600 text-sm">{formatCurrency(totalNetPayroll)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Bank Partner:</span>
              <span className="font-bold">Silicon Valley Bank (SVB ACH)</span>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3">
            <Button variant="outline" onClick={() => setIsRunModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="gradient" onClick={handleProcessBatch}>
              Confirm Disbursement
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
