import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StackScreenProps } from "@react-navigation/stack";
import Animated, {
  FadeInDown,
  BounceInRight,
  BounceInLeft,
  FadeInUp,
} from "react-native-reanimated";
import COLORS from "../../constants/Colors";
import Button from "../../components/ui/Button";

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const navigateToPage = (page: string) => {
    navigation.navigate(page);
  };

  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={{ flex: 1, marginTop: 50, marginBottom: 50 }}>
        <Animated.View
          entering={FadeInDown.delay(1200).duration(1500).springify()}
        >
          <Image
            source={require("../../../assets/images/hero2.jpg")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: "absolute",
              top: 25,
              left: 180,
              transform: [{ rotate: "5deg" }],
            }}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(900).duration(1000).springify()}
        >
          <Image
            source={require("../../../assets/images/hero1.jpg")}
            style={{
              height: 100,
              width: 100,
              borderRadius: 20,
              position: "absolute",
              top: 10,
              transform: [
                { translateX: 20 },
                { translateY: 40 },
                { rotate: "-15deg" },
              ],
            }}
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}
        >
          <Image
            source={require("../../../assets/images/hero3.jpg")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 20,
              position: "absolute",
              top: 150,
              left: -20,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "10deg" },
              ],
            }}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(300).duration(1500).springify()}
        >
          <Image
            source={require("../../../assets/images/hero4.jpg")}
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              position: "absolute",
              top: 70,
              left: 100,
              transform: [
                { translateX: 50 },
                { translateY: 50 },
                { rotate: "-10deg" },
              ],
            }}
          />
        </Animated.View>
        {/* content  */}

        <View
          style={{
            paddingHorizontal: 22,
            position: "absolute",
            top: 400,
            width: "100%",
          }}
        >
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
          <Animated.View entering={BounceInLeft.delay(2300).duration(1250)}>
            <Button
              title="Sign In"
              style={{
                marginTop: 16,
                width: "100%",
              }}
              onPress={() => navigateToPage("LogIn")}
            />
          </Animated.View>

          <Animated.View entering={BounceInRight.delay(2300).duration(1250)}>
            <Button
              title="Join Now"
              style={{
                marginTop: 15,
                width: "100%",
              }}
              filled={true}
              color="transparent"
              onPress={() => navigateToPage("Registration")}
            />
          </Animated.View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({});

export default WelcomeScreen;
