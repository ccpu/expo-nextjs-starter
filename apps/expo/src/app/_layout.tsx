import React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "../styles.css";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  return (
    <View className="flex-1 bg-background">
      <StatusBar />
      <Stack
        screenOptions={{
          headerShown: true,
          contentStyle: {
            backgroundColor: "transparent",
          },
          animation: "default",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="about"
          options={{
            title: "About",
          }}
        />
      </Stack>
    </View>
  );
}
