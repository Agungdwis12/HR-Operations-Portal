import React, { useState } from 'react';
import { ATTENDANCE_RECORDS } from '../data/dummyData';
import { AttendanceRecord } from '../types';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/ui/Button';
import { Clock, Calendar as CalendarIcon, CheckCircle2, AlertTriangle, XCircle, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export const Attendance: React.FC = () => {
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>(ATTENDANCE_RECORDS);
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const presentCount = attendanceList.filter(a => a.status === 'Present').length;
  const lateCount = attendanceList.filter(a => a.status === 'Late').length;
  const leaveCount = attendanceList.filter(a => a.status === 'On Leave' || a.status === 'Half Day').length;
  const absentCount = attendanceList.filter(a => a.status === 'Absent').length;

  const handlePunchToggle = () => {
    if (!isCheckedIn) {
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setIsCheckedIn(true);
      setCheckInTime(timeStr);
      toast.success(`Clocked IN successfully at ${timeStr}`);
    } else {
      setIsCheckedIn(false);
      toast.success('Clocked OUT successfully for today!');
    }
  };

  const filteredLogs = attendanceList.filter(item => {
    const matchesSearch =
      item.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Attendance & Shift Tracker
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time shift clocking, biometric logs, overtime calculation, and absence management.
          </p>
        </div>

        {/* Quick Check-In / Clock-Out Widget */}
        <div className="flex items-center space-x-3 bg-white dark:bg-slate-900 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400">Today Shift</p>
            <p className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
              {isCheckedIn ? `In at ${checkInTime}` : 'Not Clocked In'}
            </p>
          </div>
          <Button
            variant={isCheckedIn ? 'danger' : 'gradient'}
            size="sm"
            onClick={handlePunchToggle}
            icon={<Clock className="w-4 h-4" />}
          >
            {isCheckedIn ? 'Clock Out' : 'Clock In Now'}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Present Today</p>
            <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{presentCount}</h3>
          </div>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Late Entries</p>
            <h3 className="text-2xl font-bold text-amber-500 mt-1">{lateCount}</h3>
          </div>
          <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-500">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">On Leave / Half</p>
            <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">{leaveCount}</h3>
          </div>
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600">
            <CalendarIcon className="w-4 h-4" />
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Absent</p>
            <h3 className="text-2xl font-bold text-rose-500 mt-1">{absentCount}</h3>
          </div>
          <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center text-rose-500">
            <XCircle className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Filter and Log Table */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search employee name or ID..."
            className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-500 font-medium">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Late">Late</option>
            <option value="On Leave">On Leave</option>
            <option value="Half Day">Half Day</option>
          </select>
        </div>
      </div>

      {/* Daily Attendance Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 dark:bg-slate-800/60 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Check In</th>
                <th className="px-4 py-3">Check Out</th>
                <th className="px-4 py-3">Work Hours</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLogs.map(item => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 flex items-center space-x-3">
                    <img src={item.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100">{item.employeeName}</p>
                      <p className="text-[10px] text-slate-400">{item.employeeId}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">{item.department}</td>
                  <td className="px-4 py-3 text-slate-500">{item.date}</td>
                  <td className="px-4 py-3 font-mono text-slate-800 dark:text-slate-200">{item.checkIn}</td>
                  <td className="px-4 py-3 font-mono text-slate-800 dark:text-slate-200">{item.checkOut}</td>
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">{item.workHours} hrs</td>
                  <td className="px-4 py-3"><Badge variant="status">{item.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
