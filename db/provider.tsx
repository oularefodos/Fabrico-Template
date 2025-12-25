import React, { type PropsWithChildren, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import type { DatabaseAdapter } from "./adapter";
import { ExpoSQLiteAdapter } from "./adapters/expo-sqlite";
import { LocalStorageAdapter } from "./adapters/local-storage";

type ContextType = {
  adapter: DatabaseAdapter | null;
  isReady: boolean;
  error: Error | null;
};

export const DatabaseContext = React.createContext<ContextType>({
  adapter: null,
  isReady: false,
  error: null,
});

export const useDatabase = () => useContext(DatabaseContext);

/**
 * Database Provider with Adapter Pattern
 *
 * Mobile (iOS/Android): Uses Expo SQLite adapter
 * Web: Uses LocalStorage adapter
 */
export function DatabaseProvider({ children }: PropsWithChildren) {
  const [adapter, setAdapter] = useState<DatabaseAdapter | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function initializeDatabase() {
      try {
        // Create the appropriate adapter based on platform
        const dbAdapter = Platform.OS === "web"
          ? new LocalStorageAdapter()
          : new ExpoSQLiteAdapter();

        // Initialize the adapter
        const result = await dbAdapter.initialize();

        if (result.success) {
          setAdapter(dbAdapter);
          setIsReady(true);
          console.log(`✓ Database initialized for platform: ${Platform.OS}`);
        } else {
          setError(result.error || new Error("Database initialization failed"));
        }
      } catch (err) {
        setError(err as Error);
        console.error("✗ Database initialization error:", err);
      }
    }

    initializeDatabase();
  }, []);

  return (
    <DatabaseContext.Provider value={{ adapter, isReady, error }}>
      {children}
    </DatabaseContext.Provider>
  );
}

