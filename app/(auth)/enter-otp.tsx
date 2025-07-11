import { StyleSheet, View, TextInput, Pressable } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const OTP_LENGTH = 6;

const EnterOTP = () => {
  const { email } = useLocalSearchParams();
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<Array<TextInput | null>>(
    Array(OTP_LENGTH).fill(null)
  );
  const [timer, setTimer] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (text && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit !== "");

  const handleVerify = () => {
    if (isOtpComplete) {
      router.push("/enter-name");
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
        <ThemedText style={styles.title}>Verify your account</ThemedText>
        <ThemedText style={styles.subtitle}>
          We sent you 6 digit code to{"\n"}
          {email}
        </ThemedText>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleOtpChange(text.slice(-1), index)}
              keyboardType="number-pad"
              maxLength={1}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>

        <ThemedText style={styles.timer}>
          Send code in {formatTime(timer)}
        </ThemedText>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={[styles.button, !isOtpComplete && styles.buttonDisabled]}
          onPress={handleVerify}
          disabled={!isOtpComplete}
        >
          <ThemedText style={styles.buttonText}>Verify</ThemedText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default EnterOTP;

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
    lineHeight: 24,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    fontSize: 24,
    textAlign: "center",
    backgroundColor: "#F8FAFC",
  },
  timer: {
    textAlign: "center",
    color: "#666",
    fontSize: 16,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  button: {
    backgroundColor: "#007AFF",
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
