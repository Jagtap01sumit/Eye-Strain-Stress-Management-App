import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const RotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startImageRotationFunction();
  }, []);

  const startImageRotationFunction = () => {
    RotateValue.setValue(0);
    Animated.timing(RotateValue, {
      toValue: 3,
      duration: 5000,
      useNativeDriver: false,
      repeat: -1,
    }).start();
  };

  const rotateImage = () => {
    startImageRotationFunction();
  };

  const RotateData = RotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  
  setTimeout(() => {
    navigation.navigate("Login");
  }, 2000);
  

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#c3c8d3",
        height: "100%",
      }}
    >
      <Animated.Image
        style={{
          width: 310,
          height: 310,
          transform: [{ rotate: RotateData }],
          marginTop: 110,
        }}
        source={{
          uri: "https://th.bing.com/th/id/R.4232f2034d0d8a05c624c48d8fc7647e?rik=hZ%2f3q6PymRb5kQ&riu=http%3a%2f%2fpngimg.com%2fuploads%2feye%2fsmall%2feye_PNG35675.png&ehk=VhDXWnZdHc9lYOzzjy9iWIt31wEqZSqkLz0UjPNjRhQ%3d&risl=&pid=ImgRaw&r=0",
        }}
      />
      <View
        style={{
          display: "flex",
          marginTop: 120,
        }}
      >
        <Text style={{ fontSize: 16 }}>
          Never take your eye health for granted!
        </Text>
        <View style={{ display: "flex", alignItems: "center" }}>
          <TouchableOpacity
            // onPress={onPressLearnMore}
            style={{
              // backgroundColor: "#841584",
              display: "flex",
              alignItems: "center",
              margin: 10,
              padding: 20,
              width: 180,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "800", color: "black",fontStyle: "italic" }}>
              Welcome
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default WelcomeScreen;
