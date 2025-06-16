import { withExpo } from "@expo/next-adapter";
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);

// Purpose: Fail fast if required env vars are missing/malformed
await jiti.import("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  transpilePackages: [
    // React Native packages
    "react-native-css-interop",

    // Expo packages
    "expo",
    "expo-modules-core",
    "expo-linking",
    "expo-router",
    "expo-constants",
  ],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default withExpo(nextConfig);
