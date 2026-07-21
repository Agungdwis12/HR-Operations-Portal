export type UserRole = 'Admin' | 'HR Manager' | 'Department Head' | 'Employee';

export type EmployeeStatus = 'Active' | 'On Leave' | 'Terminated' | 'Probation';

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface Employee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  role: UserRole;
  joiningDate: string;
  salary: number;
  status: EmployeeStatus;
  avatar: string;
  address?: string;
  dob?: string;
  gender?: string;
  skills: string[];
  performanceRating: number;
  emergencyContact: EmergencyContact;
  projectsCount?: number;
  attendanceRate?: number;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  headName: string;
  headAvatar: string;
  employeeCount: number;
  budget: number;
  description: string;
  color: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  department: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Present' | 'Late' | 'Absent' | 'On Leave' | 'Half Day';
  workHours: number;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  department: string;
  designation: string;
  month: string;
  basicSalary: number;
  bonus: number;
  deductions: number;
  tax: number;
  netSalary: number;
  status: 'Paid' | 'Pending' | 'Processing';
  paymentDate: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  department: string;
  type: 'Paid Leave' | 'Sick Leave' | 'Casual Leave' | 'Maternity Leave' | 'Unpaid Leave';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  department: string;
  designation: string;
  rating: number; // 1 to 5
  kpisAchieved: number;
  totalKpis: number;
  goalsCompleted: number;
  totalGoals: number;
  reviewer: string;
  feedback: string;
  reviewDate: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  read: boolean;
  link?: string;
}

export interface DirectMessage {
  id: string;
  senderName: string;
  senderAvatar: string;
  senderRole: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  online: boolean;
  messages: {
    id: string;
    senderId: string;
    text: string;
    time: string;
    isMe: boolean;
  }[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  type: 'meeting' | 'holiday' | 'birthday' | 'review' | 'deadline';
  attendees?: string[];
  location?: string;
}

export interface ActivityItem {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  time: string;
  type: 'employee' | 'payroll' | 'leave' | 'system' | 'performance';
}
