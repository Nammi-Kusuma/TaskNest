import { Board, Column, Task, User } from '../types';

const STORAGE_KEYS = {
  BOARDS: 'taskboard_boards',
  COLUMNS: 'taskboard_columns',
  TASKS: 'taskboard_tasks',
  USERS: 'taskboard_users',
  CURRENT_USER: 'taskboard_current_user'
};

export const storage = {
  // Boards
  getBoards: (): Board[] => {
    const data = localStorage.getItem(STORAGE_KEYS.BOARDS);
    return data ? JSON.parse(data) : [];
  },

  saveBoards: (boards: Board[]): void => {
    localStorage.setItem(STORAGE_KEYS.BOARDS, JSON.stringify(boards));
  },

  // Columns
  getColumns: (): Column[] => {
    const data = localStorage.getItem(STORAGE_KEYS.COLUMNS);
    return data ? JSON.parse(data) : [];
  },

  saveColumns: (columns: Column[]): void => {
    localStorage.setItem(STORAGE_KEYS.COLUMNS, JSON.stringify(columns));
  },

  // Tasks
  getTasks: (): Task[] => {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    return data ? JSON.parse(data) : [];
  },

  saveTasks: (tasks: Task[]): void => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  },

  // Users
  getUsers: (): User[] => {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  },

  saveUsers: (users: User[]): void => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  // Current User
  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },

  saveCurrentUser: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },

  // Initialize with sample data
  initializeSampleData: (): void => {
    const existingBoards = storage.getBoards();
    if (existingBoards.length === 0) {
      const sampleUsers: User[] = [
        { id: '1', name: 'Kusuma', email: 'kusuma@example.com' },
        { id: '2', name: 'Jahnavi', email: 'jahnavi@example.com' },
        { id: '3', name: 'Faiz', email: 'faiz@example.com' },
        { id: '4', name: 'Sandhya', email: 'sandhya@example.com' }
      ];

      const currentUser = sampleUsers[0];
      
      storage.saveUsers(sampleUsers);
      storage.saveCurrentUser(currentUser);

      const sampleBoards: Board[] = [
        {
          id: '1',
          title: 'Website Redesign Project',
          description: 'Complete redesign of company website',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ownerId: currentUser.id,
          ownerName: currentUser.name
        },
        {
          id: '2',
          title: 'Mobile App Development',
          description: 'New mobile application for customers',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 86400000).toISOString(),
          ownerId: currentUser.id,
          ownerName: currentUser.name
        }
      ];

      const sampleColumns: Column[] = [
        { id: '1', title: 'To Do', boardId: '1', order: 0, createdAt: new Date().toISOString() },
        { id: '2', title: 'In Progress', boardId: '1', order: 1, createdAt: new Date().toISOString() },
        { id: '3', title: 'Review', boardId: '1', order: 2, createdAt: new Date().toISOString() },
        { id: '4', title: 'Done', boardId: '1', order: 3, createdAt: new Date().toISOString() },
        { id: '5', title: 'Backlog', boardId: '2', order: 0, createdAt: new Date().toISOString() },
        { id: '6', title: 'Development', boardId: '2', order: 1, createdAt: new Date().toISOString() },
        { id: '7', title: 'Testing', boardId: '2', order: 2, createdAt: new Date().toISOString() },
        { id: '8', title: 'Deployed', boardId: '2', order: 3, createdAt: new Date().toISOString() }
      ];

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);

      const sampleTasks: Task[] = [
        {
          id: '1',
          title: 'Design Homepage Layout',
          description: 'Create wireframes and mockups for the new homepage design',
          creatorId: currentUser.id,
          creatorName: currentUser.name,
          priority: 'high',
          dueDate: tomorrow.toISOString().split('T')[0],
          assignedUserId: '2',
          assignedUserName: 'Jahnavi',
          columnId: '1',
          boardId: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          order: 0
        },
        {
          id: '2',
          title: 'Implement User Authentication',
          description: 'Set up login and registration functionality',
          creatorId: currentUser.id,
          creatorName: currentUser.name,
          priority: 'medium',
          dueDate: nextWeek.toISOString().split('T')[0],
          assignedUserId: '3',
          assignedUserName: 'Faiz',
          columnId: '2',
          boardId: '1',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          order: 0
        },
        {
          id: '3',
          title: 'Database Schema Design',
          description: 'Design and implement the database structure',
          creatorId: currentUser.id,
          creatorName: currentUser.name,
          priority: 'high',
          dueDate: new Date().toISOString().split('T')[0],
          assignedUserId: '4',
          assignedUserName: 'Shiva',
          columnId: '5',
          boardId: '2',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          order: 0
        }
      ];

      storage.saveBoards(sampleBoards);
      storage.saveColumns(sampleColumns);
      storage.saveTasks(sampleTasks);
    }
  }
};