import { StyleSheet, View, Image, SafeAreaView, Pressable } from "react-native";
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
        <Image
          source={require("@/assets/images/onboarding/face-scan.png")}
          style={styles.icon}
          resizeMode="contain"
        />
      </View>
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
  icon: {
    width: 100,
    height: 100,
  },
});
