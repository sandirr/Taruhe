import React, { useState } from "react";
import { Text, Tabs, Tab } from "native-base";
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import strings from "../../assets/Dictionary";
import { primeColor } from "../../configs/color";
import FooterTabs from "../../elements/FooterTabs/FooterTabs";
import ScreenBase from "../../elements/SecreenBase";
import { Rating } from "react-native-ratings";
import Header from "../../elements/Header";
import EtcAct from "../../elements/EtcAct";

export default function Product({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentDirection, setDirection] = useState("up");

  const handleScroll = (e) => {
    let currentOffset = e.nativeEvent.contentOffset.y;
    let direction = currentOffset > offset + 20 ? "down" : "up";
    if (currentOffset > offset + 20 || currentOffset + 20 < offset) {
      setOffset(currentOffset);
      setDirection(direction);
    }
  };
  return (
    <ScreenBase>
      <Header
        title={strings.Menu2}
        openEtc={(e) => setModalVisible(e)}
        navigation={navigation}
        searchValue={search}
        onChangeSearch={(e) => setSearch(e)}
      />
      <Tabs
        tabContainerStyle={{
          elevation: 0,
          marginTop: 10,
          backgroundColor: "#fff",
        }}
      >
        <Tab
          textStyle={{ color: "rgba(0.0, 109.0, 109.0, 0.4)" }}
          tabStyle={{ backgroundColor: "#fff" }}
          activeTabStyle={{ backgroundColor: "#fff" }}
          activeTextStyle={{ color: primeColor }}
          heading={strings.Clothing}
        >
          <DataList whenScroll={handleScroll} />
        </Tab>
        <Tab
          textStyle={{ color: "rgba(0.0, 109.0, 109.0, 0.4)" }}
          tabStyle={{ backgroundColor: "#fff" }}
          activeTabStyle={{ backgroundColor: "#fff" }}
          activeTextStyle={{ color: primeColor }}
          heading={strings.Accessories}
        >
          <DataList whenScroll={handleScroll} />
        </Tab>
        <Tab
          textStyle={{ color: "rgba(0.0, 109.0, 109.0, 0.4)" }}
          tabStyle={{ backgroundColor: "#fff" }}
          activeTabStyle={{ backgroundColor: "#fff" }}
          activeTextStyle={{ color: primeColor }}
          heading={strings.Culinar}
        >
          <DataList whenScroll={handleScroll} />
        </Tab>
        <Tab
          textStyle={{ color: "rgba(0.0, 109.0, 109.0, 0.4)" }}
          tabStyle={{ backgroundColor: "#fff" }}
          activeTabStyle={{ backgroundColor: "#fff" }}
          activeTextStyle={{ color: primeColor }}
          heading={strings.Musical}
        >
          <DataList whenScroll={handleScroll} />
        </Tab>
      </Tabs>
      <FooterTabs screen={strings.Menu2} navigation={navigation} />

      <EtcAct
        modalVisible={modalVisible}
        openEtc={(e) => setModalVisible(e)}
        navigation={navigation}
      />
    </ScreenBase>
  );
}

export const DataList = ({ whenScroll }) => {
  return (
    <ScrollView
      style={{
        backgroundColor: "#f3f3f3",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}
      onScroll={(e) => whenScroll(e)}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 25,
        }}
      >
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: 20,
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

    paddingBottom: 15,
  },
  imageItem: { width: "100%", height: 155 },
  titleItem: { fontSize: 16, marginHorizontal: 12, marginTop: 5, height: 22 },
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
  },
});
