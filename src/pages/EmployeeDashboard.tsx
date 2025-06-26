import React, { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle, Calendar, MessageSquare, Target, TrendingUp } from 'lucide-react';
import { MetricCard } from '../components/dashboard/MetricCard';
import { TimeTracker } from '../components/dashboard/TimeTracker';
import { NotificationPanel } from '../components/dashboard/NotificationPanel';
import { TaskCard } from '../components/TaskCard';
import { 
  employeeMetrics, 
  sampleTimeEntries, 
  sampleNotifications 
} from '../utils/dashboardData';
import { Task, User } from '../types';
import { TimeEntry, Notification } from '../types/dashboard';

interface EmployeeDashboardProps {
  onBack: () => void;
  tasks: Task[];
  users: User[];
  currentUser: User | null;
}

export const EmployeeDashboard: React.FC<EmployeeDashboardProps> = ({ 
  onBack, 
  tasks, 
  users, 
  currentUser 
}) => {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>(sampleTimeEntries);
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  const userTasks = tasks.filter(task => task.assignedUserId === currentUser?.id);
  const overdueTasks = userTasks.filter(task => new Date(task.dueDate) < new Date());
  const todayTasks = userTasks.filter(task => {
    const today = new Date().toISOString().split('T')[0];
    return task.dueDate === today;
  });

  const handleTimeEntry = (entry: Omit<TimeEntry, 'id'>) => {
    const newEntry: TimeEntry = {
      ...entry,
      id: Date.now().toString()
    };
    setTimeEntries(prev => [newEntry, ...prev]);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const totalHoursThisWeek = timeEntries
    .filter(entry => {
      const entryDate = new Date(entry.date);
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      return entryDate >= weekStart;
    })
    .reduce((total, entry) => total + entry.duration, 0) / 60; // Convert to hours

  const timeRanges = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
                <p className="text-gray-600">Welcome back, {currentUser?.name}!</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {timeRanges.map(range => (
                  <option key={range.value} value={range.value}>{range.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Performance Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">My Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {employeeMetrics.map((metric, index) => (
              <MetricCard key={index} metric={metric} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Task Overview */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Task Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{userTasks.length}</p>
                      <p className="text-sm text-gray-600">Total Tasks</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{overdueTasks.length}</p>
                      <p className="text-sm text-gray-600">Overdue</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{todayTasks.length}</p>
                      <p className="text-sm text-gray-600">Due Today</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* My Tasks */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">My Tasks</h3>
                {userTasks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No tasks assigned to you</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {userTasks.slice(0, 5).map((task) => (
                      <div key={task.id} className="border border-gray-200 rounded-lg p-3">
                        <TaskCard
                          task={task}
                          onEdit={() => {}}
                          onDelete={() => {}}
                          onClick={() => {}}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Time Tracking */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Time Tracking</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TimeTracker onTimeEntry={handleTimeEntry} />
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Time Summary</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Hours This Week</span>
                      <span className="font-semibold text-gray-900">{totalHoursThisWeek.toFixed(1)}h</span>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700">Recent Entries</h4>
                      {timeEntries.slice(0, 3).map((entry) => (
                        <div key={entry.id} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 truncate">{entry.taskTitle}</span>
                          <span className="text-gray-900 font-medium">{(entry.duration / 60).toFixed(1)}h</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Notifications */}
            <NotificationPanel
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
            />

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Create Task</p>
                    <p className="text-sm text-gray-600">Add a new personal task</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Team Chat</p>
                    <p className="text-sm text-gray-600">Message your team</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Schedule Meeting</p>
                    <p className="text-sm text-gray-600">Book time with colleagues</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Personal Goals */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Goals</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Weekly Task Goal</span>
                    <span className="text-sm font-medium text-gray-900">8/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Quality Score</span>
                    <span className="text-sm font-medium text-gray-900">4.8/5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '96%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};