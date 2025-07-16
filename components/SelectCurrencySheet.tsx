import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  TextInput,
  FlatList,
} from "react-native";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useCurrencySheetStore } from "@/stores/useCurrencySheetStore";
import { Ionicons } from "@expo/vector-icons";
import { Currency, currencies } from "@/constants/currencies";
import { Colors } from "@/constants/Colors";

const SelectCurrencySheet = () => {
  const colorScheme = useColorScheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, selectedCurrency, closeSheet, setSelectedCurrency } =
    useCurrencySheetStore();

  const snapPoints = useMemo(() => ["50%"], []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        closeSheet();
        setSearchQuery("");
      }
    },
    [closeSheet]
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    []
  );

  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency);
    bottomSheetRef.current?.close();
  };

  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.symbol.includes(searchQuery)
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isOpen ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}
      backgroundStyle={{
        backgroundColor:
          colorScheme === "dark"
            ? Colors.dark.background
            : Colors.light.background,
      }}
      handleIndicatorStyle={{
        backgroundColor:
          colorScheme === "dark"
            ? Colors.dark.background
            : Colors.light.background,
      }}
    >
      <BottomSheetScrollView style={{ flex: 1 }} scrollEnabled={false}>
        <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: colorScheme === "dark" ? "#27272a" : "#e5e7eb",
              borderRadius: 999,
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
          >
            <Ionicons
              name="search"
              size={20}
              color={colorScheme === "dark" ? "white" : "black"}
              style={{ marginRight: 8 }}
            />
            <TextInput
              placeholder="Search currencies"
              placeholderTextColor={
                colorScheme === "dark" ? "#9ca3af" : "#6b7280"
              }
              style={{
                flex: 1,
                color: colorScheme === "dark" ? "#fff" : "#000",
                height: 24,
              }}
              value={searchQuery}
              cursorColor={colorScheme === "dark" ? "#fff" : "#000"}
              selectionColor={colorScheme === "dark" ? "#3f3f46" : "#1BFF6F"}
              onChangeText={setSearchQuery}
              autoFocus={isOpen}
              numberOfLines={1}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons
                  name="close"
                  size={20}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        <FlatList
          data={filteredCurrencies}
          keyExtractor={(item) => item.code}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          scrollEnabled={false}
          renderItem={({ item: currency }) => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 16,
                borderBottomWidth: 1,
                borderBottomColor:
                  colorScheme === "dark" ? "#27272a" : "#e5e7eb",
              }}
              onPress={() => handleCurrencySelect(currency)}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: colorScheme === "dark" ? "#fff" : "#000",
                    fontWeight: "500",
                  }}
                >
                  {currency.name}
                </Text>
                <Text
                  style={{
                    color: colorScheme === "dark" ? "#a1a1aa" : "#6b7280",
                    marginLeft: 8,
                  }}
                >
                  ({currency.code})
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    color: colorScheme === "dark" ? "#a1a1aa" : "#6b7280",
                    marginRight: 8,
                  }}
                >
                  {currency.symbol}
                </Text>
                {selectedCurrency.code === currency.code && (
                  <Ionicons
                    name="checkmark"
                    size={18}
                    color={Colors.light.tint}
                  />
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default SelectCurrencySheet;
