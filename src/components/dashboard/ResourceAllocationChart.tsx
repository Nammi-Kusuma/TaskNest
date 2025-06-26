import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import { ResourceAllocation } from '../../types/dashboard';

interface ResourceAllocationChartProps {
  resources: ResourceAllocation[];
}

export const ResourceAllocationChart: React.FC<ResourceAllocationChartProps> = ({ resources }) => {
  const maxAllocated = Math.max(...resources.map(r => r.allocated));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Resource Allocation</h3>
      </div>

      <div className="space-y-4">
        {resources.map((resource) => (
          <div key={resource.department} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">{resource.department}</span>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600">
                  {resource.used}/{resource.allocated} hours
                </span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-green-600 font-medium">{resource.efficiency}%</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full relative"
                  style={{ width: `${(resource.used / resource.allocated) * 100}%` }}
                >
                  <div 
                    className="absolute top-0 right-0 bg-green-500 h-3 rounded-r-full"
                    style={{ width: `${(resource.available / resource.used) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Used: {resource.used}h</span>
                <span>Available: {resource.available}h</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Overall Efficiency</span>
          <span className="font-semibold text-green-600">
            {Math.round(resources.reduce((acc, r) => acc + r.efficiency, 0) / resources.length)}%
          </span>
        </div>
      </div>
    </div>
  );
};