import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const EMPLOYMENT_STATUSES = [
  "Unemployed",
  "Employed",
  "Self-employed",
  "Student",
  "Retired",
  "Other",
];

const Employment = () => {
  const [employmentStatus, setEmploymentStatus] = useState(
    EMPLOYMENT_STATUSES[0]
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [occupation, setOccupation] = useState("");

  const handleNext = () => {
    // TODO: handle next step
    router.push("/(verification)/identity");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>What do you do?</Text>
        <Text style={styles.subtitle}>
          Provide your employment informations below
        </Text>
        <View style={styles.form}>
          <Text style={styles.label}>Employment status</Text>
          <Pressable
            style={styles.dropdown}
            onPress={() => setShowDropdown((v) => !v)}
          >
            <Text style={styles.dropdownText}>{employmentStatus}</Text>
            <Ionicons
              name={showDropdown ? "chevron-up" : "chevron-down"}
              size={20}
              color="#222"
            />
          </Pressable>
          {showDropdown && (
            <View style={styles.dropdownList}>
              {EMPLOYMENT_STATUSES.map((status) => (
                <TouchableOpacity
                  key={status}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setEmploymentStatus(status);
                    setShowDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{status}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <Text style={[styles.label, { marginTop: 24 }]}>Occupation</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g Software developer"
            placeholderTextColor="#A3A3A3"
            value={occupation}
            onChangeText={setOccupation}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable
          style={[
            styles.button,
            !(employmentStatus && occupation) && styles.buttonDisabled,
          ]}
          onPress={handleNext}
          disabled={!(employmentStatus && occupation)}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Employment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    padding: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#222",
    marginBottom: 32,
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#000",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#F8FAFC",
    marginBottom: 8,
    justifyContent: "space-between",
  },
  dropdownText: {
    fontSize: 16,
    color: "#222",
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 8,
    marginTop: -8,
    zIndex: 10,
    position: "absolute",
    width: "100%",
    left: 0,
    top: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  dropdownItem: {
    padding: 16,
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#222",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#F8FAFC",
    marginTop: 8,
  },
  footer: {
    padding: 20,
  },
  button: {
    backgroundColor: "#0EA1D3",
    padding: 16,
    borderRadius: 999,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#A3A3A3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
