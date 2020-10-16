import React, { useState, useRef, useEffect } from "react";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Animated,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import strings from "../../assets/Dictionary";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Icon,
  View,
  Button,
} from "native-base";
import { primeColor } from "../../configs/color";
import { ScrollView } from "react-native-gesture-handler";
import ScreenBase from "../../elements/SecreenBase/ScreenBase";
import FooterTabs from "../../elements/FooterTabs/FooterTabs";
import { useKeyboard } from "react-native-keyboard-height";

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const Home = (props) => {
  const scrollA = useRef(new Animated.Value(0)).current;
  const { navigation } = props;
  const [bgSearch, setBgSearch] = useState("transparent");
  const [offset, setOffset] = useState(0);
  const [currentDirection, setDirection] = useState("up");

  const handleScroll = (e) => {
    // if (e.nativeEvent.contentOffset.y >= 80) {
    //   const alpha = e.nativeEvent.contentOffset.y * 0.005;
    //   setBgSearch(`rgba(255,255,255,${alpha < 1 ? alpha : 1})`);
    // } else {
    //   setBgSearch("transparent");
    // }
    var currentOffset = e.nativeEvent.contentOffset.y;
    var direction = currentOffset > offset + 35 ? "down" : "up";
    if (currentOffset > offset + 35 || currentOffset + 35 < offset) {
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

  const [keyboardHeigth] = useKeyboard(
    didShow,
    didHide
  ); /* initialize the hook (optional parameters) */

  const [viewHeight, setViewHeight] = useState(
    screenHeight
  ); /* for example with didShow and didHide */

  useEffect(() => {
    console.log(keyboardHeigth);
  }, [keyboardHeigth]);

  return (
    <ScreenBase
      screen={strings.Menu1}
      navigation={navigation}
      direction={currentDirection}
    >
      <View style={[styles.searchItem, { backgroundColor: bgSearch }]}>
        <Item
          rounded
          style={{
            width: "75%",
            backgroundColor: "#fff",
            borderColor: "#fff",
          }}
        >
          <Icon active name="search" style={{ color: primeColor }} />
          <Input
            placeholder="Pencarian"
            placeholderTextColor={primeColor}
            style={{ color: primeColor, fontFamily: "roboto_thin" }}
          />
        </Item>
        <Icon name="heart" style={{ color: "#fff" }} />
        <Icon name="mail" style={{ color: "#fff" }} />
      </View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          {
            useNativeDriver: true,
          }
        )}
        onScrollEndDrag={() => setDirection("up")}
        scrollEventThrottle={20}
      >
        <View style={styles.bannerContainer}>
          <Animated.Image
            style={styles.banner(scrollA)}
            source={require("../../assets/images/jalil.jpg")}
          />
        </View>
        <View
          // home
          style={{
            height:
              screenHeight * 0.825 - (keyboardHeigth ? keyboardHeigth + 32 : 0),
            backgroundColor: "#fff",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            marginTop: -24,
          }}
        >
          <View
            // garis
            style={{
              marginTop: 15,
              marginBottom: 20,
              backgroundColor: "#dddee2",
              width: screenWidth * 0.18,
              height: 5,
              alignSelf: "center",
              borderRadius: 25,
            }}
          />
          <View
            // containerContent
            style={{ paddingHorizontal: 25 }}
          >
            <ScrollView
              // scroll area
              onScroll={handleScroll}
              showsVerticalScrollIndicator={false}
            >
              <View
                // container item
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                <View
                  // container content item
                  style={{
                    width: "50%",
                    alignItems: "center",
                    marginBottom: 15,
                  }}
                >
                  <View
                    // item
                    style={{
                      width: "90%",
                      borderRadius: 15,
                      overflow: "hidden",
                      backgroundColor: "#dddee2",
                    }}
                  >
                    <Image
                      source={require("../../assets/images/sarung.jpg")}
                      style={{ width: "100%", height: 160 }}
                    />
                    <Text>okok</Text>
                    <Text>okok</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
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

const styles = {
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
    transform: [
      {
        translateY: scrollA,
      },
    ],
  }),
};

export default Home;
