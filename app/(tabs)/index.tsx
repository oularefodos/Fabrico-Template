import { View, ScrollView } from "react-native";
import { Stack } from "expo-router";
import * as React from "react";
import { Sparkles, Terminal, Code, Activity } from "@/components/Icons";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";

export default function Home() {
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
            Production-ready React Native starter template. Build beautiful cross-platform apps faster.
          </Text>

          <View className="flex-row gap-2 flex-wrap">
            <Badge variant="secondary" className="flex-row gap-1.5 px-3 py-1.5">
              <Terminal size={14} className="text-foreground" />
              <Text className="text-sm">Expo 54</Text>
            </Badge>
            <Badge variant="secondary" className="flex-row gap-1.5 px-3 py-1.5">
              <Code size={14} className="text-foreground" />
              <Text className="text-sm">React Native</Text>
            </Badge>
            <Badge variant="secondary" className="flex-row gap-1.5 px-3 py-1.5">
              <Activity size={14} className="text-foreground" />
              <Text className="text-sm">NativeWind</Text>
            </Badge>
          </View>
        </View>

        {/* Features */}
        <View className="gap-4">
          <Text className="text-2xl font-bold">Features</Text>

          <View className="gap-3">
            <FeatureItem
              title="🎨 Beautiful UI Components"
              description="Pre-built components with NativeWind (Tailwind CSS) styling"
            />
            <FeatureItem
              title="🌙 Dark Mode Support"
              description="Built-in dark mode with system preferences detection"
            />
            <FeatureItem
              title="📱 Cross-Platform"
              description="Works on iOS, Android, and Web out of the box"
            />
            <FeatureItem
              title="⚡️ Type-Safe"
              description="Full TypeScript support with strict type checking"
            />
            <FeatureItem
              title="🚀 Modern Stack"
              description="Expo Router, React 19, and latest React Native"
            />
          </View>
        </View>

        {/* Getting Started */}
        <View className="gap-4 pb-8">
          <Text className="text-2xl font-bold">Getting Started</Text>

          <View className="gap-3">
            <Text className="text-muted-foreground leading-6">
              Edit <Text className="font-mono bg-muted px-2 py-1 rounded">app/(tabs)/index.tsx</Text> to customize this screen.
            </Text>
            <Text className="text-muted-foreground leading-6">
              Add new screens in the <Text className="font-mono bg-muted px-2 py-1 rounded">app/</Text> directory using Expo Router's file-based routing.
            </Text>
            <Text className="text-muted-foreground leading-6">
              Check out the <Text className="font-mono bg-muted px-2 py-1 rounded">components/</Text> directory for reusable UI components.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

interface FeatureItemProps {
  title: string;
  description: string;
}

function FeatureItem({ title, description }: FeatureItemProps) {
  return (
    <View className="bg-card p-4 rounded-lg border border-border">
      <Text className="font-semibold mb-1">{title}</Text>
      <Text className="text-sm text-muted-foreground">{description}</Text>
    </View>
  );
}
