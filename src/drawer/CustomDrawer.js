import React, { useContext, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  ImageBackground,
  Switch,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Home from "./Screens/Home";
import BlinkRate from "./Screens/BinkRate";
import DigitalWellbeing from "./Screens/DigitalWellbeing";
import Distance from "./Screens/Distance";
import Setting from "./Screens/Setting";
import BlinkCount from "./Screens/BlinkCount";
import { ThemeContext } from "../../context/ThemeContext";
import { colors } from "../../theme";

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

  const navigation = useNavigation();
  const { theme, setTheme } = useContext(ThemeContext);

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

  const activeColors = colors[theme.mode];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: activeColors.primary }}>
        <View
          style={{ width: "100%", flexDirection: "row", alignItems: "center" }}
        >
          <Image
            source={require("../../assets/logo.png")}
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              marginLeft: 10,
              marginTop: 30,
              // tintColor: "white",
            }}
          />
          <View>
            <View style={{ marginLeft: 10, marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "800",
                  color: activeColors.tertiary,
                }}
              >
                Eye Strain
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 0.8,
                  marginTop: 3,
                  color: activeColors.tertiary,
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
                    selectedMenuItem === index
                      ? activeColors.secondary
                      : activeColors.tertiary,
                  borderRadius: 10,
                  alignItems: "center",
                  flexDirection: "row",
                }}
                onPress={() => setSelectedMenuItem(index)}
              >
                <AntDesign
                  name={item.icon}
                  size={24}
                  color={
                    selectedMenuItem === index
                      ? activeColors.primary
                      : activeColors.secondary
                  }
                  style={{ marginLeft: 20 }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    marginLeft: 20,
                    color:
                      selectedMenuItem === index
                        ? activeColors.primary
                        : activeColors.econdary,
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
              backgroundColor: activeColors.secondary,
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
              }}
            >
              <FeatherIcon
                color={activeColors.tertiary}
                name={theme.mode === "dark" ? "moon" : "sun"}
                size={20}
              />
            </View>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "400",
                color: activeColors.tertiary,
              }}
            >
              Dark Mode
            </Text>
            <View style={{ flexGrow: 1, flexShrink: 1, flexBasis: 0 }} />
            <Switch onValueChange={toggleTheme} value={theme.mode === "dark"} />
          </View>
        </View>
      </View>
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
          <Text style={{ marginLeft: 20, fontSize: 20, fontWeight: "800" }}>
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
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
