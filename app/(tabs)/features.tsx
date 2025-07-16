import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const features = [
  {
    title: "Bill Payments",
    desc: "Pay utility bills like electricity, gas, and internet directly for your family back home.",
    icon: (
      <MaterialCommunityIcons
        name="lightning-bolt-outline"
        size={28}
        color="#222"
      />
    ),
  },
  {
    title: "Savings & Investments",
    desc: "Pay utility bills like electricity, gas, and internet directly for your family back home.",
    icon: (
      <MaterialCommunityIcons
        name="pig-variant-outline"
        size={28}
        color="#222"
      />
    ),
  },
  {
    title: "Healthcare Assistance",
    desc: "Cover medical expenses or purchase health insurance for your loved ones.",
    icon: <FontAwesome5 name="heartbeat" size={28} color="#222" />,
  },
  {
    title: "Multi-Currency Wallet",
    desc: "Store, send, and exchange multiple currencies anytime, anywhere.",
    icon: <Ionicons name="wallet-outline" size={28} color="#222" />,
  },
  {
    title: "Emergency Transfers",
    desc: "Send money instantly during emergencies with priority processing.",
    icon: <Ionicons name="information-circle-outline" size={28} color="#222" />,
  },
  {
    title: "Community Hub",
    desc: "Connect with other expatriates and access essential local resources.",
    icon: (
      <MaterialCommunityIcons
        name="google-circles-communities"
        size={28}
        color="#222"
      />
    ),
  },
];

const Features = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Features</Text>
      <View style={styles.grid}>
        {features.map((f, i) => (
          <View style={styles.card} key={f.title}>
            <View style={styles.iconWrap}>{f.icon}</View>
            <Text style={styles.cardTitle}>{f.title}</Text>
            <Text style={styles.cardDesc}>{f.desc}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Features;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9F6FC",
    paddingHorizontal: 12,
    paddingTop: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#222",
    marginBottom: 18,
    marginLeft: 8,
    marginTop: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 18,
    marginBottom: 18,
    minHeight: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  iconWrap: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#00A3E0",
    marginBottom: 6,
    marginTop: 24,
  },
  cardDesc: {
    fontSize: 14,
    color: "#222",
    marginBottom: 2,
  },
});
