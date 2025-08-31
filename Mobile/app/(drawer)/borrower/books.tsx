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
import { getAuthToken } from "../../../utils/token";

interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  quantity: number;
  availableQuantity: number;
}

export default function BooksScreen() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const token = await getAuthToken();
      const response = await axios.get("http://localhost:5050/api/books", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(response.data.data || []);
    } catch (error) {
      console.error("Error fetching books:", error);
      // Mock data for demo
      setBooks([
        {
          _id: "1",
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          isbn: "978-0743273565",
          quantity: 5,
          availableQuantity: 3,
        },
        {
          _id: "2",
          title: "1984",
          author: "George Orwell",
          isbn: "978-0451524935",
          quantity: 4,
          availableQuantity: 2,
        },
        {
          _id: "3",
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          isbn: "978-0446310789",
          quantity: 6,
          availableQuantity: 4,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleBorrow = async (bookId: string, bookTitle: string) => {
    Alert.alert(
      "Borrow Book",
      `Are you sure you want to borrow "${bookTitle}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Borrow",
          onPress: async () => {
            try {
              const token = await getAuthToken();
              await axios.post(
                "http://localhost:5050/api/borrows",
                { bookId },
                { headers: { Authorization: `Bearer ${token}` } }
              );
              Alert.alert("Success", "Book borrowed successfully!");
              fetchBooks();
            } catch (error: any) {
              console.error("Error borrowing book:", error);
              Alert.alert("Error", "Failed to borrow book. Please try again.");
            }
          },
        },
      ]
    );
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
          <Text className="text-2xl font-bold text-gray-900">
            Available Books
          </Text>
        </View>
      </View>

      {/* Books List */}
      <ScrollView className="flex-1 p-4">
        {books.map((book) => (
          <View
            key={book._id}
            className="bg-white rounded-lg p-4 mb-4 shadow-sm"
          >
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900">
                  {book.title}
                </Text>
                <Text className="text-gray-600">{book.author}</Text>
                <Text className="text-gray-500 text-sm mt-1">
                  ISBN: {book.isbn}
                </Text>
              </View>
              <View className="ml-4">
                <View className="bg-blue-100 px-3 py-1 rounded-full">
                  <Text className="text-blue-800 text-xs font-medium">
                    {book.availableQuantity} available
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-gray-600 text-xs">
                  Total copies: {book.quantity}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleBorrow(book._id, book.title)}
                disabled={book.availableQuantity === 0}
                className={`px-4 py-2 rounded-lg ${
                  book.availableQuantity > 0 ? "bg-blue-500" : "bg-gray-400"
                }`}
              >
                <Text className="text-white font-medium">
                  {book.availableQuantity > 0 ? "Borrow" : "Unavailable"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
