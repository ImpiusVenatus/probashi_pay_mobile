import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSendMoneyStore } from "@/stores/useSendMoneyStore";
import { useCurrencySheetStore } from "@/stores/useCurrencySheetStore";
import { currencies, Currency } from "@/constants/currencies";
// Removed flag imports

const Home = () => {
  const router = useRouter();
  // Mock exchange rates relative to USD
  const exchangeRates: Record<string, number> = {
    USD: 1,
    BDT: 120,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83,
    // ...add more as needed
  };

  const [sendAmount, setSendAmount] = useState("920.34");
  const [receiveAmount, setReceiveAmount] = useState("");
  const setAmount = useSendMoneyStore((s) => s.setAmount);
  const { openSheet: openCurrencySheet, selectedCurrency } =
    useCurrencySheetStore();
  // Add a second currency selection for receive
  const [receiveCurrency, setReceiveCurrency] = useState<Currency>(
    currencies.find((c) => c.code === "BDT")!
  );
  const [isReceiveCurrencySheetOpen, setIsReceiveCurrencySheetOpen] =
    useState(false);

  // Helper for conversion: send -> USD -> receive
  const convert = (amount: number, from: string, to: string) => {
    if (!exchangeRates[from] || !exchangeRates[to]) return 0;
    const usdAmount = amount / exchangeRates[from];
    return usdAmount * exchangeRates[to];
  };

  // Update receive amount when send changes
  const handleSendChange = (text: string) => {
    const sanitized = text.replace(/[^0-9.]/g, "");
    setSendAmount(sanitized);
    const num = parseFloat(sanitized);
    if (!isNaN(num)) {
      const converted = convert(
        num,
        selectedCurrency.code,
        receiveCurrency.code
      );
      setReceiveAmount(converted ? converted.toLocaleString() : "");
    } else {
      setReceiveAmount("");
    }
  };

  // Update send amount when receive changes
  const handleReceiveChange = (text: string) => {
    const sanitized = text.replace(/[^0-9.]/g, "");
    setReceiveAmount(sanitized);
    const num = parseFloat(sanitized);
    if (!isNaN(num)) {
      // Reverse conversion
      const usdAmount = num / exchangeRates[receiveCurrency.code];
      const send = usdAmount * exchangeRates[selectedCurrency.code];
      setSendAmount(send ? send.toString() : "");
    } else {
      setSendAmount("");
    }
  };

  // Handler for selecting receive currency
  const handleSelectReceiveCurrency = (currency: Currency) => {
    setReceiveCurrency(currency);
    setIsReceiveCurrencySheetOpen(false);
    // Recalculate receive amount
    const num = parseFloat(sendAmount);
    if (!isNaN(num)) {
      const converted = convert(num, selectedCurrency.code, currency.code);
      setReceiveAmount(converted ? converted.toLocaleString() : "");
    }
  };

  // Handler for selecting send currency (from sheet)
  React.useEffect(() => {
    // Recalculate receive amount when send currency changes
    const num = parseFloat(sendAmount);
    if (!isNaN(num)) {
      const converted = convert(
        num,
        selectedCurrency.code,
        receiveCurrency.code
      );
      setReceiveAmount(converted ? converted.toLocaleString() : "");
    }
  }, [selectedCurrency, receiveCurrency]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Removed Header - now in layout */}
      <Text style={styles.welcome}>Welcome Akhyar</Text>
      <View style={styles.container}>
        {/* Send/Receive Inputs */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>You Send</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={sendAmount}
              keyboardType="numeric"
              onChangeText={handleSendChange}
            />
            <TouchableOpacity
              style={styles.flagCurrencyWrap}
              onPress={openCurrencySheet}
            >
              <Text style={styles.currency}>{selectedCurrency.code}</Text>
              <Ionicons name="chevron-down" size={18} color="#222" />
            </TouchableOpacity>
          </View>
          <Text style={[styles.inputLabel, { marginTop: 18 }]}>
            They receive
          </Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={receiveAmount}
              keyboardType="numeric"
              onChangeText={handleReceiveChange}
            />
            <TouchableOpacity
              style={styles.flagCurrencyWrap}
              onPress={() => setIsReceiveCurrencySheetOpen(true)}
            >
              <Text style={styles.currency}>{receiveCurrency.code}</Text>
              <Ionicons name="chevron-down" size={18} color="#222" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Exchange Rate */}
        <Text style={styles.exchangeRate}>
          Exchange rate :{" "}
          <Text style={styles.exchangeHighlight}>
            1 {selectedCurrency.code} ={" "}
            {convert(
              1,
              selectedCurrency.code,
              receiveCurrency.code
            ).toLocaleString()}{" "}
            {receiveCurrency.code}
          </Text>
        </Text>
        {/* Proceed Button */}
        <TouchableOpacity
          style={styles.proceedBtn}
          onPress={() => {
            setAmount(sendAmount);
            router.push("/(send-money)/send-money");
          }}
        >
          <Text style={styles.proceedBtnText}>Proceed to Send</Text>
        </TouchableOpacity>
        {/* Promo Code */}
        <TouchableOpacity style={styles.promoCodeBtn}>
          <MaterialIcons name="confirmation-number" size={20} color="#666" />
          <Text style={styles.promoCodeText}>Add Promo code</Text>
        </TouchableOpacity>
        {/* Receive Currency Sheet */}
        {isReceiveCurrencySheetOpen && (
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.2)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                width: "80%",
                maxHeight: 400,
                padding: 16,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 16, marginBottom: 12 }}
              >
                Select Receive Currency
              </Text>
              {currencies.map((currency) => (
                <TouchableOpacity
                  key={currency.code}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "#eee",
                  }}
                  onPress={() => handleSelectReceiveCurrency(currency)}
                >
                  <Text style={{ flex: 1 }}>
                    {currency.name} ({currency.code})
                  </Text>
                  <Text style={{ marginLeft: 8 }}>{currency.symbol}</Text>
                  {receiveCurrency.code === currency.code && (
                    <Ionicons
                      name="checkmark"
                      size={18}
                      color="#0099CC"
                      style={{ marginLeft: 8 }}
                    />
                  )}
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() => setIsReceiveCurrencySheetOpen(false)}
                style={{ marginTop: 16, alignSelf: "flex-end" }}
              >
                <Text style={{ color: "#0099CC", fontWeight: "bold" }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0, // Remove extra top padding
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
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#E9F6FC",
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
