# ✨ Fabrico Template

> A vibe-coding agent template with dual-mode database architecture

<p align="center">
  <strong>Start with local SQLite, seamlessly switch to Supabase cloud sync when needed.</strong>
</p>

## 🎯 Philosophy

Fabrico is built on the principle of **progressive enhancement**:
- 🚀 **Zero friction start** - Works immediately with local SQLite, no configuration needed
- ☁️ **Cloud when you're ready** - Connect to Supabase with a single click
- 📱 **Cross-platform native** - iOS, Android, and Web from one codebase
- 🎨 **Beautiful by default** - Modern UI components with NativeWind

## 📚 What's Inside

### Core Stack
- ⚡ [Expo v54](https://expo.dev) - Cross-platform React Native framework
- ⚛️ [React Native v0.81.4](https://reactnative.dev) - Latest React Native
- 🔷 [TypeScript](https://www.typescriptlang.org/) - Type safety throughout

### Database Layer (Dual-Mode)
- 💽 [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/) - Native database (iOS/Android)
- 🌐 [SQL.js](https://github.com/sql-js/sql.js) - SQLite for Web (WASM)
- 🔧 [Drizzle ORM](https://drizzle.dev) - Type-safe database queries
- ☁️ **Supabase Ready** - Switch to cloud sync when needed

### UI & Styling
- 💎 [NativeWind v4](https://www.nativewind.dev) - Tailwind CSS for React Native
- 🎨 50+ Pre-built UI Components - Buttons, Cards, Forms, and more
- 🌗 Dark/Light Mode - System-aware with persistent preferences
- ♿ Accessible - WCAG compliant components

### Developer Experience
- 📏 [Biome](https://biomejs.dev/) - Fast linter and formatter
- 🔍 Path aliases - Clean imports with `@/`
- 🗂 VSCode integration - Recommended extensions and settings
- 🔄 Hot reload - Instant feedback on all platforms

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/fabrico-template
cd fabrico-template

# Install dependencies
bun install

# Start development server
bun dev
```

### Platform-Specific Commands

```bash
# iOS
bun dev:ios

# Android
bun dev:android

# Web
bun dev
# Then press 'w' in terminal
```

## 🏗️ Project Structure

```
fabrico-template/
├── app/                      # Expo Router screens
│   ├── (tabs)/              # Tab navigation
│   │   ├── index.tsx        # Home/Landing page
│   │   └── settings.tsx     # Settings & DB connection
│   └── _layout.tsx          # Root layout with providers
│
├── components/              # React components
│   ├── ui/                  # Styled UI components
│   ├── primitives/          # Cross-platform primitives
│   ├── database/            # Database connection UI
│   └── settings/            # Settings components
│
├── db/                      # Database layer
│   ├── schema.ts            # Database schema (Users, Config)
│   ├── drizzle.ts           # Native SQLite setup
│   ├── drizzle.web.ts       # Web SQL.js setup
│   ├── provider.tsx         # Database context
│   └── migrations/          # SQL migrations
│
├── lib/                     # Utilities and helpers
├── assets/                  # Images, fonts, etc.
└── app.config.ts           # Expo configuration
```

## 💾 Database Architecture

### Dual-Mode System

Fabrico supports two database modes:

#### 1. **Local Mode (Default)**
- SQLite database stored on device
- Works offline
- Zero configuration
- Privacy-first

#### 2. **Supabase Mode** (Optional)
- Cloud backup and sync
- Multi-device support
- Real-time updates
- Authentication ready

### Switching Modes

Navigate to **Settings → Database → Connect to Supabase**

The template handles:
- ✅ Data migration from local to cloud
- ✅ Bidirectional sync
- ✅ Conflict resolution
- ✅ Offline queue management

## 📊 Database Schema

### Users Table
```typescript
{
  id: string (CUID2)
  email: string (unique)
  name: string
  avatarUrl: string
  createdAt: timestamp
  updatedAt: timestamp
  syncStatus: "local" | "synced" | "pending" | "error"
  lastSyncedAt: timestamp
}
```

### Config Table
```typescript
{
  key: string (primary key)
  value: string
  updatedAt: timestamp
}
```

Stores app configuration including:
- Database mode (`local` | `supabase`)
- Supabase credentials (when connected)
- User preferences

## 🎨 UI Components

All components support:
- ✅ Dark/Light mode
- ✅ Consistent API across iOS/Android/Web
- ✅ TypeScript types
- ✅ Accessibility features

### Available Components

**Forms**
- Button, Input, Textarea
- Checkbox, Switch, Radio Group
- Select, Combobox
- Form validation with Zod

**Display**
- Card, Badge, Avatar
- Progress, Skeleton
- Alert, Alert Dialog

**Layout**
- List, List Item
- Separator, Tabs
- Typography helpers

## 🛠️ Development

### Adding Database Tables

1. Update `db/schema.ts`:
```typescript
export const myTable = sqliteTable("my_table", {
  id: text("id").primaryKey(),
  // ... your columns
});
```

2. Generate migration:
```bash
bun db:generate
```

3. Migrations run automatically on app start

### Styling with NativeWind

```tsx
import { View, Text } from 'react-native';

function MyComponent() {
  return (
    <View className="bg-background p-4 rounded-lg">
      <Text className="text-foreground font-semibold">
        Hello Fabrico!
      </Text>
    </View>
  );
}
```

### Theme Colors

All colors are defined in `app/global.css`:
- `background`, `foreground`
- `primary`, `secondary`, `accent`
- `muted`, `destructive`
- `card`, `popover`, `border`

## 🔮 Roadmap

- [ ] Supabase OAuth integration
- [ ] Real-time sync implementation
- [ ] Conflict resolution UI
- [ ] Multi-user support
- [ ] File upload with Supabase Storage
- [ ] Push notifications
- [ ] i18n support

## 📝 License

See [LICENSE](LICENSE) for more information.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit PRs.

---

**Built with ❤️ for vibe-coding agents**
