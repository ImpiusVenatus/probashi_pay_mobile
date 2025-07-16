import { Stack } from "expo-router";
import React from "react";
// import CustomHeader from "@/components/CustomHeader";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        // header: ({ route, options }) => (
        //   <CustomHeader
        //     title={options.title || route.name}
        //     showBackButton={true}
        //   />
        // ),
        headerShown: true,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          title: "Notifications",
        }}
      />
      <Stack.Screen
        name="saved-cards"
        options={{
          title: "Saved Cards",
        }}
      />
      <Stack.Screen
        name="add-card"
        options={{
          title: "Add Card",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-money"
        options={{
          title: "Add Money",
        }}
      />
      <Stack.Screen
        name="confirm-pin"
        options={{
          title: "Confirm Pin",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
