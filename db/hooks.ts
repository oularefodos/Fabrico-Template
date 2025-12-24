import { useDatabase } from "./provider";

/**
 * Hook to check migration status
 * Much simpler with libSQL - migrations run automatically in the provider
 */
export function useMigrationHelper() {
  const { isReady, error } = useDatabase();

  return {
    success: isReady,
    error: error,
  };
}
