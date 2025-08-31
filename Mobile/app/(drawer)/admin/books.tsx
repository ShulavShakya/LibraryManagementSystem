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

interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  quantity: number;
  availableQuantity: number;
}

export default function BooksManagementScreen() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    quantity: "",
  });

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
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async () => {
    if (
      !formData.title ||
      !formData.author ||
      !formData.isbn ||
      !formData.quantity
    ) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const token = await getAuthToken();
      await axios.post(
        "http://localhost:5050/api/books",
        { ...formData, quantity: parseInt(formData.quantity) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert("Success", "Book added successfully!");
      fetchBooks();
      setShowModal(false);
      resetForm();
    } catch (error) {
      Alert.alert("Error", "Failed to add book");
    }
  };

  const handleEditBook = async () => {
    if (!editingBook) return;

    try {
      const token = await getAuthToken();
      await axios.put(
        `http://localhost:5050/api/books/${editingBook._id}`,
        { ...formData, quantity: parseInt(formData.quantity) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert("Success", "Book updated successfully!");
      fetchBooks();
      setShowModal(false);
      resetForm();
    } catch (error) {
      Alert.alert("Error", "Failed to update book");
    }
  };

  const handleDeleteBook = (bookId: string, bookTitle: string) => {
    Alert.alert(
      "Delete Book",
      `Are you sure you want to delete "${bookTitle}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await getAuthToken();
              await axios.delete(`http://localhost:5050/api/books/${bookId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              Alert.alert("Success", "Book deleted successfully!");
              fetchBooks();
            } catch (error) {
              Alert.alert("Error", "Failed to delete book");
            }
          },
        },
      ]
    );
  };

  const resetForm = () => {
    setFormData({ title: "", author: "", isbn: "", quantity: "" });
    setEditingBook(null);
  };

  const openModal = (book?: Book) => {
    if (book) {
      setEditingBook(book);
      setFormData({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        quantity: book.quantity.toString(),
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
            <Text className="text-2xl font-bold text-gray-900">Books</Text>
          </View>
          <TouchableOpacity
            onPress={() => openModal()}
            className="bg-blue-500 px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-medium">Add Book</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Books List */}
      <ScrollView className="flex-1 p-4">
        {books.map((book) => (
          <View
            key={book._id}
            className="bg-white rounded-lg p-4 mb-4 shadow-sm"
          >
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900">
                  {book.title}
                </Text>
                <Text className="text-gray-600">{book.author}</Text>
                <Text className="text-gray-500 text-sm mt-1">
                  ISBN: {book.isbn}
                </Text>
                <View className="flex-row mt-2">
                  <Text className="text-sm text-gray-600 mr-4">
                    Total: {book.quantity}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Available: {book.availableQuantity}
                  </Text>
                </View>
              </View>
              <View className="flex-row">
                <TouchableOpacity
                  onPress={() => openModal(book)}
                  className="bg-yellow-500 p-2 rounded-lg mr-2"
                >
                  <Ionicons name="pencil" size={16} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteBook(book._id, book.title)}
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
              {editingBook ? "Edit Book" : "Add Book"}
            </Text>

            <TextInput
              placeholder="Title"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
              className="border border-gray-300 rounded-lg p-3 mb-3"
            />

            <TextInput
              placeholder="Author"
              value={formData.author}
              onChangeText={(text) =>
                setFormData({ ...formData, author: text })
              }
              className="border border-gray-300 rounded-lg p-3 mb-3"
            />

            <TextInput
              placeholder="ISBN"
              value={formData.isbn}
              onChangeText={(text) => setFormData({ ...formData, isbn: text })}
              className="border border-gray-300 rounded-lg p-3 mb-3"
            />

            <TextInput
              placeholder="Quantity"
              value={formData.quantity}
              onChangeText={(text) =>
                setFormData({ ...formData, quantity: text })
              }
              keyboardType="numeric"
              className="border border-gray-300 rounded-lg p-3 mb-4"
            />

            <View className="flex-row">
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                className="flex-1 bg-gray-300 p-3 rounded-lg mr-2"
              >
                <Text className="text-center font-medium">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={editingBook ? handleEditBook : handleAddBook}
                className="flex-1 bg-blue-500 p-3 rounded-lg"
              >
                <Text className="text-center font-medium text-white">
                  {editingBook ? "Update" : "Add"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
