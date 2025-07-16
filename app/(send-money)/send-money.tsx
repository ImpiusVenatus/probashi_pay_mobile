import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSendMoneyStore } from "@/stores/useSendMoneyStore";

const SendMoney = () => {
  const router = useRouter();
  const [beneficiary, setBeneficiary] = useState("mufratMahbub879");
  const [description, setDescription] = useState(
    "Stay Well , Buy Gifts for your Sister"
  );
  const setBeneficiaryStore = useSendMoneyStore((s) => s.setBeneficiary);

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color="#222" />
          </TouchableOpacity>
          <Text style={styles.title}>Send Money</Text>
        </View>

        {/* Transfer to (Beneficiary) */}
        <Text style={styles.label}>Transfer to (Beneficiary)</Text>
        <TextInput
          style={styles.input}
          value={beneficiary}
          onChangeText={(text) => {
            setBeneficiary(text);
            setBeneficiaryStore(text);
          }}
          placeholder="Enter beneficiary username"
        />
        <Text style={styles.accountName}>Account name</Text>

        {/* Description */}
        <Text style={[styles.label, { marginTop: 18 }]}>Description</Text>
        <TextInput
          style={[styles.input, { height: 56 }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          multiline
        />
      </View>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.addBankLink}
          onPress={() => router.push("/(send-money)/send-to-bank")}
        >
          <Text style={styles.addBankText}>Not Saved? Add A bank Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(send-money)/select-account")}
        >
          <Text style={styles.buttonText}>Send money</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendMoney;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 100,
  },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
    marginBottom: 6,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#B5C9D3",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: "#222",
    backgroundColor: "#fff",
    marginBottom: 2,
  },
  accountName: {
    alignSelf: "flex-end",
    fontSize: 14,
    color: "#444",
    marginBottom: 8,
    marginTop: 0,
    marginRight: 2,
  },
  addBankLink: {
    alignSelf: "center",
    marginTop: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#F0F9EB",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  addBankText: {
    color: "#4CAF50",
    fontSize: 15,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#00AEEF",
    borderRadius: 32,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 12,
    shadowColor: "#00AEEF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  bottomActions: {
    // New style for bottom actions
    paddingBottom: 24,
    backgroundColor: "#fff",
  },
});
