import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import { getAuthToken } from "../../../utils/token";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "borrower" | "librarian";
  status: "active" | "inactive";
  password?: string; // Optional for display purposes
}

export default function UsersScreen() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "borrower",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = await getAuthToken();
      const response = await axios.get("http://localhost:5050/api/user/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Mock data for demo
      setUsers([
        {
          _id: "1",
          name: "John Doe",
          email: "john@example.com",
          role: "borrower",
          status: "active",
        },
        {
          _id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          role: "librarian",
          status: "active",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const token = await getAuthToken();
      await axios.post("http://localhost:5050/api/user/register", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert("Success", "User added successfully!");
      fetchUsers();
      setShowModal(false);
      resetForm();
    } catch (error) {
      Alert.alert("Error", "Failed to add user");
    }
  };

  const handleEditUser = async () => {
    if (!editingUser) return;

    try {
      const token = await getAuthToken();
      await axios.put(
        `http://localhost:5050/api/user/update/${editingUser._id}`,
        { name: formData.name, email: formData.email, role: formData.role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert("Success", "User updated successfully!");
      fetchUsers();
      setShowModal(false);
      resetForm();
    } catch (error) {
      Alert.alert("Error", "Failed to update user");
    }
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    Alert.alert("Delete User", `Are you sure you want to delete ${userName}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const token = await getAuthToken();
            await axios.delete(
              `http://localhost:5050/api/user/delete/${userId}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            Alert.alert("Success", "User deleted successfully!");
            fetchUsers();
          } catch (error) {
            Alert.alert("Error", "Failed to delete user");
          }
        },
      },
    ]);
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", password: "", role: "borrower" });
    setEditingUser(null);
  };

  const openModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        password: "",
        role: user.role,
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-white p-6 shadow-sm">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <Ionicons name="arrow-back" size={24} color="#007AFF" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-900">Users</Text>
          </View>
          <TouchableOpacity
            onPress={() => openModal()}
            className="bg-blue-500 px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-medium">Add User</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Users List */}
      <ScrollView className="flex-1 p-4">
        {users.map((user) => (
          <View
            key={user._id}
            className="bg-white rounded-lg p-4 mb-4 shadow-sm"
          >
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900">
                  {user.name}
                </Text>
                <Text className="text-gray-600">{user.email}</Text>
                <View className="flex-row mt-2">
                  <View
                    className={`px-2 py-1 rounded-full mr-2 ${
                      user.role === "librarian"
                        ? "bg-purple-100"
                        : "bg-blue-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        user.role === "librarian"
                          ? "text-purple-800"
                          : "text-blue-800"
                      }`}
                    >
                      {user.role}
                    </Text>
                  </View>
                  <View
                    className={`px-2 py-1 rounded-full ${
                      user.status === "active" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        user.status === "active"
                          ? "text-green-800"
                          : "text-red-800"
                      }`}
                    >
                      {user.status}
                    </Text>
                  </View>
                </View>
              </View>
              <View className="flex-row">
                <TouchableOpacity
                  onPress={() => openModal(user)}
                  className="bg-yellow-500 p-2 rounded-lg mr-2"
                >
                  <Ionicons name="pencil" size={16} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteUser(user._id, user.name)}
                  className="bg-red-500 p-2 rounded-lg"
                >
                  <Ionicons name="trash" size={16} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Add/Edit Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View className="flex-1 justify-center items-center bg-black/50 p-4">
          <View className="bg-white w-full rounded-lg p-6">
            <Text className="text-xl font-bold mb-4">
              {editingUser ? "Edit User" : "Add User"}
            </Text>

            <TextInput
              placeholder="Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              className="border border-gray-300 rounded-lg p-3 mb-3"
            />

            <TextInput
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
              className="border border-gray-300 rounded-lg p-3 mb-3"
            />

            {!editingUser && (
              <TextInput
                placeholder="Password"
                value={formData.password}
                onChangeText={(text) =>
                  setFormData({ ...formData, password: text })
                }
                secureTextEntry
                className="border border-gray-300 rounded-lg p-3 mb-3"
              />
            )}

            <View className="flex-row mb-4">
              <TouchableOpacity
                onPress={() => setFormData({ ...formData, role: "borrower" })}
                className={`flex-1 p-3 rounded-lg mr-2 ${
                  formData.role === "borrower" ? "bg-blue-500" : "bg-gray-200"
                }`}
              >
                <Text
                  className={`text-center font-medium ${
                    formData.role === "borrower"
                      ? "text-white"
                      : "text-gray-700"
                  }`}
                >
                  Borrower
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFormData({ ...formData, role: "librarian" })}
                className={`flex-1 p-3 rounded-lg ${
                  formData.role === "librarian"
                    ? "bg-purple-500"
                    : "bg-gray-200"
                }`}
              >
                <Text
                  className={`text-center font-medium ${
                    formData.role === "librarian"
                      ? "text-white"
                      : "text-gray-700"
                  }`}
                >
                  Librarian
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row">
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                className="flex-1 bg-gray-300 p-3 rounded-lg mr-2"
              >
                <Text className="text-center font-medium">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={editingUser ? handleEditUser : handleAddUser}
                className="flex-1 bg-blue-500 p-3 rounded-lg"
              >
                <Text className="text-center font-medium text-white">
                  {editingUser ? "Update" : "Add"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
