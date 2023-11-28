import { StyleSheet, Image, View } from "react-native";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import COLORS from "../../constants/Colors";

const LogInTitle = () => {
  return (
    <View style={styles.titleContainer}>
      <Animated.Text
        entering={FadeInUp.delay(200).duration(1500).springify()}
        style={styles.title}
      >
        SocialVerse
      </Animated.Text>
      <Animated.Text
        entering={FadeInUp.delay(500).duration(1500).springify()}
        style={styles.subtitle}
      >
        Welcome Back! 👋
      </Animated.Text>
    </View>
  );
};

export default LogInTitle;

const styles = StyleSheet.create({
  titleContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingTop: 20,
    height: 250,
  },
  title: {
    fontSize: 42,
    fontWeight: "700",
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "500",
    color: COLORS.white,
  },
});
