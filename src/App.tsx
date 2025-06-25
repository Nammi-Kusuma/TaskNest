import React, { useState } from 'react';
import { useTaskBoard } from './hooks/useTaskBoard';
import { BoardView } from './components/BoardView';
import { BoardDetail } from './components/BoardDetail';

function App() {
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

  if (selectedBoard) {
    return (
      <BoardDetail
        board={selectedBoard}
        columns={boardColumns}
        tasks={tasks}
        users={users}
        filters={filters}
        onBack={() => setSelectedBoardId(null)}
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
      onSelectBoard={setSelectedBoardId}
      currentUser={currentUser}
    />
  );
}

export default App;