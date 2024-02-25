import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  ImageBackground,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  TouchableOpacity,
  GestureHandlerRootView,
  FlatList,
} from "react-native-gesture-handler";

import { AntDesign } from "@expo/vector-icons";

import Home from "./Screens/Home";
import BlinkRate from "./Screens/BinkRate";
import DigitalWellbeing from "./Screens/DigitalWellbeing";
import Distance from "./Screens/Distance";
import Setting from "./Screens/Setting";

export default function CustomDrawer() {
  const menu = [
    { icon: "home", title: "Home" },
    { icon: "home", title: "Blink Rate" },
    { icon: "home", title: "Distance" },
    { icon: "home", title: "DigitalWellbeing" },
    { icon: "logout", title: "Setting" },
  ];
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);
  const moveToRight = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;
  // const userEmail = route.params?.userEmail;

  const toggleMenu = () => {
    setShowMenu(!showMenu);

    Animated.parallel([
      Animated.timing(scale, {
        toValue: showMenu ? 1 : 0.7,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(moveToRight, {
        toValue: showMenu ? 1 : 250,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* menu design  */}
      <View style={{ flex: 1, backgroundColor: "#666f80" }}>
        <View
          style={{ width: "100", flexDirection: "row", alignItems: "center" }}
        >
          <Image
            source={require("../../assets/logo.png")}
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              marginLeft: 10,
              marginTop: 30,
              tintColor: "white",
            }}
          />
          <View>
            <View style={{ marginLeft: 10, marginTop: 20 }}>
              <Text style={{ fontSize: 22, fontWeight: "800", color: "#fff" }}>
                Eye Strain
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 0.8,
                  marginTop: 3,
                  color: "#fff",
                }}
              >
                By BVCOE-IT
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <FlatList
            data={menu}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  width: 200,
                  height: 50,
                  marginLeft: 20,
                  marginTop: 20,
                  backgroundColor:
                    selectedMenuItem === index ? "#fff" : "#c3c8d4",
                  borderRadius: 10,
                  alignItems: "center",
                  flexDirection: "row",
                }}
                onPress={() => setSelectedMenuItem(index)}
              >
                <AntDesign
                  name={item.icon}
                  size={24}
                  color={selectedMenuItem === index ? "#000" : "#000"}
                  style={{ marginLeft: 20 }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    marginLeft: 20,
                    color: selectedMenuItem == index ? "#000" : "#000",
                  }}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      {/* home design  */}
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "white",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,

          bottom: 0,
          transform: [{ scale: scale }, { translateX: moveToRight }],
          borderRadius: showMenu ? 15 : 0,
        }}
      >
        <View style={{ flexDirection: "row", marginTop: 50 }}>
          <TouchableOpacity style={{ marginLeft: 20 }} onPress={toggleMenu}>
            {showMenu ? (
              <Image
                source={require("../../assets/logo.png")}
                style={{ width: 70, height: 30 }}
              />
            ) : (
              <AntDesign name="menu-unfold" size={24} color="black" />
            )}
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 20,
              fontWeight: "800",
            }}
          >
            {menu[selectedMenuItem].title}
          </Text>
        </View>
        <ImageBackground
          source={require("../../assets/bg1.jpg")}
          style={{ flex: 1, resizeMode: "cover" }}
        >
          <View style={{ backgroundColor: "transparent" }}>
            {selectedMenuItem === 0 && <Home />}
            {selectedMenuItem === 1 && <BlinkRate />}
            {selectedMenuItem === 2 && <Distance />}
            {selectedMenuItem === 3 && <DigitalWellbeing />}
            {selectedMenuItem === 4 && <Setting />}
          </View>
        </ImageBackground>
        {/* <BottomNavigation /> */}
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
