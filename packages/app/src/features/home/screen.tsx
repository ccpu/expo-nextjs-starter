import { Text, View } from "react-native";

import { AboutNavButton, Container } from "@acme/ui";

interface ScreenContentProps {
  children?: React.ReactNode;
}

const HomeScreen: React.FC<ScreenContentProps> = () => {
  const description =
    "Change any of the text, save the file, and your app will automatically update.";
  return (
    <Container>
      <View className="my-1 rounded-md p-3 px-1">
        <Text className="text-xl font-bold text-foreground">Home</Text>
      </View>
      <View className="my-2 rounded-md p-3 px-1">
        <Text className="text-center text-lg leading-6 text-foreground">
          {description}
        </Text>
      </View>
      <AboutNavButton className="my-4" />
    </Container>
  );
};

export default HomeScreen;
