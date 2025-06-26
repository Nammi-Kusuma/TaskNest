import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { PerformanceMetric } from '../../types/dashboard';

interface MetricCardProps {
  metric: PerformanceMetric;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const getTrendIcon = () => {
    switch (metric.trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getChangeColor = () => {
    if (metric.change > 0) return 'text-green-600';
    if (metric.change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{metric.label}</h3>
        {getTrendIcon()}
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <div className={`text-2xl font-bold ${metric.color}`}>
            {metric.value}
            {metric.label.includes('Score') || metric.label.includes('Rating') ? '' : 
             metric.label.includes('Utilization') || metric.label.includes('Productivity') ? '%' : ''}
          </div>
          <div className={`text-sm ${getChangeColor()} flex items-center gap-1`}>
            {metric.change > 0 ? '+' : ''}{metric.change}
            {metric.label.includes('Score') || metric.label.includes('Rating') ? '' : 
             metric.label.includes('Utilization') || metric.label.includes('Productivity') ? '%' : ''}
            <span className="text-gray-500">vs last period</span>
          </div>
        </div>
      </div>
    </div>
  );
};