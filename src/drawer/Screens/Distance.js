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

// import React, { useState } from "react";
// import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";

// export default function Distance() {
//   const [allowNotification, setAllowNotification] = useState(false);

//   const toggleNotification = () => {
//     setAllowNotification((prev) => !prev);
//     // Here you can add additional logic to handle enabling/disabling notifications
//   };

//   return (
//     <View>
//       <View style={{ margin: 10 }}>
//         <TouchableOpacity onPress={toggleNotification}>
//           <View
//             style={{
//               justifyContent: "center",
//               alignItems: "center",
//               padding: 10,
//               backgroundColor: allowNotification ? "#71A7F8" : "#E5E5E5",
//               borderRadius: 20,
//               marginTop: 40,
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 26,
//                 fontWeight: "bold",
//                 color: allowNotification ? "white" : "#333",
//               }}
//             >
//               Allow Notification{" "}
//               <FontAwesome
//                 name={allowNotification ? "toggle-on" : "toggle-off"}
//                 size={29}
//                 color={allowNotification ? "black" : "#333"}
//               />
//             </Text>
//           </View>
//         </TouchableOpacity>
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
// Distance.js
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import FaceDataView from "./FaceDataView";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../theme";
import { ThemeContext } from "../../../context/ThemeContext";

export default function Distance() {
  const navigation = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [faceData, setFaceData] = useState([]);
  const [faceDataListener, setFaceDataListener] = useState(null);

  const { theme, setTheme } = useContext(ThemeContext);
  const [color, setColor] = useState(false);
  const [form, setForm] = useState({
    darkMode: false,
  });
  
  let activeColors = colors[theme.mode];
  console.log(activeColors);

  const backgroundColor = theme.mode === "dark" ? "#111827" : "#666f80";

  useEffect(() => {
    const setupCamera = async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    };

    setupCamera();
  }, []);

  useEffect(() => {
    const cleanup = () => {
      if (faceDataListener) {
        faceDataListener.remove();
      }
    };

    return cleanup;
  }, [faceDataListener]);

  // const takePicture = async () => {
  //   if (camera) {
  //     const data = await camera.takePictureAsync(null);
  //     setImage(data.uri);
  //   }
  // };

  // const switchCamera = () => {
  //   setType(
  //     type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
  //   );
  // };

  const calculateDistance = (face) => {
    // console.log('Face:', face);
    if (face && face.bounds) {
      const { bounds } = face;
      const initialFaceWidth = bounds.size.width;
      const initialFaceHeight = bounds.size.height;
      // console.log('Initial Height:', initialFaceHeight);

      if (initialFaceWidth > 450 || initialFaceHeight > 450) {
        alert("Move back! You are too close to the camera.");
      }

      const handleFaceChange = (updatedFace) => {
        if (updatedFace && updatedFace.bounds) {
          const updatedBounds = updatedFace.bounds;
          const updatedFaceWidth = updatedBounds.size.width;
          const updatedFaceHeight = updatedBounds.size.height;

          const widthChangeRatio = updatedFaceWidth / initialFaceWidth;
          const heightChangeRatio = updatedFaceHeight / initialFaceHeight;
          // Adjust the threshold values as needed
          if (widthChangeRatio > 1.2 || heightChangeRatio > 1.2) {
            alert("Move back! You are too close to the camera.");
          }
        }
      };

      // Listen for face updates to calculate changes
      setFaceDataListener(handleFaceChange);
    }
  };

  const handleFacesDetected = ({ faces }) => {
    if (faces && faces.length > 0) {
      setFaceData(faces);

      const face = faces[0];
      if (face) {
        calculateDistance(face);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
          onFacesDetected={handleFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
            runClassifications: FaceDetector.FaceDetectorClassifications.none,
            minDetectionInterval: 100,
            tracking: true,
          }}
        />
      </View>
      {/* <Button title="Switch Camera" onPress={switchCamera} />
      <Button title="Take Picture" onPress={takePicture} /> */}
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
      {faceData.length > 0 && <FaceDataView faceData={faceData} />}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});
