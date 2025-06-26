import React, { useState } from 'react';
import { Plus, Calendar, User, MoreVertical, Edit2, Trash2, Grid3X3, List, CheckSquare, Users, FolderOpen, BarChart3, UserCheck } from 'lucide-react';
import { Board } from '../types';
import { formatDateTime } from '../utils/helpers';
import { CreateBoardModal } from './CreateBoardModal';
import { StatsCard } from './StatsCard';

interface BoardViewProps {
  boards: Board[];
  totalTasks: number;
  totalUsers: number;
  onCreateBoard: (data: { title: string; description?: string }) => void;
  onEditBoard: (boardId: string, updates: Partial<Board>) => void;
  onDeleteBoard: (boardId: string) => void;
  onSelectBoard: (boardId: string) => void;
  onOpenManagerDashboard: () => void;
  onOpenEmployeeDashboard: () => void;
  currentUser: any;
}

export const BoardView: React.FC<BoardViewProps> = ({
  boards,
  totalTasks,
  totalUsers,
  onCreateBoard,
  onEditBoard,
  onDeleteBoard,
  onSelectBoard,
  onOpenManagerDashboard,
  onOpenEmployeeDashboard,
  currentUser
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBoard, setEditingBoard] = useState<Board | null>(null);
  const [dropdownBoard, setDropdownBoard] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  const handleCreateBoard = (data: { title: string; description?: string }) => {
    onCreateBoard(data);
    setShowCreateModal(false);
  };

  const handleEditBoard = (board: Board) => {
    setEditingBoard(board);
    setShowCreateModal(true);
    setDropdownBoard(null);
  };

  const handleUpdateBoard = (data: { title: string; description?: string }) => {
    if (editingBoard) {
      onEditBoard(editingBoard.id, data);
      setEditingBoard(null);
      setShowCreateModal(false);
    }
  };

  const handleDeleteBoard = (boardId: string) => {
    if (window.confirm('Are you sure you want to delete this board? This action cannot be undone.')) {
      onDeleteBoard(boardId);
    }
    setDropdownBoard(null);
  };

  const activeProjects = boards.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">TF</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">TaskFlow</h1>
                <p className="text-gray-600">Project Management Board</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={onOpenManagerDashboard}
                className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium"
              >
                <BarChart3 className="w-4 h-4" />
                Manager Dashboard
              </button>
              <button 
                onClick={onOpenEmployeeDashboard}
                className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium"
              >
                <UserCheck className="w-4 h-4" />
                My Dashboard
              </button>
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                <FolderOpen className="w-4 h-4 inline mr-2" />
                Boards
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">My Boards</h2>
            <p className="text-gray-600 mt-1">Manage your projects and collaborate with your team</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="w-4 h-4" />
              Create Board
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Boards"
            value={boards.length}
            icon={Grid3X3}
            color="blue"
          />
          <StatsCard
            title="Total Tasks"
            value={totalTasks}
            icon={CheckSquare}
            color="green"
          />
          <StatsCard
            title="Active Projects"
            value={activeProjects}
            icon={FolderOpen}
            color="purple"
          />
        </div>

        {/* Boards Content */}
        {boards.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No boards yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first task board</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Create Your First Board
            </button>
          </div>
        ) : viewMode === 'table' ? (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Board</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Tasks</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Members</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Created By</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Created</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Updated</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {boards.map((board) => (
                    <tr
                      key={board.id}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => onSelectBoard(board.id)}
                    >
                      <td className="py-4 px-6">
                        <div>
                          <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                            {board.title}
                          </h3>
                          {board.description && (
                            <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                              {board.description}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <CheckSquare className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">1</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">3</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600">
                              {board.ownerName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-gray-900">{board.ownerName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{formatDateTime(board.createdAt)}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-600">{formatDateTime(board.updatedAt)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDropdownBoard(dropdownBoard === board.id ? null : board.id);
                            }}
                            className="p-1 rounded hover:bg-gray-100 transition-colors"
                          >
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                          </button>
                          
                          {dropdownBoard === board.id && (
                            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 min-w-[140px]">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditBoard(board);
                                }}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"
                              >
                                <Edit2 className="w-4 h-4" />
                                Edit Board
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteBoard(board.id);
                                }}
                                className="flex items-center gap-2 px-3 py-2 text-sm text-red-700 hover:bg-red-50 w-full"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete Board
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map((board) => (
              <div
                key={board.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => onSelectBoard(board.id)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">
                      {board.title}
                    </h3>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDropdownBoard(dropdownBoard === board.id ? null : board.id);
                        }}
                        className="p-1 rounded hover:bg-gray-100 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                      
                      {dropdownBoard === board.id && (
                        <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditBoard(board);
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit Board
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteBoard(board.id);
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-red-700 hover:bg-red-50 w-full"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete Board
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {board.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {board.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{board.ownerName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDateTime(board.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Board Modal */}
      <CreateBoardModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setEditingBoard(null);
        }}
        onSubmit={editingBoard ? handleUpdateBoard : handleCreateBoard}
        editBoard={editingBoard}
      />
    </div>
  );
};