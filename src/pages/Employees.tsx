import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  Phone,
  Briefcase,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { EMPLOYEES } from '../data/dummyData';
import { Employee } from '../types';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { formatCurrency } from '../utils/cn';
import toast from 'react-hot-toast';

export const Employees: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || 'Admin';
  const canAddEdit = ['Admin', 'HR Manager'].includes(role);
  const canDelete = role === 'Admin';

  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('search') || '';

  const [employeesList, setEmployeesList] = useState<Employee[]>(EMPLOYEES);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'name' | 'joiningDate' | 'salary'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Delete modal state
  const [deleteEmpId, setDeleteEmpId] = useState<string | null>(null);

  // Department options
  const departments = ['All', ...Array.from(new Set(EMPLOYEES.map(e => e.department)))];
  const statuses = ['All', 'Active', 'On Leave', 'Probation', 'Terminated'];

  // Filtered & Sorted Employees
  const filteredEmployees = useMemo(() => {
    return employeesList
      .filter(emp => {
        const matchesSearch =
          `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.designation.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
        const matchesStatus = selectedStatus === 'All' || emp.status === selectedStatus;

        return matchesSearch && matchesDept && matchesStatus;
      })
      .sort((a, b) => {
        let valA: string | number = '';
        let valB: string | number = '';

        if (sortBy === 'name') {
          valA = `${a.firstName} ${a.lastName}`;
          valB = `${b.firstName} ${b.lastName}`;
        } else if (sortBy === 'joiningDate') {
          valA = a.joiningDate;
          valB = b.joiningDate;
        } else if (sortBy === 'salary') {
          valA = a.salary;
          valB = b.salary;
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [employeesList, searchQuery, selectedDept, selectedStatus, sortBy, sortOrder]);

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEmployees.slice(start, start + itemsPerPage);
  }, [filteredEmployees, currentPage]);

  const handleDeleteEmployee = () => {
    if (deleteEmpId) {
      setEmployeesList(prev => prev.filter(e => e.id !== deleteEmpId));
      toast.success('Employee record deleted from system');
      setDeleteEmpId(null);
    }
  };

  const handleExportCSV = () => {
    toast.success(`Exporting ${filteredEmployees.length} employee records to CSV...`);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Employee Directory
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage global team profiles, designations, contracts, and employment status.
          </p>
        </div>
        <div className="flex items-center space-x-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCSV}
            icon={<Download className="w-4 h-4" />}
          >
            Export List
          </Button>
          {canAddEdit && (
            <Link to="/employees/add">
              <Button variant="gradient" size="sm" icon={<Plus className="w-4 h-4" />}>
                Add Employee
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 md:space-y-0 md:flex md:items-center md:justify-between md:space-x-4">
        {/* Search Field */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name, ID, email, title..."
            className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          {/* Department Filter */}
          <div className="flex items-center space-x-1.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">Dept:</span>
            <select
              value={selectedDept}
              onChange={e => {
                setSelectedDept(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              {departments.map(d => (
                <option key={d} value={d} className="bg-white dark:bg-slate-900">
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-1.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5">
            <UserCheck className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500">Status:</span>
            <select
              value={selectedStatus}
              onChange={e => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              {statuses.map(s => (
                <option key={s} value={s} className="bg-white dark:bg-slate-900">
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center space-x-1.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5">
            <span className="text-slate-500">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'name' | 'joiningDate' | 'salary')}
              className="bg-transparent font-semibold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="name" className="bg-white dark:bg-slate-900">Name</option>
              <option value="joiningDate" className="bg-white dark:bg-slate-900">Joining Date</option>
              <option value="salary" className="bg-white dark:bg-slate-900">Salary</option>
            </select>
            <button
              onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-bold ml-1"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Employee Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 dark:bg-slate-800/60 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3">Employee</th>
                <th className="px-4 py-3">Emp ID</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Designation</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Salary</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedEmployees.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-slate-500">
                    No employees match the specified filters.
                  </td>
                </tr>
              ) : (
                paginatedEmployees.map(emp => (
                  <tr
                    key={emp.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group"
                  >
                    <td className="px-4 py-3 flex items-center space-x-3">
                      <img
                        src={emp.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-200 dark:ring-slate-700"
                      />
                      <div className="min-w-0">
                        <Link
                          to={`/employees/${emp.id}`}
                          className="font-bold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 truncate block text-sm"
                        >
                          {emp.firstName} {emp.lastName}
                        </Link>
                        <span className="text-[10px] text-slate-400">{emp.role}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3 font-mono font-semibold text-slate-700 dark:text-slate-300">
                      {emp.employeeId}
                    </td>

                    <td className="px-4 py-3">
                      <span className="inline-flex items-center font-medium text-slate-800 dark:text-slate-200">
                        <Briefcase className="w-3.5 h-3.5 text-indigo-500 mr-1.5 shrink-0" />
                        {emp.department}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300 font-medium max-w-[150px] truncate">
                      {emp.designation}
                    </td>

                    <td className="px-4 py-3 space-y-0.5">
                      <p className="flex items-center text-slate-600 dark:text-slate-400">
                        <Mail className="w-3 h-3 mr-1 text-slate-400 shrink-0" /> {emp.email}
                      </p>
                      <p className="flex items-center text-slate-500 dark:text-slate-500 text-[10px]">
                        <Phone className="w-3 h-3 mr-1 text-slate-400 shrink-0" /> {emp.phone}
                      </p>
                    </td>

                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {emp.joiningDate}
                    </td>

                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                      {formatCurrency(emp.salary)}/yr
                    </td>

                    <td className="px-4 py-3">
                      <Badge variant="status">{emp.status}</Badge>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <Link
                          to={`/employees/${emp.id}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        {canAddEdit && (
                          <Link
                            to={`/employees/edit/${emp.id}`}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                            title="Edit Employee"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                        )}
                        {canDelete && (
                          <button
                            onClick={() => setDeleteEmpId(emp.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Delete Employee"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <p>
            Showing{' '}
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {filteredEmployees.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
            </span>{' '}
            to{' '}
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {Math.min(currentPage * itemsPerPage, filteredEmployees.length)}
            </span>{' '}
            of <span className="font-bold text-slate-800 dark:text-slate-200">{filteredEmployees.length}</span> employees
          </p>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {currentPage} / {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteEmpId}
        onClose={() => setDeleteEmpId(null)}
        title="Confirm Employee Deletion"
        description="Are you sure you want to remove this employee record from the system? This action cannot be undone."
      >
        <div className="flex items-center justify-end space-x-3 pt-4">
          <Button variant="outline" onClick={() => setDeleteEmpId(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteEmployee}>
            Delete Record
          </Button>
        </div>
      </Modal>
    </div>
  );
};
