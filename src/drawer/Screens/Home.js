import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { ThemeContext } from "../../../context/ThemeContext";
import { colors } from "../../../theme";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const { theme } = useContext(ThemeContext);

  let activeColors = colors[theme.mode];

  const categories = [
    {
      Title: "Entertainment",
      icon: "movie-creation",
      backgroundColor: "#c3c8d3",
      subcat: {
        name1: "Action",
        name2: "Comedy",
        name3: "Drama",
      },
      apps: ["app11", "app12", "app13"],
    },
    {
      Title: "Message",
      icon: "movie-creation",
      backgroundColor: "#6FADB2",
      textColor: "white",
      subcat: {
        name1: "Personal",
        name2: "Work",
        name3: "Friends",
      },
      apps: ["app21", "app22", "app23"],
    },
    {
      Title: "Games",
      backgroundColor: "#c3c8d3",
      icon: "movie-creation",
      subcat: {
        name1: "Action",
        name2: "Adventure",
        name3: "Sports",
      },
      apps: ["app31", "app32", "app33"],
    },
  ];

  const closeOptions = () => {
    setVisible(false);
  };
  return (
    <ScrollView>
      <View>
        <Text
          style={{
            flexGrow: 1,
            fontSize: 28,
            fontWeight: "bold",
            marginTop: 25,
            textAlign: "center",
            textAlignVertical: "center",
            marginBottom: 40,
          }}
        >
          Welcome back, User!
        </Text>
        {categories.map((item, index) => (
          <View key={item.Title}>
            <TouchableOpacity onPress={() => setVisible(true)}>
              <View
                style={{
                  display: "flex",
                  margin: 10,
                  padding: 10,
                  backgroundColor: `${item.backgroundColor}`,
                  borderRadius: 13,
                }}
              >
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 1,
                      borderColor: "black",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        padding: 5,
                        fontWeight: "bold",
                        fontSize: 22,
                        color: `${item.textColor || "black"}`,
                      }}
                    >
                      {item.Title}
                    </Text>
                    <MaterialIcons
                      name={item.icon}
                      size={54}
                      color="black"
                      style={{ padding: 10 }}
                    />
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      margin: 5,
                      padding: 5,
                    }}
                  >
                    <Text
                      style={{
                        margin: 5,
                        fontSize: 20,
                        fontWeight: "400",
                        color: `${item.textColor || "black"}`,
                      }}
                    >
                      {item.subcat.name1}
                    </Text>
                    <Text
                      style={{
                        margin: 5,
                        fontSize: 20,
                        fontWeight: "400",
                        color: `${item.textColor || "black"}`,
                      }}
                    >
                      {item.subcat.name2}
                    </Text>
                    <Text
                      style={{
                        margin: 5,
                        fontSize: 20,
                        fontWeight: "400",
                        color: `${item.textColor || "black"}`,
                      }}
                    >
                      {item.subcat.name3}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>

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
                    height: 200,
                    backgroundColor: "white",
                    width: "100%",
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,

                    padding: 10,
                  }}
                >
                  {item.apps.map((app, index) => (
                    <TouchableOpacity
                      style={{
                        borderWidth: 1,
                        margin: 2,
                        padding: 10,
                        borderRadius: 10,
                      }}
                      key={index}
                    >
                      <Text>{app}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </Modal>
            ) : null}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({});
