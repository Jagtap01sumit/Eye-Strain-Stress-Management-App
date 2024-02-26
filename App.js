import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { ThemeContext } from "./context/ThemeContext";

import CustomDrawer from "./src/drawer/CustomDrawer";
import Login from "./src/normal/Login";
import Register from "./src/normal/Register";
import WelcomeScreen from "./src/normal/WelcomScreen";
import ProfilePage from "./src/normal/settingScreens/ProfilePage";
import AppInfo from "./src/normal/settingScreens/AppInfo";
import Setting from "./src/drawer/Screens/Setting";
import BlinkRate from "./src/drawer/Screens/BinkRate";
import { ThemeContext } from "./context/ThemeContext";
export default function App() {
  const Stack = createStackNavigator();
  const [theme, setTheme] = useState({ mode: "dark" });
  const [isBlinkReminderOn, setBlinkReminder] = useState(false);
  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, isBlinkReminderOn, setBlinkReminder }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AppInfo"
            component={AppInfo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Setting"
            component={Setting}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfilePage"
            component={ProfilePage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CustomDrawer"
            component={CustomDrawer}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BlinkRate"
            component={BlinkRate}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({});
