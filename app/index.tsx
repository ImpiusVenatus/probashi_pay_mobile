import { StyleSheet, View, Dimensions, Pressable } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Image } from "expo-image";
import { ThemedText } from "@/components/ThemedText";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const slides = [
  {
    image: require("@/assets/images/onboarding/onboarding-1.png"),
    title: "Not just locally, it's worldwide",
  },
  {
    image: require("@/assets/images/onboarding/onboarding-2.png"),
    title: "Custom cards, spend with no limits",
  },
  {
    image: require("@/assets/images/onboarding/onboarding-3.png"),
    title: "Send, receive and swap money",
  },
];

const PaginationDot = React.memo(
  ({ isActive, onPress }: { isActive: boolean; onPress: () => void }) => {
    const animatedDotStyle = useAnimatedStyle(() => {
      return {
        width: withSpring(isActive ? 20 : 8, { damping: 20 }),
        opacity: withSpring(isActive ? 1 : 0.5, { damping: 20 }),
        backgroundColor: isActive ? "#007AFF" : "#ccc",
      };
    });

    return (
      <Pressable onPress={onPress}>
        <Animated.View style={[styles.paginationDot, animatedDotStyle]} />
      </Pressable>
    );
  }
);

PaginationDot.displayName = "PaginationDot";

const Onboarding = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const translateX = useSharedValue(0);

  const scrollTo = useCallback(
    (index: number) => {
      "worklet";
      translateX.value = withTiming(-index * SCREEN_WIDTH, { duration: 300 });
      setActiveIndex(index);
    },
    [translateX]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % slides.length;
      scrollTo(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex, scrollTo]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    flexDirection: "row",
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.slidesContainer, animatedStyle]}>
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <Image source={slide.image} style={styles.image} />
            <ThemedText style={styles.title}>{slide.title}</ThemedText>
          </View>
        ))}
      </Animated.View>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <PaginationDot
            key={index}
            isActive={activeIndex === index}
            onPress={() => scrollTo(index)}
          />
        ))}
      </View>

      <View style={styles.buttons}>
        <Pressable
          style={styles.button}
          onPress={() => router.push("/(auth)/create-account")}
        >
          <ThemedText style={styles.buttonText}>Create an account</ThemedText>
        </Pressable>
        <Pressable style={[styles.button, styles.loginButton]}>
          <ThemedText style={styles.loginButtonText}>Login</ThemedText>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  slidesContainer: {
    width: SCREEN_WIDTH * slides.length,
    height: 500,
  },
  slide: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    paddingTop: 60,
  },
  image: {
    width: SCREEN_WIDTH * 0.8,
    height: 300,
    resizeMode: "contain",
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 40,
    paddingHorizontal: 24,
    color: "#000",
    letterSpacing: -0.5,
    lineHeight: 42,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttons: {
    padding: 20,
    gap: 10,
    marginTop: "auto",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 999,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  loginButtonText: {
    color: "#007AFF",
  },
});
