import { type ExpoSQLiteDatabase, drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import * as schema from "./schema";
import migrations from "./migrations/migrations";

// Expo SQLite database setup - works on all platforms
// Native (iOS/Android): Uses native SQLite
// Web: Uses sql.js (SQLite WASM) automatically
const expoDb = openDatabaseSync("database.db", { enableChangeListener: true });

// Drizzle ORM instance with expo-sqlite
export const db: ExpoSQLiteDatabase<typeof schema> = drizzle(expoDb, { schema });

// Run migrations
export async function runMigrations() {
  try {
    await migrate(db, migrations);
    console.log("✓ Migrations completed successfully");
    return { success: true };
  } catch (error) {
    console.error("✗ Migration failed:", error);
    return { success: false, error: error as Error };
  }
}
