import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Link } from "expo-router";
import { useSignUp } from "@/hooks/auth/auth/useSignUp";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const { checkEmailUnique, isLoading, error } = useSignUp();

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);

    // Clear error when user starts typing
    if (emailError) {
      setEmailError("");
    }

    // Validate email format
    if (text.trim() === "") {
      setIsEmailValid(false);
      setEmailError("");
    } else if (!validateEmail(text)) {
      setIsEmailValid(false);
      setEmailError("Please enter a valid email address");
    } else {
      setIsEmailValid(true);
      setEmailError("");
    }
  };

  const handleNext = async () => {
    if (email && isEmailValid) {
      try {
        const success = await checkEmailUnique({ email });
        if (success) {
          router.push({
            pathname: "/enter-otp",
            params: { email },
          });
        }
      } catch (err) {
        // Error is already handled by the hook
        console.error("Failed to check email:", err);
      }
    } else if (email && !isEmailValid) {
      setEmailError("Please enter a valid email address");
    }
  };

  // Display error from the hook if any
  const displayError = error || emailError;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Enter your email address</Text>
        <Text style={styles.subtitle}>
          Your email address will be used to verify your account.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={[
              styles.input,
              displayError ? styles.inputError : null,
              isEmailValid ? styles.inputValid : null,
            ]}
            placeholder="Enter your email address"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
          {displayError ? (
            <Text style={styles.errorText}>{displayError}</Text>
          ) : null}
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already a user?</Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <Pressable
          style={[
            styles.button,
            (!email || !isEmailValid || isLoading) && styles.buttonDisabled,
          ]}
          onPress={handleNext}
          disabled={!email || !isEmailValid || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Next</Text>
          )}
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
    paddingHorizontal: 20,
    paddingTop: 100,
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
  inputError: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  inputValid: {
    borderColor: "#10B981",
    backgroundColor: "#F0FDF4",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 16, // Added spacing below
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
    color: "#0EA1D3",
    fontSize: 16,
    fontWeight: "600",
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
