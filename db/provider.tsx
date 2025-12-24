import type { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import React, { type PropsWithChildren, useContext, useEffect, useState } from "react";
import { db, runMigrations } from "./client";
import * as schema from "./schema";

type ContextType = {
  db: ExpoSQLiteDatabase<typeof schema> | null;
  isReady: boolean;
  error: Error | null;
};

export const DatabaseContext = React.createContext<ContextType>({
  db: null,
  isReady: false,
  error: null,
});

export const useDatabase = () => useContext(DatabaseContext);

export function DatabaseProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Run migrations on startup
    runMigrations()
      .then((result) => {
        if (result.success) {
          setIsReady(true);
        } else {
          setError(result.error || new Error("Migration failed"));
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <DatabaseContext.Provider value={{ db, isReady, error }}>
      {children}
    </DatabaseContext.Provider>
  );
}

