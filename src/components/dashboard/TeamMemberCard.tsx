import React from 'react';
import { Clock, CheckCircle, Activity } from 'lucide-react';
import { TeamMember } from '../../types/dashboard';
import { formatDateTime } from '../../utils/helpers';

interface TeamMemberCardProps {
  member: TeamMember;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'busy':
        return 'bg-red-100 text-red-800';
      case 'away':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProductivityColor = (productivity: number) => {
    if (productivity >= 90) return 'text-green-600';
    if (productivity >= 75) return 'text-blue-600';
    if (productivity >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-lg">
              {member.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-600">{member.position}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
          {member.status}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-lg font-semibold text-gray-900">{member.currentTasks}</span>
          </div>
          <p className="text-xs text-gray-600">Active Tasks</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <CheckCircle className="w-4 h-4 text-gray-400" />
            <span className="text-lg font-semibold text-gray-900">{member.completedTasks}</span>
          </div>
          <p className="text-xs text-gray-600">Completed</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Activity className="w-4 h-4 text-gray-400" />
            <span className={`text-lg font-semibold ${getProductivityColor(member.productivity)}`}>
              {member.productivity}%
            </span>
          </div>
          <p className="text-xs text-gray-600">Productivity</p>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        Last active: {formatDateTime(member.lastActive)}
      </div>
    </div>
  );
};