/**
 *
 * Inspiration: https://dribbble.com/shots/3731362-Event-cards-iOS-interaction
 */

import * as React from "react";
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
const { width, height } = Dimensions.get("screen");
import { EvilIcons } from "@expo/vector-icons";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";
import { Post } from "../../service/PostService";
import { useAppContext } from "../../context/app/useApp";

// https://www.creative-flyers.com

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.82;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

interface OverflowItemsProps {
  data: Post[];
  scrollXAnimated: Animated.Value;
}

const OverflowItems: React.FC<OverflowItemsProps> = ({
  data,
  scrollXAnimated,
}) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item: Post, index: number) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.author.displayName}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>
                  <EvilIcons
                    name="location"
                    size={16}
                    color="black"
                    style={{ marginRight: 5 }}
                  />
                  {item.author.email}
                </Text>
                <Text style={[styles.date]}>{item.numberOfLikes}</Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

const PostsList: React.FC = () => {
  const { posts } = useAppContext();
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const setActiveIndex = React.useCallback((activeIndex: number) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  }, []);

  React.useEffect(() => {
    if (index === posts.length - VISIBLE_ITEMS - 1) {
      // get new data
      // fetch more data
      const newData = [...posts, ...posts];
    }
  });

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  return (
    <FlingGestureHandler
      key="left"
      direction={Directions.LEFT}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === posts.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        key="right"
        direction={Directions.RIGHT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
          <OverflowItems data={posts} scrollXAnimated={scrollXAnimated} />
          <FlatList
            data={posts}
            keyExtractor={(item) => String(item.id)}
            horizontal
            inverted
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              padding: SPACING * 2,
              marginTop: 50,
            }}
            scrollEnabled={false}
            removeClippedSubviews={false}
            CellRendererComponent={({
              item,
              index,
              children,
              style,
              ...props
            }) => {
              const newStyle = [style, { zIndex: posts.length - index }];
              return (
                <View style={newStyle} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index: i }) => {
              const inputRange = [i - 1, i, i + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });

              return (
                <Animated.View
                  style={{
                    position: "absolute",
                    left: -ITEM_WIDTH / 2,
                    opacity,
                    transform: [
                      {
                        translateX,
                      },
                      { scale },
                    ],
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      //   navigation.navigate("EventDetails", {
                      //     item: events[index],
                      //   });
                    }}
                  >
                    <View>
                      <Image
                        source={{ uri: item.contentPhoto }}
                        style={{
                          width: ITEM_WIDTH,
                          height: ITEM_HEIGHT,
                          borderRadius: 14,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              );
            }}
          />
          <View
            id="general.bg"
            style={[
              StyleSheet.absoluteFillObject,
              {
                transform: [{ translateY: height }],
              },
            ]}
          >
            <View
              style={[
                StyleSheet.absoluteFillObject,
                {
                  backgroundColor: "#fff",
                  borderRadius: 16,
                },
              ]}
            />
          </View>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

export default PostsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
  },
  itemContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: "hidden",
  },
});
