import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSendMoneyStore } from "@/stores/useSendMoneyStore";
import Toast from "react-native-toast-message";

const ConfirmSendMoney = () => {
  const router = useRouter();
  const { amount, beneficiary, from, sourceType } = useSendMoneyStore();

  const handleConfirm = () => {
    Toast.show({
      type: "success",
      text1: "Transfer Successful",
      text2: `You sent $${amount} to ${beneficiary}`,
      position: "top",
      visibilityTime: 3000,
    });
    router.push("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.title}>Confirm Transfer</Text>
      </View>

      {/* Details Card */}
      <View style={styles.card}>
        <Text style={styles.label}>You are sending</Text>
        <Text style={styles.amount}>${amount}</Text>
        <View style={styles.row}>
          <Text style={styles.detailLabel}>To:</Text>
          <Text style={styles.detailValue}>{beneficiary}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailLabel}>From:</Text>
          <Text style={styles.detailValue}>
            {from ? `${from.name} (${from.number})` : "-"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.detailLabel}>Source Type:</Text>
          <Text style={styles.detailValue}>
            {sourceType === "account" ? "Account" : "Card"}
          </Text>
        </View>
      </View>

      {/* Confirm Button at Bottom */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmBtnText}>Confirm & Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmSendMoney;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111",
    marginLeft: 16,
  },
  card: {
    backgroundColor: "#F7FAFC",
    borderRadius: 18,
    padding: 28,
    marginBottom: 32,
    shadowColor: "#00AEEF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 1,
  },
  label: {
    fontSize: 15,
    color: "#444",
    marginBottom: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: "700",
    color: "#00AEEF",
    marginBottom: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 16,
    color: "#222",
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: 0,
    paddingBottom: 30,
    backgroundColor: "#fff",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  confirmBtn: {
    backgroundColor: "#00AEEF",
    borderRadius: 32,
    paddingVertical: 16,
    alignItems: "center",
    width: "90%",
    marginTop: 0,
    marginBottom: 0,
    shadowColor: "#00AEEF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  confirmBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
