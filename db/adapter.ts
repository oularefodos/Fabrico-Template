import type { Todo, InsertTodo } from "./schema";

/**
 * Database adapter interface
 * Provides a unified API for different storage backends
 */
export interface DatabaseAdapter {
  // Initialization
  initialize(): Promise<{ success: boolean; error?: Error }>;

  // Todo operations
  getTodos(): Promise<Todo[]>;
  getTodoById(id: string): Promise<Todo | null>;
  createTodo(todo: InsertTodo): Promise<Todo>;
  updateTodo(id: string, updates: Partial<InsertTodo>): Promise<Todo>;
  deleteTodo(id: string): Promise<void>;

  // Utility
  isReady(): boolean;
}
