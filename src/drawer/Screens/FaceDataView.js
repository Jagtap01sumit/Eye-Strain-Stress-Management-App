// FaceDataView.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FaceDataView = ({ faceData }) => {
  if (!faceData || faceData.length === 0) {
    return null;
  }

  const { bounds } = faceData[0];

  return (
    <View style={[styles.overlay, { top: bounds.origin.y - 50, left: bounds.origin.x }]}>
      {/* Only display face bounds information */}
      <Text style={styles.faceDesc}>Bounds: {JSON.stringify(bounds)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  faceDesc: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default FaceDataView;
