import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import * as schema from "./schema";

// LibSQL client configuration for offline-first mode
// This works on all platforms: iOS, Android, Web
export const client = createClient({
  url: "file:local.db", // Local SQLite file - works offline
  // For cloud sync later, uncomment and add your Turso URL:
  // url: process.env.EXPO_PUBLIC_TURSO_URL || "file:local.db",
  // authToken: process.env.EXPO_PUBLIC_TURSO_AUTH_TOKEN,
});

// Drizzle ORM instance with libSQL
export const db = drizzle(client, { schema });

// Run migrations
export async function runMigrations() {
  try {
    await migrate(db, { migrationsFolder: "./db/migrations" });
    console.log("✓ Migrations completed successfully");
    return { success: true };
  } catch (error) {
    console.error("✗ Migration failed:", error);
    return { success: false, error: error as Error };
  }
}
