import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  iconBg: string;
  description?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
  iconBg,
  description,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start space-x-2">
        <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
          {title}
        </span>
        <div
          className={cn(
            'h-8 w-8 rounded-lg flex items-center justify-center shrink-0 font-bold',
            iconBg
          )}
        >
          {icon}
        </div>
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</span>
        {change && (
          <span
            className={cn(
              'ml-2 text-xs font-medium',
              isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
            )}
          >
            {change}
          </span>
        )}
      </div>
      {description && (
        <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500 font-medium truncate">
          {description}
        </p>
      )}
    </div>
  );
};
