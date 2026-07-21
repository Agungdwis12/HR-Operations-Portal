import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarCheck,
  CreditCard,
  CalendarDays,
  TrendingUp,
  BarChart3,
  Calendar,
  MessageSquare,
  Bell,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isOpenMobile,
  onCloseMobile,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const role = user?.role || 'Admin';

  const allNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['Admin', 'HR Manager', 'Department Head', 'Employee'] },
    { name: 'Employees', path: '/employees', icon: Users, badge: '100', roles: ['Admin', 'HR Manager', 'Department Head', 'Employee'] },
    { name: 'Departments', path: '/departments', icon: Building2, badge: '10', roles: ['Admin', 'HR Manager', 'Department Head'] },
    { name: 'Attendance', path: '/attendance', icon: CalendarCheck, roles: ['Admin', 'HR Manager', 'Department Head', 'Employee'] },
    { name: 'Payroll', path: '/payroll', icon: CreditCard, roles: ['Admin', 'HR Manager', 'Department Head', 'Employee'] },
    { name: 'Leave', path: '/leaves', icon: CalendarDays, badge: '2 Pending', roles: ['Admin', 'HR Manager', 'Department Head', 'Employee'] },
    { name: 'Performance', path: '/performance', icon: TrendingUp, roles: ['Admin', 'HR Manager', 'Department Head', 'Employee'] },
    { name: 'Reports', path: '/reports', icon: BarChart3, roles: ['Admin', 'HR Manager', 'Department Head'] },
    { name: 'Calendar', path: '/calendar', icon: Calendar, roles: ['Admin', 'HR Manager', 'Department Head', 'Employee'] },
    { name: 'Messages', path: '/messages', icon: MessageSquare, badge: '2', roles: ['Admin', 'HR Manager', 'Department Head', 'Employee'] },
    { name: 'Notifications', path: '/notifications', icon: Bell, badge: '4', roles: ['Admin', 'HR Manager', 'Department Head', 'Employee'] },
  ];

  const navItems = allNavItems.filter(item => item.roles.includes(role));

  const secondaryNav = [
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-indigo-950 text-indigo-300 transition-all duration-300 select-none">
      {/* Brand Header */}
      <div className="p-6 flex items-center justify-between border-b border-indigo-900 shrink-0">
        <NavLink
          to="/dashboard"
          onClick={onCloseMobile}
          className="flex items-center gap-3 overflow-hidden"
        >
          <div className="h-8 w-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white text-xl shrink-0">
            S
          </div>
          {(!isCollapsed || isOpenMobile) && (
            <span className="text-white font-bold text-xl tracking-tight truncate">
              Stratos EMS
            </span>
          )}
        </NavLink>

        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex p-1.5 rounded-lg text-indigo-300 hover:text-white hover:bg-indigo-900 transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar">
        <div>
          {(!isCollapsed || isOpenMobile) && (
            <div className="px-3 pb-2 text-[10px] uppercase tracking-wider text-indigo-400 font-bold">
              Main Menu
            </div>
          )}
          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors group',
                      isActive
                        ? 'bg-indigo-800/50 text-white'
                        : 'text-indigo-300 hover:text-white hover:bg-indigo-900/40'
                    )
                  }
                  title={isCollapsed && !isOpenMobile ? item.name : undefined}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className="w-5 h-5 shrink-0 opacity-80 group-hover:opacity-100" />
                    {(!isCollapsed || isOpenMobile) && (
                      <span className="truncate">{item.name}</span>
                    )}
                  </div>
                  {(!isCollapsed || isOpenMobile) && item.badge && (
                    <span
                      className={cn(
                        'px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider',
                        item.badge.includes('Pending')
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-indigo-900/80 text-indigo-200 border border-indigo-700/50'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div>
          {(!isCollapsed || isOpenMobile) && (
            <div className="pt-2 pb-2 px-3 text-[10px] uppercase tracking-wider text-indigo-400 font-bold">
              Management
            </div>
          )}
          <nav className="space-y-1">
            {secondaryNav.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors group',
                      isActive
                        ? 'bg-indigo-800/50 text-white'
                        : 'text-indigo-300 hover:text-white hover:bg-indigo-900/40'
                    )
                  }
                  title={isCollapsed && !isOpenMobile ? item.name : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0 opacity-80 group-hover:opacity-100" />
                  {(!isCollapsed || isOpenMobile) && <span className="truncate">{item.name}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-indigo-900 mt-auto shrink-0">
        <div
          className={cn(
            'flex items-center gap-3 p-2 rounded-lg bg-indigo-900/30 border border-indigo-900/50',
            isCollapsed && !isOpenMobile ? 'justify-center' : 'justify-between'
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt=""
                className="h-8 w-8 rounded-full bg-slate-300 object-cover"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-indigo-950" />
            </div>
            {(!isCollapsed || isOpenMobile) && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{user?.name || 'Alex Thompson'}</p>
                <p className="text-[10px] text-indigo-400 truncate">{user?.role || 'Senior HR Admin'}</p>
              </div>
            )}
          </div>

          {(!isCollapsed || isOpenMobile) && (
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="p-1.5 rounded-lg text-indigo-400 hover:text-white hover:bg-indigo-800/50 transition-colors shrink-0"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:block fixed top-0 left-0 bottom-0 z-40 transition-all duration-300 border-r border-indigo-900',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={onCloseMobile}
            className="fixed inset-0 bg-indigo-950/70 backdrop-blur-xs transition-opacity"
          />
          <aside className="fixed top-0 bottom-0 left-0 w-72 bg-indigo-950 shadow-2xl z-10 border-r border-indigo-900">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
