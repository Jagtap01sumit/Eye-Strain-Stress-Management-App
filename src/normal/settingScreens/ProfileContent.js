import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../../../context/ThemeContext";
import { colors } from "../../../theme";
export default function ProfileContent() {
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("");
  const { theme } = useContext(ThemeContext);
  const activeColors = colors[theme.mode];

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("User Email:", userEmail);
        const userEmail = await AsyncStorage.getItem("userEmail");
        setEmail(userEmail);
        const response = await fetch(
          `http://192.168.29.34:8000/getData?email=${userEmail}`
        );

        console.log("Response Status:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("User Data:", data);
          setUserData(data);
        } else {
          const errorMessage = await response.text();
          console.error("Error fetching user data:", errorMessage);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const myFunction = async () => {
    try {
      const Email = await AsyncStorage.getItem("userEmail");
      console.log(Email); // Log or use Email within this function
      return Email; // If you want to return it
    } catch (error) {
      console.error("Error fetching user email:", error);
      return null; // Return a default value or handle the error accordingly
    }
  };

  // Usage

  return (
    <View>
      <View style={{ display: "flex", alignItems: "center" }}>
        <View onPress={() => {}}>
          <View style={{ position: "relative" }}>
            <Image
              alt=""
              source={{
                uri:
                  userData?.profileImage ||
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80", // Replace with the actual field name from your API
              }}
              style={{ width: 160, height: 160, borderRadius: 9999 }}
            />
          </View>
        </View>
      </View>
      <View style={{ marginTop: 50, margin: 10 }}>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 24, color: activeColors.tint }}>
            User Name
          </Text>
          <Text style={{ color: activeColors.tint }}>{userData?.username}</Text>
          <View style={{ borderWidth: 0.5, marginVertical: 13 }}></View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 24, color: activeColors.tint }}>
            Email address
          </Text>
          <Text style={{ color: activeColors.tint }}>{email}</Text>
          <View style={{ borderWidth: 0.5, marginVertical: 13 }}></View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 24, color: activeColors.tint }}>
            Phone no.
          </Text>
          <Text style={{ color: activeColors.tint }}>{userData?.phone}</Text>
          <View style={{ borderWidth: 0.5, marginVertical: 13 }}></View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 24, color: activeColors.tint }}>Age</Text>
          <Text style={{ color: activeColors.tint }}>{userData?.age}</Text>
          <View style={{ borderWidth: 0.5, marginVertical: 13 }}></View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 24, color: activeColors.tint }}>
            Birthdate
          </Text>
          <Text style={{ color: activeColors.tint }}>
            {userData?.birthdate}
          </Text>
          <View style={{ borderWidth: 0.5, marginVertical: 13 }}></View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 24, color: activeColors.tint }}>Gender</Text>
          <Text style={{ color: activeColors.tint }}>{userData?.gender}</Text>
          <View style={{ borderWidth: 0.5, marginVertical: 13 }}></View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 24, color: activeColors.tint }}>
            Address
          </Text>
          <Text style={{ color: activeColors.tint }}>{userData?.address}</Text>
          <View style={{ borderWidth: 0.5, marginVertical: 13 }}></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
