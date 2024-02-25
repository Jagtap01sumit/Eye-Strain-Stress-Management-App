import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import EditProfileScreen from "./EditProfileScreen";
import { RawButton } from "react-native-gesture-handler";
export default function ProfilePage() {
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const closeOptions = () => {
    setVisible(false);
  };

  return (
    <ImageBackground
      source={require("../../../assets/bg1.jpg")}
      style={{ flex: 1, resizeMode: "cover" }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
          margin: 10,
          padding: 10,
        }}
      >

        <TouchableOpacity onPress={() => setVisible(true)}>
          <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ display: "flex", alignItems: "center", marginTop: 30 }}>
        <View onPress={() => {}}>
          <View style={{ position: "relative" }}>
            <Image
              alt=""
              source={{
                uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
              }}
              style={{ width: 160, height: 160, borderRadius: 9999 }}
            />
          </View>
        </View>
      </View>
      <View style={{ marginTop: 50, margin: 10 }}>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 24 }}>User Name</Text>
          <View style={{ borderWidth: 0.5, marginVertical: 13 }}></View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 24 }}>Email address</Text>
          <View style={{ borderWidth: 0.5, marginVertical: 13 }}></View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 24 }}>Phone no.</Text>
          <View style={{ borderWidth: 0.5, marginVertical: 13 }}></View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 24 }}>Birthdate</Text>
          <View style={{ borderWidth: 0.5, marginVertical: 13 }}></View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 24 }}>Gender</Text>
          <View style={{ borderWidth: 0.5, marginVertical: 13 }}></View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 24 }}>Address</Text>
          <View style={{ borderWidth: 0.5, marginVertical: 13 }}></View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 24 }}>mala pn ny mahit ha section</Text>
          <View style={{ borderWidth: 0.5, marginVertical: 13 }}></View>
        </View>
      </View>
      {visible ? (
        <Modal
          isVisible={true}
          style={{ margin: 0, width: "100%" }}
          onTouchCancel={closeOptions}
          onBackdropPress={closeOptions}
          onBackButtonPress={closeOptions}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              height: 550,
              backgroundColor: "white",
              width: "100%",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,

              padding: 10,
            }}
          >
            <EditProfileScreen closeOptions={closeOptions} />
          </View>
        </Modal>
      ) : null}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});

