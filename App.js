import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import CustomDrawer from "./src/drawer/CustomDrawer";
import Login from "./src/normal/Login";
import Register from "./src/normal/Register";
import WelcomeScreen from "./src/normal/WelcomScreen";
import ProfilePage from "./src/normal/settingScreens/ProfilePage";
import AppInfo from "./src/normal/settingScreens/AppInfo";
import EditProfileScreen from "./src/normal/settingScreens/EditProfileScreen";
import Blinkcount from "./src/drawer/Screens/Blinkcount";

export default function App() {
  const Stack = createStackNavigator();
  console.log(ProfilePage)
  return (
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
          name="CustomDrawer"
          component={CustomDrawer}
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
          name="ProfilePage"
          component={ProfilePage}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="BlinkCount"
          component={Blinkcount}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
