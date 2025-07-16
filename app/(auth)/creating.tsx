import { StyleSheet, Text, View, Animated } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Chase } from "react-native-animated-spinkit";
import { router } from "expo-router";

const Creating = () => {
  const [progress, setProgress] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start(() => {
      router.push("/(auth)/thank-you");
    });

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setProgress(100);
    }
  }, [progress]);

  const progressInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <Chase size={200} color="#000000" />
      <Text style={styles.title}>Creating your{"\n"}account</Text>
      <View style={styles.progressRow}>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBg} />
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progressInterpolate.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 250],
                }),
                backgroundColor: "#0CA1D3",
              },
            ]}
          />
        </View>
        <Text style={styles.percent}>{progress}%</Text>
      </View>
    </View>
  );
};

export default Creating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  title: {
    fontSize: 32,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 24,
    marginBottom: 32,
    color: "#111",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  progressBarContainer: {
    width: 250,
    height: 8,
    borderRadius: 4,
    backgroundColor: "transparent",
    overflow: "hidden",
    marginRight: 8,
    position: "relative",
  },
  progressBg: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 250,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#e3eaf2",
    zIndex: 0,
  },
  progressBar: {
    position: "absolute",
    left: 0,
    top: 0,
    height: 8,
    borderRadius: 4,
    zIndex: 1,
  },
  percent: {
    fontSize: 14,
    color: "#6b7280",
    width: 40,
    textAlign: "right",
  },
});
