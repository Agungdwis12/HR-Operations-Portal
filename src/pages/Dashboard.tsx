import React from 'react';
import {
  Users,
  UserCheck,
  CalendarCheck,
  CreditCard,
  TrendingUp,
  DollarSign,
  PieChart as PieChartIcon,
  BarChart3,
  LineChart as LineChartIcon,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from 'recharts';
import { StatCard } from '../components/dashboard/StatCard';
import { WelcomeBanner } from '../components/dashboard/WelcomeBanner';
import { RecentActivity, BirthdaysList } from '../components/dashboard/RecentActivity';
import { LEAVE_REQUESTS, CHART_DATA } from '../data/dummyData';
import { Badge } from '../components/common/Badge';
import { Link } from 'react-router-dom';

const COLORS = ['#6366f1', '#4f46e5', '#818cf8', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#64748b'];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Hero Banner */}
      <WelcomeBanner />

      {/* Primary Employee Statistics Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value="1,248"
          change="+4.2%"
          isPositive={true}
          icon={<Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
          iconBg="bg-blue-50 dark:bg-blue-950/60"
          description="Total workforce"
        />
        <StatCard
          title="Active Now"
          value="982"
          change="94%"
          isPositive={true}
          icon={<UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
          iconBg="bg-emerald-50 dark:bg-emerald-950/60"
          description="Present today"
        />
        <StatCard
          title="Leave Requests"
          value="24"
          change="8 Pending"
          isPositive={true}
          icon={<CalendarCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
          iconBg="bg-amber-50 dark:bg-amber-950/60"
          description="Requires authorization"
        />
        <StatCard
          title="Monthly Payroll"
          value="$428.5k"
          change="Budget $500k"
          isPositive={true}
          icon={<CreditCard className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
          iconBg="bg-indigo-50 dark:bg-indigo-950/60"
          description="Disbursement total"
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend Line Chart */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center">
                <LineChartIcon className="w-4 h-4 mr-2 text-indigo-600" /> Weekly Attendance Rate (%)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Daily attendance vs late entries for current week
              </p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CHART_DATA.attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[80, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Attendance %"
                />
                <Line
                  type="monotone"
                  dataKey="late"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  name="Late Check-ins"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Distribution Pie Chart */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center">
                <PieChartIcon className="w-4 h-4 mr-2 text-indigo-600" /> Department Workforce Breakdown
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Headcount distribution across core divisions
              </p>
            </div>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CHART_DATA.departmentBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="employees"
                >
                  {CHART_DATA.departmentBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payroll Expense Bar Chart */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center">
                <BarChart3 className="w-4 h-4 mr-2 text-emerald-600" /> Monthly Payroll Expenses ($)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Base salary and performance bonus trend
              </p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA.payrollExpenses}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="salary" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Base Salary" />
                <Bar dataKey="bonus" fill="#10b981" radius={[4, 4, 0, 0]} name="Bonuses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Performance Rating Distribution */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-indigo-600" /> Performance Rating Distribution
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Employee evaluation score breakdown
              </p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA.performanceDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="range" type="category" stroke="#94a3b8" fontSize={10} width={130} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} name="Employees" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Row: Pending Leave Requests & Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Pending Leave Requests */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                Recent Hires & Pending Approvals
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Onboarding and leave requests needing action
              </p>
            </div>
            <Link
              to="/leaves"
              className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="overflow-auto flex-1">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 dark:bg-slate-800/50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dates</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {LEAVE_REQUESTS.slice(0, 5).map(req => (
                  <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <img src={req.avatar} alt="" className="h-8 w-8 rounded-full bg-slate-200 object-cover shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{req.employeeName}</p>
                          <p className="text-[11px] text-slate-400">{req.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-600 dark:text-slate-300 font-medium">
                      {req.department}
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-500 dark:text-slate-400">
                      {req.startDate}
                    </td>
                    <td className="px-6 py-3">
                      <span className="px-2 py-1 bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-[10px] font-bold rounded uppercase">
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Birthdays & Feeds */}
        <div className="space-y-6">
          <BirthdaysList />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};
