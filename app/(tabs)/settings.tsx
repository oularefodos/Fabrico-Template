import * as React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { ConnectionCard } from '@/components/database/ConnectionCard';
import { ThemeSettingItem } from '@/components/settings/ThemeItem';
import List, { ListHeader } from "@/components/ui/list";
import { Muted } from "@/components/ui/typography";
import { Text } from "@/components/ui/text";

export default function Settings() {
  const [dbMode, setDbMode] = React.useState<"local" | "supabase">("local");

  const handleConnect = () => {
    // TODO: Implement Supabase connection flow
    console.log("Connect to Supabase");
    // For now, just toggle the mode for UI demonstration
    setDbMode("supabase");
  };

  const handleDisconnect = () => {
    // TODO: Implement disconnect logic
    console.log("Disconnect from Supabase");
    setDbMode("local");
  };

  return (
    <ScrollView className="flex-1 w-full bg-background">
      <Stack.Screen
        options={{
          title: "Settings",
        }}
      />

      <View className="px-6 pt-4 gap-6 pb-8">
        {/* Database Section */}
        <View className="gap-3">
          <Muted className="text-xs uppercase">Database</Muted>
          <ConnectionCard
            mode={dbMode}
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
          />
        </View>

        {/* App Settings */}
        <List>
          <ListHeader>
            <Muted>Appearance</Muted>
          </ListHeader>
          <ThemeSettingItem />
        </List>

        {/* Info Section */}
        <View className="gap-3 pt-4">
          <Muted className="text-xs uppercase">About</Muted>
          <View className="bg-secondary/30 p-4 rounded-lg gap-2">
            <Text className="text-sm font-medium">Fabrico Template</Text>
            <Text className="text-xs text-muted-foreground">
              Version 1.0.0
            </Text>
            <Text className="text-xs text-muted-foreground leading-5">
              A vibe-coding agent template with dual-mode database architecture.
              Start with local SQLite and optionally connect to Supabase for cloud sync.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
