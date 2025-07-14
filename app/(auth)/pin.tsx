import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Image,
  Text,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const PIN_LENGTH = 4;

const Pin = () => {
  const [step, setStep] = useState<"create" | "confirm">("create");
  const [pin, setPin] = useState<string[]>(Array(PIN_LENGTH).fill(""));
  const [confirmPin, setConfirmPin] = useState(Array(PIN_LENGTH).fill(""));
  const [error, setError] = useState("");
  const inputRefs = useRef<(TextInput | null)[]>(Array(PIN_LENGTH).fill(null));

  const handlePinChange = (text: string, index: number) => {
    if (!/^[0-9]?$/.test(text)) return;
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);
    setError("");
    if (text && index < PIN_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (index === PIN_LENGTH - 1 && text && newPin.every((d) => d !== "")) {
      setStep("confirm");
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    }
  };

  const handleConfirmPinChange = (text: string, index: number) => {
    if (!/^[0-9]?$/.test(text)) return;
    const newPin = [...confirmPin];
    newPin[index] = text;
    setConfirmPin(newPin);
    setError("");
    if (text && index < PIN_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (index === PIN_LENGTH - 1 && text && newPin.every((d) => d !== "")) {
      if (newPin.join("") === pin.join("")) {
        // Success: PINs match
        // TODO: handle PIN save logic
        router.replace("/(auth)/login");
      } else {
        setError("PINs do not match");
        setConfirmPin(Array(PIN_LENGTH).fill(""));
        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 100);
      }
    }
  };

  const renderPinInputs = (
    values: string[],
    onChange: (text: string, idx: number) => void
  ) => (
    <View style={styles.pinContainer}>
      {values.map((digit, idx) => (
        <TextInput
          key={idx}
          ref={(el) => {
            inputRefs.current[idx] = el;
          }}
          style={styles.pinInput}
          value={digit}
          onChangeText={(text) => onChange(text.slice(-1), idx)}
          keyboardType="number-pad"
          maxLength={1}
          textAlign="center"
          secureTextEntry
          autoFocus={
            idx === 0 && step === (step === "create" ? "create" : "confirm")
          }
          onKeyPress={(e) => {
            if (e.nativeEvent.key === "Backspace" && !digit && idx > 0) {
              inputRefs.current[idx - 1]?.focus();
            }
          }}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {step === "confirm" && (
        <View style={styles.header}>
          <Pressable
            onPress={() => setStep("create")}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
        </View>
      )}
      <View style={styles.content}>
        <Image
          source={require("@/assets/images/onboarding/shield.png")}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.title}>
          {step === "create" ? "Create PIN" : "Confirm PIN"}
        </Text>
        <Text style={styles.subtitle}>
          Your account has been created. We need to secure your account against
          fraud or theft
        </Text>
        {renderPinInputs(
          step === "create" ? pin : confirmPin,
          step === "create" ? handlePinChange : handleConfirmPinChange
        )}
        {!!error && <Text style={styles.error}>{error}</Text>}
      </View>
    </SafeAreaView>
  );
};

export default Pin;

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
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  icon: {
    width: 64,
    height: 64,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
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
  error: {
    color: "#E63946",
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },
});
