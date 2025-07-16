import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const FaceScan = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1A2B27" />
        </Pressable>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Image verification</Text>
        <Text style={styles.instructions}>
          Take a well-lit selfie, ensuring your face is clear and unobstructed,
          and maintain a neutral expression.
        </Text>
        <Image
          source={require("@/assets/images/onboarding/face-scan.png")}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("./face-scan-camera")}
      >
        <Text style={styles.buttonText}>Take a selfie</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FaceScan;

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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A2B27",
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  instructions: {
    fontSize: 16,
    color: "#444",
    marginBottom: 32,
    alignSelf: "flex-start",
  },
  illustration: {
    width: 220,
    height: 220,
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#00A8E8",
    borderRadius: 24,
    margin: 20,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
