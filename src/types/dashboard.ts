export interface DashboardUser {
    id: string;
    name: string;
    email: string;
    role: 'manager' | 'employee';
    avatar?: string;
    department: string;
    position: string;
    joinDate: string;
    status: 'active' | 'away' | 'busy' | 'offline';
  }
  
  export interface TeamMember extends DashboardUser {
    currentTasks: number;
    completedTasks: number;
    productivity: number;
    lastActive: string;
  }
  
  export interface ProjectProgress {
    id: string;
    name: string;
    progress: number;
    status: 'on-track' | 'at-risk' | 'delayed' | 'completed';
    dueDate: string;
    teamSize: number;
    budget: number;
    spent: number;
  }
  
  export interface PerformanceMetric {
    label: string;
    value: number;
    change: number;
    trend: 'up' | 'down' | 'stable';
    color: string;
  }
  
  export interface TimeEntry {
    id: string;
    taskId: string;
    taskTitle: string;
    startTime: string;
    endTime?: string;
    duration: number;
    description: string;
    date: string;
  }
  
  export interface Notification {
    id: string;
    type: 'task' | 'deadline' | 'mention' | 'system';
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    priority: 'low' | 'medium' | 'high';
  }
  
  export interface ResourceAllocation {
    department: string;
    allocated: number;
    used: number;
    available: number;
    efficiency: number;
  }