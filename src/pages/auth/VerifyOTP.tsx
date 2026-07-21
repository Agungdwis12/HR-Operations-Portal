import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { KeyRound, ArrowLeft, RotateCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

export const VerifyOTP: React.FC = () => {
  const { verifyOTP, resetEmailForOTP, isLoading } = useAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(['8', '4', '2', '9', '1', '0']);
  const [timer, setTimer] = useState<number>(59);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value && element.nextElementSibling) {
      (element.nextElementSibling as HTMLInputElement).focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      toast.error('Please enter complete 6-digit OTP');
      return;
    }

    const isValid = await verifyOTP(fullOtp);
    if (isValid) {
      toast.success('OTP verified successfully!');
      navigate('/reset-password');
    } else {
      toast.error('Invalid OTP code');
    }
  };

  const handleResend = () => {
    setTimer(59);
    toast.success('New OTP sent to email!');
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div>
        <Link
          to="/forgot-password"
          className="inline-flex items-center text-xs font-semibold text-blue-400 hover:underline mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
        </Link>
        <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
          <KeyRound className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Enter OTP Code</h2>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          We sent a 6-digit verification code to{' '}
          <span className="text-slate-200 font-semibold">{resetEmailForOTP}</span>
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-5">
        <div className="flex items-center justify-between gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(e.target, index)}
              onFocus={e => e.target.select()}
              className="w-11 h-12 text-center text-lg font-bold rounded-xl border border-slate-700 bg-slate-900/90 text-white focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          ))}
        </div>

        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full"
          isLoading={isLoading}
        >
          Verify OTP Code
        </Button>
      </form>

      <div className="flex items-center justify-between text-xs pt-2">
        <span className="text-slate-400">
          Didn&apos;t receive code?{' '}
          {timer > 0 ? (
            <span className="text-blue-400 font-semibold">Resend in {timer}s</span>
          ) : (
            <button
              onClick={handleResend}
              className="text-blue-400 font-bold hover:underline inline-flex items-center"
            >
              <RotateCw className="w-3 h-3 mr-1" /> Resend Now
            </button>
          )}
        </span>
      </div>
    </div>
  );
};
