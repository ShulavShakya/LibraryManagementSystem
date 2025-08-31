import React from "react";
import { View, Text, ScrollView } from "react-native";

const Home = () => {
  const statsCards = [
    { title: "Total Employees", value: "10" },
    { title: "Departments", value: "3" },
    { title: "Present Today", value: "8" },
    { title: "Pending Requests", value: "2" },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4">Dashboard</Text>

      <View className="flex-row flex-wrap justify-between mb-6">
        {statsCards.map((card, index) => (
          <View
            key={index}
            className="w-[48%] bg-white rounded-2xl p-4 mb-4 shadow"
          >
            <Text className="text-xl font-bold text-center">{card.value}</Text>
            <Text className="text-gray-500 text-sm mt-1 text-center">
              {card.title}
            </Text>
          </View>
        ))}
      </View>

      <View className="bg-white rounded-2xl p-4 shadow">
        <Text className="text-lg font-semibold mb-3">Recent Activity</Text>

        <View className="flex-row justify-between py-2 border-b border-gray-200">
          <Text>John Doe checked in</Text>
          <Text className="text-gray-500 text-xs">9:15 AM</Text>
        </View>
        <View className="flex-row justify-between py-2 border-b border-gray-200">
          <Text>Sarah Wilson submitted leave request</Text>
          <Text className="text-gray-500 text-xs">8:45 AM</Text>
        </View>
        <View className="flex-row justify-between py-2">
          <Text>Mike Johnson checked out</Text>
          <Text className="text-gray-500 text-xs">Yesterday</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
