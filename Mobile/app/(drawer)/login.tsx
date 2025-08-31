import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";
import { setAuthToken, setUserData, User } from "../../utils/token";

interface LoginResponse {
  status: boolean;
  message: string;
  data: string; // token
  user: User;
}

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5050/api/auth/login",
        {
          email,
          password,
        }
      );

      const data = response.data;
      await setAuthToken(data.data);
      await setUserData(data.user);

      // Navigate based on user role
      if (data.user.role === "librarian") {
        router.replace("/(drawer)/admin/dashboard");
      } else {
        router.replace("/(drawer)/borrower/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      Alert.alert("Error", "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-gray-100">
      <Text className="text-3xl font-bold text-center mb-8 text-gray-900">
        Library Login
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        className="border border-gray-300 rounded-lg p-4 mb-4 bg-white"
        editable={!loading}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border border-gray-300 rounded-lg p-4 mb-6 bg-white"
        editable={!loading}
      />

      {loading ? (
        <View className="items-center">
          <ActivityIndicator size="large" color="#007AFF" />
          <Text className="mt-2 text-gray-600">Logging in...</Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-blue-600 py-4 rounded-lg items-center"
        >
          <Text className="text-white font-bold text-lg">Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
