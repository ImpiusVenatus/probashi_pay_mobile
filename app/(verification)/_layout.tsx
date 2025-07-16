import { Stack } from "expo-router";
import React from "react";
// import CustomHeader from "@/components/CustomHeader";

export default function VerificationLayout() {
  return (
    <Stack
      screenOptions={{
        // header: ({ route, options }) => (
        //   <CustomHeader
        //     title={options.title || route.name}
        //     showBackButton={true}
        //   />
        // ),
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="identity"
        options={{
          title: "Identity",
        }}
      />
      <Stack.Screen
        name="address"
        options={{
          title: "Address",
        }}
      />
      <Stack.Screen
        name="utility"
        options={{
          title: "Utility",
        }}
      />
      <Stack.Screen
        name="face-scan"
        options={{
          title: "Face Scan",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="face-scan-camera"
        options={{
          title: "Face Scan Camera",
        }}
      />
      <Stack.Screen
        name="employment"
        options={{
          title: "Employment",
        }}
      />
    </Stack>
  );
}
