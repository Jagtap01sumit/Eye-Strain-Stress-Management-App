// Distance.js
import React, { useState, useEffect, useContext } from "react";
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
