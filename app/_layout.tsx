import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/components/toast";
import { SafeAreaView } from "react-native-safe-area-context";

import { useColorScheme } from "@/hooks/useColorScheme";
import SelectCurrencySheet from "@/components/SelectCurrencySheet";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <BottomSheetModalProvider>
              <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
              >
                <Stack
                  screenOptions={{
                    headerShown: false,
                    headerShadowVisible: false,
                    headerBackVisible: false,
                  }}
                >
                  <Stack.Screen name="index" />
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen name="(auth)" />
                  <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="dark" />
                <Toast config={toastConfig} position="top" />
                <SelectCurrencySheet />
              </ThemeProvider>
            </BottomSheetModalProvider>
          </AuthProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
