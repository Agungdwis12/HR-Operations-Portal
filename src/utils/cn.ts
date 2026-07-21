import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function getRandomBadgeColor(status: string): string {
  switch (status?.toLowerCase()) {
    case 'active':
    case 'approved':
    case 'paid':
    case 'present':
      return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
    case 'pending':
    case 'processing':
    case 'probation':
    case 'half day':
    case 'late':
      return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30';
    case 'on leave':
    case 'absent':
    case 'rejected':
    case 'terminated':
      return 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30';
    default:
      return 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30';
  }
}
