# Database Setup with libSQL

This project uses **libSQL** for a unified, offline-first database across all platforms (iOS, Android, Web).

## Architecture

- **Single Database Client**: libSQL works on all platforms without platform-specific code
- **Offline-First**: All data stored locally in SQLite
- **Auto-Migrations**: Migrations run automatically on app startup
- **Cloud Sync Ready**: Easy to add Turso cloud sync later

## Files

- `client.ts` - libSQL client configuration and migration runner
- `provider.tsx` - React Context provider for database access
- `hooks.ts` - React hooks for database operations
- `schema.ts` - Drizzle ORM schema definitions
- `migrations/` - SQL migration files

## Usage

### Access Database

```typescript
import { useDatabase } from "@/db/provider";

function MyComponent() {
  const { db, isReady, error } = useDatabase();

  if (!isReady) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  // Use db here
  const todos = await db.select().from(todoTable);
}
```

### Check Migration Status

```typescript
import { useMigrationHelper } from "@/db/hooks";

function MyComponent() {
  const { success, error } = useMigrationHelper();

  if (!success) return <Text>Loading...</Text>;
  // Migrations complete, database ready
}
```

### Create Migrations

```bash
# 1. Update schema in db/schema.ts
# 2. Generate migration
bun db:generate

# Migrations apply automatically on app restart
```

## Cloud Sync (Optional)

To enable cloud sync with Turso:

1. Create a Turso database:
```bash
turso db create my-app
turso db show my-app
```

2. Update `db/client.ts`:
```typescript
export const client = createClient({
  url: process.env.EXPO_PUBLIC_TURSO_URL || "file:local.db",
  authToken: process.env.EXPO_PUBLIC_TURSO_AUTH_TOKEN,
  syncUrl: process.env.EXPO_PUBLIC_TURSO_URL,
  syncInterval: 60, // Sync every 60 seconds
});
```

3. Add environment variables to `.env`:
```
EXPO_PUBLIC_TURSO_URL=libsql://your-db.turso.io
EXPO_PUBLIC_TURSO_AUTH_TOKEN=your-auth-token
```

## Benefits Over Old Architecture

**Before (Dual-Mode):**
- ❌ Two different databases (Expo SQLite + SQL.js)
- ❌ Manual migration management for web
- ❌ Platform-specific code
- ❌ No real sync

**Now (libSQL):**
- ✅ Single database everywhere
- ✅ Auto-migrations on all platforms
- ✅ Unified codebase
- ✅ Cloud sync ready
