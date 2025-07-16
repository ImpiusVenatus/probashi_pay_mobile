import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

const user = {
  name: "Jane Doe",
  email: "jane.doe@email.com",
  avatar: null, // Use null for initials, or provide an image URL
};

const actions = [
  {
    id: "verify",
    label: "Verify Account",
    icon: <Feather name="check-circle" size={22} color="#4F8EF7" />,
    onPress: () => router.push("/(verification)/employment"),
  },
  {
    id: "edit",
    label: "Edit Profile",
    icon: <Feather name="edit" size={22} color="#4F8EF7" />,
    onPress: () => {},
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Feather name="settings" size={22} color="#4F8EF7" />,
    onPress: () => {},
  },
  {
    id: "logout",
    label: "Logout",
    icon: <MaterialIcons name="logout" size={22} color="#F75F4F" />,
    onPress: () => {
      Toast.show({
        type: "success",
        text1: "Logged out",
        text2: "You have been logged out successfully",
        position: "top",
        visibilityTime: 3000,
      });
      setTimeout(() => {
        router.push("/(auth)/login");
      }, 500); // Give toast a moment to show before navigating
    },
  },
];

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {user.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitials}>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Text>
          </View>
        )}
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <View style={styles.actionsContainer}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.actionCard}
            activeOpacity={0.7}
            onPress={action.onPress}
          >
            <View style={styles.actionIcon}>{action.icon}</View>
            <Text style={styles.actionLabel}>{action.label}</Text>
            <MaterialIcons name="keyboard-arrow-right" size={22} color="#bbb" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 36,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#E8F0FE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarInitials: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#4F8EF7",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    marginBottom: 4,
  },
  email: {
    fontSize: 15,
    color: "#666",
    marginBottom: 8,
  },
  actionsContainer: {
    marginTop: 12,
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIcon: {
    marginRight: 16,
  },
  actionLabel: {
    flex: 1,
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },
});
