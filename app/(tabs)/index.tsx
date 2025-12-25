import { View, ScrollView, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import * as React from "react";
import { Plus, Circle, CheckCircle2, Trash2 } from "@/components/Icons";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMigrationHelper } from "@/db/hooks";
import { useDatabase } from "@/db/provider";
import type { Todo } from "@/db/schema";

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

  return <TodoListScreen />;
}

function TodoListScreen() {
  const { adapter } = useDatabase();
  const router = useRouter();
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [loading, setLoading] = React.useState(true);

  const loadTodos = React.useCallback(async () => {
    if (!adapter) return;
    try {
      const result = await adapter.getTodos();
      setTodos(result);
    } catch (error) {
      console.error("Error loading todos:", error);
    } finally {
      setLoading(false);
    }
  }, [adapter]);

  React.useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const toggleTodo = async (id: string, completed: boolean) => {
    if (!adapter) return;
    try {
      await adapter.updateTodo(id, { completed: !completed });
      await loadTodos();
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const deleteTodo = async (id: string) => {
    if (!adapter) return;
    try {
      await adapter.deleteTodo(id);
      await loadTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen
        options={{
          title: "My Todos",
          headerRight: () => (
            <Pressable onPress={() => router.push("/add-todo")}>
              <Plus className="text-primary" size={24} />
            </Pressable>
          ),
        }}
      />

      <ScrollView className="flex-1">
        <View className="p-6 gap-6">
          {/* Stats */}
          <View className="flex-row gap-3">
            <Badge variant="secondary" className="flex-1 py-3 items-center">
              <Text className="text-sm font-medium">
                {activeTodos.length} Active
              </Text>
            </Badge>
            <Badge variant="secondary" className="flex-1 py-3 items-center">
              <Text className="text-sm font-medium">
                {completedTodos.length} Done
              </Text>
            </Badge>
          </View>

          {loading ? (
            <View className="items-center py-12">
              <Text className="text-muted-foreground">Loading todos...</Text>
            </View>
          ) : todos.length === 0 ? (
            <View className="items-center py-12 gap-4">
              <Text className="text-2xl text-muted-foreground">No todos yet</Text>
              <Text className="text-muted-foreground text-center">
                Tap the + button to create your first todo
              </Text>
            </View>
          ) : (
            <>
              {/* Active Todos */}
              {activeTodos.length > 0 && (
                <View className="gap-3">
                  <Text className="text-lg font-semibold">Active Tasks</Text>
                  {activeTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                    />
                  ))}
                </View>
              )}

              {/* Completed Todos */}
              {completedTodos.length > 0 && (
                <View className="gap-3">
                  <Text className="text-lg font-semibold">Completed</Text>
                  {completedTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                    />
                  ))}
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <View className="absolute bottom-6 right-6">
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg"
          onPress={() => router.push("/add-todo")}
        >
          <Plus className="text-primary-foreground" size={24} />
        </Button>
      </View>
    </View>
  );
}

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const router = useRouter();

  const getPriorityColor = (priority: string | null) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <View className="flex-row gap-3 items-start">
          {/* Checkbox */}
          <Pressable onPress={() => onToggle(todo.id, todo.completed)}>
            {todo.completed ? (
              <CheckCircle2 className="text-primary" size={24} />
            ) : (
              <Circle className="text-muted-foreground" size={24} />
            )}
          </Pressable>

          {/* Content */}
          <Pressable
            className="flex-1"
            onPress={() => router.push(`/edit-todo/${todo.id}`)}
          >
            <View className="gap-1">
              <Text
                className={`text-base font-medium ${
                  todo.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {todo.title}
              </Text>
              {todo.description && (
                <Text
                  className={`text-sm ${
                    todo.completed ? "line-through text-muted-foreground" : "text-muted-foreground"
                  }`}
                  numberOfLines={2}
                >
                  {todo.description}
                </Text>
              )}
              {todo.priority && (
                <Badge variant="outline" className="self-start mt-1">
                  <Text className={`text-xs ${getPriorityColor(todo.priority)}`}>
                    {todo.priority}
                  </Text>
                </Badge>
              )}
            </View>
          </Pressable>

          {/* Delete Button */}
          <Pressable onPress={() => onDelete(todo.id)}>
            <Trash2 className="text-destructive" size={20} />
          </Pressable>
        </View>
      </CardContent>
    </Card>
  );
}
