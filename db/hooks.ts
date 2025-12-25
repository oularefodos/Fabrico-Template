import { useDatabase } from "./provider";

/**
 * Hook to check database initialization status
 * Works with adapter pattern - initialization happens in provider
 */
export function useMigrationHelper() {
  const { isReady, error } = useDatabase();

  return {
    success: isReady,
    error: error,
  };
}
