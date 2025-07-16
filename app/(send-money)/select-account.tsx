import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  useSendMoneyStore,
  SendSourceType,
  AccountOrCard,
} from "@/stores/useSendMoneyStore";

const sampleAccounts: AccountOrCard[] = [
  { id: "1", name: "ProbashiPay Wallet", number: "**** 1234", type: "account" },
  { id: "2", name: "Savings Account", number: "**** 5678", type: "account" },
];
const sampleCards: AccountOrCard[] = [
  { id: "3", name: "Visa Platinum", number: "**** 4321", type: "card" },
  { id: "4", name: "Mastercard Gold", number: "**** 8765", type: "card" },
];

const SelectAccount = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<SendSourceType>("account");
  const [selected, setSelected] = useState<string | null>(null);
  const setFrom = useSendMoneyStore((s) => s.setFrom);
  const setSourceType = useSendMoneyStore((s) => s.setSourceType);

  const data = selectedType === "account" ? sampleAccounts : sampleCards;

  const handleContinue = () => {
    const chosen = data.find((item) => item.id === selected);
    if (chosen) {
      setFrom(chosen);
      setSourceType(selectedType);
      router.push("/(send-money)/confirm-send-money");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#222" />
      </TouchableOpacity>
      {/* Toggle Buttons */}
      <View style={styles.toggleCol}>
        <TouchableOpacity
          style={[
            styles.toggleBtnCol,
            selectedType === "account" && styles.toggleBtnActive,
          ]}
          onPress={() => setSelectedType("account")}
        >
          <Ionicons
            name="wallet"
            size={20}
            color={selectedType === "account" ? "#fff" : "#0099CC"}
          />
          <Text
            style={[
              styles.toggleBtnText,
              selectedType === "account" && { color: "#fff" },
            ]}
          >
            Send from Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleBtnCol,
            selectedType === "card" && styles.toggleBtnActive,
          ]}
          onPress={() => setSelectedType("card")}
        >
          <Ionicons
            name="card"
            size={20}
            color={selectedType === "card" ? "#fff" : "#0099CC"}
          />
          <Text
            style={[
              styles.toggleBtnText,
              selectedType === "card" && { color: "#fff" },
            ]}
          >
            Send from Card
          </Text>
        </TouchableOpacity>
      </View>
      {/* List of Accounts or Cards */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.item, selected === item.id && styles.itemSelected]}
            onPress={() => setSelected(item.id)}
          >
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemNumber}>{item.number}</Text>
            </View>
            {selected === item.id && (
              <Ionicons name="checkmark-circle" size={24} color="#00AEEF" />
            )}
          </TouchableOpacity>
        )}
        style={{ marginTop: 32, marginBottom: 24 }}
      />
      {/* Continue Button */}
      <TouchableOpacity
        style={[styles.continueBtn, !selected && { opacity: 0.5 }]}
        disabled={!selected}
        onPress={handleContinue}
      >
        <Text style={styles.continueBtnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  backBtn: {
    position: "absolute",
    top: 24,
    left: 16,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 24,
  },
  toggleCol: {
    flexDirection: "column",
    gap: 16,
    marginHorizontal: 0,
    marginTop: 0,
    width: "100%",
    paddingHorizontal: 0,
  },
  toggleBtnCol: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0099CC",
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: "#fff",
    marginHorizontal: 0,
    gap: 8,
    width: "100%",
    justifyContent: "center",
  },
  toggleBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0099CC",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: "#fff",
    marginHorizontal: 4,
    gap: 8,
  },
  toggleBtnActive: {
    backgroundColor: "#0099CC",
    borderColor: "#0099CC",
  },
  toggleBtnText: {
    color: "#0099CC",
    fontSize: 16,
    fontWeight: "600",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#B5C9D3",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    backgroundColor: "#F7FAFC",
  },
  itemSelected: {
    borderColor: "#00AEEF",
    backgroundColor: "#E9F6FC",
  },
  itemInfo: {},
  itemName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
  },
  itemNumber: {
    fontSize: 15,
    color: "#666",
    marginTop: 2,
  },
  continueBtn: {
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
  continueBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
