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
      <Stack.Screen name="create-account" />
      <Stack.Screen name="enter-otp" />
    </Stack>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
