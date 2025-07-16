import { ConfigContext, ExpoConfig } from "expo/config";
import { version } from "./package.json";

// EAS config
const EAS_PROJECT_ID = "ef341d6b-837f-46c0-9f51-5515bedce316";
const PROJECT_SLUG = "probashipay";
const OWNER = "funsai";

// App production config
const APP_NAME = "Probashi Pay";
const BUNDLE_IDENTIFIER = "com.buckyy.probashipay";
const PACKAGE_NAME = "com.buckyy.probashipay";
const SCHEME = "probashipay";

export default ({ config }: ConfigContext): ExpoConfig => {
  console.log("⚙️ Building app for environment:", process.env.APP_ENV);

  const { name, bundleIdentifier, icon, adaptiveIcon, packageName, scheme } =
    getDynamicAppConfig(
      (process.env.APP_ENV as "development" | "preview" | "production") ||
        "development"
    );

  return {
    ...config,
    name,
    slug: PROJECT_SLUG,
    version,
    orientation: "portrait",
    icon,
    scheme,
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier,
      icon,
      runtimeVersion: {
        policy: "appVersion",
      },
      config: {
        usesNonExemptEncryption: false,
      },
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          "Probashipay needs your location to suggest nearby businesses or enable location tagging features.",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: adaptiveIcon,
        backgroundColor: "#0EA1D3",
      },
      package: packageName,
      runtimeVersion: version,
      permissions: ["ACCESS_FINE_LOCATION", "ACCESS_COARSE_LOCATION"],
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/icons/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#0EA1D3",
          dark: {
            image: "./assets/icons/splash-icon.png",
            backgroundColor: "#0EA1D3",
          },
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app needs access to your photos to let you select a profile image.",
        },
      ],
      [
        "expo-camera",
        {
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
          microphonePermission:
            "Allow $(PRODUCT_NAME) to access your microphone",
          recordAudioAndroid: true,
        },
      ],
      //   [
      //     "expo-secure-store",
      //     {
      //       configureAndroidBackup: true,
      //       faceIDPermission:
      //         "Allow $(PRODUCT_NAME) to access your Face ID biometric data.",
      //     },
      //   ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
    owner: OWNER,
  };
};

const getDynamicAppConfig = (
  environment: "development" | "preview" | "production"
) => {
  if (environment === "production") {
    return {
      name: APP_NAME,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
      icon: "./assets/icons/icon.png",
      adaptiveIcon: "./assets/icons/adaptive-icon.png",
      scheme: SCHEME,
    };
  }

  if (environment === "preview") {
    return {
      name: `${APP_NAME} Preview`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
      packageName: `${PACKAGE_NAME}.preview`,
      icon: "./assets/icons/icon.png",
      adaptiveIcon: "./assets/icons/adaptive-icon.png",
      scheme: `${SCHEME}-prev`,
    };
  }

  return {
    name: `${APP_NAME} Dev`,
    bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
    packageName: `${PACKAGE_NAME}.dev`,
    icon: "./assets/icons/icon.png",
    adaptiveIcon: "./assets/icons/adaptive-icon.png",
    scheme: `${SCHEME}-dev`,
  };
};
