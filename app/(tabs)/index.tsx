import { View, ScrollView } from "react-native";
import { Stack } from "expo-router";
import * as React from "react";
import { Sparkles, Database, Cloud, Terminal } from "@/components/Icons";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { useMigrationHelper } from "@/db/drizzle";

export default function Home() {
  const { success, error } = useMigrationHelper();

  if (error) {
    return (
      <View className="flex-1 items-center justify-center gap-5 p-6 bg-background">
        <Text className="text-destructive">Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View className="flex-1 items-center justify-center gap-5 p-6 bg-background">
        <Text>Loading...</Text>
      </View>
    );
  }

  return <ScreenContent />;
}

function ScreenContent() {
  return (
    <ScrollView className="flex-1 bg-background">
      <Stack.Screen options={{ title: "Fabrico" }} />

      <View className="flex-1 p-8 pt-16 gap-8">
        {/* Hero */}
        <View className="gap-6">
          <View className="flex-row items-center gap-3">
            <View className="bg-primary/10 p-3 rounded-2xl">
              <Sparkles className="text-primary" size={32} />
            </View>
            <Text className="text-4xl font-bold">Fabrico</Text>
          </View>

          <Text className="text-xl text-muted-foreground leading-7">
            Production-ready React Native starter. Local-first database with
            cloud sync. Ship faster.
          </Text>

          <View className="flex-row gap-2 flex-wrap">
            <Badge variant="secondary" className="flex-row gap-1.5 px-3 py-1.5">
              <Terminal size={14} className="text-foreground" />
              <Text className="text-sm">Expo 54</Text>
            </Badge>
            <Badge variant="secondary" className="flex-row gap-1.5 px-3 py-1.5">
              <Database size={14} className="text-foreground" />
              <Text className="text-sm">Drizzle ORM</Text>
            </Badge>
            <Badge variant="secondary" className="flex-row gap-1.5 px-3 py-1.5">
              <Cloud size={14} className="text-foreground" />
              <Text className="text-sm">Supabase</Text>
            </Badge>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
