import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, Building, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid work email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login: React.FC = () => {
  const { login, loginWithProvider, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'alexander.vance@nexuscorp.com',
      password: 'password123',
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      toast.success('Successfully logged in! Welcome to Nexus EMS.');
      navigate('/dashboard');
    } catch {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  const handleProviderLogin = async (provider: 'google' | 'microsoft') => {
    try {
      await loginWithProvider(provider);
      toast.success(`Logged in with ${provider === 'google' ? 'Google' : 'Microsoft'}!`);
      navigate('/dashboard');
    } catch {
      toast.error('Social login failed.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Mobile Header Logo */}
      <div className="flex items-center space-x-2 lg:hidden mb-2">
        <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
          <Building className="w-4 h-4" />
        </div>
        <span className="text-lg font-bold text-white">
          NEXUS<span className="text-blue-400">EMS</span>
        </span>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h2>
        <p className="text-xs text-slate-400 mt-1">
          Access your enterprise employee management dashboard.
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Work Email Address"
          type="email"
          placeholder="name@nexuscorp.com"
          icon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          icon={<Lock className="w-4 h-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-hidden hover:text-slate-200"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center space-x-2 text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              className="rounded-md border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500/20"
              {...register('rememberMe')}
            />
            <span>Remember me for 30 days</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-blue-400 font-medium hover:underline hover:text-blue-300"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full mt-2"
          isLoading={isLoading}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Sign In to Portal
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-800" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
          <span className="bg-slate-900/90 px-3 text-slate-400 font-semibold">Or continue with</span>
        </div>
      </div>

      {/* SSO Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleProviderLogin('google')}
          className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-800/50 hover:bg-slate-800 text-xs font-medium text-slate-200 transition-all hover:border-slate-700"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
            />
          </svg>
          <span>Google Workspace</span>
        </button>

        <button
          type="button"
          onClick={() => handleProviderLogin('microsoft')}
          className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-800/50 hover:bg-slate-800 text-xs font-medium text-slate-200 transition-all hover:border-slate-700"
        >
          <svg className="w-4 h-4" viewBox="0 0 23 23">
            <path fill="#f35325" d="M1 1h10v10H1z" />
            <path fill="#81bc06" d="M12 1h10v10H12z" />
            <path fill="#05a6f0" d="M1 12h10v10H1z" />
            <path fill="#ffba08" d="M12 12h10v10H12z" />
          </svg>
          <span>Microsoft 365</span>
        </button>
      </div>

      {/* Footer Link */}
      <p className="text-center text-xs text-slate-400 pt-2">
        Don&apos;t have an employee account?{' '}
        <Link to="/register" className="text-blue-400 font-bold hover:underline">
          Request Registration
        </Link>
      </p>
    </div>
  );
};
