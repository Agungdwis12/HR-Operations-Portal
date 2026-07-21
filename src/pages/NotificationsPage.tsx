import React, { useState } from 'react';
import { APP_NOTIFICATIONS } from '../data/dummyData';
import { AppNotification } from '../types';
import { Bell, CheckCheck, Trash2, Info, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';

export const NotificationsPage: React.FC = () => {
  const [notifs, setNotifs] = useState<AppNotification[]>(APP_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const clearAll = () => {
    setNotifs([]);
    toast.success('Notification inbox cleared');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            System Notifications
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time security updates, payroll notifications, leave approvals, and system broadcasts.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllRead}
            icon={<CheckCheck className="w-4 h-4" />}
          >
            Mark All Read
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            icon={<Trash2 className="w-4 h-4 text-rose-500" />}
          >
            Clear All
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
        {notifs.length === 0 ? (
          <div className="p-10 text-center text-slate-500 text-xs">
            No notifications in your inbox.
          </div>
        ) : (
          notifs.map(n => (
            <div
              key={n.id}
              className={`p-5 flex items-start space-x-4 transition-colors ${
                !n.read ? 'bg-blue-50/40 dark:bg-blue-950/20' : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{n.title}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {n.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
