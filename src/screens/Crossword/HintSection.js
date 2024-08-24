import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HintSection = ({ hints }) => {
  return (
    <View style={styles.hintContainer}>
      <Text style={styles.hintTitle}>Crossword Hints:</Text>
      {hints.map((hint, index) => (
        <Text key={index} style={styles.hintText}>
          {hint}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  hintContainer: {
    marginBottom: 20,
  },
  hintTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  hintText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
});

export default HintSection;
