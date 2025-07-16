import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const AddCard = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={26} color="#222" />
      </TouchableOpacity>
      <View style={{ height: 32 }} />
      <Text style={styles.title}>Add new card</Text>
      {/* Holder Name */}
      <Text style={styles.label}>Holder name</Text>
      <TextInput
        style={styles.input}
        placeholder="John Doe"
        placeholderTextColor="#7B8794"
      />
      {/* Card Number */}
      <Text style={styles.label}>Card number</Text>
      <TextInput
        style={styles.input}
        placeholder="0000 0000 0000 0000"
        placeholderTextColor="#7B8794"
        keyboardType="number-pad"
        maxLength={19}
      />
      {/* Expiry and CVV */}
      <View style={styles.row}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Text style={styles.label}>Expiry date</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/YY"
            placeholderTextColor="#7B8794"
            maxLength={5}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={styles.input}
            placeholder="000"
            placeholderTextColor="#7B8794"
            keyboardType="number-pad"
            maxLength={4}
          />
        </View>
      </View>
      <View style={{ flex: 1 }} />
      {/* Add Card Button at the bottom */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            router.push("/(others)/confirm-pin");
          }}
        >
          <Text style={styles.addButtonText}>Add card</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  backButton: {
    position: "absolute",
    top: 48,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 32,
    alignSelf: "flex-start",
  },
  label: {
    fontSize: 15,
    color: "#222",
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#A0AEC0",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: "#222",
    backgroundColor: "#F8FAFC",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
  },
  bottomButtonContainer: {
    paddingBottom: 24,
    paddingTop: 8,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#0EA1D3",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 0,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
