import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const SendToBank = () => {
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.title}>Send to bank</Text>
      </View>

      {/* Bank Dropdown */}
      <Text style={styles.label}>Bank</Text>
      <TouchableOpacity style={styles.inputRow}>
        <Text style={styles.inputText}>Select bank</Text>
        <Ionicons name="chevron-down" size={20} color="#888" />
      </TouchableOpacity>

      {/* Account number */}
      <Text style={styles.label}>Account number</Text>
      <TextInput style={styles.input} value="0123456789" editable={false} />
      <Text style={styles.accountName}>Account name</Text>

      {/* Description */}
      <Text style={[styles.label, { marginTop: 18 }]}>Description</Text>
      <TextInput
        style={[styles.input, { height: 56 }]}
        placeholder="Add a short note"
        placeholderTextColor="#888"
        editable={false}
        multiline
      />

      {/* Save to beneficiaries */}
      <TouchableOpacity
        style={styles.checkboxRow}
        onPress={() => setChecked((c) => !c)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
          {checked && <Ionicons name="checkmark" size={16} color="#fff" />}
        </View>
        <Text style={styles.checkboxLabel}>Save to beneficiaries</Text>
      </TouchableOpacity>

      {/* Send money button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Send money</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SendToBank;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginLeft: 12,
    color: "#111",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
    marginBottom: 6,
    marginTop: 8,
  },
  inputRow: {
    borderWidth: 1,
    borderColor: "#B5C9D3",
    borderRadius: 8,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginBottom: 2,
  },
  inputText: {
    fontSize: 16,
    color: "#888",
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
    marginTop: -22,
    marginRight: 2,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: "#B5C9D3",
    borderRadius: 4,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#00AEEF",
    borderColor: "#00AEEF",
  },
  checkboxLabel: {
    fontSize: 15,
    color: "#222",
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
});
