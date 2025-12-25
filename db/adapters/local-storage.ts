import { createId } from "@paralleldrive/cuid2";
import type { DatabaseAdapter } from "../adapter";
import type { Todo, InsertTodo } from "../schema";

/**
 * LocalStorage Adapter - for Web
 * Simple localStorage-based storage for todos
 */
export class LocalStorageAdapter implements DatabaseAdapter {
  private readonly STORAGE_KEY = "todos_db";
  private ready = false;
  private todos: Map<string, Todo> = new Map();

  async initialize(): Promise<{ success: boolean; error?: Error }> {
    try {
      this.loadFromStorage();
      this.ready = true;
      console.log("✓ LocalStorage adapter initialized");
      return { success: true };
    } catch (error) {
      console.error("✗ LocalStorage adapter initialization failed:", error);
      return { success: false, error: error as Error };
    }
  }

  isReady(): boolean {
    return this.ready;
  }

  private loadFromStorage(): void {
    if (typeof localStorage === "undefined") return;

    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data) as Todo[];
        this.todos = new Map(parsed.map((todo) => [todo.id, todo]));
      } catch (error) {
        console.error("Failed to parse todos from localStorage:", error);
        this.todos = new Map();
      }
    }
  }

  private saveToStorage(): void {
    if (typeof localStorage === "undefined") return;

    const data = Array.from(this.todos.values());
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  async getTodos(): Promise<Todo[]> {
    const todos = Array.from(this.todos.values());
    // Sort by createdAt descending (newest first)
    return todos.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }

  async getTodoById(id: string): Promise<Todo | null> {
    return this.todos.get(id) || null;
  }

  async createTodo(todo: InsertTodo): Promise<Todo> {
    const now = new Date().toISOString();
    const newTodo: Todo = {
      id: todo.id || createId(),
      title: todo.title,
      description: todo.description || null,
      completed: todo.completed ?? false,
      priority: todo.priority || "medium",
      createdAt: now,
      updatedAt: now,
      syncStatus: "local",
      lastSyncedAt: null,
    };

    this.todos.set(newTodo.id, newTodo);
    this.saveToStorage();
    return newTodo;
  }

  async updateTodo(id: string, updates: Partial<InsertTodo>): Promise<Todo> {
    const existing = this.todos.get(id);
    if (!existing) {
      throw new Error(`Todo with id ${id} not found`);
    }

    const updated: Todo = {
      ...existing,
      ...updates,
      id: existing.id, // Prevent ID from being changed
      updatedAt: new Date().toISOString(),
    };

    this.todos.set(id, updated);
    this.saveToStorage();
    return updated;
  }

  async deleteTodo(id: string): Promise<void> {
    this.todos.delete(id);
    this.saveToStorage();
  }
}
