import { StyleSheet, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Password = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [touched, setTouched] = useState(false);

  const isPasswordValid =
    password.length >= 8 &&
    /[a-zA-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^a-zA-Z0-9]/.test(password);
  const isMatch = password === confirmPassword;
  const canSubmit = isPasswordValid && isMatch;

  const handleCreateAccount = () => {
    if (canSubmit) {
      // TODO: handle account creation logic
      router.push("/(auth)/login");
    } else {
      setTouched(true);
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
        <ThemedText style={styles.title}>Create a password</ThemedText>
        <ThemedText style={styles.subtitle}>
          This will be required for subsequent login on new devices
        </ThemedText>

        <View style={styles.form}>
          <ThemedText style={styles.label}>Password</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Create a secure combination"
            placeholderTextColor="#7B8794"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            onBlur={() => setTouched(true)}
          />
          <ThemedText style={styles.helper}>
            Minimum 8 alphanumeric and special characters
          </ThemedText>
          {touched && !isPasswordValid && (
            <ThemedText style={styles.error}>
              Password must be at least 8 characters and include a number,
              letter, and special character.
            </ThemedText>
          )}

          <ThemedText style={[styles.label, { marginTop: 24 }]}>
            Confirm password
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter password again"
            placeholderTextColor="#7B8794"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            onBlur={() => setTouched(true)}
          />
          {touched && !isMatch && (
            <ThemedText style={styles.error}>
              Passwords do not match.
            </ThemedText>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={[styles.button, !canSubmit && styles.buttonDisabled]}
          onPress={handleCreateAccount}
          disabled={!canSubmit}
        >
          <ThemedText style={styles.buttonText}>Create my account</ThemedText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Password;

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
    color: "#22223B",
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
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#F8FAFC",
    marginBottom: 4,
  },
  helper: {
    fontSize: 14,
    color: "#22223B",
    marginBottom: 8,
  },
  error: {
    color: "#E63946",
    fontSize: 14,
    marginTop: 4,
    marginBottom: 4,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  button: {
    backgroundColor: "#009FE3",
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
