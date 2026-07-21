import {
  Employee,
  Department,
  AttendanceRecord,
  PayrollRecord,
  LeaveRequest,
  PerformanceReview,
  AppNotification,
  DirectMessage,
  CalendarEvent,
  ActivityItem
} from '../types';

export const DEPARTMENTS: Department[] = [
  {
    id: 'dept-1',
    name: 'Engineering',
    code: 'ENG',
    headName: 'Alex Morgan',
    headAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    employeeCount: 28,
    budget: 1250000,
    description: 'Core software development, architecture, cloud DevOps, and platform engineering.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'dept-2',
    name: 'Product Management',
    code: 'PRD',
    headName: 'Sarah Jenkins',
    headAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    employeeCount: 12,
    budget: 780000,
    description: 'Product strategy, user research, roadmap definition, and customer experience.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'dept-3',
    name: 'Human Resources',
    code: 'HR',
    headName: 'David Vance',
    headAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    employeeCount: 9,
    budget: 450000,
    description: 'Talent acquisition, employee wellness, compliance, culture, and learning.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'dept-4',
    name: 'Sales & Growth',
    code: 'SLS',
    headName: 'Rachel Green',
    headAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    employeeCount: 18,
    budget: 920000,
    description: 'Enterprise accounts, SMB expansion, partner channels, and revenue operations.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    id: 'dept-5',
    name: 'Marketing & Brand',
    code: 'MKT',
    headName: 'Michael Scott',
    headAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    employeeCount: 11,
    budget: 620000,
    description: 'Digital marketing, content creation, PR campaigns, SEO, and brand storytelling.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'dept-6',
    name: 'Finance & Accounting',
    code: 'FIN',
    headName: 'Elena Rostova',
    headAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    employeeCount: 7,
    budget: 510000,
    description: 'Financial reporting, payroll administration, audit, tax, and investor relations.',
    color: 'from-sky-500 to-blue-600',
  },
  {
    id: 'dept-7',
    name: 'UI/UX Design',
    code: 'DSG',
    headName: 'Lucas Thorne',
    headAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    employeeCount: 8,
    budget: 480000,
    description: 'Design systems, UI prototyping, accessibility standards, and interaction design.',
    color: 'from-violet-500 to-fuchsia-500',
  },
  {
    id: 'dept-8',
    name: 'Customer Support',
    code: 'SUP',
    headName: 'Jessica Alba',
    headAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    employeeCount: 14,
    budget: 390000,
    description: '24/7 client care, technical support, escalation, and customer success management.',
    color: 'from-teal-500 to-cyan-600',
  },
  {
    id: 'dept-9',
    name: 'Operations & IT',
    code: 'OPS',
    headName: 'Marcus Wright',
    headAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    employeeCount: 6,
    budget: 340000,
    description: 'Internal IT infrastructure, security compliance, hardware procurement, and facilities.',
    color: 'from-slate-600 to-slate-800',
  },
  {
    id: 'dept-10',
    name: 'Legal & Compliance',
    code: 'LGL',
    headName: 'Victoria Sterling',
    headAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    employeeCount: 4,
    budget: 410000,
    description: 'Corporate governance, IP protection, vendor contracts, and regulatory compliance.',
    color: 'from-stone-600 to-zinc-700',
  },
];

const FIRST_NAMES = [
  'Alexander', 'Sophia', 'Ethan', 'Olivia', 'Liam', 'Emma', 'Noah', 'Ava', 'Mason', 'Isabella',
  'William', 'Mia', 'James', 'Harper', 'Benjamin', 'Evelyn', 'Lucas', 'Charlotte', 'Henry', 'Amelia',
  'Daniel', 'Ella', 'Matthew', 'Abigail', 'Jackson', 'Emily', 'Sebastian', 'Aaliyah', 'David', 'Scarlett',
  'Joseph', 'Victoria', 'Samuel', 'Madison', 'Carter', 'Luna', 'Owen', 'Grace', 'Wyatt', 'Chloe',
  'John', 'Penelope', 'Jack', 'Layla', 'Luke', 'Riley', 'Jayden', 'Zoey', 'Dylan', 'Nora',
  'Grayson', 'Lily', 'Levi', 'Eleanor', 'Isaac', 'Hannah', 'Gabriel', 'Lillian', 'Julian', 'Addison',
  'Mateo', 'Aubrey', 'Anthony', 'Ellie', 'Jaxon', 'Stella', 'Lincoln', 'Natalie', 'Joshua', 'Zoe',
  'Christopher', 'Leah', 'Andrew', 'Hazel', 'Theodore', 'Violet', 'Caleb', 'Aurora', 'Ryan', 'Savannah',
  'Asher', 'Audrey', 'Nathan', 'Brooklyn', 'Thomas', 'Bella', 'Leo', 'Claire', 'Isaiah', 'Skylar'
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
  'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes',
  'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper',
  'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
  'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes'
];

