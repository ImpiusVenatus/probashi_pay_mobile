import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

const PIN_LENGTH = 4;

const ConfirmPin = () => {
  const [pin, setPin] = useState<string[]>(Array(PIN_LENGTH).fill(""));
  const inputRefs = useRef<(TextInput | null)[]>(Array(PIN_LENGTH).fill(null));

  const handlePinChange = (text: string, index: number) => {
    if (!/^[0-9]?$/.test(text)) return;
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);
    if (text && index < PIN_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    // If all digits are filled, show toast and navigate
    if (index === PIN_LENGTH - 1 && text && newPin.every((d) => d !== "")) {
      Toast.show({
        type: "success",
        text1: "Card added successfully",
        position: "top",
        visibilityTime: 3000,
      });
      setTimeout(() => {
        router.replace("/(tabs)/cards");
      }, 500); // Short delay to allow toast to show
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </Pressable>
      </View>
      <View style={styles.content}>
        <Image
          source={require("@/assets/images/onboarding/shield.png")}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.title}>Confirm PIN</Text>
        <Text style={styles.subtitle}>
          Enter your PIN to authorize this transaction
        </Text>
        <View style={styles.pinContainer}>
          {pin.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              style={styles.pinInput}
              value={digit}
              onChangeText={(text) => handlePinChange(text.slice(-1), idx)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              secureTextEntry
              onKeyPress={(e) => {
                if (e.nativeEvent.key === "Backspace" && !digit && idx > 0) {
                  inputRefs.current[idx - 1]?.focus();
                }
              }}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmPin;

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
    alignItems: "center",
    padding: 20,
    marginTop: 32,
  },
  icon: {
    width: 64,
    height: 64,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    color: "#000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#22223B",
    marginBottom: 32,
    textAlign: "center",
  },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 16,
  },
  pinInput: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    fontSize: 32,
    backgroundColor: "#F8FAFC",
    textAlign: "center",
  },
});
