// Reminder: Run 'npx expo install expo-camera' if you haven't already.
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");
const OVAL_SIZE = width * 0.85;

const FaceScanCamera = () => {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [showContinue, setShowContinue] = useState(false);

  if (!permission) {
    return <View style={{ flex: 1, backgroundColor: "#000" }} />;
  }
  if (!permission.granted) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff" }}>No access to camera</Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: "#00A8E8",
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff" }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Image verification</Text>
        <Text style={styles.instructions}>
          Please fit your face in the oval frame and take the selfie
        </Text>
      </View>
      <View style={styles.cameraContainer}>
        <View style={styles.ovalMaskWrapper}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="front"
            ratio="1:1"
          />
          <View style={styles.ovalMask} pointerEvents="none" />
        </View>
        {showContinue && (
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => router.push("/(auth)/creating")}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.captureContainer}>
        {!showContinue && (
          <TouchableOpacity
            style={styles.captureButton}
            onPress={() => setShowContinue(true)}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default FaceScanCamera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
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
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 4,
  },
  instructions: {
    color: "#fff",
    fontSize: 15,
    marginBottom: 16,
  },
  cameraContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ovalMaskWrapper: {
    width: OVAL_SIZE,
    height: OVAL_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    width: OVAL_SIZE,
    height: OVAL_SIZE,
    borderRadius: OVAL_SIZE / 2,
    overflow: "hidden",
  },
  ovalMask: {
    position: "absolute",
    top: 0,
    left: 0,
    width: OVAL_SIZE,
    height: OVAL_SIZE,
    borderRadius: OVAL_SIZE / 2,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  captureContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  captureButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#00A8E8",
    borderWidth: 5,
    borderColor: "#fff",
  },
  continueButton: {
    marginTop: 32,
    backgroundColor: "#00A8E8",
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
