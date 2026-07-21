import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  DollarSign,
  Calendar,
  MapPin,
  Upload,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { DEPARTMENTS } from '../data/dummyData';
import toast from 'react-hot-toast';

const empSchema = z.object({
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  employeeId: z.string().min(3, 'Employee ID required'),
  email: z.string().email('Valid work email required'),
  phone: z.string().min(10, 'Valid phone number required'),
  department: z.string().min(1, 'Please select department'),
  designation: z.string().min(2, 'Designation title required'),
  role: z.enum(['Admin', 'HR Manager', 'Department Head', 'Employee']),
  salary: z.number().min(10000, 'Minimum salary is $10,000'),
  joiningDate: z.string().min(1, 'Joining date required'),
  address: z.string().min(5, 'Address is required'),
  emergencyName: z.string().min(2, 'Emergency contact name required'),
  emergencyPhone: z.string().min(10, 'Emergency contact phone required'),
  skills: z.string().min(2, 'Please list at least one skill'),
  status: z.enum(['Active', 'On Leave', 'Probation', 'Terminated']),
});

type EmpFormData = z.infer<typeof empSchema>;

export const AddEmployee: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || 'Admin';
  const canAdd = ['Admin', 'HR Manager'].includes(role);
  const navigate = useNavigate();

  if (!canAdd) {
    return (
      <div className="p-8 max-w-md mx-auto text-center space-y-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl my-12">
        <ShieldCheck className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Access Restricted</h2>
        <p className="text-xs text-slate-500">
          Your current role (<span className="font-bold text-indigo-600 dark:text-indigo-400">{role}</span>) does not have authorization to onboard new employees.
        </p>
        <Link to="/employees">
          <Button variant="gradient" size="sm" className="mt-2">
            Back to Employee Directory
          </Button>
        </Link>
      </div>
    );
  }
  const [avatarPreview, setAvatarPreview] = useState<string>(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmpFormData>({
    resolver: zodResolver(empSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      employeeId: `EMP-${Math.floor(1020 + Math.random() * 800)}`,
      email: '',
      phone: '',
      department: 'Engineering',
      designation: 'Software Engineer',
      role: 'Employee',
      salary: 85000,
      joiningDate: new Date().toISOString().split('T')[0],
      address: '123 Tech Way, San Francisco, CA',
      emergencyName: 'Jane Doe',
      emergencyPhone: '+1 (555) 999-8888',
      skills: 'React.js, TypeScript, Tailwind CSS',
      status: 'Active',
    },
  });

  const onSubmit = async (data: EmpFormData) => {
    await new Promise(res => setTimeout(res, 600));
    toast.success(`Successfully registered new employee ${data.firstName} ${data.lastName}!`);
    navigate('/employees');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/employees"
            className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Employee List
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Add New Employee
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Create official personnel file and assign system clearance roles.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Image & Role Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="relative group">
            <img
              src={avatarPreview}
              alt=""
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-blue-500/30"
            />
            <label className="absolute inset-0 bg-slate-950/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white">
              <Upload className="w-5 h-5" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    setAvatarPreview(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
            </label>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Employee Photo Upload
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
              Upload a clear high-res profile photo. PNG, JPG or WEBP formats supported up to 5MB.
            </p>
          </div>
        </div>

        {/* Basic Personal Details */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center">
            <User className="w-4 h-4 mr-2 text-blue-500" /> Basic Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="Alexander"
              error={errors.firstName?.message}
              {...register('firstName')}
            />
            <Input
              label="Last Name"
              placeholder="Vance"
              error={errors.lastName?.message}
              {...register('lastName')}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Employee ID"
              placeholder="EMP-1001"
              icon={<ShieldCheck className="w-4 h-4" />}
              error={errors.employeeId?.message}
              {...register('employeeId')}
            />
            <Input
              label="Work Email"
              type="email"
              placeholder="alex@nexuscorp.com"
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
        </div>

        {/* Department & Employment Details */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center">
            <Briefcase className="w-4 h-4 mr-2 text-indigo-500" /> Department & Designation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Department
              </label>
              <div className="relative flex items-center">
                <Building className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
                <select
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                  {...register('department')}
                >
                  {DEPARTMENTS.map(d => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Input
              label="Designation Title"
              placeholder="Lead Solutions Architect"
              icon={<Briefcase className="w-4 h-4" />}
              error={errors.designation?.message}
              {...register('designation')}
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                System Role
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                {...register('role')}
              >
                <option value="Admin">Admin</option>
                <option value="HR Manager">HR Manager</option>
                <option value="Department Head">Department Head</option>
                <option value="Employee">Employee</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Annual Salary ($ USD)"
              type="number"
              placeholder="95000"
              icon={<DollarSign className="w-4 h-4" />}
              error={errors.salary?.message}
              {...register('salary', { valueAsNumber: true })}
            />

            <Input
              label="Joining Date"
              type="date"
              icon={<Calendar className="w-4 h-4" />}
              error={errors.joiningDate?.message}
              {...register('joiningDate')}
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Status
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                {...register('status')}
              >
                <option value="Active">Active</option>
                <option value="Probation">Probation</option>
                <option value="On Leave">On Leave</option>
                <option value="Terminated">Terminated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address & Emergency Contact */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-rose-500" /> Address & Emergency Contact
          </h3>

          <Input
            label="Home / Permanent Address"
            placeholder="100 Tech Blvd, Suite 200, San Francisco, CA"
            icon={<MapPin className="w-4 h-4" />}
            error={errors.address?.message}
            {...register('address')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Emergency Contact Person"
              placeholder="Mary Vance (Spouse)"
              error={errors.emergencyName?.message}
              {...register('emergencyName')}
            />
            <Input
              label="Emergency Phone"
              placeholder="+1 (555) 999-0000"
              icon={<Phone className="w-4 h-4" />}
              error={errors.emergencyPhone?.message}
              {...register('emergencyPhone')}
            />
          </div>

          <Input
            label="Skills & Expertise (Comma Separated)"
            placeholder="React.js, Node.js, GraphQL, Project Management"
            error={errors.skills?.message}
            {...register('skills')}
          />
        </div>

        <div className="flex items-center justify-end space-x-3 pt-2">
          <Button type="button" variant="outline" onClick={() => navigate('/employees')}>
            Cancel
          </Button>
          <Button type="submit" variant="gradient" isLoading={isSubmitting}>
            Save & Add Employee
          </Button>
        </div>
      </form>
    </div>
  );
};
