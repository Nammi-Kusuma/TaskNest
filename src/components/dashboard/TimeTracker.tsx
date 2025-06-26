import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Clock } from 'lucide-react';
import { TimeEntry } from '../../types/dashboard';

interface TimeTrackerProps {
  onTimeEntry: (entry: Omit<TimeEntry, 'id'>) => void;
}

export const TimeTracker: React.FC<TimeTrackerProps> = ({ onTimeEntry }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isTracking && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime.getTime()) / 1000));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTracking, startTime]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!taskTitle.trim()) return;
    
    setIsTracking(true);
    setStartTime(new Date());
    setElapsedTime(0);
  };

  const handlePause = () => {
    setIsTracking(false);
  };

  const handleStop = () => {
    if (startTime && taskTitle.trim()) {
      const endTime = new Date();
      const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000 / 60); // in minutes

      onTimeEntry({
        taskId: 'manual-' + Date.now(),
        taskTitle: taskTitle.trim(),
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        duration,
        description: description.trim(),
        date: new Date().toISOString().split('T')[0]
      });

      // Reset
      setIsTracking(false);
      setStartTime(null);
      setElapsedTime(0);
      setTaskTitle('');
      setDescription('');
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Time Tracker</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Task Title *
          </label>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="What are you working on?"
            disabled={isTracking}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Add details about your work..."
            disabled={isTracking}
          />
        </div>

        <div className="text-center">
          <div className="text-3xl font-mono font-bold text-gray-900 mb-4">
            {formatTime(elapsedTime)}
          </div>
          
          <div className="flex items-center justify-center gap-2">
            {!isTracking ? (
              <button
                onClick={handleStart}
                disabled={!taskTitle.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="w-4 h-4" />
                Start
              </button>
            ) : (
              <>
                <button
                  onClick={handlePause}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  <Pause className="w-4 h-4" />
                  Pause
                </button>
                <button
                  onClick={handleStop}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Square className="w-4 h-4" />
                  Stop
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};