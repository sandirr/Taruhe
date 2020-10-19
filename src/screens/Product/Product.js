import React from "react";
import { Text, Icon, Item, Input, Tabs, Tab } from "native-base";
import { ScrollView, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import strings from "../../assets/Dictionary";
import { primeColor } from "../../configs/color";
import FooterTabs from "../../elements/FooterTabs/FooterTabs";
import ScreenBase from "../../elements/SecreenBase/ScreenBase";
import { Rating } from "react-native-ratings";

export default function Product({ navigation }) {
  return (
    <ScreenBase screen={strings.Menu2} navigation={navigation}>
      <View
        style={{
          backgroundColor: "#fff",
          paddingTop: 45,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back"
              style={{ color: primeColor, fontSize: 26, fontWeight: "bold" }}
            />
          </TouchableOpacity>
          <Text style={{ fontWeight: "bold", fontSize: 24, color: primeColor }}>
            {strings.Menu2}
          </Text>
          <Ionicons
            name="ellipsis-vertical"
            style={{ color: primeColor, fontSize: 24 }}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Item
            rounded
            style={{
              width: "82%",
              backgroundColor: "#f3f3f3",
              borderColor: "#f3f3f3",
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
          <Icon name="filter" style={{ color: primeColor, marginRight: 7 }} />
        </View>
      </View>
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
          heading="Kloting"
        >
          <DataList />
        </Tab>
        <Tab
          textStyle={{ color: "rgba(0.0, 109.0, 109.0, 0.4)" }}
          tabStyle={{ backgroundColor: "#fff" }}
          activeTabStyle={{ backgroundColor: "#fff" }}
          activeTextStyle={{ color: primeColor }}
          heading="Aksesoris"
        >
          <DataList />
        </Tab>
        <Tab
          textStyle={{ color: "rgba(0.0, 109.0, 109.0, 0.4)" }}
          tabStyle={{ backgroundColor: "#fff" }}
          activeTabStyle={{ backgroundColor: "#fff" }}
          activeTextStyle={{ color: primeColor }}
          heading="Kuliner"
        >
          <DataList />
        </Tab>
        <Tab
          textStyle={{ color: "rgba(0.0, 109.0, 109.0, 0.4)" }}
          tabStyle={{ backgroundColor: "#fff" }}
          activeTabStyle={{ backgroundColor: "#fff" }}
          activeTextStyle={{ color: primeColor }}
          heading="Mampir"
        >
          <DataList />
        </Tab>
      </Tabs>
      <FooterTabs screen={strings.Menu2} navigation={navigation} />
    </ScreenBase>
  );
}

export const DataList = () => {
  return (
    <ScrollView
      style={{
        backgroundColor: "#f3f3f3",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}
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
});
