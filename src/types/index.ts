export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  creatorName: string;
  priority: Priority;
  dueDate: string;
  assignedUserId?: string;
  assignedUserName?: string;
  columnId: string;
  boardId: string;
  createdAt: string;
  updatedAt: string;
  order: number;
}

export interface Attachment {
  id: string;
  taskId: string;
  fileName: string;
  url: string;
  fileType: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface Column {
  id: string;
  title: string;
  boardId: string;
  order: number;
  color?: string;
  createdAt: string;
}

export interface Board {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  ownerName: string;
}

export interface CreateTaskData {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  assignedUserId?: string;
  columnId: string;
}

export interface CreateBoardData {
  title: string;
  description?: string;
}

export interface CreateColumnData {
  title: string;
  boardId: string;
}

export interface DragData {
  taskId: string;
  sourceColumnId: string;
  sourceIndex: number;
}

export interface FilterOptions {
  search: string;
  priority: Priority | 'all';
  assignedUser: string | 'all';
  dueDateRange: 'all' | 'overdue' | 'today' | 'thisWeek' | 'thisMonth';
}