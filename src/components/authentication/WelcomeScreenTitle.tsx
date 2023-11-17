import { StyleSheet, Text, View } from "react-native";
import Animated, {
  BounceInRight,
  BounceInLeft,
  FadeInUp,
} from "react-native-reanimated";
import COLORS from "../../constants/Colors";

const WelcomeScreenTitle = () => {
  return (
    <>
      <Animated.Text
        entering={BounceInLeft.delay(1500).duration(1250)}
        style={{
          fontSize: 36,
          fontWeight: "800",
          color: COLORS.white,
        }}
      >
        Welcome to
      </Animated.Text>
      <Animated.Text
        entering={BounceInRight.delay(1500).duration(1250)}
        style={{
          fontSize: 54,
          fontWeight: "800",
          color: COLORS.titleColor,
        }}
      >
        SocialVerse
      </Animated.Text>

      <View style={{ marginVertical: 12 }}>
        <Animated.Text
          entering={FadeInUp.delay(2300).duration(1500).springify()}
          style={{
            fontSize: 17,
            color: COLORS.white,
          }}
        >
          Experience a new era of
          <Text
            style={{
              fontSize: 18,
              fontWeight: "800",
              color: COLORS.titleColor,
            }}
          >
            {" "}
            social networking
          </Text>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            {" "}
            bringing your connections closer than ever before.
          </Text>
        </Animated.Text>
      </View>
    </>
  );
};

export default WelcomeScreenTitle;

const styles = StyleSheet.create({});
