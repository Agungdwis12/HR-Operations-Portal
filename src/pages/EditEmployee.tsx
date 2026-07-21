import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
import { EMPLOYEES, DEPARTMENTS } from '../data/dummyData';
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
  skills: z.string().min(2, 'Please list skills'),
  status: z.enum(['Active', 'On Leave', 'Probation', 'Terminated']),
});

type EmpFormData = z.infer<typeof empSchema>;

export const EditEmployee: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || 'Admin';
  const canEdit = ['Admin', 'HR Manager'].includes(role);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!canEdit) {
    return (
      <div className="p-8 max-w-md mx-auto text-center space-y-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl my-12">
        <ShieldCheck className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Access Restricted</h2>
        <p className="text-xs text-slate-500">
          Your current role (<span className="font-bold text-indigo-600 dark:text-indigo-400">{role}</span>) does not have authorization to edit employee profiles.
        </p>
        <Link to="/employees">
          <Button variant="gradient" size="sm" className="mt-2">
            Back to Employee Directory
          </Button>
        </Link>
      </div>
    );
  }

  const employee = EMPLOYEES.find(e => e.id === id) || EMPLOYEES[0];

  const [avatarPreview, setAvatarPreview] = useState<string>(employee.avatar);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmpFormData>({
    resolver: zodResolver(empSchema),
    defaultValues: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      employeeId: employee.employeeId,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      designation: employee.designation,
      role: employee.role,
      salary: employee.salary,
      joiningDate: employee.joiningDate,
      address: employee.address || '100 Tech Blvd, San Francisco, CA',
      skills: employee.skills.join(', '),
      status: employee.status,
    },
  });

  const onSubmit = async (data: EmpFormData) => {
    await new Promise(res => setTimeout(res, 600));
    toast.success(`Updated profile for ${data.firstName} ${data.lastName}!`);
    navigate(`/employees/${employee.id}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <Link
            to={`/employees/${employee.id}`}
            className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Cancel & Return to Profile
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Edit Employee: {employee.firstName} {employee.lastName}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Modify contract terms, salary brackets, department role, or personal contact info.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Avatar */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex items-center space-x-6">
          <div className="relative group">
            <img
              src={avatarPreview}
              alt=""
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-blue-500/30"
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
              Update Profile Avatar
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Click photo to select new image file.
            </p>
          </div>
        </div>

        {/* Basic Personal Details */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center">
            <User className="w-4 h-4 mr-2 text-blue-500" /> Personal Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              error={errors.firstName?.message}
              {...register('firstName')}
            />
            <Input
              label="Last Name"
              error={errors.lastName?.message}
              {...register('lastName')}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Employee ID"
              icon={<ShieldCheck className="w-4 h-4" />}
              error={errors.employeeId?.message}
              {...register('employeeId')}
            />
            <Input
              label="Work Email"
              type="email"
              icon={<Mail className="w-4 h-4" />}
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Phone Number"
              icon={<Phone className="w-4 h-4" />}
              error={errors.phone?.message}
              {...register('phone')}
            />
          </div>
        </div>

        {/* Department & Employment Details */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center">
            <Briefcase className="w-4 h-4 mr-2 text-indigo-500" /> Employment Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Department
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                {...register('department')}
              >
                {DEPARTMENTS.map(d => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Designation Title"
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

          <Input
            label="Address"
            icon={<MapPin className="w-4 h-4" />}
            error={errors.address?.message}
            {...register('address')}
          />

          <Input
            label="Skills & Competencies"
            error={errors.skills?.message}
            {...register('skills')}
          />
        </div>

        <div className="flex items-center justify-end space-x-3 pt-2">
          <Button type="button" variant="outline" onClick={() => navigate(`/employees/${employee.id}`)}>
            Cancel
          </Button>
          <Button type="submit" variant="gradient" isLoading={isSubmitting}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
