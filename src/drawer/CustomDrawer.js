import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  ImageBackground,
  Switch,
  color,
} from "react-native";
import React, { useContext, useRef, useState } from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
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
import BlinkCount from "./Screens/BlinkCount";
import { ThemeContext } from "../../context/ThemeContext";

export default function CustomDrawer() {
  const menu = [
    { icon: "home", title: "Home" },
    { icon: "home", title: "Blink Rate" },
    { icon: "home", title: "Blink Count" },
    { icon: "home", title: "Distance" },
    { icon: "home", title: "DigitalWellbeing" },
    { icon: "logout", title: "Setting" },
  ];
  const [showMenu, setShowMenu] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);
  const moveToRight = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;

  
  
  const {theme,setTheme}=useContext(ThemeContext)
  console.log(theme.mode)
  const backgroundColor=theme.mode === "dark" ? "#111827" :"#666f80"
  const textColor=theme.mode==="dark" ? "white" : "white"
  const theme_icon=theme.mode=="dark"?'moon':'sun'

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

  const toggleTheme = () => {
    const newMode = theme.mode === "light" ? "dark" : "light";
    setTheme({ mode: newMode });
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* menu design  */}
      <View style={{ flex: 1, backgroundColor: `${backgroundColor}` }}>
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
              <Text style={{ fontSize: 22, fontWeight: "800", color: `${textColor}` }}>
                Eye Strain
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 0.8,
                  marginTop: 3,
                  color: `${textColor}`
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              height: 50,
              backgroundColor: "#f2f2f2",
              borderRadius: 8,
              width: 200,
              margin: 19,

              paddingLeft: 12,
              paddingRight: 12,
            }}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 9999,
                marginRight: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                color: "black",
              }}
            >
              <FeatherIcon  color="#000" name={theme_icon} size={20} />
            </View>
            <Text
              style={{
                rowLabel: {
                  fontSize: 17,
                  fontWeight: "400",
                  color: "white",
                },
              }}
            >
              Dark Mode
            </Text>

            <View style={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }} />
            <Switch onValueChange={toggleTheme} value={theme.mode === "dark"} />
          </View>
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
            {selectedMenuItem === 2 && <BlinkCount />}
            {selectedMenuItem === 3 && <Distance />}
            {selectedMenuItem === 4 && <DigitalWellbeing />}
            {selectedMenuItem === 5 && <Setting />}
          </View>
        </ImageBackground>
        {/* <BottomNavigation /> */}
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
