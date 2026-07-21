import React from 'react';
import { cn, getRandomBadgeColor } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'status' | 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'status', className }) => {
  if (variant === 'status' && typeof children === 'string') {
    return (
      <span
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap transition-colors',
          getRandomBadgeColor(children),
          className
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-75" />
        {children}
      </span>
    );
  }

  const variantStyles = {
    primary: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    secondary: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    outline: 'border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    danger: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    status: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
