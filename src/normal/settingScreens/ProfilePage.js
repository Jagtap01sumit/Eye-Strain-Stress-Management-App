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
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { RadioButton } from "react-native-paper";

import { useForm, Controller, FormProvider } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import ProfileContent from "./ProfileContent";

export default function ProfilePage() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [birthdate, setBirthdate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      setBirthdate(selectedDate);
      methods.setValue("birthdate", formattedDate);
    }
  };

  const closeOptions = () => {
    setVisible(false);
  };

  const methods = useForm();
  const {
    control,
    handleSubmit,
    formState,
    setError,
    formState: { errors },
  } = methods;
  const [refreshKey, setRefreshKey] = useState(0);
  const onSubmit = async (data) => {
    try {
      const userEmail = await AsyncStorage.getItem("userEmail");
      //NOTE: email which stored in local storage at a time of login which will be send to the db of Profile.

      data.email = userEmail;
      const response = await fetch("http://192.168.29.34:8000/addData", {
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
              height: 540,
              backgroundColor: "white",
              width: "100%",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,

              padding: 10,
            }}
          >
            <FormProvider {...methods}>
              <View style={{ marginTop: 8 }}>
                <View style={{ flexDirection: "column" }}>
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
                    rules={{
                      required: "Username is required",
                    }}
                  />
                </View>
                {formState.errors.username && (
                  <Text style={{ color: "red" }}>
                    {formState.errors.username.message}
                  </Text>
                )}
                <View style={{ flexDirection: "column", marginTop: 1 }}>
                  <View style={{ marginVertical: 4 }}>
                    <Text>Birthdate</Text>
                  </View>
                  <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <View>
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
                            value={
                              value ? format(new Date(value), "yyyy-MM-dd") : ""
                            }
                            placeholder="Select Birthdate"
                            editable={false}
                            onBlur={onBlur}
                            onChangeText={onChange}
                          />
                        )}
                        name="birthdate"
                        rules={{
                          required: "please select birthdate",
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={birthdate}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={handleDateChange}
                    />
                  )}
                </View>
                {formState.errors.birthdate && (
                  <Text style={{ color: "red" }}>
                    {formState.errors.birthdate.message}
                  </Text>
                )}
                <View style={{ flexDirection: "column", marginTop: 1 }}>
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
                        placeholder="Enter your phone number"
                      />
                    )}
                    name="phone"
                    rules={{
                      required: "phone num is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Phone number must be 10 digits",
                      },
                    }}
                  />
                </View>
                {formState.errors.phone && (
                  <Text style={{ color: "red" }}>
                    {formState.errors.phone.message}
                  </Text>
                )}
                <View style={{ flexDirection: "column", marginTop: 1 }}>
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
                        placeholder="age"
                      />
                    )}
                    name="age"
                    rules={{
                      required: "age is required",
                    }}
                  />
                </View>
                {formState.errors.age && (
                  <Text style={{ color: "red" }}>
                    {formState.errors.age.message}
                  </Text>
                )}
                <View style={{ flexDirection: "column", marginTop: 1 }}>
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
                {formState.errors.gender && (
                  <Text style={{ color: "red" }}>
                    {formState.errors.gender.message}
                  </Text>
                )}
                <View style={{ flexDirection: "column", marginTop: 1 }}>
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

                <View style={{ alignItems: "center", marginTop: 10 }}>
                  <Text style={{ color: "red", marginLeft: 37 }}>
                    {formState.errors.message?.message}
                  </Text>
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
