// import { StyleSheet, Text, View, Image } from "react-native";
// import React from "react";
// import { FontAwesome } from "@expo/vector-icons";

// export default function Distance() {
//   return (
//     <View>
//       <View style={{ margin: 10 }}>
//         <View
//           style={{
//             justifyContent: "center",
//             alignItems: "center",
//             padding: 10,
//             backgroundColor: "#71A7F8",
//             borderRadius: 20,
//             marginTop: 40,
//           }}
//         >
//           <Text style={{ fontSize: 26, fontWeight: "bold", color: "white" }}>
//             Allow Notification{" "}
//             <FontAwesome name="toggle-on" size={29} color="black" />
//           </Text>
//         </View>
//         <Image
//           source={{
//             uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/f9356ccf28fff9e6b72a13580665f4bc1275aebf9266794c14ac5d98cd711699?apiKey=2a3c4bb6307643258a7e7c95a2590e5e",
//           }}
//           style={{
//             alignSelf: "center",
//             marginTop: 36,
//             maxWidth: "100%",
//             aspectRatio: 1.33,
//             width: 289,
//           }}
//         />
//         <Text
//           style={{
//             alignSelf: "center",
//             marginTop: 52,
//             fontSize: 28,
//             fontWeight: "bold",
//             color: "#787878",
//           }}
//         >
//           The range bar indicates the distance between your eyes and your
//           digital device.
//         </Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({});

import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Distance() {
  const [allowNotification, setAllowNotification] = useState(false);

  const toggleNotification = () => {
    setAllowNotification((prev) => !prev);
    // Here you can add additional logic to handle enabling/disabling notifications
  };

  return (
    <View>
      <View style={{ margin: 10 }}>
        <TouchableOpacity onPress={toggleNotification}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              backgroundColor: allowNotification ? "#71A7F8" : "#E5E5E5",
              borderRadius: 20,
              marginTop: 40,
            }}
          >
            <Text
              style={{
                fontSize: 26,
                fontWeight: "bold",
                color: allowNotification ? "white" : "#333",
              }}
            >
              Allow Notification{" "}
              <FontAwesome
                name={allowNotification ? "toggle-on" : "toggle-off"}
                size={29}
                color={allowNotification ? "black" : "#333"}
              />
            </Text>
          </View>
        </TouchableOpacity>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/f9356ccf28fff9e6b72a13580665f4bc1275aebf9266794c14ac5d98cd711699?apiKey=2a3c4bb6307643258a7e7c95a2590e5e",
          }}
          style={{
            alignSelf: "center",
            marginTop: 36,
            maxWidth: "100%",
            aspectRatio: 1.33,
            width: 289,
          }}
        />
        <Text
          style={{
            alignSelf: "center",
            marginTop: 52,
            fontSize: 28,
            fontWeight: "bold",
            color: "#787878",
          }}
        >
          The range bar indicates the distance between your eyes and your
          digital device.
        </Text>
      </View>
      {/* <Button title="Switch Camera" onPress={switchCamera} />
      <Button title="Take Picture" onPress={takePicture} /> */}
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
      {faceData.length > 0 && <FaceDataView faceData={faceData} />}
    </View>
  );
}

const styles = StyleSheet.create({});
