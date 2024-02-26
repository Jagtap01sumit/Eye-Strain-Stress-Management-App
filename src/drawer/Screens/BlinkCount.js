// BlinkCount.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import CountView from './CountView';

export default function BlinkCount() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [faceData, setFaceData] = useState([]);
  const [blinkCount, setBlinkCount] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const setupCamera = async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    };

    setupCamera();
  }, []);

  const calculateBlinkCount = (face) => {
    if (face && face.bounds) {
      const bounds = face.bounds;
  
      // Calculate aspect ratio of the bounding box
      const boundingBoxAspectRatio = bounds.size.width / bounds.size.height;
  
      // Adjust the threshold values as needed
      if (boundingBoxAspectRatio < 0.5 && !isBlinking) {
        setBlinkCount((prevCount) => prevCount + 1);
        setIsBlinking(true);
      } else if (boundingBoxAspectRatio >= 0.5 && isBlinking) {
        setIsBlinking(false);
      }
    }
  };
  

  const handleFacesDetected = ({ faces }) => {
    if (faces && faces.length > 0) {
      setFaceData(faces);

      const face = faces[0];
      console.log(face);
      if (face) {
        calculateBlinkCount(face);
      }
    }
  };

  const distance = (point1, point2) => {
    return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={Camera.Constants.Type.front}
          ratio={'1:1'}
          onFacesDetected={handleFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
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
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});