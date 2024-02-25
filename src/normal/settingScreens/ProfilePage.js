import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";

import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import { RadioButton } from "react-native-paper";

import { useForm, Controller, FormProvider } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import ProfileContent from "./ProfileContent";

export default function ProfilePage() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const closeOptions = () => {
    setVisible(false);
  };

  const methods = useForm();
  const { control, handleSubmit, formState, setError } = methods;
  const [refreshKey, setRefreshKey] = useState(0);
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://192.168.0.103:8000/addData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        methods.reset();
        console.log("Profile created successfully");
        setRefreshKey((prevKey) => prevKey + 1);
        setVisible(false);
        navigation.navigate("CustomDrawer");
      } else {
        setError("message", {
          type: "manual",
          message: responseData.error,
        });
      }
    } catch (err) {
      console.error(err);
    }
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
        <Text></Text>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <AntDesign name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ProfileContent />
      {visible ? (
        <Modal
          isVisible={true}
          style={{ margin: 0, width: "100%" }}
          onTouchCancel={closeOptions}
          onBackdropPress={closeOptions}
          onBackButtonPress={closeOptions}
        >
          <ScrollView
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
            <FormProvider {...methods}>
              <View style={{ marginTop: 8 }}>
                <View style={{ flexDirection: "column", marginTop: 10 }}>
                  <View style={{ marginVertical: 4 }}>
                    <Text>User name</Text>
                  </View>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={{
                          width: 390,
                          height: 40,
                          borderWidth: 0.4,
                          padding: 10,
                          borderColor: "black",

                          alignContent: "center",
                          borderRadius: 6,
                        }}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        placeholder="john01John"
                      />
                    )}
                    name="username"
                  />
                </View>
                {formState.errors.username && (
                  <Text style={{ color: "red", marginLeft: 37 }}>
                    {formState.errors.username.message}
                  </Text>
                )}
                <View style={{ flexDirection: "column", marginTop: 5 }}>
                  <View style={{ marginVertical: 4 }}>
                    <Text>Birthdate</Text>
                  </View>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={{
                          width: 390,
                          height: 40,
                          borderWidth: 0.4,
                          padding: 10,
                          borderColor: "black",
                          display: "flex",
                          alignContent: "center",
                          borderRadius: 6,
                        }}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        placeholder="Email"
                      />
                    )}
                    name="email"
                    rules={{
                      // required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address",
                      },
                    }}
                  />
                </View>
                {formState.errors.email && (
                  <Text style={{ color: "red", marginLeft: 37 }}>
                    {formState.errors.email.message}
                  </Text>
                )}
                <View style={{ flexDirection: "column", marginTop: 5 }}>
                  <View style={{ marginVertical: 4 }}>
                    <Text>Phone number</Text>
                  </View>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={{
                          width: 390,
                          height: 40,
                          borderWidth: 0.4,
                          padding: 10,
                          borderColor: "black",

                          alignContent: "center",
                          borderRadius: 6,
                        }}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        keyboardType="numeric"
                        placeholder="9137******"
                      />
                    )}
                    name="phone"
                  />
                </View>
                <View style={{ flexDirection: "column", marginTop: 5 }}>
                  <View style={{ marginVertical: 4 }}>
                    <Text>Age</Text>
                  </View>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={{
                          width: 390,
                          height: 40,
                          borderWidth: 0.4,
                          padding: 10,
                          borderColor: "black",

                          alignContent: "center",
                          borderRadius: 6,
                        }}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        keyboardType="numeric"
                        placeholder="21*"
                      />
                    )}
                    name="age"
                  />
                </View>

                <View style={{ flexDirection: "column", marginTop: 5 }}>
                  <View style={{ marginVertical: 4 }}>
                    <Text>Gender</Text>
                  </View>
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <View style={{ flexDirection: "row" }}>
                        <RadioButton.Item
                          label="Male"
                          value="male"
                          status={value === "male" ? "checked" : "unchecked"}
                          onPress={() => onChange("male")}
                        />
                        <RadioButton.Item
                          label="Female"
                          value="female"
                          status={value === "female" ? "checked" : "unchecked"}
                          onPress={() => onChange("female")}
                        />

                        <RadioButton.Item
                          label="Other"
                          value="Other"
                          status={value === "Other" ? "checked" : "unchecked"}
                          onPress={() => onChange("Other")}
                        />
                      </View>
                    )}
                    name="gender"
                    rules={{ required: "Gender is required" }}
                  />
                </View>
                <View style={{ flexDirection: "column", marginTop: 5 }}>
                  <View style={{ marginVertical: 4 }}>
                    <Text>Address</Text>
                  </View>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={{
                          width: 390,
                          height: 40,
                          borderWidth: 0.4,
                          padding: 10,
                          borderColor: "black",

                          alignContent: "center",
                          borderRadius: 6,
                        }}
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        placeholder="address"
                      />
                    )}
                    name="address"
                  />
                </View>

                <View style={{ alignItems: "center", marginTop: 20 }}>
                  <TouchableOpacity
                    style={{
                      borderWidth: 0.3,
                      borderColor: "black",
                      margin: 10,
                      padding: 10,
                      width: 140,
                      backgroundColor: "#4b0082",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 6,
                    }}
                    // onPress={handleSubmit(onSubmit)}
                    onPress={handleSubmit(onSubmit)}

                    // onPress={() => setVisible(false)}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </FormProvider>
          </ScrollView>
        </Modal>
      ) : null}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
