// BlinkCount.js
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import CountView from "./CountView";
import * as FileSystem from "expo-file-system";
import { Form } from "react-hook-form";

export default function BlinkCount() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const cameraRef = useRef(null);

  const [faceData, setFaceData] = useState([]);
  const [blinkCount, setBlinkCount] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const setupCamera = async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    };

    setupCamera();
  }, []);

  const handleFacesDetected = async ({ faces }) => {
    if (faces.length > 0) {
      const photo = await cameraRef.current.takePictureAsync();
      sendImageToServer(photo.uri);
    }
  };

  const sendImageToServer = async (imageUri) => {
    try {
      console.log(imageUri);
      const formData = new FormData();
      formData.append("face", {
        uri: imageUri,
        name: imageUri.split("/").pop(),
        type: "image/*",
      });
      const response = await fetch("http://192.168.0.139:5000/camera", {
        method: "post",
        headers: {
          "content-type": "multipart/form-data",
        },
        body: formData,
      });
      const serverResponse = await response.text();
      setBlinkCount(parseInt(serverResponse));
    } catch (error) {
      console.error("Error sending image to server:", error);
      Alert.alert("Error", "Failed to send image to server");
    }
  };

  useEffect(() => {
    console.log(blinkCount);
  }, [blinkCount]);

  const getImageData = async (imageUri) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    console.log(imageUri);
    return blob;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={cameraRef}
          style={styles.fixedRatio}
          type={Camera.Constants.Type.front}
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
      <CountView blinkCount={blinkCount} />
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
