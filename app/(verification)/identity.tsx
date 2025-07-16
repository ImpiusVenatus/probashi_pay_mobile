import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import DatePicker from "react-native-date-picker";

const ID_TYPES = [
  "National ID",
  "Passport",
  "Driver's License",
  "Voter Card",
  "Other",
];

const Identity = () => {
  const [dob, setDob] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState<Date>(new Date(2000, 0, 1));
  const [showIdDropdown, setShowIdDropdown] = useState(false);
  const [idType, setIdType] = useState("");
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

  const handleDateConfirm = (selectedDate: Date) => {
    setShowDatePicker(false);
    setDate(selectedDate);
    // Format date as DD/MM/YYYY
    const day = selectedDate.getDate().toString().padStart(2, "0");
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = selectedDate.getFullYear();
    setDob(`${day}/${month}/${year}`);
  };

  const handleNext = () => {
    // TODO: handle next step
    router.push("/(auth)/biometrics");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Identity verification</Text>
        <Text style={styles.subtitle}>
          Please provide the informations, let us verify your Identity
        </Text>
        <View style={styles.form}>
          <Text style={styles.label}>Date of birth</Text>
          <Pressable
            style={styles.inputWithIcon}
            onPress={() => setShowDatePicker(true)}
          >
            <Text
              style={[
                styles.input,
                { color: dob ? "#222" : "#A3A3A3" },
                { paddingVertical: 16 },
              ]}
            >
              {dob || "DD/MM/YYYY"}
            </Text>
            <Feather
              name="calendar"
              size={20}
              color="#222"
              style={styles.inputIcon}
            />
          </Pressable>
          <DatePicker
            modal
            open={showDatePicker}
            date={date}
            mode="date"
            maximumDate={new Date()}
            onConfirm={handleDateConfirm}
            onCancel={() => setShowDatePicker(false)}
          />
          <Text style={[styles.label, { marginTop: 24 }]}>
            Means of Identification
          </Text>
          <Pressable
            style={styles.dropdown}
            onPress={() => setShowIdDropdown((v) => !v)}
          >
            <Text
              style={[styles.dropdownText, !idType && { color: "#A3A3A3" }]}
            >
              {idType || "Select"}
            </Text>
            <Ionicons
              name={showIdDropdown ? "chevron-up" : "chevron-down"}
              size={20}
              color="#222"
            />
          </Pressable>
          {showIdDropdown && (
            <View style={styles.dropdownList}>
              {ID_TYPES.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setIdType(type);
                    setShowIdDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
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
            Upload a front-view picture of your ID
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Identity;

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
    paddingTop: 30,
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
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    marginBottom: 8,
    paddingRight: 16,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#F8FAFC",
    color: "#222",
  },
  inputIcon: {
    marginLeft: -32,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#F8FAFC",
    marginBottom: 8,
    justifyContent: "space-between",
  },
  dropdownText: {
    fontSize: 16,
    color: "#222",
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 8,
    marginTop: -8,
    zIndex: 10,
    position: "absolute",
    width: "100%",
    left: 0,
    top: 180,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  dropdownItem: {
    padding: 16,
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#222",
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#A3A3A3",
    borderStyle: "dashed",
    borderRadius: 12,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: "#F8FAFC",
  },
  uploadContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    color: "#0EA1D3",
    fontSize: 16,
    marginTop: 8,
  },
  uploadHint: {
    color: "#888",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 8,
  },
  uploadedImage: {
    width: 80,
    height: 80,
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
  buttonDisabled: {
    backgroundColor: "#A3A3A3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
