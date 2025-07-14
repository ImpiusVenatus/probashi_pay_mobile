import { StyleSheet, View, Image, Pressable, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Biometrics = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1A2B27" />
        </Pressable>
      </View>
      <View style={styles.content}>
        <Image
          source={require("@/assets/images/onboarding/scan.png")}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.title}>Set up Biometrics</Text>
        <Text style={styles.subtitle}>
          Add an extra security layer to you secure your account
        </Text>
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.buttonPrimary} onPress={() => {}}>
          <Text style={styles.buttonPrimaryText}>Continue</Text>
        </Pressable>
        <Pressable style={styles.buttonSecondary} onPress={() => {}}>
          <Text style={styles.buttonSecondaryText}>Skip for now</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Biometrics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 0,
  },
  backButton: {
    padding: 10,
    alignSelf: "flex-start",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#22223B",
    textAlign: "center",
    marginBottom: 32,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 16,
  },
  buttonPrimary: {
    backgroundColor: "#1A2B27",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 8,
  },
  buttonPrimaryText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: "#1A2B27",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  buttonSecondaryText: {
    color: "#1A2B27",
    fontSize: 18,
    fontWeight: "600",
  },
});
