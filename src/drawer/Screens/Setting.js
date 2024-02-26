import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../theme";
import { useState, useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

export default function Setting() {
  const navigation = useNavigation();
  const { theme, setTheme } = useContext(ThemeContext);
  const [color, setColor] = useState(false);
  const [form, setForm] = useState({
    darkMode: false,
  });
  let activeColors = colors[theme.mode];
  console.log(activeColors);

  const settingMenu = [
    { icon: "user", title: "Profile", route: "ProfilePage" },
    {
      icon: "info",
      title: "Contact Info",
      route: "AppInfo",
    },
    { icon: "lock", title: "Password", route: "AppInfo" },

    { icon: "lock", title: "Privacy Policy", route: "AppInfo" },
    { icon: "logout", title: "Logout", route: "Login" },
  ];
  return (
    <View style={{ marginTop: 40 }}>
      {settingMenu.map((item, index) => (
        <TouchableOpacity
          index={index}
          onPress={() => {
            navigation.navigate(item.route);
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",

              paddingVertical: 24,
              marginTop: 10,

              borderRadius: 10,
              backgroundColor: activeColors.secondary,
              margin: 10,
              marginBottom: 12,
              borderRadius: 20,
            }}
          >
            <AntDesign
              name={item.icon}
              size={24}
              color={activeColors.tertiary}
              style={{ marginLeft: 20 }}
            />
            <Text
              style={{
                color: activeColors.tertiary,
                fontSize: 20,
                fontWeight: "bold",
                paddingLeft: 12,
              }}
            >
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
