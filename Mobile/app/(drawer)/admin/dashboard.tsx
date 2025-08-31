import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getUserData, logout } from "../../../utils/token";

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await getUserData();
      setUser(userData);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/(drawer)/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const menuItems = [
    {
      title: "Manage Users",
      icon: "people-outline",
      onPress: () => router.push("/(drawer)/admin/users"),
      color: "bg-blue-500",
    },
    {
      title: "Manage Books",
      icon: "library-outline",
      onPress: () => router.push("/(drawer)/admin/books"),
      color: "bg-green-500",
    },
    {
      title: "Manage Borrowers",
      icon: "book-outline",
      onPress: () => router.push("/(drawer)/admin/borrowers"),
      color: "bg-purple-500",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-white p-6 shadow-sm">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </Text>
            <Text className="text-gray-600 mt-1">Welcome, {user?.name}</Text>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-semibold">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Items */}
      <View className="p-4">
        <Text className="text-xl font-bold mb-4 text-gray-900">
          Management Options
        </Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={item.onPress}
            className="bg-white rounded-lg p-4 mb-4 shadow-sm"
          >
            <View className="flex-row items-center">
              <View
                className={`w-12 h-12 ${item.color} rounded-lg items-center justify-center mr-4`}
              >
                <Ionicons name={item.icon as any} size={24} color="white" />
              </View>
              <Text className="text-lg font-medium text-gray-900 flex-1">
                {item.title}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
