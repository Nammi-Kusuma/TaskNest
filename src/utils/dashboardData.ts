import { DashboardUser, TeamMember, ProjectProgress, PerformanceMetric, TimeEntry, Notification, ResourceAllocation } from '../types/dashboard';

export const sampleUsers: DashboardUser[] = [
  {
    id: 'manager-1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'manager',
    department: 'Engineering',
    position: 'Engineering Manager',
    joinDate: '2022-01-15',
    status: 'active'
  },
  {
    id: 'employee-1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'employee',
    department: 'Engineering',
    position: 'Senior Developer',
    joinDate: '2023-03-10',
    status: 'active'
  },
  {
    id: 'employee-2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'employee',
    department: 'Design',
    position: 'UI/UX Designer',
    joinDate: '2023-06-20',
    status: 'busy'
  },
  {
    id: 'employee-3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    role: 'employee',
    department: 'Engineering',
    position: 'Frontend Developer',
    joinDate: '2023-08-15',
    status: 'active'
  }
];

export const sampleTeamMembers: TeamMember[] = [
  {
    ...sampleUsers[1],
    currentTasks: 5,
    completedTasks: 23,
    productivity: 92,
    lastActive: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    ...sampleUsers[2],
    currentTasks: 3,
    completedTasks: 18,
    productivity: 88,
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    ...sampleUsers[3],
    currentTasks: 4,
    completedTasks: 15,
    productivity: 85,
    lastActive: new Date(Date.now() - 15 * 60 * 1000).toISOString()
  }
];

export const sampleProjects: ProjectProgress[] = [
  {
    id: '1',
    name: 'Website Redesign',
    progress: 75,
    status: 'on-track',
    dueDate: '2024-02-15',
    teamSize: 5,
    budget: 50000,
    spent: 32000
  },
  {
    id: '2',
    name: 'Mobile App Development',
    progress: 45,
    status: 'at-risk',
    dueDate: '2024-03-30',
    teamSize: 8,
    budget: 80000,
    spent: 45000
  },
  {
    id: '3',
    name: 'API Integration',
    progress: 90,
    status: 'on-track',
    dueDate: '2024-01-20',
    teamSize: 3,
    budget: 25000,
    spent: 22000
  }
];

export const managerMetrics: PerformanceMetric[] = [
  {
    label: 'Team Productivity',
    value: 88,
    change: 5.2,
    trend: 'up',
    color: 'text-green-600'
  },
  {
    label: 'Projects On Track',
    value: 12,
    change: 2,
    trend: 'up',
    color: 'text-blue-600'
  },
  {
    label: 'Budget Utilization',
    value: 72,
    change: -3.1,
    trend: 'down',
    color: 'text-orange-600'
  },
  {
    label: 'Team Satisfaction',
    value: 4.6,
    change: 0.3,
    trend: 'up',
    color: 'text-purple-600'
  }
];

export const employeeMetrics: PerformanceMetric[] = [
  {
    label: 'Tasks Completed',
    value: 23,
    change: 4,
    trend: 'up',
    color: 'text-green-600'
  },
  {
    label: 'Productivity Score',
    value: 92,
    change: 8,
    trend: 'up',
    color: 'text-blue-600'
  },
  {
    label: 'Hours This Week',
    value: 38,
    change: -2,
    trend: 'down',
    color: 'text-orange-600'
  },
  {
    label: 'Quality Rating',
    value: 4.8,
    change: 0.2,
    trend: 'up',
    color: 'text-purple-600'
  }
];

export const sampleTimeEntries: TimeEntry[] = [
  {
    id: '1',
    taskId: '1',
    taskTitle: 'Design Homepage Layout',
    startTime: '2024-01-15T09:00:00Z',
    endTime: '2024-01-15T12:30:00Z',
    duration: 210,
    description: 'Working on wireframes and mockups',
    date: '2024-01-15'
  },
  {
    id: '2',
    taskId: '2',
    taskTitle: 'Implement User Authentication',
    startTime: '2024-01-15T13:30:00Z',
    endTime: '2024-01-15T17:00:00Z',
    duration: 210,
    description: 'Setting up login and registration',
    date: '2024-01-15'
  }
];

export const sampleNotifications: Notification[] = [
  {
    id: '1',
    type: 'deadline',
    title: 'Task Due Soon',
    message: 'Design Homepage Layout is due in 2 hours',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'mention',
    title: 'You were mentioned',
    message: 'Sarah Johnson mentioned you in a comment',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    priority: 'medium'
  },
  {
    id: '3',
    type: 'task',
    title: 'New Task Assigned',
    message: 'Database Schema Design has been assigned to you',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    read: true,
    priority: 'medium'
  }
];

export const sampleResourceAllocation: ResourceAllocation[] = [
  {
    department: 'Engineering',
    allocated: 100,
    used: 85,
    available: 15,
    efficiency: 85
  },
  {
    department: 'Design',
    allocated: 50,
    used: 42,
    available: 8,
    efficiency: 84
  },
  {
    department: 'Marketing',
    allocated: 30,
    used: 28,
    available: 2,
    efficiency: 93
  },
  {
    department: 'QA',
    allocated: 25,
    used: 20,
    available: 5,
    efficiency: 80
  }
];