import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

const Utility = () => {
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const handlePickFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFile(result.assets[0]);
    }
  };

  const handleNext = () => {
    Toast.show({
      type: "success",
      text1: "Verification complete!",
      position: "top",
      visibilityTime: 3000,
    });
    router.push("/(tabs)/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </Pressable>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Utility verification</Text>
        <Text style={styles.subtitle}>
          Please provide Electricity bills, water bills or any detailed invoice
          showing the usage of a service.
        </Text>
        <Pressable style={styles.uploadBox} onPress={handlePickFile}>
          {file ? (
            <Image source={{ uri: file.uri }} style={styles.uploadedImage} />
          ) : (
            <View style={styles.uploadContent}>
              <Feather name="upload" size={32} color="#0EA1D3" />
              <Text style={styles.uploadText}>Upload file</Text>
            </View>
          )}
        </Pressable>
        <Text style={styles.uploadHint}>
          Upload a clear recent receipt of an utility bill
        </Text>
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Complete Verification</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Utility;

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
    paddingTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#222",
    marginBottom: 24,
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#A3A3A3",
    borderStyle: "dashed",
    borderRadius: 12,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#F8FAFC",
  },
  uploadContent: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  uploadText: {
    color: "#A3A3A3",
    fontSize: 16,
    marginTop: 8,
  },
  uploadHint: {
    color: "#222",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 8,
    marginTop: 8,
  },
  uploadedImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    resizeMode: "cover",
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
