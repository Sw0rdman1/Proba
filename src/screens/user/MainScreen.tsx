import PostsList from "../../components/main/PostsList";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MainScreenHeader from "../../components/main/Header";
import { View, StyleSheet } from "react-native";
import COLORS from "../../constants/Colors";

const MainScreen = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MainScreenHeader />
        <PostsList />
      </View>
    </GestureHandlerRootView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.middleColor,
    flexDirection: "column",
  },
});
