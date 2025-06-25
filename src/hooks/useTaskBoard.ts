import { useState, useEffect, useCallback } from 'react';
import { Board, Column, Task, User, CreateBoardData, CreateColumnData, CreateTaskData, FilterOptions } from '../types';
import { storage } from '../utils/storage';
import { generateId, filterTasks, reorderTasks } from '../utils/helpers';

export const useTaskBoard = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    priority: 'all',
    assignedUser: 'all',
    dueDateRange: 'all'
  });

  // Initialize data
  useEffect(() => {
    storage.initializeSampleData();
    setBoards(storage.getBoards());
    setColumns(storage.getColumns());
    setTasks(storage.getTasks());
    setUsers(storage.getUsers());
    setCurrentUser(storage.getCurrentUser());
  }, []);

  // Board operations
  const createBoard = useCallback((data: CreateBoardData): Board => {
    if (!currentUser) throw new Error('No current user');
    
    const newBoard: Board = {
      id: generateId(),
      title: data.title,
      description: data.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ownerId: currentUser.id,
      ownerName: currentUser.name
    };

    const updatedBoards = [...boards, newBoard];
    setBoards(updatedBoards);
    storage.saveBoards(updatedBoards);

    // Create default columns
    const defaultColumns: Column[] = [
      { id: generateId(), title: 'To Do', boardId: newBoard.id, order: 0, createdAt: new Date().toISOString() },
      { id: generateId(), title: 'In Progress', boardId: newBoard.id, order: 1, createdAt: new Date().toISOString() },
      { id: generateId(), title: 'Done', boardId: newBoard.id, order: 2, createdAt: new Date().toISOString() }
    ];

    const updatedColumns = [...columns, ...defaultColumns];
    setColumns(updatedColumns);
    storage.saveColumns(updatedColumns);

    return newBoard;
  }, [boards, columns, currentUser]);

  const updateBoard = useCallback((boardId: string, updates: Partial<Board>): void => {
    const updatedBoards = boards.map(board =>
      board.id === boardId
        ? { ...board, ...updates, updatedAt: new Date().toISOString() }
        : board
    );
    setBoards(updatedBoards);
    storage.saveBoards(updatedBoards);
  }, [boards]);

  const deleteBoard = useCallback((boardId: string): void => {
    const updatedBoards = boards.filter(board => board.id !== boardId);
    const updatedColumns = columns.filter(column => column.boardId !== boardId);
    const updatedTasks = tasks.filter(task => task.boardId !== boardId);

    setBoards(updatedBoards);
    setColumns(updatedColumns);
    setTasks(updatedTasks);

    storage.saveBoards(updatedBoards);
    storage.saveColumns(updatedColumns);
    storage.saveTasks(updatedTasks);
  }, [boards, columns, tasks]);

  // Column operations
  const createColumn = useCallback((data: CreateColumnData): Column => {
    const boardColumns = columns.filter(col => col.boardId === data.boardId);
    const newOrder = boardColumns.length;

    const newColumn: Column = {
      id: generateId(),
      title: data.title,
      boardId: data.boardId,
      order: newOrder,
      createdAt: new Date().toISOString()
    };

    const updatedColumns = [...columns, newColumn];
    setColumns(updatedColumns);
    storage.saveColumns(updatedColumns);

    return newColumn;
  }, [columns]);

  const updateColumn = useCallback((columnId: string, updates: Partial<Column>): void => {
    const updatedColumns = columns.map(column =>
      column.id === columnId ? { ...column, ...updates } : column
    );
    setColumns(updatedColumns);
    storage.saveColumns(updatedColumns);
  }, [columns]);

  const deleteColumn = useCallback((columnId: string): void => {
    const updatedColumns = columns.filter(column => column.id !== columnId);
    const updatedTasks = tasks.filter(task => task.columnId !== columnId);

    setColumns(updatedColumns);
    setTasks(updatedTasks);

    storage.saveColumns(updatedColumns);
    storage.saveTasks(updatedTasks);
  }, [columns, tasks]);

  // Task operations
  const createTask = useCallback((data: CreateTaskData): Task => {
    if (!currentUser) throw new Error('No current user');

    const columnTasks = tasks.filter(task => task.columnId === data.columnId);
    const newOrder = columnTasks.length;

    const assignedUser = users.find(user => user.id === data.assignedUserId);
    const column = columns.find(col => col.id === data.columnId);
    
    const newTask: Task = {
      id: generateId(),
      title: data.title,
      description: data.description,
      creatorId: currentUser.id,
      creatorName: currentUser.name,
      priority: data.priority,
      dueDate: data.dueDate,
      assignedUserId: data.assignedUserId,
      assignedUserName: assignedUser?.name,
      columnId: data.columnId,
      boardId: column?.boardId || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      order: newOrder
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    storage.saveTasks(updatedTasks);

    return newTask;
  }, [tasks, users, columns, currentUser]);

  const updateTask = useCallback((taskId: string, updates: Partial<Task>): void => {
    const assignedUser = updates.assignedUserId ? users.find(user => user.id === updates.assignedUserId) : undefined;
    
    const updatedTasks = tasks.map(task =>
      task.id === taskId
        ? {
            ...task,
            ...updates,
            assignedUserName: assignedUser?.name || task.assignedUserName,
            updatedAt: new Date().toISOString()
          }
        : task
    );
    setTasks(updatedTasks);
    storage.saveTasks(updatedTasks);
  }, [tasks, users]);

  const deleteTask = useCallback((taskId: string): void => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    storage.saveTasks(updatedTasks);
  }, [tasks]);

  const moveTask = useCallback((taskId: string, targetColumnId: string, newOrder: number): void => {
    const updatedTasks = reorderTasks(tasks, taskId, targetColumnId, newOrder);
    setTasks(updatedTasks);
    storage.saveTasks(updatedTasks);
  }, [tasks]);

  // Utility functions
  const getBoardById = useCallback((boardId: string): Board | undefined => {
    return boards.find(board => board.id === boardId);
  }, [boards]);

  const getColumnsByBoardId = useCallback((boardId: string): Column[] => {
    return columns
      .filter(column => column.boardId === boardId)
      .sort((a, b) => a.order - b.order);
  }, [columns]);

  const getTasksByColumnId = useCallback((columnId: string): Task[] => {
    const columnTasks = tasks.filter(task => task.columnId === columnId);
    return filterTasks(columnTasks, filters).sort((a, b) => a.order - b.order);
  }, [tasks, filters]);

  const getAllTasksByBoardId = useCallback((boardId: string): Task[] => {
    return tasks.filter(task => task.boardId === boardId);
  }, [tasks]);

  return {
    // State
    boards,
    columns,
    tasks,
    users,
    currentUser,
    filters,

    // Actions
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

    // Utilities
    getBoardById,
    getColumnsByBoardId,
    getTasksByColumnId,
    getAllTasksByBoardId
  };
};