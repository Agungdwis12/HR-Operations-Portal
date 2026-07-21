import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Moon,
  Sun,
  Bell,
  MessageSquare,
  Globe,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ShieldAlert,
  CheckCircle2,
  Menu,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { APP_NOTIFICATIONS, DIRECT_MESSAGES } from '../../data/dummyData';
import { UserRole } from '../../types';
import toast from 'react-hot-toast';

interface NavbarProps {
  onToggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { user, logout, switchRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [showNotifs, setShowNotifs] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English (US)');
  const [searchQuery, setSearchQuery] = useState('');

  const unreadNotifs = APP_NOTIFICATIONS.filter(n => !n.read).length;
  const unreadMsgs = DIRECT_MESSAGES.reduce((acc, m) => acc + m.unreadCount, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/employees?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const rolesList: UserRole[] = ['Admin', 'HR Manager', 'Department Head', 'Employee'];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-8 shrink-0 transition-colors">
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors lg:hidden"
          aria-label="Toggle Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <form onSubmit={handleSearchSubmit} className="relative w-full hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search employees, documents, or reports..."
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700/80 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </form>
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* System Active Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 rounded-full text-xs font-medium border border-emerald-100 dark:border-emerald-900/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          System Active
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

        {/* Role Preview Selector */}
        <div className="hidden md:flex items-center px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs">
          <ShieldAlert className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 mr-1.5 shrink-0" />
          <span className="text-slate-500 dark:text-slate-400 mr-1.5 font-medium">Role:</span>
          <select
            value={user?.role || 'Admin'}
            onChange={e => {
              const newRole = e.target.value as UserRole;
              switchRole(newRole);
              toast.success(`Active role updated to ${newRole}`);
            }}
            className="bg-transparent font-semibold text-indigo-600 dark:text-indigo-400 cursor-pointer focus:outline-none"
          >
            {rolesList.map(r => (
              <option key={r} value={r} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowLangMenu(!showLangMenu);
              setShowNotifs(false);
              setShowMessages(false);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Language"
          >
            <Globe className="w-4 h-4" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 py-1.5 z-50 text-xs">
              {['English (US)', 'Spanish (ES)', 'French (FR)', 'German (DE)'].map(lang => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLang(lang);
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between ${
                    selectedLang === lang ? 'text-indigo-600 font-semibold' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{lang}</span>
                  {selectedLang === lang && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Messages Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowMessages(!showMessages);
              setShowNotifs(false);
              setShowProfileMenu(false);
              setShowLangMenu(false);
            }}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
          >
            <MessageSquare className="w-4 h-4" />
            {unreadMsgs > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {showMessages && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Messages</h4>
                <Link
                  to="/messages"
                  onClick={() => setShowMessages(false)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto my-1">
                {DIRECT_MESSAGES.map(msg => (
                  <Link
                    key={msg.id}
                    to="/messages"
                    onClick={() => setShowMessages(false)}
                    className="flex items-start gap-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg px-2 transition-colors"
                  >
                    <img src={msg.senderAvatar} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {msg.senderName}
                        </p>
                        <span className="text-[10px] text-slate-400">{msg.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {msg.lastMessage}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifs(!showNotifs);
              setShowMessages(false);
              setShowProfileMenu(false);
              setShowLangMenu(false);
            }}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Notifications</h4>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-full uppercase">
                    {unreadNotifs} New
                  </span>
                </div>
                <Link
                  to="/notifications"
                  onClick={() => setShowNotifs(false)}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  View All
                </Link>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto my-1">
                {APP_NOTIFICATIONS.map(notif => (
                  <div
                    key={notif.id}
                    className="py-2.5 px-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {notif.title}
                      </p>
                      <span className="text-[10px] text-slate-400">{notif.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifs(false);
              setShowMessages(false);
              setShowLangMenu(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 font-bold text-xs">
              {user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2) : 'AT'}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{user?.name}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{user?.email}</p>
                <span className="inline-block mt-1.5 px-2 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold rounded uppercase">
                  {user?.role}
                </span>
              </div>
              <div className="py-1">
                <Link
                  to="/profile"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <User className="w-4 h-4 mr-2.5 text-slate-400" />
                  My Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Settings className="w-4 h-4 mr-2.5 text-slate-400" />
                  Account Settings
                </Link>
              </div>
              <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full flex items-center px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4 mr-2.5 text-rose-500" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
