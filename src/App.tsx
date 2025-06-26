import React, { useState } from 'react';
import { useTaskBoard } from './hooks/useTaskBoard';
import { BoardView } from './components/BoardView';
import { BoardDetail } from './components/BoardDetail';
import { ManagerDashboard } from './pages/ManagerDashboard';
import { EmployeeDashboard } from './pages/EmployeeDashboard';

type ViewMode = 'boards' | 'board-detail' | 'manager-dashboard' | 'employee-dashboard';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('boards');
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  
  const {
    boards,
    columns,
    tasks,
    users,
    currentUser,
    filters,
    createBoard,
    updateBoard,
    deleteBoard,
    createColumn,
    updateColumn,
    deleteColumn,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    setFilters,
    getBoardById,
    getColumnsByBoardId,
    getTasksByColumnId,
    getAllTasksByBoardId
  } = useTaskBoard();

  const selectedBoard = selectedBoardId ? getBoardById(selectedBoardId) : null;
  const boardColumns = selectedBoardId ? getColumnsByBoardId(selectedBoardId) : [];
  const totalTasks = tasks.length;
  const totalUsers = users.length;

  const handleSelectBoard = (boardId: string) => {
    setSelectedBoardId(boardId);
    setViewMode('board-detail');
  };

  const handleBackToBoards = () => {
    setSelectedBoardId(null);
    setViewMode('boards');
  };

  const handleOpenManagerDashboard = () => {
    setViewMode('manager-dashboard');
  };

  const handleOpenEmployeeDashboard = () => {
    setViewMode('employee-dashboard');
  };

  if (viewMode === 'manager-dashboard') {
    return <ManagerDashboard onBack={handleBackToBoards} />;
  }

  if (viewMode === 'employee-dashboard') {
    return (
      <EmployeeDashboard 
        onBack={handleBackToBoards}
        tasks={tasks}
        users={users}
        currentUser={currentUser}
      />
    );
  }

  if (viewMode === 'board-detail' && selectedBoard) {
    return (
      <BoardDetail
        board={selectedBoard}
        columns={boardColumns}
        tasks={tasks}
        users={users}
        filters={filters}
        onBack={handleBackToBoards}
        onCreateColumn={createColumn}
        onEditColumn={updateColumn}
        onDeleteColumn={deleteColumn}
        onCreateTask={createTask}
        onEditTask={updateTask}
        onDeleteTask={deleteTask}
        onMoveTask={moveTask}
        onFiltersChange={setFilters}
        getTasksByColumnId={getTasksByColumnId}
      />
    );
  }

  return (
    <BoardView
      boards={boards}
      totalTasks={totalTasks}
      totalUsers={totalUsers}
      onCreateBoard={createBoard}
      onEditBoard={updateBoard}
      onDeleteBoard={deleteBoard}
      onSelectBoard={handleSelectBoard}
      onOpenManagerDashboard={handleOpenManagerDashboard}
      onOpenEmployeeDashboard={handleOpenEmployeeDashboard}
      currentUser={currentUser}
    />
  );
}

export default App;