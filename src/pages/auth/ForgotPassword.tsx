import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

const schema = z.object({
  email: z.string().email('Please enter a valid work email address'),
});

type FormData = z.infer<typeof schema>;

export const ForgotPassword: React.FC = () => {
  const { forgotPassword, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: 'alexander.vance@nexuscorp.com' },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await forgotPassword(data.email);
      toast.success('6-Digit Verification OTP sent to your email!');
      navigate('/verify-otp');
    } catch {
      toast.error('Error sending reset link.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div>
        <Link
          to="/login"
          className="inline-flex items-center text-xs font-semibold text-blue-400 hover:underline mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Login
        </Link>
        <h2 className="text-2xl font-bold text-white tracking-tight">Forgot Password?</h2>
        <p className="text-xs text-slate-400 mt-1">
          Enter your registered work email. We will send a secure 6-digit OTP code to verify your identity.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Registered Work Email"
          type="email"
          placeholder="name@nexuscorp.com"
          icon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full"
          isLoading={isLoading}
          icon={<Send className="w-4 h-4" />}
        >
          Send OTP Code
        </Button>
      </form>
    </div>
  );
};
