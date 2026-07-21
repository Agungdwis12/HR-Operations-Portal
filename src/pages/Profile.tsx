import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, ShieldCheck, Key, Lock, Bell, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import toast from 'react-hot-toast';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass) {
      toast.error('Please enter current and new password');
      return;
    }
    if (newPass !== confirmPass) {
      toast.error('Passwords do not match');
      return;
    }
    toast.success('Account security password updated successfully!');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Administrator Account Profile
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage system clearance credentials, multi-factor security, and activity history.
        </p>
      </div>

      {/* User Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex items-center space-x-5">
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'}
          alt=""
          className="w-20 h-20 rounded-2xl object-cover ring-4 ring-blue-500/30"
        />
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">{user?.name}</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
              {user?.role}
            </span>
          </div>
          <p className="text-xs text-slate-500 flex items-center"><Mail className="w-3.5 h-3.5 mr-1" /> {user?.email}</p>
          <p className="text-[10px] text-emerald-600 font-bold flex items-center pt-0.5">
            <CheckCircle2 className="w-3 h-3 mr-1" /> 2FA Multi-Factor Auth Active
          </p>
        </div>
      </div>

      {/* Change Password Form */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center">
          <Lock className="w-4 h-4 mr-2 text-blue-500" /> Security & Credentials
        </h3>

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••"
            value={currentPass}
            onChange={e => setCurrentPass(e.target.value)}
          />
          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            value={newPass}
            onChange={e => setNewPass(e.target.value)}
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            value={confirmPass}
            onChange={e => setConfirmPass(e.target.value)}
          />

          <Button type="submit" variant="gradient" size="sm">
            Update Security Credentials
          </Button>
        </form>
      </div>
    </div>
  );
};
