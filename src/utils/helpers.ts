import { Priority, Task, FilterOptions } from '../types';

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'low':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getPriorityBadgeColor = (priority: Priority): string => {
  switch (priority) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'low':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

export const isOverdue = (dueDate: string): boolean => {
  const today = new Date();
  const due = new Date(dueDate);
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  return due < today;
};

export const isDueToday = (dueDate: string): boolean => {
  const today = new Date();
  const due = new Date(dueDate);
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  return due.getTime() === today.getTime();
};

export const isDueThisWeek = (dueDate: string): boolean => {
  const today = new Date();
  const due = new Date(dueDate);
  const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  weekFromNow.setHours(23, 59, 59, 999);
  
  return due >= today && due <= weekFromNow;
};

export const isDueThisMonth = (dueDate: string): boolean => {
  const today = new Date();
  const due = new Date(dueDate);
  
  return today.getFullYear() === due.getFullYear() && 
         today.getMonth() === due.getMonth() &&
         due >= today;
};

export const filterTasks = (tasks: Task[], filters: FilterOptions): Task[] => {
  return tasks.filter(task => {
    // Search filter
    if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !task.description.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Priority filter
    if (filters.priority !== 'all' && task.priority !== filters.priority) {
      return false;
    }

    // Assigned user filter
    if (filters.assignedUser !== 'all' && task.assignedUserId !== filters.assignedUser) {
      return false;
    }

    // Due date filter
    if (filters.dueDateRange !== 'all') {
      switch (filters.dueDateRange) {
        case 'overdue':
          if (!isOverdue(task.dueDate)) return false;
          break;
        case 'today':
          if (!isDueToday(task.dueDate)) return false;
          break;
        case 'thisWeek':
          if (!isDueThisWeek(task.dueDate)) return false;
          break;
        case 'thisMonth':
          if (!isDueThisMonth(task.dueDate)) return false;
          break;
      }
    }

    return true;
  });
};

export const sortTasksByOrder = (tasks: Task[]): Task[] => {
  return [...tasks].sort((a, b) => a.order - b.order);
};

export const reorderTasks = (tasks: Task[], draggedTaskId: string, targetColumnId: string, newOrder: number): Task[] => {
  const updatedTasks = tasks.map(task => {
    if (task.id === draggedTaskId) {
      return { ...task, columnId: targetColumnId, order: newOrder };
    }
    return task;
  });

  // Reorder other tasks in the target column
  const targetColumnTasks = updatedTasks.filter(task => 
    task.columnId === targetColumnId && task.id !== draggedTaskId
  );

  targetColumnTasks.forEach((task, index) => {
    const adjustedIndex = index >= newOrder ? index + 1 : index;
    const taskIndex = updatedTasks.findIndex(t => t.id === task.id);
    updatedTasks[taskIndex] = { ...task, order: adjustedIndex };
  });

  return updatedTasks;
};