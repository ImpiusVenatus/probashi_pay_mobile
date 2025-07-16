import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const Cards = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cards</Text>
      </View>
      {/* Sample Card */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>**** 1234</Text>
          <View style={styles.cardRow}>
            <View>
              <Text style={styles.cardLabel}>Card Holder</Text>
              <Text style={styles.cardValue}>John Doe</Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>Expiry</Text>
              <Text style={styles.cardValue}>12/25</Text>
            </View>
          </View>
        </View>
      </View>
      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => router.push("/(others)/add-card")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    padding: 24,
    paddingBottom: 8,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#22223b",
    letterSpacing: 0.5,
  },
  cardContainer: {
    alignItems: "center",
    marginTop: 32,
  },
  card: {
    width: width * 0.88,
    height: 200,
    borderRadius: 24,
    padding: 24,
    justifyContent: "space-between",
    backgroundColor: "#0EA1D3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  cardNumber: {
    color: "#fff",
    fontSize: 28,
    letterSpacing: 4,
    fontWeight: "600",
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  cardLabel: {
    color: "#e0e0e0",
    fontSize: 13,
    marginBottom: 2,
  },
  cardValue: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "500",
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 32,
    backgroundColor: "#0EA1D3",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },
});
