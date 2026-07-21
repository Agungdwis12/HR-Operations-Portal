import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, CreditCard, Calendar, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

export const WelcomeBanner: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || 'Admin';

  const isManagement = ['Admin', 'HR Manager'].includes(role);
  const isDeptHead = role === 'Department Head';

  return (
    <div className="relative rounded-xl bg-indigo-600 text-white p-6 shadow-sm overflow-hidden">
      {/* Decorative subtle circles */}
      <div className="absolute -right-4 -bottom-4 h-28 w-28 bg-indigo-500 rounded-full opacity-30 pointer-events-none" />
      <div className="absolute -right-8 -top-8 h-36 w-36 bg-indigo-400 rounded-full opacity-20 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-xl space-y-1.5">
          <p className="text-indigo-100 text-xs font-semibold uppercase tracking-wider">
            Good morning, {user?.name || 'Alex'} ({role})
          </p>
          <h2 className="text-2xl font-bold tracking-tight">
            Here's what's happening at Stratos EMS today.
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 opacity-90 leading-relaxed">
            {isManagement ? (
              <>
                You have <span className="font-bold text-white">2 pending leave requests</span> and{' '}
                <span className="font-bold text-white">1 payroll batch</span> awaiting authorization.
              </>
            ) : isDeptHead ? (
              <>
                You have <span className="font-bold text-white">2 team leave approvals</span> pending for your department.
              </>
            ) : (
              <>
                Welcome to your personal employee workspace. Check in your daily attendance and manage your time-off requests.
              </>
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {isManagement && (
            <>
              <Link to="/employees/add">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white text-indigo-600 border-white hover:bg-indigo-50 font-bold shadow-sm"
                  icon={<UserPlus className="w-4 h-4" />}
                >
                  + Add New Employee
                </Button>
              </Link>
              <Link to="/payroll">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-indigo-700 text-white border-indigo-500 hover:bg-indigo-800 font-semibold"
                  icon={<CreditCard className="w-4 h-4" />}
                >
                  Run Payroll
                </Button>
              </Link>
            </>
          )}

          <Link to="/leaves">
            <Button
              variant="outline"
              size="sm"
              className="bg-indigo-700 text-white border-indigo-500 hover:bg-indigo-800 font-semibold"
              icon={<Calendar className="w-4 h-4" />}
            >
              {isManagement || isDeptHead ? 'Leave Approvals' : 'Request Time Off'}
            </Button>
          </Link>

          {!isManagement && (
            <Link to="/attendance">
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-indigo-600 border-white hover:bg-indigo-50 font-bold shadow-sm"
                icon={<Sparkles className="w-4 h-4" />}
              >
                Attendance Log
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
