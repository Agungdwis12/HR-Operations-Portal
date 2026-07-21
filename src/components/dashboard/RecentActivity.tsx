import React from 'react';
import { RECENT_ACTIVITIES, UPCOMING_BIRTHDAYS } from '../../data/dummyData';
import { Gift, Clock } from 'lucide-react';

export const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Recent HR Activities
        </h3>
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Feed</span>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800/60 mt-2">
        {RECENT_ACTIVITIES.map(item => (
          <div key={item.id} className="py-2.5 flex items-start gap-3 text-xs">
            <img src={item.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="font-bold text-slate-900 dark:text-slate-100">{item.user}</span>{' '}
                {item.action}{' '}
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">{item.target}</span>
              </p>
              <span className="text-[10px] text-slate-400 mt-0.5 block">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const BirthdaysList: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
          <Gift className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Upcoming Events
        </h3>
        <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
          This Week
        </span>
      </div>

      <div className="space-y-3 mt-3">
        {UPCOMING_BIRTHDAYS.map(b => (
          <div
            key={b.id}
            className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
          >
            <div className="flex items-center gap-3">
              <img src={b.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{b.name}</p>
                <p className="text-[10px] text-slate-400">{b.department}</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950 px-2 py-0.5 rounded uppercase">
              {b.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
