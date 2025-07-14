import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const CreateAccount = () => {
  const [email, setEmail] = useState("");

  const handleNext = () => {
    if (email) {
      router.push({
        pathname: "/enter-otp",
        params: { email },
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
        <Text style={styles.title}>Enter your email address</Text>
        <Text style={styles.subtitle}>
          Your email address will be used to verify your account.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already a user?</Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={[styles.button, !email && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={!email}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CreateAccount;

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
  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#F8FAFC",
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  loginButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  loginText: {
    color: "#000000",
    fontSize: 16,
  },
  loginButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
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
