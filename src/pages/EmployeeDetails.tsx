import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  DollarSign,
  Award,
  Clock,
  ShieldCheck,
  User,
  Edit,
  Download,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { EMPLOYEES, ATTENDANCE_RECORDS, PAYROLL_RECORDS, LEAVE_REQUESTS } from '../data/dummyData';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/ui/Button';
import { formatCurrency } from '../utils/cn';
import toast from 'react-hot-toast';

export const EmployeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'payroll' | 'performance' | 'leaves'>('overview');

  const employee = EMPLOYEES.find(e => e.id === id) || EMPLOYEES[0];

  const empAttendance = ATTENDANCE_RECORDS.filter(a => a.employeeId === employee.employeeId);
  const empPayroll = PAYROLL_RECORDS.filter(p => p.employeeId === employee.employeeId);
  const empLeaves = LEAVE_REQUESTS.filter(l => l.employeeId === employee.employeeId);

  return (
    <div className="space-y-6">
      {/* Back Button & Top Action */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/employees')}
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Employee Directory
        </button>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.success(`Exporting full dossier for ${employee.firstName}...`)}
            icon={<Download className="w-4 h-4" />}
          >
            Export Dossier
          </Button>
          <Link to={`/employees/edit/${employee.id}`}>
            <Button variant="primary" size="sm" icon={<Edit className="w-4 h-4" />}>
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

        <div className="relative pt-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
            <img
              src={employee.avatar}
              alt=""
              className="w-28 h-28 rounded-2xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-xl"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                  {employee.firstName} {employee.lastName}
                </h1>
                <Badge variant="status">{employee.status}</Badge>
              </div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {employee.designation} • <span className="text-blue-600 font-bold">{employee.department}</span>
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
                <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md font-semibold">
                  {employee.employeeId}
                </span>
                <span>Role: {employee.role}</span>
                <span>Joined: {employee.joiningDate}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-end space-x-3 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="text-center px-3 border-r border-slate-200 dark:border-slate-700">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Attendance</p>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                {employee.attendanceRate}%
              </p>
            </div>
            <div className="text-center px-3 border-r border-slate-200 dark:border-slate-700">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Performance</p>
              <p className="text-lg font-bold text-amber-500">
                {employee.performanceRating} / 5.0
              </p>
            </div>
            <div className="text-center px-3">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Active Projects</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {employee.projectsCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'overview', label: 'Profile Overview' },
          { id: 'attendance', label: 'Attendance Log' },
          { id: 'payroll', label: 'Payroll & Compensation' },
          { id: 'performance', label: 'Performance Reviews' },
          { id: 'leaves', label: 'Leave History' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2.5 font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Personal & Contact */}
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2 text-blue-500" /> Personal Information
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 flex items-center"><Mail className="w-3.5 h-3.5 mr-2" /> Email</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{employee.email}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 flex items-center"><Phone className="w-3.5 h-3.5 mr-2" /> Phone</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{employee.phone}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 flex items-center"><Calendar className="w-3.5 h-3.5 mr-2" /> Date of Birth</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{employee.dob || '1994-06-12'}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 flex items-center"><User className="w-3.5 h-3.5 mr-2" /> Gender</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{employee.gender || 'Not specified'}</span>
                </div>
                <div className="py-1">
                  <span className="text-slate-500 flex items-center mb-1"><MapPin className="w-3.5 h-3.5 mr-2" /> Address</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">{employee.address}</p>
                </div>
              </div>
            </div>

            {/* Emergency Contact Card */}
            <div className="p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 shadow-xs space-y-2">
              <h3 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center">
                <AlertCircle className="w-4 h-4 mr-1.5" /> Emergency Contact
              </h3>
              <p className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                {employee.emergencyContact.name} ({employee.emergencyContact.relationship})
              </p>
              <p className="text-xs font-mono font-semibold text-amber-800 dark:text-amber-300">
                {employee.emergencyContact.phone}
              </p>
            </div>
          </div>

          {/* Right Column: Employment Details & Skills */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center">
                <Briefcase className="w-4 h-4 mr-2 text-indigo-500" /> Employment & Compensation Overview
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                  <span className="text-slate-500">Base Annual Compensation</span>
                  <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                    {formatCurrency(employee.salary)}
                  </p>
                  <p className="text-[10px] text-slate-400">Monthly gross: {formatCurrency(Math.round(employee.salary / 12))}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                  <span className="text-slate-500">Employment Contract</span>
                  <p className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                    Full-Time Permanent
                  </p>
                  <p className="text-[10px] text-slate-400">Office location: HQ San Francisco</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Skills & Technical Competencies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {employee.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold text-xs border border-blue-200 dark:border-blue-800/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Attendance */}
      {activeTab === 'attendance' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center">
            <Clock className="w-4 h-4 mr-2 text-emerald-500" /> Attendance Records
          </h3>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Check In</th>
                <th className="px-3 py-2">Check Out</th>
                <th className="px-3 py-2">Work Hours</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {empAttendance.length === 0 ? (
                <tr><td colSpan={5} className="py-6 text-center text-slate-500">No recent log entries.</td></tr>
              ) : (
                empAttendance.map(att => (
                  <tr key={att.id}>
                    <td className="px-3 py-2.5 font-bold text-slate-800 dark:text-slate-200">{att.date}</td>
                    <td className="px-3 py-2.5">{att.checkIn}</td>
                    <td className="px-3 py-2.5">{att.checkOut}</td>
                    <td className="px-3 py-2.5 font-semibold">{att.workHours} hrs</td>
                    <td className="px-3 py-2.5"><Badge variant="status">{att.status}</Badge></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Payroll */}
      {activeTab === 'payroll' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center">
            <DollarSign className="w-4 h-4 mr-2 text-blue-500" /> Compensation & Payslip History
          </h3>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="px-3 py-2">Month</th>
                <th className="px-3 py-2">Basic Salary</th>
                <th className="px-3 py-2">Bonus</th>
                <th className="px-3 py-2">Deductions</th>
                <th className="px-3 py-2">Net Salary</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {empPayroll.length === 0 ? (
                <tr><td colSpan={7} className="py-6 text-center text-slate-500">No payroll statements generated yet.</td></tr>
              ) : (
                empPayroll.map(pay => (
                  <tr key={pay.id}>
                    <td className="px-3 py-2.5 font-bold">{pay.month}</td>
                    <td className="px-3 py-2.5">{formatCurrency(pay.basicSalary)}</td>
                    <td className="px-3 py-2.5 text-emerald-600 font-semibold">+{formatCurrency(pay.bonus)}</td>
                    <td className="px-3 py-2.5 text-rose-500">-{formatCurrency(pay.deductions)}</td>
                    <td className="px-3 py-2.5 font-extrabold text-blue-600 dark:text-blue-400">{formatCurrency(pay.netSalary)}</td>
                    <td className="px-3 py-2.5"><Badge variant="status">{pay.status}</Badge></td>
                    <td className="px-3 py-2.5 text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toast.success(`Downloading payslip for ${pay.month}`)}
                        icon={<Download className="w-3.5 h-3.5" />}
                      >
                        Payslip
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 4: Performance */}
      {activeTab === 'performance' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center">
            <Award className="w-4 h-4 mr-2 text-amber-500" /> Quarterly Evaluation & KPIs
          </h3>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Q2 2026 Evaluation</span>
              <span className="font-bold text-amber-500 text-sm">{employee.performanceRating} / 5.0</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Consistently delivers high quality features ahead of deadline. Demonstrates exceptional problem-solving and cross-team communication.
            </p>
          </div>
        </div>
      )}

      {/* Tab 5: Leaves */}
      {activeTab === 'leaves' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-indigo-500" /> Leave Application History
          </h3>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Start Date</th>
                <th className="px-3 py-2">End Date</th>
                <th className="px-3 py-2">Days</th>
                <th className="px-3 py-2">Reason</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {empLeaves.length === 0 ? (
                <tr><td colSpan={6} className="py-6 text-center text-slate-500">No leave history found.</td></tr>
              ) : (
                empLeaves.map(l => (
                  <tr key={l.id}>
                    <td className="px-3 py-2.5 font-bold">{l.type}</td>
                    <td className="px-3 py-2.5">{l.startDate}</td>
                    <td className="px-3 py-2.5">{l.endDate}</td>
                    <td className="px-3 py-2.5 font-bold">{l.days} Days</td>
                    <td className="px-3 py-2.5 text-slate-500 max-w-xs truncate">{l.reason}</td>
                    <td className="px-3 py-2.5"><Badge variant="status">{l.status}</Badge></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
