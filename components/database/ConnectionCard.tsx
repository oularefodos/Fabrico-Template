import { View } from "react-native";
import { Database, Cloud, Check } from "@/components/Icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type ConnectionCardProps = {
  mode: "local" | "supabase";
  onConnect: () => void;
  onDisconnect: () => void;
};

export function ConnectionCard({ mode, onConnect, onDisconnect }: ConnectionCardProps) {
  const isLocal = mode === "local";

  return (
    <Card className="w-full">
      <CardHeader>
        <View className="flex-row items-center justify-between">
          <CardTitle>Database</CardTitle>
          <Badge variant={isLocal ? "secondary" : "default"} className="flex-row gap-2">
            {isLocal ? (
              <Database className="text-foreground" size={14} />
            ) : (
              <Cloud className="text-background" size={14} />
            )}
            <Text className={isLocal ? "text-foreground" : "text-background"}>
              {isLocal ? "Local" : "Supabase"}
            </Text>
          </Badge>
        </View>
        <CardDescription>
          {isLocal
            ? "Your data is stored locally on this device"
            : "Your data is synced with Supabase cloud"}
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4">
        {isLocal ? (
          <>
            <View className="gap-2">
              <Text className="text-sm font-medium">Benefits of Supabase:</Text>
              <View className="gap-1.5 pl-2">
                <View className="flex-row items-center gap-2">
                  <Check size={14} className="text-primary" />
                  <Text className="text-sm text-muted-foreground">Cloud backup</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Check size={14} className="text-primary" />
                  <Text className="text-sm text-muted-foreground">Multi-device sync</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Check size={14} className="text-primary" />
                  <Text className="text-sm text-muted-foreground">Real-time updates</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Check size={14} className="text-primary" />
                  <Text className="text-sm text-muted-foreground">Secure authentication</Text>
                </View>
              </View>
            </View>
            <Button onPress={onConnect} className="w-full">
              <Text>Connect to Supabase</Text>
            </Button>
          </>
        ) : (
          <>
            <View className="gap-2 bg-secondary/30 p-3 rounded-lg">
              <View className="flex-row items-center gap-2">
                <Check size={16} className="text-primary" />
                <Text className="text-sm font-medium">Connected & Syncing</Text>
              </View>
              <Text className="text-xs text-muted-foreground">
                Your data is automatically backed up to the cloud
              </Text>
            </View>
            <Button onPress={onDisconnect} variant="outline" className="w-full">
              <Text>Disconnect</Text>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
