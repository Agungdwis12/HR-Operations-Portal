import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, Lock, Building, Briefcase, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import toast from 'react-hot-toast';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  employeeId: z.string().min(4, 'Employee ID is required (e.g., EMP-2026)'),
  email: z.string().email('Valid company email required'),
  phone: z.string().min(10, 'Valid phone number required'),
  department: z.string().min(1, 'Please select a department'),
  designation: z.string().min(2, 'Designation title is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, 'You must accept terms & security policy'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const Register: React.FC = () => {
  const { register: authRegister, isLoading } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: 'Scarlett White',
      employeeId: 'EMP-1101',
      email: 'scarlett.white@nexuscorp.com',
      phone: '+1 (555) 345-6789',
      department: 'Engineering',
      designation: 'Senior Frontend Engineer',
      password: 'password123',
      confirmPassword: 'password123',
      acceptTerms: true,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await authRegister({
        name: data.fullName,
        employeeId: data.employeeId,
        email: data.email,
        phone: data.phone,
        department: data.department,
        designation: data.designation,
        role: 'Employee',
      });
      toast.success('Registration account created successfully!');
      navigate('/dashboard');
    } catch {
      toast.error('Registration failed.');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Employee Onboarding</h2>
        <p className="text-xs text-slate-400 mt-1">
          Register your official credentials to request portal clearance.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Full Name"
            placeholder="John Doe"
            icon={<User className="w-4 h-4" />}
            error={errors.fullName?.message}
            {...register('fullName')}
          />
          <Input
            label="Employee ID"
            placeholder="EMP-1001"
            icon={<ShieldCheck className="w-4 h-4" />}
            error={errors.employeeId?.message}
            {...register('employeeId')}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Corporate Email"
            type="email"
            placeholder="john@nexuscorp.com"
            icon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Phone Number"
            placeholder="+1 (555) 000-0000"
            icon={<Phone className="w-4 h-4" />}
            error={errors.phone?.message}
            {...register('phone')}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Department
            </label>
            <div className="relative flex items-center">
              <Building className="w-4 h-4 absolute left-3.5 text-slate-500 pointer-events-none" />
              <select
                className="w-full rounded-xl border border-slate-700/80 bg-slate-900/80 pl-10 pr-4 py-2.5 text-sm text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                {...register('department')}
              >
                <option value="Engineering">Engineering</option>
                <option value="Product Management">Product Management</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Sales & Growth">Sales & Growth</option>
                <option value="Marketing & Brand">Marketing & Brand</option>
                <option value="Finance & Accounting">Finance & Accounting</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Customer Support">Customer Support</option>
              </select>
            </div>
          </div>

          <Input
            label="Designation Title"
            placeholder="Senior Architect"
            icon={<Briefcase className="w-4 h-4" />}
            error={errors.designation?.message}
            {...register('designation')}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Password"
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
          <Input
            label="Confirm Password"
            type={showPass ? 'text' : 'password'}
            placeholder="••••••••"
            icon={<Lock className="w-4 h-4" />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
        </div>

        <div className="pt-1">
          <label className="flex items-start space-x-2.5 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              className="mt-0.5 rounded-md border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500/20"
              {...register('acceptTerms')}
            />
            <span className="leading-tight">
              I agree to the{' '}
              <a href="#terms" className="text-blue-400 underline">Terms of Employment</a>{' '}
              and Enterprise Data Governance Policies.
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="text-xs text-rose-500 font-medium mt-1">{errors.acceptTerms.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full mt-2"
          isLoading={isLoading}
        >
          Submit Account Registration
        </Button>
      </form>

      <p className="text-center text-xs text-slate-400 pt-1">
        Already registered?{' '}
        <Link to="/auth/login" className="text-blue-400 font-bold hover:underline">
          Back to Login
        </Link>
      </p>
    </div>
  );
};
