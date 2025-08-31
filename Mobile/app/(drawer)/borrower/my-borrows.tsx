import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import { getAuthToken, getUserData } from "../../../utils/token";

interface Borrow {
  _id: string;
  bookId: {
    _id: string;
    title: string;
    author: string;
  };
  requestDate: string;
  borrowDate?: string;
  dueDate?: string;
  returnDate?: string;
  status: "pending" | "approved" | "rejected" | "returned" | "overdue";
}

export default function MyBorrowsScreen() {
  const router = useRouter();
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyBorrows();
  }, []);

  const fetchMyBorrows = async () => {
    try {
      const token = await getAuthToken();
      const userData = await getUserData();

      if (!userData?._id) {
        throw new Error("User data not found");
      }

      const response = await axios.get(
        `http://localhost:5050/api/borrower/view/user/${userData._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBorrows(response.data.data || []);
    } catch (error) {
      console.error("Error fetching borrows:", error);
      // Mock data for demo
      setBorrows([
        {
          _id: "1",
          bookId: {
            _id: "1",
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
          },
          requestDate: "2024-01-01T00:00:00.000Z",
          borrowDate: "2024-01-01T00:00:00.000Z",
          dueDate: "2024-01-15T00:00:00.000Z",
          status: "approved",
        },
        {
          _id: "2",
          bookId: { _id: "2", title: "1984", author: "George Orwell" },
          requestDate: "2023-12-15T00:00:00.000Z",
          returnDate: "2024-01-10T00:00:00.000Z",
          status: "returned",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "borrowed":
        return "bg-blue-100 text-blue-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "returned":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "borrowed":
        return "Borrowed";
      case "overdue":
        return "Overdue";
      case "returned":
        return "Returned";
      default:
        return status;
    }
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
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-900">My Borrows</Text>
        </View>
      </View>

      {/* Borrows List */}
      <ScrollView className="flex-1 p-4">
        {borrows.map((borrow) => (
          <View
            key={borrow._id}
            className="bg-white rounded-lg p-4 mb-4 shadow-sm"
          >
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900">
                  {borrow.bookId.title}
                </Text>
                <Text className="text-gray-600">{borrow.bookId.author}</Text>
              </View>
              <View
                className={`px-3 py-1 rounded-full ${getStatusColor(borrow.status)}`}
              >
                <Text className="text-xs font-medium">
                  {getStatusText(borrow.status)}
                </Text>
              </View>
            </View>

            <View className="mb-3">
              <Text className="text-gray-600 text-sm">
                Requested: {new Date(borrow.requestDate).toLocaleDateString()}
              </Text>
              {borrow.borrowDate && (
                <Text className="text-gray-600 text-sm">
                  Borrowed: {new Date(borrow.borrowDate).toLocaleDateString()}
                </Text>
              )}
              {borrow.dueDate && (
                <Text className="text-gray-600 text-sm">
                  Due: {new Date(borrow.dueDate).toLocaleDateString()}
                </Text>
              )}
              {borrow.returnDate && (
                <Text className="text-gray-600 text-sm">
                  Returned: {new Date(borrow.returnDate).toLocaleDateString()}
                </Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
