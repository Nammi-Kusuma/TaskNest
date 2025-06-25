import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { Board, Column, Task, User, CreateTaskData, CreateColumnData } from '../types';
import { ColumnComponent } from './ColumnComponent';
import { CreateTaskModal } from './CreateTaskModal';
import { CreateColumnModal } from './CreateColumnModal';
import { TaskDetailModal } from './TaskDetailModal';
import { FilterBar } from './FilterBar';

interface BoardDetailProps {
  board: Board;
  columns: Column[];
  tasks: Task[];
  users: User[];
  filters: any;
  onBack: () => void;
  onCreateColumn: (data: CreateColumnData) => void;
  onEditColumn: (columnId: string, updates: Partial<Column>) => void;
  onDeleteColumn: (columnId: string) => void;
  onCreateTask: (data: CreateTaskData) => void;
  onEditTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
  onMoveTask: (taskId: string, targetColumnId: string, newOrder: number) => void;
  onFiltersChange: (filters: any) => void;
  getTasksByColumnId: (columnId: string) => Task[];
}

export const BoardDetail: React.FC<BoardDetailProps> = ({
  board,
  columns,
  users,
  filters,
  onBack,
  onCreateColumn,
  onEditColumn,
  onDeleteColumn,
  onCreateTask,
  onEditTask,
  onDeleteTask,
  onMoveTask,
  onFiltersChange,
  getTasksByColumnId
}) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [showTaskDetailModal, setShowTaskDetailModal] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<string>('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editingColumn, setEditingColumn] = useState<Column | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [columnsPerPage, setColumnsPerPage] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumnsPerPage(2);
      } else if (width < 1024) {
        setColumnsPerPage(3);
      } else {
        setColumnsPerPage(4);
      }
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(columns.length / columnsPerPage);
  const indexOfLastColumn = currentPage * columnsPerPage;
  const indexOfFirstColumn = indexOfLastColumn - columnsPerPage;
  const currentColumns = columns.slice(indexOfFirstColumn, indexOfLastColumn);

  const handleCreateTask = (columnId: string) => {
    setSelectedColumnId(columnId);
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setSelectedColumnId(task.columnId);
    setShowTaskModal(true);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowTaskDetailModal(true);
  };

  const handleTaskSubmit = (data: CreateTaskData) => {
    if (editingTask) {
      onEditTask(editingTask.id, data);
    } else {
      onCreateTask(data);
    }
    setShowTaskModal(false);
    setEditingTask(null);
  };

  const handleEditColumn = (column: Column) => {
    setEditingColumn(column);
    setShowColumnModal(true);
  };

  const handleColumnSubmit = (data: CreateColumnData) => {
    if (editingColumn) {
      onEditColumn(editingColumn.id, { title: data.title });
    } else {
      onCreateColumn(data);
    }
    setShowColumnModal(false);
    setEditingColumn(null);
  };

  const handleDropTask = (targetColumnId: string, e: React.DragEvent) => {
    const taskId = e.dataTransfer.getData('text/plain');
    const targetColumnTasks = getTasksByColumnId(targetColumnId);
    const newOrder = targetColumnTasks.length;
    
    onMoveTask(taskId, targetColumnId, newOrder);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{board.title}</h1>
                {board.description && (
                  <p className="text-sm text-gray-600">{board.description}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowColumnModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Column
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <FilterBar
        filters={filters}
        users={users}
        onFiltersChange={onFiltersChange}
      />

      {/* Board Content */}
      <div className="p-6">
        <div className="flex flex-col gap-6">
          <div className="relative">
            {/* Left Arrow */}
            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors border-2 border-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Right Arrow */}
            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors border-2 border-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            <div className="flex gap-6 flex-wrap justify-center">
              {currentColumns.map((column) => (
                <ColumnComponent
                  key={column.id}
                  column={column}
                  tasks={getTasksByColumnId(column.id)}
                  onCreateTask={handleCreateTask}
                  onEditTask={handleEditTask}
                  onTaskClick={handleTaskClick}
                  onDeleteTask={onDeleteTask}
                  onEditColumn={handleEditColumn}
                  onDeleteColumn={onDeleteColumn}
                  onDropTask={handleDropTask}
                />
              ))}
              
              {currentColumns.length === 0 && (
                <div className="flex-1 flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No columns yet</h3>
                    <p className="text-gray-600 mb-4">Add your first column to get started</p>
                    <button
                      onClick={() => setShowColumnModal(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add Column
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateTaskModal
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setEditingTask(null);
        }}
        onSubmit={handleTaskSubmit}
        columnId={selectedColumnId}
        users={users}
        editTask={editingTask}
      />

      <CreateColumnModal
        isOpen={showColumnModal}
        onClose={() => {
          setShowColumnModal(false);
          setEditingColumn(null);
        }}
        onSubmit={handleColumnSubmit}
        boardId={board.id}
        editColumn={editingColumn}
      />

      <TaskDetailModal
        isOpen={showTaskDetailModal}
        onClose={() => {
          setShowTaskDetailModal(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        users={users}
        onEdit={onEditTask}
        onDelete={onDeleteTask}
      />
    </div>
  );
};