import { Stack } from "expo-router";

export default function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="dashboard"
        options={{
          title: "Admin Dashboard",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="users"
        options={{
          title: "User Management",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="books"
        options={{
          title: "Book Management",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="borrowers"
        options={{
          title: "Borrower Management",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
