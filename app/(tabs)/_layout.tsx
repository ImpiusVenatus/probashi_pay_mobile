import { router, Tabs } from "expo-router";
import React from "react";
import { Platform, View, Image, TouchableOpacity } from "react-native";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

function CommonHeader() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#E9F6FC",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingTop: 30,
        paddingBottom: 30,
      }}
    >
      <Image
        source={require("@/assets/icons/home-logo.png")}
        style={{ width: 38, height: 38, resizeMode: "contain" }}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            marginLeft: 16,
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 8,
            shadowColor: "#000",
            shadowOpacity: 0.04,
            shadowRadius: 4,
            elevation: 1,
          }}
          onPress={() => router.push("/(others)/notifications")}
        >
          <Ionicons name="notifications-outline" size={24} color="#0099CC" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginLeft: 16,
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 8,
            shadowColor: "#000",
            shadowOpacity: 0.04,
            shadowRadius: 4,
            elevation: 1,
          }}
          onPress={() => router.push("/(others)/profile")}
        >
          <Ionicons name="person-outline" size={24} color="#0099CC" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <CommonHeader />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <SimpleLineIcons name="home" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="cards"
          options={{
            title: "Cards",
            tabBarIcon: ({ color }) => (
              <Ionicons name="card" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="recipients"
          options={{
            title: "Recipients",
            tabBarIcon: ({ color }) => (
              <Ionicons name="people" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="features"
          options={{
            title: "Features",
            tabBarIcon: ({ color }) => (
              <Ionicons name="grid" size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
