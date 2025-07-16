import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const Recipients = () => {
  const [activeTab, setActiveTab] = useState<"ProbashiPay" | "Bank">(
    "ProbashiPay"
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipients</Text>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab("ProbashiPay")}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "ProbashiPay" && styles.activeTabText,
            ]}
          >
            ProbashiPay
          </Text>
          {activeTab === "ProbashiPay" && <View style={styles.underline} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab("Bank")}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Bank" && styles.activeTabTextInactive,
            ]}
          >
            Bank
          </Text>
          {activeTab === "Bank" && <View style={styles.underline} />}
        </TouchableOpacity>
      </View>
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateText}>
          You have not save any accounts to your beneficiary list yet
        </Text>
      </View>
    </View>
  );
};

export default Recipients;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 24,
    color: "#111",
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
    marginBottom: 32,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 8,
    position: "relative",
  },
  tabText: {
    fontSize: 16,
    color: "#888",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#111",
    fontWeight: "600",
  },
  activeTabTextInactive: {
    color: "#B0B0B0",
    fontWeight: "500",
  },
  underline: {
    position: "absolute",
    left: "25%",
    right: "25%",
    bottom: -1,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#3EC6E0",
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    color: "#7B8A9D",
    fontSize: 15,
    textAlign: "center",
    marginTop: -64,
  },
});
