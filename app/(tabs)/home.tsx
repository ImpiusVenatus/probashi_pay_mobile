import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
// Removed flag imports

const Home = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.logo}
        />
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="notifications-outline" size={24} color="#0099CC" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="person-outline" size={24} color="#0099CC" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.welcome}>Welcome Akkas Ali</Text>

      {/* Send/Receive Inputs */}
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>You Send</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value="920.34"
            keyboardType="numeric"
            editable={false}
          />
          <View style={styles.flagCurrencyWrap}>
            {/* Removed flag */}
            <Text style={styles.currency}>USD</Text>
            <Ionicons name="chevron-down" size={18} color="#222" />
          </View>
        </View>
        <Text style={[styles.inputLabel, { marginTop: 18 }]}>They receive</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value="110,000"
            keyboardType="numeric"
            editable={false}
          />
          <View style={styles.flagCurrencyWrap}>
            {/* Removed flag */}
            <Text style={styles.currency}>BDT</Text>
            <Ionicons name="chevron-down" size={18} color="#222" />
          </View>
        </View>
      </View>

      {/* Exchange Rate */}
      <Text style={styles.exchangeRate}>
        Exchange rate :{" "}
        <Text style={styles.exchangeHighlight}>1 USD = 120 BDT</Text>
      </Text>

      {/* Proceed Button */}
      <TouchableOpacity
        style={styles.proceedBtn}
        onPress={() => router.push("/(send-money)/send-money")}
      >
        <Text style={styles.proceedBtnText}>Proceed to Send</Text>
      </TouchableOpacity>

      {/* Promo Code */}
      <TouchableOpacity style={styles.promoCodeBtn}>
        <MaterialIcons name="confirmation-number" size={20} color="#666" />
        <Text style={styles.promoCodeText}>Add Promo code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 36,
    paddingHorizontal: 18,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E9F6FC",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  logo: {
    width: 38,
    height: 38,
    resizeMode: "contain",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIconBtn: {
    marginLeft: 16,
  },
  welcome: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 18,
    marginTop: 8,
    color: "#222",
  },
  inputSection: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
    marginLeft: 2,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#B5C9D3",
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 6,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#222",
    paddingVertical: 8,
    paddingHorizontal: 0,
    backgroundColor: "#fff",
  },
  flagCurrencyWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    gap: 4,
  },
  currency: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 4,
    color: "#222",
  },
  exchangeRate: {
    fontSize: 14,
    color: "#444",
    marginTop: 8,
    marginBottom: 18,
    marginLeft: 2,
  },
  exchangeHighlight: {
    color: "#0099CC",
    fontWeight: "600",
  },
  proceedBtn: {
    backgroundColor: "#E9F6FC",
    borderRadius: 32,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#0099CC",
  },
  proceedBtnText: {
    color: "#0099CC",
    fontSize: 18,
    fontWeight: "600",
  },
  promoCodeBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 18,
    gap: 6,
  },
  promoCodeText: {
    color: "#444",
    fontSize: 15,
    marginLeft: 4,
  },
});
