import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DEPARTMENTS } from '../data/dummyData';
import { Department } from '../types';
import { Search, Plus, Users, DollarSign, Building2, User } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { formatCurrency } from '../utils/cn';
import toast from 'react-hot-toast';

export const Departments: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || 'Admin';
  const canManageDepts = ['Admin', 'HR Manager'].includes(role);

  const [departmentsList, setDepartmentsList] = useState<Department[]>(DEPARTMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Dept Form
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptCode, setNewDeptCode] = useState('');
  const [newDeptHead, setNewDeptHead] = useState('Alex Morgan');
  const [newDeptBudget, setNewDeptBudget] = useState('500000');
  const [newDeptDesc, setNewDeptDesc] = useState('');

  const filteredDepts = departmentsList.filter(
    d =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.headName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName || !newDeptCode) {
      toast.error('Please complete department name and code');
      return;
    }

    const created: Department = {
      id: `dept-${Date.now()}`,
      name: newDeptName,
      code: newDeptCode.toUpperCase(),
      headName: newDeptHead,
      headAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      employeeCount: 1,
      budget: Number(newDeptBudget) || 500000,
      description: newDeptDesc || 'Newly created corporate division.',
      color: 'from-blue-600 to-indigo-600',
    };

    setDepartmentsList([created, ...departmentsList]);
    toast.success(`Department "${newDeptName}" created successfully!`);
    setIsAddModalOpen(false);
    setNewDeptName('');
    setNewDeptCode('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Departments & Divisions
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Overview of organizational structure, department heads, headcount, and budget allocations.
          </p>
        </div>
        {canManageDepts && (
          <Button
            variant="gradient"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Department
          </Button>
        )}
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search departments or managers..."
            className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepts.map(dept => (
          <div
            key={dept.id}
            className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow transition-all duration-150 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60">
                  {dept.code}
                </span>
                <span className="text-xs font-semibold text-slate-400 flex items-center">
                  <Users className="w-3.5 h-3.5 mr-1" /> {dept.employeeCount} Members
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {dept.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                {dept.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Department Head:</span>
                <div className="flex items-center space-x-2">
                  <img src={dept.headAvatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{dept.headName}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Annual Budget:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(dept.budget)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Department Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Department"
        description="Establish a new corporate division and assign initial budget allocation."
      >
        <form onSubmit={handleCreateDepartment} className="space-y-4">
          <Input
            label="Department Name"
            placeholder="Data Intelligence"
            value={newDeptName}
            onChange={e => setNewDeptName(e.target.value)}
          />
          <Input
            label="Code Symbol"
            placeholder="DAT"
            value={newDeptCode}
            onChange={e => setNewDeptCode(e.target.value)}
          />
          <Input
            label="Department Manager / Head"
            placeholder="Alex Morgan"
            value={newDeptHead}
            onChange={e => setNewDeptHead(e.target.value)}
          />
          <Input
            label="Annual Operating Budget ($ USD)"
            type="number"
            placeholder="750000"
            value={newDeptBudget}
            onChange={e => setNewDeptBudget(e.target.value)}
          />
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Division Description
            </label>
            <textarea
              rows={3}
              value={newDeptDesc}
              onChange={e => setNewDeptDesc(e.target.value)}
              placeholder="Describe core operational mandate..."
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-xs sm:text-sm text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3">
            <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient">
              Create Division
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
