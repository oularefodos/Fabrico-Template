# Database Setup with expo-sqlite

This project uses **expo-sqlite** for a unified, offline-first database across all platforms (iOS, Android, Web).

## Architecture

- **Single Database Client**: expo-sqlite works on all platforms without platform-specific code
- **Native (iOS/Android)**: Uses native SQLite for maximum performance
- **Web**: Automatically uses sql.js (SQLite WASM) via configured Metro bundler
- **Offline-First**: All data stored locally in SQLite
- **Auto-Migrations**: Migrations run automatically on app startup

## Web Support

expo-sqlite v16+ supports web through sql.js (WebAssembly). The `metro.config.js` is already configured with:
- WASM asset support
- CORS headers for SharedArrayBuffer (required for web)

No additional configuration needed - it just works!

## Files

- `client.ts` - expo-sqlite client configuration and migration runner
- `provider.tsx` - React Context provider for database access
- `hooks.ts` - React hooks for database operations
- `schema.ts` - Drizzle ORM schema definitions
- `migrations/` - SQL migration files
- `migrations/migrations.js` - Migration bundle for expo-sqlite

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

## Platform Support

**Native (iOS/Android):**
- Native SQLite (better-sqlite3)
- Full offline support
- File system persistence

**Web:**
- sql.js (SQLite WASM)
- IndexedDB for persistence
- Automatic via Metro config
- Full offline support

## Benefits of This Architecture

**Unified expo-sqlite:**
- ✅ Single database client for all platforms
- ✅ Auto-migrations on all platforms
- ✅ No platform-specific code needed
- ✅ Native performance on mobile
- ✅ Works offline everywhere
- ✅ Simple, clean architecture
