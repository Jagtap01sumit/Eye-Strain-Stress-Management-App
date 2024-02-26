import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Setting() {
  const navigation = useNavigation();
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
              backgroundColor: "#c3c8d3",
              borderRadius: 10,

              margin: 10,
              marginBottom: 12,
              borderRadius: 20,
            }}
          >
            <AntDesign
              name={item.icon}
              size={24}
              color={"#000"}
              style={{ marginLeft: 20 }}
            />
            <Text
              style={{
                color: "white",
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
