import React, { useState } from 'react';
import { Plus, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { Column, Task } from '../types';
import { TaskCard } from './TaskCard';

interface ColumnComponentProps {
  column: Column;
  tasks: Task[];
  onCreateTask: (columnId: string) => void;
  onEditTask: (task: Task) => void;
  onTaskClick: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onEditColumn: (column: Column) => void;
  onDeleteColumn: (columnId: string) => void;
  onDropTask: (columnId: string, e: React.DragEvent) => void;
}

export const ColumnComponent: React.FC<ColumnComponentProps> = ({
  column,
  tasks,
  onCreateTask,
  onEditTask,
  onTaskClick,
  onDeleteTask,
  onEditColumn,
  onDeleteColumn,
  onDropTask
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDropTask(column.id, e);
  };

  return (
    <div 
      className={`
        bg-gray-50 rounded-lg p-4 min-h-[600px] w-80 flex-shrink-0
        transition-all duration-200
        ${isDragOver ? 'bg-blue-50 border-2 border-blue-300 border-dashed' : 'border border-gray-200'}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-gray-900">{column.title}</h2>
          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-1 rounded hover:bg-gray-200 transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button
                onClick={() => {
                  onEditColumn(column);
                  setShowDropdown(false);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"
              >
                <Edit2 className="w-4 h-4" />
                Edit Column
              </button>
              <button
                onClick={() => {
                  onDeleteColumn(column.id);
                  setShowDropdown(false);
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-700 hover:bg-red-50 w-full"
              >
                <Trash2 className="w-4 h-4" />
                Delete Column
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add Task Button */}
      <button
        onClick={() => onCreateTask(column.id)}
        className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 mb-4 flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Add Task
      </button>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onClick={onTaskClick}
            onDelete={onDeleteTask}
          />
        ))}
      </div>

      {/* Drop Zone */}
      {isDragOver && (
        <div className="mt-4 p-8 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50 text-center text-blue-600">
          Drop task here
        </div>
      )}
    </div>
  );
};