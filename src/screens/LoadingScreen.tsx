import { StyleSheet, View } from "react-native";
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated";
import COLORS from "../constants/Colors";
import GradientBackground from "../components/ui/GradientBackground";

interface LoadingScreenProps {
  loading: {
    user: boolean;
    data: boolean;
  };
}

const LoadingScreen = ({ loading }: LoadingScreenProps) => {
  return (
    <GradientBackground>
      {loading.data && (
        <View style={styles.container}>
          <Animated.Text
            entering={FadeInDown.duration(500)}
            style={styles.title}
          >
            SocialVerse
          </Animated.Text>
          <Animated.Text
            entering={FadeInUp.delay(300).duration(500)}
            style={styles.subtitle}
          >
            New era of social networking
          </Animated.Text>
        </View>
      )}
    </GradientBackground>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
  title: {
    fontSize: 60,
    fontWeight: "700",
    color: COLORS.white,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.titleColor,
  },
});
