import React, { useState, useRef, useEffect } from "react";
import { Dimensions, StyleSheet, Animated, Image, LogBox } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import strings from "../../assets/Dictionary";
import { Text, Item, Input, Icon, View } from "native-base";
import { primeColor } from "../../configs/color";
import ScreenBase from "../../elements/SecreenBase";
import FooterTabs from "../../elements/FooterTabs/FooterTabs";
import { useKeyboard } from "react-native-keyboard-height";
import { Rating } from "react-native-ratings";
import ListFeatured from "./ListFeatured";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const Home = (props) => {
  const scrollA = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }, []);
  const { navigation } = props;
  const [bgSearch, setBgSearch] = useState("transparent");
  const [colorSearch, setColorSearch] = useState("#fff");
  const [iconSearch, setIconSearch] = useState("#fff");
  const [offset, setOffset] = useState(0);
  const [currentDirection, setDirection] = useState("up");

  const handleScroll = (e) => {
    if (e.nativeEvent.contentOffset.y > 60) {
      const alpha = e.nativeEvent.contentOffset.y * 0.006;
      setBgSearch(`rgba(255,255,255,${alpha < 1 ? alpha : 1})`);
      if (alpha >= 0.9) {
        setIconSearch("#ccc");
        setColorSearch("#f3f3f3");
      } else {
        setIconSearch("#fff");
        setColorSearch("#fff");
      }
    } else {
      setBgSearch("transparent");
      setColorSearch("#fff");
      setIconSearch("#fff");
    }
    var currentOffset = e.nativeEvent.contentOffset.y;
    var direction = currentOffset > offset + 20 ? "down" : "up";
    if (currentOffset > offset + 20 || currentOffset + 20 < offset) {
      setOffset(currentOffset);
      setDirection(direction);
    }
  };

  const didShow = (height) => {
    console.log("Keyboard show. Height is " + height);
    setViewHeight(screenHeight - height);
  };

  const didHide = () => {
    console.log("Keyboard hide");
    setViewHeight(screenHeight);
  };

  const [keyboardHeigth] = useKeyboard(didShow, didHide);

  const [viewHeight, setViewHeight] = useState(screenHeight);
  return (
    <ScreenBase
      screen={strings.Menu1}
      navigation={navigation}
      direction={currentDirection}
    >
      <View
        style={[
          styles.searchItem,
          {
            backgroundColor: bgSearch,
          },
          bgSearch === "rgba(255,255,255,1)" ? styles.shadowSearch : null,
        ]}
      >
        <Item
          rounded
          style={{
            width: "75%",
            backgroundColor: colorSearch,
            borderColor: colorSearch,
            height: 45,
          }}
        >
          <Icon active name="search-outline" style={{ color: primeColor }} />
          <Input
            placeholder={strings.Search}
            placeholderTextColor={primeColor}
            style={{ color: primeColor, fontFamily: "roboto_thin" }}
          />
        </Item>
        <Icon name="heart" style={{ color: iconSearch }} />
        <Icon name="mail" style={{ color: iconSearch }} />
      </View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          {
            useNativeDriver: true,
            listener: (event) => {
              handleScroll(event);
            },
          }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.bannerContainer}>
          <Animated.View style={styles.banner(scrollA)}>
            <ListFeatured />
          </Animated.View>
        </View>
        <View style={styles.scrollView}>
          <View style={styles.scrollContainer}>
            <View style={styles.contentContainer}>
              <View style={styles.item}>
                <Image
                  source={require("../../assets/images/sarung.jpg")}
                  style={styles.imageItem}
                />
                <Text style={styles.titleItem}>Mamanda Thea</Text>
                <View style={styles.containerItemLoc}>
                  <Ionicons name="location-outline" />
                  <Text style={styles.loc}>Borneo</Text>
                </View>
                <Rating
                  ratingCount={5}
                  imageSize={14}
                  readonly={true}
                  type="custom"
                  ratingBackgroundColor="#dddee2"
                  startingValue={4 / 1}
                  style={styles.rating}
                />
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.item}>
                <Image
                  source={require("../../assets/images/sarung.jpg")}
                  style={styles.imageItem}
                />
                <Text style={styles.titleItem}>Mamanda Thea</Text>
                <View style={styles.containerItemLoc}>
                  <Ionicons name="location-outline" />
                  <Text style={styles.loc}>Borneo</Text>
                </View>
                <Rating
                  ratingCount={5}
                  imageSize={14}
                  readonly={true}
                  type="custom"
                  ratingBackgroundColor="#dddee2"
                  startingValue={4 / 1}
                  style={styles.rating}
                />
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.item}>
                <Image
                  source={require("../../assets/images/sarung.jpg")}
                  style={styles.imageItem}
                />
                <Text style={styles.titleItem}>Mamanda Thea</Text>
                <View style={styles.containerItemLoc}>
                  <Ionicons name="location-outline" />
                  <Text style={styles.loc}>Borneo</Text>
                </View>
                <Rating
                  ratingCount={5}
                  imageSize={14}
                  readonly={true}
                  type="custom"
                  ratingBackgroundColor="#dddee2"
                  startingValue={4 / 1}
                  style={styles.rating}
                />
              </View>
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.item}>
                <Image
                  source={require("../../assets/images/sarung.jpg")}
                  style={styles.imageItem}
                />
                <Text style={styles.titleItem}>Mamanda Thea</Text>
                <View style={styles.containerItemLoc}>
                  <Ionicons name="location-outline" />
                  <Text style={styles.loc}>Borneo</Text>
                </View>
                <Rating
                  ratingCount={5}
                  imageSize={14}
                  readonly={true}
                  type="custom"
                  ratingBackgroundColor="#dddee2"
                  startingValue={4 / 1}
                  style={styles.rating}
                />
              </View>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
      <FooterTabs
        screen={strings.Menu1}
        navigation={navigation}
        direction={currentDirection}
      />
    </ScreenBase>
  );
};

