# ✨ Fabrico Template

> A production-ready React Native starter with dual-mode database architecture

**Start with local SQLite, seamlessly upgrade to Supabase when you're ready.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Expo](https://img.shields.io/badge/Expo-54-black)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.4-61dafb)](https://reactnative.dev)
[![License](https://img.shields.io/badge/License-Apache%202.0-green)](LICENSE)

---

## 🎯 Philosophy

Fabrico embraces **progressive enhancement** for databases:
- 🚀 **Zero friction start** - Works immediately with local SQLite, no configuration needed
- ☁️ **Cloud when you're ready** - Upgrade to Supabase with your credentials
- 📱 **Cross-platform native** - iOS, Android, and Web from one codebase
- 🎨 **Beautiful by default** - 50+ production-ready UI components
- 🔒 **Type-safe everything** - End-to-end TypeScript with strict mode

---

## 📚 What's Inside

### Core Stack
- ⚡ **[Expo v54](https://expo.dev)** - Latest Expo SDK with New Architecture
- ⚛️ **[React 19.1.0](https://react.dev)** - Latest React with React Native 0.81.4
- 🔷 **[TypeScript 5.9](https://www.typescriptlang.org/)** - Strict mode enabled, all errors resolved
- 🗺️ **[Expo Router v6](https://docs.expo.dev/router)** - File-based routing with typed routes

### Database Layer (Dual-Mode Ready)
- 💾 **[Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)** - Native database (iOS/Android)
- 🌐 **[SQL.js](https://github.com/sql-js/sql.js)** - SQLite WASM for Web
- 🔧 **[Drizzle ORM v0.43](https://drizzle.dev)** - Type-safe queries with auto-migrations
- ☁️ **Supabase Ready** - Infrastructure prepared for cloud sync

### UI & Styling
- 💎 **[NativeWind v4](https://www.nativewind.dev)** - Tailwind CSS for React Native
- 🎨 **50+ UI Components** - Cross-platform primitives + styled components
- 🌗 **Dark/Light Mode** - System-aware with persistent preferences
- ♿ **Accessible** - WCAG compliant with ARIA support

### Forms & Validation
- 📝 **[React Hook Form](https://react-hook-form.com/)** - Performant form library
- ✅ **[Zod](https://zod.dev/)** - Runtime validation with TypeScript inference
- 🎯 **Form Components** - Pre-built FormInput, FormSelect, FormCheckbox, etc.

### State & Storage
- 💨 **[MMKV](https://github.com/mrousavy/react-native-mmkv)** - Ultra-fast persistent storage
- 🐻 **[Zustand](https://zustand-demo.pmnd.rs/)** - Minimal state management
- 🎭 **React Context** - Database and theme providers

### Developer Experience
- 📏 **[Biome](https://biomejs.dev/)** - Fast linting and formatting (ESLint + Prettier replacement)
- 🔍 **Path Aliases** - Clean imports with `@/` prefix
- 🗂️ **VSCode Integration** - Recommended extensions and settings
- 🔄 **Hot Reload** - Instant feedback on all platforms

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 20+** and **Bun** (or npm)
- **[iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/)** (macOS only)
- **[Android Studio](https://docs.expo.dev/workflow/android-studio-emulator/)** (for Android development)
- **Windows users:** [Microsoft Visual C++ Redistributable](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist)

### Installation

```bash
# Clone the repository
git clone https://github.com/oularefodos/Fabrico-Template.git
cd Fabrico-Template

# Install dependencies
bun install
# or
npm install

# Start development server
bun dev
# or
npm run dev
```

### Platform-Specific Commands

```bash
# iOS (macOS only)
bun dev:ios

# Android
bun dev:android

# Web
bun dev
# Then press 'w' in the terminal
```

---

## 🏗️ Project Structure

```
fabrico-template/
├── app/                      # Expo Router screens
│   ├── (tabs)/              # Tab navigation (hidden by default)
│   │   ├── index.tsx        # Landing page
│   │   └── _layout.tsx      # Tab configuration
│   ├── _layout.tsx          # Root layout with providers
│   ├── +not-found.tsx       # 404 screen
│   └── global.css           # Tailwind theme variables
│
├── components/              # React components
│   ├── ui/                  # 28 styled components (Button, Card, Form, etc.)
│   ├── primitives/          # 14 cross-platform primitives (Checkbox, Dialog, etc.)
│   ├── Icons.tsx            # Lucide icons configuration
│   └── ThemeToggle.tsx      # Theme switcher component
│
├── db/                      # Database layer
│   ├── schema.ts            # Database schema (Users, Config)
│   ├── drizzle.ts           # Native SQLite setup
│   ├── drizzle.web.ts       # Web SQL.js setup
│   ├── provider.tsx         # Database React Context
│   └── migrations/          # Auto-generated SQL migrations
│
├── lib/                     # Utilities
│   ├── icons/               # Custom icon components
│   ├── utils.ts             # cn() utility (clsx + tailwind-merge)
│   ├── storage.ts           # MMKV wrapper
│   └── useColorScheme.tsx   # Theme hook
│
├── hooks/                   # React hooks
├── assets/                  # Images, fonts, etc.
└── public/                  # Web static assets
```

---

## 💾 Database Architecture

### Dual-Mode System

Fabrico supports two database modes with a seamless upgrade path:

#### **Local Mode** (Default)
```typescript
✅ SQLite database on device
✅ Works 100% offline
✅ Zero configuration required
✅ Privacy-first (data never leaves device)
✅ Fast queries (no network latency)
```

#### **Supabase Mode** (Coming Soon)
```typescript
☁️ Cloud backup and sync
☁️ Multi-device support
☁️ Real-time updates
☁️ Built-in authentication
☁️ Row-Level Security
```

### Database Schema

The template includes a minimal schema ready for your customization:

#### **Users Table**
```typescript
{
  id: string              // CUID2 unique identifier
  email: string           // Unique email
  name: string
  avatarUrl: string
  createdAt: timestamp
  updatedAt: timestamp
  // Sync metadata (for future Supabase integration)
  syncStatus: "local" | "synced" | "pending" | "error"
  lastSyncedAt: timestamp
}
```

#### **Config Table**
```typescript
{
  key: string             // Configuration key
  value: string           // Configuration value
  updatedAt: timestamp
}
```

**Stores:**
- Database mode (`local` or `supabase`)
- Supabase credentials (when connected)
- App preferences

### Working with the Database

```typescript
import { useDatabase } from '@/db/provider';
import { userTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

function MyComponent() {
  const { db } = useDatabase();

  // Query
  const users = await db.select().from(userTable);

  // Insert
  await db.insert(userTable).values({
    email: 'user@example.com',
    name: 'John Doe'
  });

  // Update
  await db.update(userTable)
    .set({ name: 'Jane Doe' })
    .where(eq(userTable.email, 'user@example.com'));

  // Delete
  await db.delete(userTable)
    .where(eq(userTable.email, 'user@example.com'));
}
```

### Adding New Tables

1. **Define schema** in `db/schema.ts`:
```typescript
export const postsTable = sqliteTable("posts", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: text("user_id").references(() => userTable.id),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});
```

2. **Generate migration**:
```bash
bun db:generate
```

3. **Migrations auto-run** on app start via `useMigrationHelper()`

---

## 🎨 UI Components

All components support dark/light mode, are fully typed, and work across iOS, Android, and Web.

### Available Components

#### Form Components
```tsx
import {
  Button, Input, Textarea, Checkbox, Switch,
  RadioGroup, Select, Combobox,
  Form, FormField, FormInput, FormSelect
} from '@/components/ui';

// Example: Form with validation
<Form>
  <FormInput
    label="Email"
    name="email"
    type="email"
    validation={z.string().email()}
  />
  <FormSelect
    label="Country"
    name="country"
    options={countries}
  />
  <Button type="submit">Submit</Button>
</Form>
```

#### Display Components
```tsx
import {
  Card, CardHeader, CardTitle, CardContent,
  Badge, Avatar, Progress, Skeleton,
  AlertDialog, Dialog, DropdownMenu
} from '@/components/ui';

// Example: Card
<Card>
  <CardHeader>
    <CardTitle>Welcome</CardTitle>
  </CardHeader>
  <CardContent>
    <Text>Card content here</Text>
  </CardContent>
</Card>
```

#### Layout Components
```tsx
import {
  List, ListItem, Separator,
  Text, H1, H2, H3, Muted
} from '@/components/ui';

// Example: List
<List>
  <ListItem label="Item 1" onPress={() => {}} />
  <ListItem label="Item 2" detail />
</List>
```

### Styling with NativeWind

```tsx
import { View, Text } from 'react-native';

function MyComponent() {
  return (
    <View className="bg-background p-4 rounded-lg shadow-sm">
      <Text className="text-foreground text-lg font-semibold">
        Hello Fabrico!
      </Text>
      <Text className="text-muted-foreground text-sm">
        Tailwind CSS works on React Native
      </Text>
    </View>
  );
}
```

### Theme Colors

All colors are defined in `app/global.css` using CSS variables:

```css
/* Light mode */
--background: 0 0% 100%
--foreground: 240 10% 3.9%
--primary: 240 5.9% 10%
--secondary: 240 4.8% 95.9%
--destructive: 0 84.2% 60.2%
--muted: 240 4.8% 95.9%
--accent: 240 4.8% 95.9%

/* Dark mode automatically switches */
```

**Usage:**
```tsx
<View className="bg-background text-foreground">
<Button className="bg-primary">Primary Button</Button>
<Text className="text-destructive">Error message</Text>
```

---

## 🛠️ Development Guide

### Adding a New Screen

1. **Create file** in `app/`:
```tsx
// app/profile.tsx
export default function Profile() {
  return (
    <View className="flex-1 p-4">
      <Text>Profile Screen</Text>
    </View>
  );
}
```

2. **Navigate** to it:
```tsx
import { Link } from 'expo-router';

<Link href="/profile">Go to Profile</Link>
```

### Form Validation

```tsx
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email(),
  age: z.number().min(18).max(120),
});

function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormInput {...field} label="Email" />
      )}
    />
  );
}
```

### Theme Switching

```tsx
import { useColorScheme } from '@/lib/useColorScheme';

function ThemeSwitcher() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <Button onPress={() => setColorScheme('dark')}>
      Switch to Dark Mode
    </Button>
  );
}
```

### Persistent Storage

```tsx
import { storage } from '@/lib/storage';

// Store
storage.set('user.name', 'John Doe');

// Retrieve
const name = storage.getString('user.name');

// Delete
storage.delete('user.name');

// Check existence
if (storage.contains('user.name')) {
  // ...
}
```

---

## 📦 Available Scripts

```bash
# Development
bun dev              # Start Expo dev server
bun dev:android      # Start Android with cache clear
bun ios              # Build & run iOS
bun android          # Build & run Android

# Build
bun build:web        # Build static web export

# Database
bun db:generate      # Generate migrations from schema

# Code Quality
bun format           # Format code with Biome
bun expo-check       # Check Expo dependency versions
```

---

## 🔮 Roadmap

### Planned Features
- [ ] **Supabase Integration**
  - OAuth authentication (Google, GitHub, Email)
  - Cloud sync with conflict resolution
  - Real-time subscriptions
  - Row-Level Security setup

- [ ] **Enhanced UI**
  - Settings screen with database mode switcher
  - Supabase connection UI
  - Sync status indicators
  - Offline queue management UI

- [ ] **Additional Features**
  - File upload with Supabase Storage
  - Push notifications
  - i18n support (multi-language)
  - Example CRUD screens

- [ ] **Developer Tools**
  - Testing setup (Jest + React Native Testing Library)
  - E2E testing (Detox)
  - Storybook for components
  - Component documentation

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Open issues for bugs or feature requests
- Submit pull requests
- Improve documentation
- Share feedback

---

## 📝 License

Apache License 2.0 - See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

Built with:
- [Expo](https://expo.dev) - Cross-platform framework
- [Drizzle ORM](https://drizzle.dev) - Type-safe ORM
- [NativeWind](https://www.nativewind.dev) - Tailwind for React Native
- [Radix UI](https://www.radix-ui.com) - Accessible primitives
- [Lucide](https://lucide.dev) - Beautiful icons
- [React Hook Form](https://react-hook-form.com/) - Forms
- [Zod](https://zod.dev) - Validation

Inspired by the local-first movement and modern React Native best practices.

---

## ⭐ Support

If you find Fabrico Template helpful, please give it a star on GitHub!

**Built with ❤️ for the React Native community**
