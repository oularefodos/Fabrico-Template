import { View, ScrollView } from "react-native";
import { Stack, useRouter } from "expo-router";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormInput,
  FormTextarea,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDatabase } from "@/db/drizzle";
import { todoTable } from "@/db/schema";

const todoFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  description: z.string().max(1000, "Description is too long").optional(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

type TodoFormValues = z.infer<typeof todoFormSchema>;

export default function AddTodoScreen() {
  const { db } = useDatabase();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
    },
  });

  const onSubmit = async (data: TodoFormValues) => {
    try {
      setIsSubmitting(true);
      await db.insert(todoTable).values({
        title: data.title,
        description: data.description || null,
        priority: data.priority,
        completed: false,
      });
      router.back();
    } catch (error) {
      console.error("Error creating todo:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen
        options={{
          title: "New Todo",
          headerBackTitle: "Cancel",
        }}
      />

      <ScrollView className="flex-1">
        <View className="p-6 gap-6">
          <Form {...form}>
            <View className="gap-5">
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <View className="gap-2">
                    <FormLabel nativeID="title">Title</FormLabel>
                    <FormInput
                      placeholder="Enter todo title"
                      autoCapitalize="sentences"
                      autoFocus
                      value={field.value}
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                      aria-labelledby="title"
                    />
                    <FormMessage />
                  </View>
                )}
              />

              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <View className="gap-2">
                    <FormLabel nativeID="description">
                      Description (Optional)
                    </FormLabel>
                    <FormTextarea
                      placeholder="Add more details..."
                      autoCapitalize="sentences"
                      numberOfLines={4}
                      value={field.value}
                      onChangeText={field.onChange}
                      onBlur={field.onBlur}
                      aria-labelledby="description"
                    />
                    <FormMessage />
                  </View>
                )}
              />

              {/* Priority Field */}
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <View className="gap-2">
                    <FormLabel nativeID="priority">Priority</FormLabel>
                    <Select
                      value={{
                        value: field.value,
                        label:
                          field.value.charAt(0).toUpperCase() +
                          field.value.slice(1),
                      }}
                      onValueChange={(option) =>
                        field.onChange(option?.value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          className="text-foreground text-sm native:text-lg"
                          placeholder="Select priority"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem label="Low" value="low">
                            Low
                          </SelectItem>
                          <SelectItem label="Medium" value="medium">
                            Medium
                          </SelectItem>
                          <SelectItem label="High" value="high">
                            High
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </View>
                )}
              />

              {/* Submit Button */}
              <View className="gap-3 pt-4">
                <Button
                  size="lg"
                  onPress={form.handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                >
                  <Text>{isSubmitting ? "Creating..." : "Create Todo"}</Text>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onPress={() => router.back()}
                  disabled={isSubmitting}
                >
                  <Text>Cancel</Text>
                </Button>
              </View>
            </View>
          </Form>
        </View>
      </ScrollView>
    </View>
  );
}
