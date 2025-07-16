import { StyleSheet, View, TextInput, Pressable, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCountryCodeSheetStore } from "@/stores/useCountryCodeSheetStore";
import SelectCountryCodeSheet from "@/components/SelectCountryCodeSheet";

const EnterPhone = () => {
  const { firstName, lastName } = useLocalSearchParams();
  const [phone, setPhone] = useState("");
  const { selectedCountry, openSheet } = useCountryCodeSheetStore();

  const handleNext = () => {
    if (phone) {
      router.push({
        pathname: "/enter-otp",
        params: { phone, firstName, lastName },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Enter your phone number</Text>
        <Text style={styles.subtitle}>
          Your phone will be used to verify your account.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.phoneInputContainer}>
            <Pressable style={styles.countryCode} onPress={openSheet}>
              {/* You can use a flag image if you have it, otherwise show code */}
              {/* <Image source={require(`@/assets/flags/${selectedCountry.code.toLowerCase()}.svg`)} style={styles.flag} /> */}
              <Text style={{ fontSize: 16 }}>{selectedCountry.dial_code}</Text>
              <Ionicons name="chevron-down" size={20} color="black" />
            </Pressable>
            <TextInput
              style={styles.phoneInput}
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoComplete="tel"
            />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={[styles.button, !phone && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={!phone}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
      <SelectCountryCodeSheet />
    </SafeAreaView>
  );
};

export default EnterPhone;

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
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
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
  phoneInputContainer: {
    flexDirection: "row",
    gap: 8,
  },
  countryCode: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F8FAFC",
  },
  flag: {
    width: 24,
    height: 16,
    borderRadius: 2,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#F8FAFC",
  },
  emailLink: {
    color: "#007AFF",
    fontSize: 16,
    textAlign: "center",
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