const styles = StyleSheet.create({
  searchItem: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 15,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    zIndex: 9999,
  },
  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: "center",
    overflow: "hidden",
  },
  banner: (scrollA) => ({
    height: screenHeight * 0.35,
    width: "100%",
    position: "relative",
    transform: [
      {
        translateY: scrollA,
      },
    ],
  }),
  scrollView: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 25,
    paddingHorizontal: 20,
    marginTop: -25,
  },
  scrollHandler: {
    marginTop: 10,
    backgroundColor: "#555",
    width: screenWidth * 0.15,
    height: 3,
    alignSelf: "center",
  },
  scrollContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 75,
  },
  contentContainer: {
    width: "50%",
    alignItems: "center",
    marginBottom: 12,
  },
  item: {
    width: "92%",
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 25,

    elevation: 8,
  },
  imageItem: { width: "100%", height: 155 },
  titleItem: { fontSize: 16, marginHorizontal: 12, marginTop: 5, height: 20 },
  containerItemLoc: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  loc: {
    fontFamily: "roboto_thin",
    fontSize: 12,
    marginLeft: 5,
  },
  rating: {
    display: "flex",
    alignSelf: "flex-start",
    marginLeft: 12,
    marginTop: 5,
    marginBottom: 10,
  },
  shadowSearch: {
    shadowColor: "#000",
    elevation: 10,
    shadowOpacity: 0.5,
  },
  imageBack: {
    height: "100%",
    width: screenWidth,
    position: "relative",
  },
  textContainer: { position: "absolute", bottom: 50, left: 25 },
  titleFeatured: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 24,
    textShadowColor: "#555",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  locationFeatured: {
    color: "#fff",
    marginTop: -3,
    fontSize: 12,
    textShadowColor: "#555",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3,
  },
});

export default Home;
