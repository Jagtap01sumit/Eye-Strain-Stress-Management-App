import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Audio } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export default function BlinkRate() {
  const [isBlinkReminderOn, setBlinkReminder] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const soundObject = useRef(new Audio.Sound()); // Use useRef to maintain audio state
  let blinkTimeout; // Declare blinkTimeout here

  useEffect(() => {
    // Register for push notifications and set up listeners
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // Set up notification listeners
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        // Handle the notification when the app is in the foreground
        console.log("Received notification:", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    // Cleanup function to remove notification listeners
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    // Cleanup function to stop and unload audio when component is unmounted
    return () => {
      soundObject.current.stopAsync();
      soundObject.current.unloadAsync();
    };
  }, []);
  useEffect(() => {
    let blinkTimeout;

    const startBlinkTimer = async () => {
      // Display notification
      await scheduleNotification();

      blinkTimeout = setTimeout(() => {
        showBlinkAlert();
        startBlinkTimer(); // Schedule the next alert after 2 minutes
      }, 1 * 60 * 1000); // 2 minutes in milliseconds
    };

    if (isBlinkReminderOn) {
      startBlinkTimer();
    }

    return () => {
      // Cleanup to avoid memory leaks
      clearTimeout(blinkTimeout);
    };
  }, [isBlinkReminderOn]);

  useEffect(() => {
    // Toggle blink reminder on/off
    if (!isBlinkReminderOn) {
      // If the toggle is switched off, cancel the scheduled notification
      Notifications.cancelScheduledNotificationAsync("blinkReminder");
    }

    return () => {
      // Cleanup to avoid memory leaks
      clearTimeout(blinkTimeout);
    };
  }, [isBlinkReminderOn]);

  useEffect(() => {
    // Handle logic when the 'Audio Started' notification is received
    if (
      notification &&
      notification.request &&
      notification.request.content.title === "Audio Started"
    ) {
      // Handle audio-related logic here, e.g., play audio
      console.log("Handling audio-related logic");
    }
  }, [notification]);

  const startBlinkTimer = async () => {
    // Display notification
    await scheduleNotification();

    // Set up a timer for the blink reminder
    blinkTimeout = setTimeout(() => {
      showBlinkAlert();
      startBlinkTimer(); // Schedule the next alert after 2 minutes
    }, 2 * 60 * 1000); // 2 minutes in milliseconds
  };

  const showBlinkAlert = async () => {
    try {
      // Load and play the audio
      await soundObject.current.loadAsync(require("../../../assets/audio.wav"));
      await soundObject.current.playAsync();

      // Cancel the scheduled notification for the 20-20-20 rule
      await Notifications.cancelScheduledNotificationAsync("blinkReminder");

      // Display notification when audio starts
      await Notifications.scheduleNotificationAsync({
        identifier: "blinkReminder", // Unique identifier for the notification
        content: {
          title: "Audio Started",
          body: "Time to take a break and follow the 20-20-20 rule!",
        },
        trigger: null, // Show immediately
      });

      // Countdown for 20 seconds
      const countdown = Array.from(
        { length: 20 },
        (_, index) => index + 1
      ).reverse();
      for (const number of countdown) {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for 1 second
        console.log(number); // Display the countdown number
      }

      // Stop and unload the audio after the countdown
      await soundObject.current.stopAsync();
      await soundObject.current.unloadAsync();
    } catch (error) {
      console.error("Error during showBlinkAlert", error);
    }
  };

  const toggleBlinkReminder = () => {
    // Toggle the blink reminder state
    setBlinkReminder(!isBlinkReminderOn);
  };

  const stopButtonPressed = () => {
    // Stop the blink reminder if it is on
    if (isBlinkReminderOn) {
      setBlinkReminder(false);
      clearTimeout(blinkTimeout);
    } else {
      console.log("Stop pressed when Blink reminder is already off");
    }
  };

  const scheduleNotification = async () => {
    try {
      // Schedule the 20-20-20 rule notification after 2 minutes
      await Notifications.scheduleNotificationAsync({
        identifier: "blinkReminder", // Unique identifier for the notification
        content: {
          title: "20-20-20 Rule",
          body: "It's time to take a break! Look at something 20 feet away for 20 seconds.",
        },
        trigger: {
          seconds: 1 * 60, // Schedule the notification after 2 minutes
        },
      });
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  };

  return (
    <View style={{ margin: 10 }}>
      <TouchableOpacity onPress={toggleBlinkReminder}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
            marginTop: 40,
            backgroundColor: isBlinkReminderOn ? "#4CAF50" : "#D788CF",
            borderRadius: 20,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            Blink reminder {isBlinkReminderOn ? "On" : "Off"}{" "}
            <FontAwesome
              name={isBlinkReminderOn ? "toggle-on" : "toggle-off"}
              size={29}
              color="black"
            />
          </Text>
        </View>
      </TouchableOpacity>

      <View style={{ paddingLeft: 10, marginTop: 30 }}>
        <Text style={{ fontSize: 20, fontWeight: "600", color: "#888" }}>
          20-20-20 rule will be used: every 20 minutes, look at something 20
          feet away for 20 seconds. This alert message will be given to the
          user.
        </Text>
      </View>

      <TouchableOpacity onPress={stopButtonPressed}>
        <View style={styles.card}>
          <Text style={styles.textStyle}>Stop</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#D788CF",
    marginVertical: 20,
    alignSelf: "center",
  },
  textStyle: {
    color: "white",
    fontSize: 44,
    fontWeight: "bold",
  },
});

// Notification handling setup
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    // Set up notification channel for Android
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    // Request permission for notifications
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    // Get Expo push token
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "your-project-id",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use a physical device for Push Notifications");
  }

  return token;
}
