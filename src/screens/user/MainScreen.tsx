import { View, Text, StyleSheet } from "react-native";
import PostsList from "../../components/main/PostsList";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const MainScreen = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PostsList />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
  },
});

export default MainScreen;
