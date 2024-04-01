import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../../../context/ThemeContext";
import { colors } from "../../../theme";

const PrivacyPolicy = () => {
  const { theme } = useContext(ThemeContext);
  const [activeButton, setActiveButton] = useState("HumanFriendly");
  const navigation = useNavigation();
  let activeColors = colors[theme.mode];
  return (
    <SafeAreaView style={{ flex: 1, margin: 15 }}>
      <Pressable onPress={() => navigation.goBack()}>
        <AntDesign name="back" size={24} color="black" />
      </Pressable>
      <View style={{ display: "flex" }}>
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>Privacy Policy</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor:
              activeButton === "HumanFriendly" ? "grey" : "white",
            width: 185,
            borderRadius: 20,
          }}
          onPress={() => setActiveButton("HumanFriendly")}
        >
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                color: activeButton === "HumanFriendly" ? "white" : "grey",
              }}
            >
              Human Friendly
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: activeButton === "Legal" ? "grey" : "white",
            width: 185,
            borderRadius: 20,
          }}
          onPress={() => setActiveButton("Legal")}
        >
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                color: activeButton === "Legal" ? "white" : "grey",
              }}
            >
              Legal
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
