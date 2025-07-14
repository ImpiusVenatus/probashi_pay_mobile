import { StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerBackVisible: false,
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="enter-email" />
      <Stack.Screen name="enter-otp" />
      <Stack.Screen name="enter-name" />
      <Stack.Screen name="enter-phone" />
      <Stack.Screen name="password" />
      <Stack.Screen name="pin" />
    </Stack>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
