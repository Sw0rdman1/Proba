import { View, Text, StyleSheet } from "react-native";
import { useAppContext } from "../../context/app/useApp";

const MainScreen = () => {
  const { posts, app } = useAppContext();

  console.log(posts.length);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Social-Verse!</Text>
      <Text style={styles.subtitle}>This is the main screen.</Text>
    </View>
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
