import { SafeAreaView, StyleSheet, Text, View, TextInput } from "react-native";
import { RadioButton } from "react-native-paper";
import React from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import {
  AntDesign,
  MaterialIcons,
  EvilIcons,
  Entypo,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { setNativeProps } from "react-native-reanimated";
export default function EditProfileScreen(props) {
  const methods = useForm();
  const { control, handleSubmit, formState, setError } = methods;

  const onSubmit = () => {
    console.log("Save button clicked!");
    props.closeOptions();
  };

  return (
    <SafeAreaView
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 17, fontWeight: "800" }}>Edit Your Profile</Text>
      <FormProvider {...methods}>
        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "column", marginTop: 10 }}>
            <View style={{ marginVertical: 4 }}>
              <Text>User name</Text>
            </View>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{
                    width: 400,
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
          {formState.errors.email && (
            <Text style={{ color: "red", marginLeft: 37 }}>
              {formState.errors.email.message}
            </Text>
          )}
          <View style={{ flexDirection: "column", marginTop: 10 }}>
            <View style={{ marginVertical: 4 }}>
              <Text>Email address</Text>
            </View>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{
                    width: 400,
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
          <View style={{ flexDirection: "column", marginTop: 10 }}>
            <View style={{ marginVertical: 4 }}>
              <Text>Phone number</Text>
            </View>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{
                    width: 400,
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

          <View style={{ flexDirection: "column", marginTop: 10 }}>
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
          <View style={{ flexDirection: "column", marginTop: 10 }}>
            <View style={{ marginVertical: 4 }}>
              <Text>Address</Text>
            </View>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{
                    width: 400,
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
              onPress={onSubmit}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </FormProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
