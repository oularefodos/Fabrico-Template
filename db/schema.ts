import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import type { z } from "zod";

/**
 * User table - stores user information
 * Works in both local (SQLite) and cloud (Supabase) modes
 */
export const userTable = sqliteTable("users", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  email: text("email").unique(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
  // Sync metadata for dual-mode architecture
  syncStatus: text("sync_status", {
    enum: ["local", "synced", "pending", "error"]
  }).default("local"),
  lastSyncedAt: text("last_synced_at"),
});

/**
 * Database configuration table - stores app settings
 * Used to manage database mode and Supabase credentials
 */
export const dbConfigTable = sqliteTable("db_config", {
  key: text("key").primaryKey().notNull(),
  value: text("value").notNull(),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

/**
 * Todo table - stores todo items
 * Supports local-first with cloud sync capability
 */
export const todoTable = sqliteTable("todos", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  title: text("title").notNull(),
  description: text("description"),
  completed: integer("completed", { mode: "boolean" }).default(false).notNull(),
  priority: text("priority", {
    enum: ["low", "medium", "high"]
  }).default("medium"),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
  // Sync metadata for dual-mode architecture
  syncStatus: text("sync_status", {
    enum: ["local", "synced", "pending", "error"]
  }).default("local"),
  lastSyncedAt: text("last_synced_at"),
});

// Type exports
export const UserSchema = createSelectSchema(userTable);
export const InsertUserSchema = createInsertSchema(userTable);
export type User = z.infer<typeof UserSchema>;
export type InsertUser = z.infer<typeof InsertUserSchema>;

export const TodoSchema = createSelectSchema(todoTable);
export const InsertTodoSchema = createInsertSchema(todoTable);
export type Todo = z.infer<typeof TodoSchema>;
export type InsertTodo = z.infer<typeof InsertTodoSchema>;

// Config keys enum for type safety
export const DB_CONFIG_KEYS = {
  MODE: "db_mode", // "local" | "supabase"
  SUPABASE_URL: "supabase_url",
  SUPABASE_ANON_KEY: "supabase_anon_key",
  USER_ID: "current_user_id",
} as const;

export type DbMode = "local" | "supabase";
