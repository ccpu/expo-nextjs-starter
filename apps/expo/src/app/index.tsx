import { SafeAreaView } from "react-native-safe-area-context";

import { HomeScreen } from "@acme/app";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <HomeScreen />
    </SafeAreaView>
  );
}
