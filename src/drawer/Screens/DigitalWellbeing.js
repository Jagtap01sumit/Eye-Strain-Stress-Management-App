import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function DigitalWellbeing() {
  const lineValue = [
    {
      platform: "whatsapp",
      icon: "whatsapp",
      color: "#25D366",
      value: 10,
      content:
        "WhatsApp has 2 billion active users worldwide. WhatsApp is ranked as the most used mobile messenger app in the world. More than 100 billion messages are sent each day on WhatsApp.",
    },
    {
      platform: "instagram",
      icon: "instagram",
      color: "#E4405F",
      value: 20,
      content:
        "Instagram boasts 1 billion active users globally. Its one of the top social media platforms for sharing photos and videos. Over 95 million photos and videos are shared on Instagram every day",
    },
    {
      platform: "facebook",
      icon: "facebook",
      color: "#1877F2",
      value: 30,
      content:
        "With a massive user base of 2.8 billion monthly active users. Users engage in various activities, including sharing updates, photos, and connecting with friends. On average, over 4.5 billion likes are given each day on Facebook",
    },
    {
      platform: "youtube",
      icon: "youtube",
      color: "#FF0000",
      value: 40,
      content:
        "YouTube is the go-to platform for video content, with 2 billion  users. Over 500 hours of video are uploaded to YouTube every minute. It's a hub for diverse content, from tutorials to entertainment, with more than 1 billion hours of YouTube videos watched daily.",
    },
    {
      platform: "game-controller",
      icon: "gamepad",
      color: "#3498DB",
      value: 50,
      content:
        "Gaming is a global phenomenon, and game controllers play a crucial role. There are over 2.7 billion gamers worldwide. The gaming industry generates billions in revenue annually, with gamers spending countless hours immersed in virtual worlds. Esports, competitive gaming, has a growing fanbase with millions tuning in for tournaments.",
    },
    {
      platform: "snapchat-square",
      icon: "snapchat-square",
      color: "#ffbc00",
      value: 100,
      content:
        "Snapchat, known for its disappearing messages, has over 500 million monthly active users. It's a popular platform among younger audiences for its creative features like filters and stories. More than 5 billion snaps are created every day, making Snapchat a dynamic and engaging social platform.",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={{ marginTop: 10 }}>
      <View style={styles.itemContainer}>
        <FontAwesome name={item.icon} size={80} color={item.color} />
        <View style={styles.itemContent}>
          <Text style={styles.platformText}>{item.platform}</Text>
          <View
            style={{
              width: `${item.value}%`,
              height: 3,
              backgroundColor: "black",
            }}
          ></View>
          <View style={{ marginVertical: 10 }}>
            <Text>{item.content}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={lineValue}
      renderItem={renderItem}
      keyExtractor={(item) => item.platform}
      numColumns={2}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "column",

    margin: 10,
    padding: 10,
    // borderWidth: 1,
    // borderColor: "#000",
    borderRadius: 10,
    height: 300,
    backgroundColor: "#c3c8d3",
    width: 184,
  },
  itemContent: {
    display: "flex",
    // alignItems: "center",
    margin: 5,
    padding: 5,
    justifyContent: "center",
  },
  platformText: {
    fontSize: 20,
    fontWeight: "800",
    marginVertical: 10,
    // margin: 10,
  },
});
