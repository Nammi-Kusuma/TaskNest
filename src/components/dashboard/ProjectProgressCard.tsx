import React from 'react';
import { Calendar, Users, DollarSign, AlertTriangle } from 'lucide-react';
import { ProjectProgress } from '../../types/dashboard';
import { formatDate } from '../../utils/helpers';

interface ProjectProgressCardProps {
  project: ProjectProgress;
}

export const ProjectProgressCard: React.FC<ProjectProgressCardProps> = ({ project }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'bg-green-100 text-green-800';
      case 'at-risk':
        return 'bg-yellow-100 text-yellow-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number, status: string) => {
    if (status === 'completed') return 'bg-blue-500';
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const budgetUsed = (project.spent / project.budget) * 100;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status.replace('-', ' ')}
          </span>
        </div>
        {project.status === 'at-risk' && (
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(project.progress, project.status)}`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-600">Due Date</p>
            <p className="text-sm font-medium text-gray-900">{formatDate(project.dueDate)}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-600">Team Size</p>
            <p className="text-sm font-medium text-gray-900">{project.teamSize} members</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-gray-400" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-gray-600">Budget</p>
            <p className="text-xs text-gray-900">${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className={`h-1 rounded-full ${budgetUsed > 90 ? 'bg-red-500' : budgetUsed > 75 ? 'bg-yellow-500' : 'bg-green-500'}`}
              style={{ width: `${Math.min(budgetUsed, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};