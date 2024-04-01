import React, { useContext } from "react";
import { Text, View, Image, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller, FormProvider } from "react-hook-form";
import {
  AntDesign,
  MaterialIcons,
  EvilIcons,
  Entypo,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../../context/ThemeContext";
export default function Login() {
  const methods = useForm();
  const navigation = useNavigation();
  const { control, handleSubmit, formState, setError } = methods;
  const { email, setEmail } = useContext(ThemeContext);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://192.168.0.102:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const userEmail = data.email;

        setEmail(userEmail);

        methods.reset();

        console.log(email);
        navigation.navigate("CustomDrawer");
      } else {
        const responseData = await response.json();
        setError("message", {
          type: "manual",
          message: responseData.error,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", height: "100%" }}>
      <View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 60,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Welcome to{" "}
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#4b0082" }}
            >
              EyeStrength
            </Text>
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              width: 200,
              height: 200,
            }}
            source={require("../../assets/programmer-gif.gif")}
          />
        </View>
        <View
          style={{
            height: 600,
            backgroundColor: "#FFD580",
            margin: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: "center",
          }}
        >
          <FormProvider {...methods}>
            <View style={{ marginTop: 50 }}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ justifyContent: "center" }}>
                  <AntDesign name="user" size={25} color="black" />
                </View>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={{
                        width: 300,
                        height: 40,
                        borderWidth: 0.4,
                        padding: 10,
                        borderColor: "black",
                        marginLeft: 10,
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
                    required: "Email is required",
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

              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ justifyContent: "center" }}>
                  <MaterialIcons name="password" size={25} color="black" />
                </View>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={{
                        width: 300,
                        height: 40,
                        borderWidth: 0.4,
                        padding: 10,
                        borderColor: "black",
                        marginLeft: 10,
                        alignContent: "center",
                        borderRadius: 6,
                      }}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      secureTextEntry
                      placeholder="Password"
                    />
                  )}
                  name="password"
                  rules={{ required: "Password is required" }}
                />
              </View>
              {formState.errors.password && (
                <Text style={{ color: "red", marginLeft: 37 }}>
                  {formState.errors.password.message}
                </Text>
              )}

              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Pressable
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
                  onPress={() => {
                    navigation.navigate("CustomDrawer");
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                  >
                    Login
                  </Text>
                </Pressable>
              </View>
              <Text
                style={{
                  borderColor: "black",
                  borderStyle: "dotted",
                  borderWidth: 0.5,
                  margin: 10,
                  height: 1,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    borderColor: "black",
                    borderWidth: 0.7,
                    margin: 10,
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <AntDesign name="googleplus" size={24} color="black" />
                </View>
                <View
                  style={{
                    borderColor: "black",
                    borderWidth: 0.7,
                    margin: 10,
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <EvilIcons name="sc-facebook" size={24} color="black" />
                </View>
                <View
                  style={{
                    borderColor: "black",
                    borderWidth: 0.7,
                    margin: 10,
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <Entypo name="instagram" size={24} color="black" />
                </View>
              </View>
            </View>
          </FormProvider>
          <Text style={{ fontSize: 16, marginTop: 15 }}>
            create new account?{" "}
            <Text
              style={{ fontSize: 18, color: "#4b0082" }}
              onPress={() => navigation.navigate("Register")}
            >
              Register
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
