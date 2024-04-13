import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Define styles before using them
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderRadius: 5,
  },
  blinkCount: {
    fontSize: 16,
    marginBottom: 5,
  },
});

const CountView = ({ blinkCount }) => {
  return (
    <View style={styles.overlay}>
      <Text style={styles.blinkCount}>Blink Count: {blinkCount}</Text>
    </View>
  );
};

export default CountView;
