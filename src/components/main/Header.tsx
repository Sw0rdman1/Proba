import { StyleSheet, Text, View } from "react-native";
import COLORS from "../../constants/Colors";

const MainScreenHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SocialVerse</Text>
    </View>
  );
};

export default MainScreenHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: COLORS.white,
    paddingTop: 30,
  },
});
