import { StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import Animated, { BounceInRight, BounceInLeft } from "react-native-reanimated";
import Button from "../../components/ui/Button";
import WelcomeScreenImages from "../../components/authentication/WelcomeScreenImages";
import GradientBackground from "../../components/ui/GradientBackground";
import WelcomeScreenTitle from "../../components/authentication/WelcomeScreenTitle";

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const navigateToPage = (page: string) => {
    navigation.navigate(page);
  };

  return (
    <GradientBackground>
      <View style={{ flex: 1, marginVertical: 50 }}>
        <WelcomeScreenImages />

        <View
          style={{
            paddingHorizontal: 22,
            position: "absolute",
            top: 380,
            width: "100%",
          }}
        >
          <WelcomeScreenTitle />

          <Animated.View entering={BounceInLeft.delay(2300).duration(1250)}>
            <Button
              title="Sign In"
              style={styles.button}
              onPress={() => navigateToPage("LogIn")}
            />
          </Animated.View>

          <Animated.View entering={BounceInRight.delay(2300).duration(1250)}>
            <Button
              title="Join Now"
              style={styles.button}
              filled={true}
              color="transparent"
              onPress={() => navigateToPage("Registration")}
            />
          </Animated.View>
        </View>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    width: "100%",
  },
});

export default WelcomeScreen;
