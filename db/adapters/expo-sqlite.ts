import { type ExpoSQLiteDatabase, drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { eq, desc } from "drizzle-orm";
import type { DatabaseAdapter } from "../adapter";
import { todoTable, type Todo, type InsertTodo } from "../schema";
import migrations from "../migrations/migrations";

/**
 * Expo SQLite Adapter - for iOS and Android
 * Uses native SQLite for best performance
 */
export class ExpoSQLiteAdapter implements DatabaseAdapter {
  private db: ExpoSQLiteDatabase<{ todoTable: typeof todoTable }>;
  private ready = false;

  constructor() {
    const expoDb = openDatabaseSync("database.db", { enableChangeListener: true });
    this.db = drizzle(expoDb, { schema: { todoTable } });
  }

  async initialize(): Promise<{ success: boolean; error?: Error }> {
    try {
      await migrate(this.db, migrations);
      this.ready = true;
      console.log("✓ Expo SQLite adapter initialized");
      return { success: true };
    } catch (error) {
      console.error("✗ Expo SQLite adapter initialization failed:", error);
      return { success: false, error: error as Error };
    }
  }

  isReady(): boolean {
    return this.ready;
  }

  async getTodos(): Promise<Todo[]> {
    return await this.db
      .select()
      .from(todoTable)
      .orderBy(desc(todoTable.createdAt));
  }

  async getTodoById(id: string): Promise<Todo | null> {
    const result = await this.db
      .select()
      .from(todoTable)
      .where(eq(todoTable.id, id))
      .limit(1);

    return result[0] || null;
  }

  async createTodo(todo: InsertTodo): Promise<Todo> {
    const result = await this.db.insert(todoTable).values(todo).returning();
    return result[0];
  }

  async updateTodo(id: string, updates: Partial<InsertTodo>): Promise<Todo> {
    const result = await this.db
      .update(todoTable)
      .set(updates)
      .where(eq(todoTable.id, id))
      .returning();

    return result[0];
  }

  async deleteTodo(id: string): Promise<void> {
    await this.db.delete(todoTable).where(eq(todoTable.id, id));
  }
}
