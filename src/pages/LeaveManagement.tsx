import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LEAVE_REQUESTS } from '../data/dummyData';
import { LeaveRequest } from '../types';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { Calendar, Plus, CheckCircle, XCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export const LeaveManagement: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || 'Admin';
  const canApproveLeave = ['Admin', 'HR Manager', 'Department Head'].includes(role);

  const [leavesList, setLeavesList] = useState<LeaveRequest[]>(LEAVE_REQUESTS);
  const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // New Leave Form State
  const [leaveType, setLeaveType] = useState<'Paid Leave' | 'Sick Leave' | 'Casual Leave'>('Paid Leave');
  const [startDate, setStartDate] = useState('2026-08-05');
  const [endDate, setEndDate] = useState('2026-08-08');
  const [leaveReason, setLeaveReason] = useState('');

  const handleStatusUpdate = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setLeavesList(prev =>
      prev.map(l => (l.id === id ? { ...l, status: newStatus } : l))
    );
    toast.success(`Leave request ${newStatus.toLowerCase()}!`);
  };

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveReason) {
      toast.error('Please specify leave reason');
      return;
    }

    const newReq: LeaveRequest = {
      id: `lvr-${Date.now()}`,
      employeeId: 'EMP-1001',
      employeeName: 'Alexander Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      department: 'Engineering',
      type: leaveType,
      startDate,
      endDate,
      days: 3,
      reason: leaveReason,
      status: 'Pending',
      appliedOn: new Date().toISOString().split('T')[0],
    };

    setLeavesList([newReq, ...leavesList]);
    toast.success('Leave application submitted for manager approval!');
    setIsApplyModalOpen(false);
    setLeaveReason('');
  };

  const filteredLeaves = leavesList.filter(
    l => activeTab === 'All' || l.status === activeTab
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Leave & Time-Off Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track employee vacation days, medical leave requests, and approval workflows.
          </p>
        </div>
        <Button
          variant="gradient"
          size="sm"
          onClick={() => setIsApplyModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Request Time Off
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs">
        {['All', 'Pending', 'Approved', 'Rejected'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`px-3 py-1.5 font-semibold rounded-lg transition-all ${
              activeTab === tab
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab} Requests
          </button>
        ))}
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 dark:bg-slate-800/60 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Leave Type</th>
                <th className="px-4 py-3">Start Date</th>
                <th className="px-4 py-3">End Date</th>
                <th className="px-4 py-3">Duration</th>
                <th className="px-4 py-3 max-w-xs">Reason</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLeaves.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 flex items-center space-x-3">
                    <img src={item.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100">{item.employeeName}</p>
                      <p className="text-[10px] text-slate-400">{item.department}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">{item.type}</td>
                  <td className="px-4 py-3 text-slate-500">{item.startDate}</td>
                  <td className="px-4 py-3 text-slate-500">{item.endDate}</td>
                  <td className="px-4 py-3 font-bold text-slate-800 dark:text-slate-200">{item.days} Days</td>
                  <td className="px-4 py-3 text-slate-500 max-w-xs truncate">{item.reason}</td>
                  <td className="px-4 py-3"><Badge variant="status">{item.status}</Badge></td>
                  <td className="px-4 py-3 text-right">
                    {canApproveLeave && item.status === 'Pending' ? (
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleStatusUpdate(item.id, 'Approved')}
                          icon={<CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(item.id, 'Rejected')}
                          icon={<XCircle className="w-3.5 h-3.5 text-rose-500" />}
                        >
                          Reject
                        </Button>
                      </div>
                    ) : item.status === 'Pending' ? (
                      <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium flex items-center justify-end">
                        <Clock className="w-3 h-3 mr-1 inline" /> Pending Review
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">Decision Recorded</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Leave Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title="Submit Time-Off Request"
        description="Select dates and provide justification for supervisor authorization."
      >
        <form onSubmit={handleApplyLeave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Leave Category
            </label>
            <select
              value={leaveType}
              onChange={e => setLeaveType(e.target.value as typeof leaveType)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100"
            >
              <option value="Paid Leave">Paid Annual Vacation</option>
              <option value="Sick Leave">Medical / Sick Leave</option>
              <option value="Casual Leave">Casual Personal Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Start Date"
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
            <Input
              label="End Date"
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Reason / Explanation
            </label>
            <textarea
              rows={3}
              value={leaveReason}
              onChange={e => setLeaveReason(e.target.value)}
              placeholder="State reason for leave request..."
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-xs sm:text-sm text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3">
            <Button type="button" variant="outline" onClick={() => setIsApplyModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient">
              Submit Application
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