const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&auto=format&fit=crop&q=80',
];

const SKILL_POOL = [
  'React.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'AWS', 'Docker', 'Kubernetes',
  'Python', 'System Architecture', 'Product Strategy', 'UI Design', 'Figma', 'Agile Leadership',
  'Financial Modeling', 'Data Analytics', 'PostgreSQL', 'CI/CD', 'SEO Optimization', 'Talent Sourcing',
  'Conflict Resolution', 'Strategic Sales', 'Customer Success', 'Risk Management', 'Public Relations'
];

export const EMPLOYEES: Employee[] = Array.from({ length: 100 }, (_, i) => {
  const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
  const lastName = LAST_NAMES[i % LAST_NAMES.length];
  const deptObj = DEPARTMENTS[i % DEPARTMENTS.length];
  const idNum = 1001 + i;
  const empId = `EMP-${idNum}`;
  
  const roles = ['Admin', 'HR Manager', 'Department Head', 'Employee'] as const;
  const role = i === 0 ? 'Admin' : i < 5 ? 'HR Manager' : i < 15 ? 'Department Head' : 'Employee';
  
  const statuses = ['Active', 'Active', 'Active', 'Active', 'Active', 'Active', 'On Leave', 'Probation'] as const;
  const status = statuses[i % statuses.length];

  const designations = {
    'Engineering': ['Senior Lead Architect', 'Full Stack Engineer', 'Backend Specialist', 'DevOps Lead', 'Frontend Engineer', 'QA Automation Engineer'],
    'Product Management': ['VP of Product', 'Senior Product Manager', 'Product Analyst', 'Technical PM'],
    'Human Resources': ['HR Director', 'Talent Acquisition Partner', 'People Operations Specialist', 'HR Business Partner'],
    'Sales & Growth': ['Enterprise Account Director', 'Sales Executive', 'Business Development Rep', 'Revenue Ops Lead'],
    'Marketing & Brand': ['Marketing Operations Lead', 'Growth Marketer', 'Content Strategist', 'SEO Specialist'],
    'Finance & Accounting': ['Chief Financial Officer', 'Senior Financial Analyst', 'Payroll Specialist', 'Staff Accountant'],
    'UI/UX Design': ['Principal Product Designer', 'Senior UI/UX Designer', 'Design Systems Engineer', 'UX Researcher'],
    'Customer Support': ['Head of Customer Care', 'Technical Support Lead', 'Customer Success Specialist'],
    'Operations & IT': ['IT Operations Director', 'Systems Administrator', 'Infra Support Lead'],
    'Legal & Compliance': ['General Counsel', 'Compliance Officer', 'Legal Operations Manager'],
  }[deptObj.name] || ['Specialist'];

  const designation = designations[i % designations.length];
  const baseSalary = 55000 + (i % 25) * 4500 + (i < 15 ? 40000 : 0);
  const rating = Number((3.8 + (i % 13) * 0.1).toFixed(1));

  const yearsAgo = 2020 + (i % 6);
  const month = String((i % 12) + 1).padStart(2, '0');
  const day = String((i % 28) + 1).padStart(2, '0');
  const joiningDate = `${yearsAgo}-${month}-${day}`;

  const skillsCount = 3 + (i % 3);
  const empSkills = Array.from({ length: skillsCount }, (_, k) => SKILL_POOL[(i + k * 4) % SKILL_POOL.length]);

  return {
    id: `emp-id-${idNum}`,
    employeeId: empId,
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@nexuscorp.com`,
    phone: `+1 (555) ${100 + (i % 899)}-${1000 + (i * 7) % 8999}`,
    department: deptObj.name,
    designation,
    role,
    joiningDate,
    salary: baseSalary,
    status,
    avatar: AVATARS[i % AVATARS.length],
    address: `${100 + i * 12} Tech Boulevard, Suite ${200 + i}, San Francisco, CA 94107`,
    dob: `199${i % 10}-0${(i % 9) + 1}-15`,
    gender: i % 2 === 0 ? 'Female' : 'Male',
    skills: empSkills,
    performanceRating: Math.min(5, rating),
    emergencyContact: {
      name: `Relative of ${firstName}`,
      relationship: i % 2 === 0 ? 'Spouse' : 'Parent',
      phone: `+1 (555) 987-${1000 + i}`,
    },
    projectsCount: 2 + (i % 6),
    attendanceRate: 92 + (i % 8),
  };
});

export const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    user: 'Sarah Jenkins',
    avatar: AVATARS[1],
    action: 'approved paid leave request for',
    target: 'Liam Brown (3 Days)',
    time: '12 minutes ago',
    type: 'leave',
  },
  {
    id: 'act-2',
    user: 'David Vance',
    avatar: AVATARS[2],
    action: 'onboarded new team member',
    target: 'Scarlett White as Senior Frontend Engineer',
    time: '45 minutes ago',
    type: 'employee',
  },
  {
    id: 'act-3',
    user: 'Elena Rostova',
    avatar: AVATARS[5],
    action: 'processed monthly payroll batch for',
    target: 'Engineering Department ($284,500)',
    time: '2 hours ago',
    type: 'payroll',
  },
  {
    id: 'act-4',
    user: 'Alex Morgan',
    avatar: AVATARS[0],
    action: 'completed Q2 performance review for',
    target: 'Mason Garcia (Rating: 4.8/5.0)',
    time: '4 hours ago',
    type: 'performance',
  },
  {
    id: 'act-5',
    user: 'System Admin',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    action: 'generated monthly attendance report for',
    target: 'July 2026',
    time: 'Yesterday',
    type: 'system',
  },
];

export const UPCOMING_BIRTHDAYS = [
  { id: 'b1', name: 'Sophia Miller', avatar: AVATARS[3], department: 'UI/UX Design', date: 'Tomorrow, July 22' },
  { id: 'b2', name: 'Ethan Davis', avatar: AVATARS[4], department: 'Engineering', date: 'July 24, 2026' },
  { id: 'b3', name: 'Olivia Wilson', avatar: AVATARS[6], department: 'Human Resources', date: 'July 28, 2026' },
  { id: 'b4', name: 'Lucas Thorne', avatar: AVATARS[7], department: 'Marketing', date: 'August 02, 2026' },
];

export const ATTENDANCE_RECORDS: AttendanceRecord[] = EMPLOYEES.slice(0, 30).map((emp, index) => {
  const statuses: ('Present' | 'Late' | 'Absent' | 'On Leave' | 'Half Day')[] = [
    'Present', 'Present', 'Present', 'Present', 'Late', 'Present', 'Present', 'On Leave', 'Present', 'Half Day'
  ];
  const status = statuses[index % statuses.length];
  const checkIn = status === 'Present' ? '08:55 AM' : status === 'Late' ? '09:42 AM' : status === 'Half Day' ? '01:00 PM' : 'N/A';
  const checkOut = status === 'Present' || status === 'Late' ? '05:30 PM' : status === 'Half Day' ? '05:30 PM' : 'N/A';
  const workHours = status === 'Present' ? 8.5 : status === 'Late' ? 7.8 : status === 'Half Day' ? 4.5 : 0;

  return {
    id: `att-${index + 1}`,
    employeeId: emp.employeeId,
    employeeName: `${emp.firstName} ${emp.lastName}`,
    avatar: emp.avatar,
    department: emp.department,
    date: '2026-07-21',
    checkIn,
    checkOut,
    status,
    workHours,
  };
});

export const PAYROLL_RECORDS: PayrollRecord[] = EMPLOYEES.slice(0, 25).map((emp, index) => {
  const basic = emp.salary / 12;
  const bonus = index % 3 === 0 ? 1200 : index % 2 === 0 ? 500 : 0;
  const deductions = Math.round(basic * 0.12);
  const tax = Math.round(basic * 0.15);
  const netSalary = Math.round(basic + bonus - deductions - tax);
  const statuses: ('Paid' | 'Pending' | 'Processing')[] = ['Paid', 'Paid', 'Paid', 'Pending', 'Processing'];

  return {
    id: `pay-${index + 1}`,
    employeeId: emp.employeeId,
    employeeName: `${emp.firstName} ${emp.lastName}`,
    avatar: emp.avatar,
    department: emp.department,
    designation: emp.designation,
    month: 'July 2026',
    basicSalary: Math.round(basic),
    bonus,
    deductions,
    tax,
    netSalary,
    status: statuses[index % statuses.length],
    paymentDate: '2026-07-28',
  };
});

export const LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'lvr-101',
    employeeId: 'EMP-1004',
    employeeName: 'Ava Brown',
    avatar: AVATARS[3],
    department: 'Engineering',
    type: 'Paid Leave',
    startDate: '2026-07-25',
    endDate: '2026-07-28',
    days: 4,
    reason: 'Family annual vacation trip planned in advance.',
    status: 'Pending',
    appliedOn: '2026-07-19',
  },
  {
    id: 'lvr-102',
    employeeId: 'EMP-1008',
    employeeName: 'Mason Garcia',
    avatar: AVATARS[4],
    department: 'Sales & Growth',
    type: 'Sick Leave',
    startDate: '2026-07-21',
    endDate: '2026-07-22',
    days: 2,
    reason: 'Acute fever and medical checkup recommended rest.',
    status: 'Approved',
    appliedOn: '2026-07-20',
  },
  {
    id: 'lvr-103',
    employeeId: 'EMP-1012',
    employeeName: 'Mia Davis',
    avatar: AVATARS[5],
    department: 'UI/UX Design',
    type: 'Casual Leave',
    startDate: '2026-07-30',
    endDate: '2026-07-30',
    days: 1,
    reason: 'Personal urgent errand at local government office.',
    status: 'Pending',
    appliedOn: '2026-07-21',
  },
  {
    id: 'lvr-104',
    employeeId: 'EMP-1015',
    employeeName: 'Evelyn Rodriguez',
    avatar: AVATARS[7],
    department: 'Product Management',
    type: 'Maternity Leave',
    startDate: '2026-08-01',
    endDate: '2026-11-01',
    days: 90,
    reason: 'Maternity leave as per standard HR policy.',
    status: 'Approved',
    appliedOn: '2026-07-15',
  },
  {
    id: 'lvr-105',
    employeeId: 'EMP-1020',
    employeeName: 'Lucas Wilson',
    avatar: AVATARS[9],
    department: 'Finance & Accounting',
    type: 'Unpaid Leave',
    startDate: '2026-07-22',
    endDate: '2026-07-24',
    days: 3,
    reason: 'Attending external tech certification bootcamp.',
    status: 'Rejected',
    appliedOn: '2026-07-18',
  },
];

export const PERFORMANCE_REVIEWS: PerformanceReview[] = EMPLOYEES.slice(0, 15).map((emp, index) => {
  return {
    id: `prf-${index + 1}`,
    employeeId: emp.employeeId,
    employeeName: `${emp.firstName} ${emp.lastName}`,
    avatar: emp.avatar,
    department: emp.department,
    designation: emp.designation,
    rating: emp.performanceRating,
    kpisAchieved: 8 + (index % 3),
    totalKpis: 10,
    goalsCompleted: 4 + (index % 2),
    totalGoals: 5,
    reviewer: index % 2 === 0 ? 'Alex Morgan (VP Eng)' : 'Sarah Jenkins (Head of Product)',
    feedback: 'Consistently delivers high-quality output on time. Great team collaboration and leadership potential.',
    reviewDate: '2026-06-30',
  };
});

export const APP_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Payroll Disbursement Ready',
    message: 'Monthly salary batch for July 2026 is pending final approval by HR Director.',
    time: '10 min ago',
    type: 'info',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'New Leave Request',
    message: 'Mia Davis submitted a Casual Leave request for July 30.',
    time: '1 hour ago',
    type: 'warning',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Performance Appraisal Due',
    message: 'Q2 Performance reviews for 5 team members in Engineering are open.',
    time: '3 hours ago',
    type: 'alert',
    read: true,
  },
  {
    id: 'notif-4',
    title: 'System Maintenance Complete',
    message: 'Security patch and cloud database backup completed successfully.',
    time: 'Yesterday',
    type: 'success',
    read: true,
  },
];

export const DIRECT_MESSAGES: DirectMessage[] = [
  {
    id: 'msg-1',
    senderName: 'Sarah Jenkins',
    senderAvatar: AVATARS[1],
    senderRole: 'VP of Product',
    lastMessage: 'Hey! Have you reviewed the Q3 recruitment budget for product team?',
    time: '10:42 AM',
    unreadCount: 2,
    online: true,
    messages: [
      { id: 'm1', senderId: 'user', text: 'Hi Sarah, checking it now.', time: '10:30 AM', isMe: true },
      { id: 'm2', senderId: 'sarah', text: 'Great! We need 3 new Senior PMs onboarded by next month.', time: '10:40 AM', isMe: false },
      { id: 'm3', senderId: 'sarah', text: 'Hey! Have you reviewed the Q3 recruitment budget for product team?', time: '10:42 AM', isMe: false },
    ],
  },
  {
    id: 'msg-2',
    senderName: 'David Vance',
    senderAvatar: AVATARS[2],
    senderRole: 'HR Director',
    lastMessage: 'All onboarding kits for tomorrow have been prepared and delivered.',
    time: '09:15 AM',
    unreadCount: 0,
    online: true,
    messages: [
      { id: 'm1', senderId: 'david', text: 'All onboarding kits for tomorrow have been prepared and delivered.', time: '09:15 AM', isMe: false },
    ],
  },
  {
    id: 'msg-3',
    senderName: 'Elena Rostova',
    senderAvatar: AVATARS[5],
    senderRole: 'CFO',
    lastMessage: 'Monthly expense reports look healthy. Thanks for sending the payroll list.',
    time: 'Yesterday',
    unreadCount: 0,
    online: false,
    messages: [
      { id: 'm1', senderId: 'elena', text: 'Monthly expense reports look healthy. Thanks for sending the payroll list.', time: 'Yesterday', isMe: false },
    ],
  },
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 'ev-1', title: 'Q3 HR Strategy & Budget Review', date: '2026-07-21', time: '02:00 PM - 03:30 PM', type: 'meeting', location: 'Boardroom A / Zoom' },
  { id: 'ev-2', title: 'Sophia Miller Birthday', date: '2026-07-22', time: 'All Day', type: 'birthday' },
  { id: 'ev-3', title: 'Town Hall & Q2 Awards Ceremony', date: '2026-07-24', time: '11:00 AM - 12:30 PM', type: 'meeting', location: 'Main Auditorium' },
  { id: 'ev-4', title: 'Payroll Processing Deadline', date: '2026-07-27', time: '05:00 PM', type: 'deadline' },
  { id: 'ev-5', title: 'Company Summer Hackathon', date: '2026-07-31', time: '09:00 AM - 06:00 PM', type: 'holiday', location: 'HQ Innovation Lab' },
];

export const CHART_DATA = {
  attendanceTrend: [
    { day: 'Mon', attendance: 96, late: 2, absent: 2 },
    { day: 'Tue', attendance: 98, late: 1, absent: 1 },
    { day: 'Wed', attendance: 94, late: 4, absent: 2 },
    { day: 'Thu', attendance: 97, late: 2, absent: 1 },
    { day: 'Fri', attendance: 92, late: 5, absent: 3 },
  ],
  departmentBreakdown: DEPARTMENTS.map(d => ({
    name: d.name,
    employees: d.employeeCount,
    budget: d.budget,
  })),
  payrollExpenses: [
    { month: 'Feb', salary: 420000, bonus: 35000 },
    { month: 'Mar', salary: 435000, bonus: 41000 },
    { month: 'Apr', salary: 440000, bonus: 28000 },
    { month: 'May', salary: 460000, bonus: 52000 },
    { month: 'Jun', salary: 475000, bonus: 38000 },
    { month: 'Jul', salary: 490000, bonus: 45000 },
  ],
  performanceDistribution: [
    { range: '4.5 - 5.0 (Exceptional)', count: 28 },
    { range: '4.0 - 4.4 (Exceeds)', count: 42 },
    { range: '3.5 - 3.9 (Meets)', count: 22 },
    { range: '3.0 - 3.4 (Needs Imp)', count: 6 },
    { range: '< 3.0 (Unsatisfactory)', count: 2 },
  ],
};
