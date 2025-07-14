import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const Card = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Card</Text>
        <Text style={styles.headerSubtext}>Add a new card to your account</Text>
        <View style={styles.headerInputContainer}>
          <TextInput style={styles.headerInput} placeholder="Card number" />
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
  },
  headerInputContainer: {
    marginTop: 20,
  },
  headerInput: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
  },
});
