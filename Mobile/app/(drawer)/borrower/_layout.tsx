import { Stack } from "expo-router";

export default function BorrowerLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="dashboard"
        options={{
          title: "Borrower Dashboard",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="books"
        options={{
          title: "Browse Books",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="my-borrows"
        options={{
          title: "My Borrows",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
