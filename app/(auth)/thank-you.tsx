import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const Thankyou = () => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
        hitSlop={16}
      >
        <Ionicons name="arrow-back" size={24} color="#222" />
      </Pressable>
      <Image
        source={require("@/assets/images/onboarding/thank.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Thank you!</Text>
      <Text style={styles.desc}>
        Your data is being processed. Our team is reviewing your submission to
        ensure security and compliance, and will notify you when it is complete.
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/(tabs)/home")}
      >
        <Text style={styles.buttonText}>Enter Probashi Pay</Text>
      </Pressable>
    </View>
  );
};

export default Thankyou;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 48,
    paddingHorizontal: 24,
  },
  backButton: {
    position: "absolute",
    top: 48,
    left: 24,
    zIndex: 10,
  },
  image: {
    width: 180,
    height: 180,
    marginTop: 32,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
    color: "#111",
  },
  desc: {
    fontSize: 16,
    color: "#222",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },
  button: {
    position: "absolute",
    bottom: 40,
    left: 24,
    right: 24,
    backgroundColor: "#0CA1D3",
    borderRadius: 24,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});
