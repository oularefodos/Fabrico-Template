# Database Setup with Adapter Pattern

This project uses an **adapter pattern** for a mobile-first, offline database architecture.

## Architecture

**Adapter Pattern:**
- **Mobile (iOS/Android)**: expo-sqlite (native SQLite - best performance)
- **Web**: localStorage (simple, no WASM complexity)
- **Unified API**: Same interface for all platforms via adapters

**Benefits:**
- ✅ Mobile-first approach (SQLite on native platforms)
- ✅ Simple web implementation (localStorage, no WASM)
- ✅ No CORS/SharedArrayBuffer complexity
- ✅ Offline-first on all platforms
- ✅ Platform-specific optimizations

## How It Works

The **DatabaseAdapter** interface provides a unified API:
```typescript
interface DatabaseAdapter {
  initialize(): Promise<{ success: boolean; error?: Error }>;
  getTodos(): Promise<Todo[]>;
  getTodoById(id: string): Promise<Todo | null>;
  createTodo(todo: InsertTodo): Promise<Todo>;
  updateTodo(id: string, updates: Partial<InsertTodo>): Promise<Todo>;
  deleteTodo(id: string): Promise<void>;
  isReady(): boolean;
}
```

The provider automatically selects the right adapter based on `Platform.OS`.

## Files

- `adapter.ts` - DatabaseAdapter interface
- `adapters/expo-sqlite.ts` - Mobile adapter (iOS/Android)
- `adapters/local-storage.ts` - Web adapter
- `provider.tsx` - React Context with platform detection
- `hooks.ts` - React hooks for database operations
- `schema.ts` - Shared type definitions
- `migrations/` - SQL migrations (mobile only)

## Usage

### Access Database Adapter

```typescript
import { useDatabase } from "@/db/provider";

function MyComponent() {
  const { adapter, isReady, error } = useDatabase();

  if (!isReady) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  // Use adapter methods
  const todos = await adapter.getTodos();
  const todo = await adapter.getTodoById(id);
  await adapter.createTodo({ title: "New todo", completed: false });
  await adapter.updateTodo(id, { completed: true });
  await adapter.deleteTodo(id);
}
```

### Check Initialization Status

```typescript
import { useMigrationHelper } from "@/db/hooks";

function MyComponent() {
  const { success, error } = useMigrationHelper();

  if (!success) return <Text>Loading...</Text>;
  // Database ready
}
```

### Add New Fields to Schema

```bash
# 1. Update schema in db/schema.ts
# 2. Generate migration (mobile only)
bun db:generate

# 3. Update adapters if needed:
#    - adapters/expo-sqlite.ts (auto-migrates)
#    - adapters/local-storage.ts (update types)
```

## Platform Details

**Mobile (iOS/Android):**
- Adapter: `ExpoSQLiteAdapter`
- Storage: Native SQLite via expo-sqlite
- Migrations: Automatic via Drizzle
- Persistence: File system
- Performance: Native SQLite speed

**Web:**
- Adapter: `LocalStorageAdapter`
- Storage: localStorage (JSON)
- Migrations: Not needed (schema-less)
- Persistence: Browser localStorage
- Performance: Fast for todo app data

## Why This Architecture?

**Mobile-First:**
- Mobile apps get full SQLite power
- Web gets simple, reliable localStorage
- No forcing WASM on web
- No CORS/SharedArrayBuffer complexity
- Each platform uses the best tool for the job
