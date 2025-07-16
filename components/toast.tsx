import { BaseToast, ErrorToast, ToastConfig } from "react-native-toast-message";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { View, useColorScheme } from "react-native";

const SuccessToast = (props: any) => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

  return (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#0CA1D3",
        borderRadius: 20,
        backgroundColor: backgroundColor,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: backgroundColor,
        borderRadius: 20,
      }}
      text1Style={{
        fontSize: 14,
        fontWeight: "600",
        color: "#0CA1D3",
      }}
      text2Style={{
        fontSize: 10,
        color: "black",
      }}
      renderLeadingIcon={() => (
        <View
          style={{
            paddingLeft: 16,
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="checkmark-circle-outline" size={24} color="#0CA1D3" />
        </View>
      )}
    />
  );
};

const ErrorToastComponent = (props: any) => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

  return (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: backgroundColor,
        borderRadius: 20,
        backgroundColor: backgroundColor,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: backgroundColor,
        borderRadius: 20,
      }}
      text1Style={{
        fontSize: 14,
        fontWeight: "600",
        color: "#ef4444",
      }}
      text2Style={{
        fontSize: 10,
        color: "#ef4444",
      }}
      renderLeadingIcon={() => (
        <View
          style={{
            paddingLeft: 16,
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="alert-circle-outline" size={24} color="#ef4444" />
        </View>
      )}
    />
  );
};

export const toastConfig: ToastConfig = {
  success: SuccessToast,
  error: ErrorToastComponent,
  warning: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#0CA1D3",
        borderRadius: 20,
        backgroundColor: "#0CA1D3",
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: "#0CA1D3",
        borderRadius: 20,
      }}
      text1Style={{
        fontSize: 14,
        fontWeight: "600",
        color: "#fbbf24",
      }}
      text2Style={{
        fontSize: 10,
        color: "#fbbf24",
      }}
      renderLeadingIcon={() => (
        <View
          style={{
            paddingLeft: 16,
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="alert-circle-outline" size={24} color="#fbbf24" />
        </View>
      )}
    />
  ),
};
