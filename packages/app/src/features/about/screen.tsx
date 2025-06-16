import { Text, View } from "react-native";

import { Container, HomeNavButton } from "@acme/ui";

interface ScreenContentProps {
  children?: React.ReactNode;
}

const AboutScreen: React.FC<ScreenContentProps> = () => {
  const description =
    "This is the about page. Learn more about our amazing project here.";

  return (
    <Container>
      <View className="my-1 rounded-md p-3 px-1">
        <Text className="text-xl font-bold text-foreground">About</Text>
      </View>
      <View className="my-2 rounded-md p-3 px-1">
        <Text className="text-center text-lg leading-6 text-foreground">
          {description}
        </Text>
      </View>
      <HomeNavButton className="my-4" />
    </Container>
  );
};

export default AboutScreen;
