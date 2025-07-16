import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const notifications = [
  {
    id: "1",
    title: "Payment Received",
    message: "You have received $120 from John Doe.",
    icon: "attach-money",
    time: "2m ago",
  },
  {
    id: "2",
    title: "Card Linked",
    message: "Your new debit card has been successfully linked.",
    icon: "credit-card",
    time: "1h ago",
  },
  {
    id: "3",
    title: "Profile Updated",
    message: "Your profile information was updated.",
    icon: "person",
    time: "Yesterday",
  },
];

const NotificationCard = ({ icon, title, message, time }: any) => (
  <View style={styles.card}>
    <View style={styles.iconContainer}>
      <MaterialIcons name={icon} size={28} color="#4F8EF7" />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
    <Text style={styles.time}>{time}</Text>
  </View>
);

const Notifications = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationCard {...item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 24,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E8F0FE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginBottom: 2,
  },
  message: {
    fontSize: 14,
    color: "#555",
  },
  time: {
    fontSize: 12,
    color: "#888",
    marginLeft: 12,
    alignSelf: "flex-start",
  },
});
