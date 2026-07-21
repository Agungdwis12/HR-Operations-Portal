import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

const schema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

export const ResetPassword: React.FC = () => {
  const { resetPassword, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const passwordVal = watch('password', '');

  const calculateStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'Empty', color: 'bg-slate-700' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 25, label: 'Weak', color: 'bg-rose-500' };
    if (score === 2) return { score: 50, label: 'Fair', color: 'bg-amber-500' };
    if (score === 3) return { score: 75, label: 'Strong', color: 'bg-emerald-500' };
    return { score: 100, label: 'Enterprise Grade', color: 'bg-blue-500' };
  };

  const strength = calculateStrength(passwordVal);

  const onSubmit = async (data: FormData) => {
    try {
      await resetPassword(data.password);
      toast.success('Password updated successfully! Please sign in.');
      navigate('/auth/login');
    } catch {
      toast.error('Failed to reset password.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div>
        <Link
          to="/auth/login"
          className="inline-flex items-center text-xs font-semibold text-blue-400 hover:underline mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Login
        </Link>
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Reset Account Password</h2>
        <p className="text-xs text-slate-400 mt-1">
          Create a new strong password for your enterprise portal access.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            label="New Password"
            type={showPass ? 'text' : 'password'}
            placeholder="••••••••"
            icon={<Lock className="w-4 h-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="focus:outline-hidden hover:text-slate-200"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            error={errors.password?.message}
            {...register('password')}
          />

          {/* Password Strength Meter */}
          {passwordVal && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-400">Security Strength:</span>
                <span className="font-bold text-slate-200">{strength.label}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${strength.color} transition-all duration-300`}
                  style={{ width: `${strength.score}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <Input
          label="Confirm New Password"
          type={showPass ? 'text' : 'password'}
          placeholder="••••••••"
          icon={<Lock className="w-4 h-4" />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full"
          isLoading={isLoading}
        >
          Update Password & Login
        </Button>
      </form>
    </div>
  );
};
