import React from 'react';
import { Calendar, User, AlertCircle, Clock } from 'lucide-react';
import { Task } from '../types';
import { formatDate, getPriorityBadgeColor, isOverdue, isDueToday } from '../utils/helpers';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onClick: (task: Task) => void;
  isDragging?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onClick, isDragging }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const dueDateColor = () => {
    if (isOverdue(task.dueDate)) return 'text-red-600';
    if (isDueToday(task.dueDate)) return 'text-orange-600';
    return 'text-gray-600';
  };

  const dueDateBgColor = () => {
    if (isOverdue(task.dueDate)) return 'bg-red-50 border-red-200';
    if (isDueToday(task.dueDate)) return 'bg-orange-50 border-orange-200';
    return 'bg-gray-50 border-gray-200';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => onClick(task)}
      className={`
        group bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-3 cursor-pointer
        hover:shadow-lg hover:border-gray-300 transition-all duration-300
        hover:bg-gray-50
        ${isDragging ? 'opacity-50 rotate-2 scale-105' : ''}
      `}
    >
      {/* Priority Indicator */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${getPriorityBadgeColor(task.priority)}`} />
          <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
            {task.priority}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-400">{task.assignedUserName || 'Unassigned'}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {task.description}
        </p>
      )}

      {/* Due Date */}
      <div className={`flex items-center gap-3 p-3 rounded-lg ${dueDateBgColor()} mb-4`}>
        {isOverdue(task.dueDate) ? (
          <AlertCircle className="w-5 h-5 text-red-600" />
        ) : isDueToday(task.dueDate) ? (
          <Clock className="w-5 h-5 text-orange-600" />
        ) : (
          <Calendar className="w-5 h-5 text-gray-600" />
        )}
        <span className={`text-sm font-medium ${dueDateColor()}`}>
          {formatDate(task.dueDate)}
          {isOverdue(task.dueDate) && ' (Overdue)'}
          {isDueToday(task.dueDate) && ' (Today)'}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-2">
          {/* <User className="w-4 h-4 text-gray-400" />
          <span>{task.creatorName}</span> */}
        </div>
        <div className="text-right">
          <span>by {task.creatorName}</span>
        </div>
      </div>
    </div>
  );
};