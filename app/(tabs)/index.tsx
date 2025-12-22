import { View, ScrollView, Pressable, Linking } from "react-native";
import { Stack } from "expo-router";
import * as React from "react";
import { Sparkles, Database, Cloud, Code, Github, Terminal } from "@/components/Icons";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  const handleGithub = () => {
    Linking.openURL("https://github.com/yourusername/fabrico-template");
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <Stack.Screen
        options={{
          title: "Fabrico",
        }}
      />

      <View className="flex-1 p-8 gap-8">
        {/* Hero Section */}
        <View className="gap-6 pt-8">
          <View className="flex-row items-center gap-3">
            <View className="bg-primary/10 p-3 rounded-2xl">
              <Sparkles className="text-primary" size={32} />
            </View>
            <Text className="text-4xl font-bold">Fabrico</Text>
          </View>

          <View className="gap-3">
            <Text className="text-2xl font-semibold text-foreground">
              Vibe-Coding Agent Template
            </Text>
            <Text className="text-base text-muted-foreground leading-6">
              A beautiful, production-ready starter template with local-first database and
              optional cloud sync. Built with Expo, React Native, and modern tooling.
            </Text>
          </View>

          <View className="flex-row gap-3 flex-wrap">
            <Badge variant="secondary" className="flex-row gap-2 px-3 py-1.5">
              <Terminal size={14} className="text-foreground" />
              <Text className="text-foreground">Expo SDK 54</Text>
            </Badge>
            <Badge variant="secondary" className="flex-row gap-2 px-3 py-1.5">
              <Database size={14} className="text-foreground" />
              <Text className="text-foreground">SQLite + Drizzle</Text>
            </Badge>
            <Badge variant="secondary" className="flex-row gap-2 px-3 py-1.5">
              <Cloud size={14} className="text-foreground" />
              <Text className="text-foreground">Supabase Ready</Text>
            </Badge>
          </View>

          <Pressable onPress={handleGithub}>
            <View className="flex-row items-center gap-2 bg-foreground px-5 py-3 rounded-lg active:opacity-80">
              <Github size={18} className="text-background" />
              <Text className="text-background font-semibold">View on GitHub</Text>
            </View>
          </Pressable>
        </View>

        {/* Features Grid */}
        <View className="gap-4">
          <Text className="text-xl font-semibold">Features</Text>

          <View className="gap-4">
            <FeatureCard
              icon={<Database className="text-primary" size={24} />}
              title="Local-First Database"
              description="SQLite database with Drizzle ORM. Fast, reliable, works offline out of the box."
            />

            <FeatureCard
              icon={<Cloud className="text-primary" size={24} />}
              title="Dual-Mode Architecture"
              description="Start with local SQLite, seamlessly switch to Supabase cloud sync when needed."
            />

            <FeatureCard
              icon={<Code className="text-primary" size={24} />}
              title="Beautiful UI Components"
              description="50+ pre-built components with NativeWind. Consistent design across iOS, Android, and Web."
            />

            <FeatureCard
              icon={<Sparkles className="text-primary" size={24} />}
              title="Type-Safe Everything"
              description="End-to-end type safety with TypeScript, Drizzle ORM, and Zod validation."
            />
          </View>
        </View>

        {/* Quick Start */}
        <View className="gap-4 pb-8">
          <Text className="text-xl font-semibold">Quick Start</Text>
          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>Clone and start building in minutes</CardDescription>
            </CardHeader>
            <CardContent className="gap-3">
              <View className="bg-secondary/30 p-4 rounded-lg gap-2">
                <Text className="text-xs text-muted-foreground">Terminal</Text>
                <Text className="font-mono text-sm">
                  git clone [your-repo-url]
                </Text>
                <Text className="font-mono text-sm">
                  bun install
                </Text>
                <Text className="font-mono text-sm">
                  bun dev
                </Text>
              </View>
              <Text className="text-sm text-muted-foreground">
                Visit the Settings tab to customize your theme and connect to Supabase.
              </Text>
            </CardContent>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <CardContent className="flex-row gap-4 p-4">
        <View className="bg-primary/10 p-3 rounded-xl h-fit">
          {icon}
        </View>
        <View className="flex-1 gap-1">
          <Text className="font-semibold text-base">{title}</Text>
          <Text className="text-sm text-muted-foreground leading-5">{description}</Text>
        </View>
      </CardContent>
    </Card>
  );
}
