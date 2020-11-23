import React, { useEffect, useState } from "react";
import { Tabs, Tab, Text } from "native-base";
import { ScrollView, View, StyleSheet } from "react-native";
import strings from "../../assets/Dictionary";
import { primeColor } from "../../configs/color";
import FooterTabs from "../../elements/FooterTabs/FooterTabs";
import ScreenBase from "../../elements/SecreenBase";
import Header from "../../elements/Header";
import EtcAct from "../../elements/EtcAct";
import ProductItem from "../../elements/ProductItem";
import { fDB } from "../../configs/firebase";

export default function Service({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentDirection, setDirection] = useState("up");
  const [itemsKey] = useState(['ArtShow', 'Travel'])

  const [ArtShow, setArtShow] = useState([])
  const [Travel, setTravel] = useState([])


  useEffect(() => {
    itemsKey.forEach((item) => {
      fDB.ref('service')
        .limitToLast(10)
        .orderByChild('category')
        .equalTo(item)
        .on('value', (values) => {
          if (values.val()) {
            let allItems = []
            Object.keys(values.val()).map((value) => {
              allItems.push(values.val()[value]);
            })
            if (item === 'ArtShow')
              setArtShow(allItems)
            else if (item === 'Travel')
              setTravel(allItems)
          }
        }, (error) => {
          Alert.alert(error.code)
        })
    })
  }, [])

  const handleScroll = (e) => {
    let currentOffset = e.nativeEvent.contentOffset.y;
    let direction = currentOffset > offset + 20 ? "down" : "up";
    if (currentOffset > offset + 20 || currentOffset + 20 < offset + 20) {
      setOffset(currentOffset);
      setDirection(direction);
    }
  };

  return (
    <ScreenBase>
      <Header
        title={strings.Menu3}
        openEtc={(e) => setModalVisible(e)}
        navigation={navigation}
        searchValue={search}
        onChangeSearch={(e) => setSearch(e)}
      />
      <Tabs
        tabContainerStyle={{
          elevation: 0,
          marginTop: 10,
          paddingHorizontal: 50,
          backgroundColor: "#fff",
        }}
      >
        <Tab
          textStyle={{ color: "rgba(0.0, 109.0, 109.0, 0.4)" }}
          tabStyle={{ backgroundColor: "#fff" }}
          activeTabStyle={{ backgroundColor: "#fff" }}
          activeTextStyle={{ color: primeColor }}
          heading={strings.ArtShow}
        >
          <DataList whenScroll={handleScroll} navigation={navigation} data={ArtShow} />
        </Tab>
        <Tab
          textStyle={{ color: "rgba(0.0, 109.0, 109.0, 0.4)" }}
          tabStyle={{ backgroundColor: "#fff" }}
          activeTabStyle={{ backgroundColor: "#fff" }}
          activeTextStyle={{ color: primeColor }}
          heading={strings.Travel}
        >
          <DataList whenScroll={handleScroll} navigation={navigation} data={Travel} />
        </Tab>
      </Tabs>
      <FooterTabs
        screen={strings.Menu3}
        navigation={navigation}
        direction={currentDirection}
      />
      <EtcAct
        modalVisible={modalVisible}
        openEtc={(e) => setModalVisible(e)}
        navigation={navigation}
      />
    </ScreenBase>
  );
}

export const DataList = ({ whenScroll, navigation, data }) => {
  return (
    <ScrollView
      style={{
        backgroundColor: "#f3f3f3",
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
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
          {data.length ?
            data.map((item) => (
              <ProductItem row={item} key={item.id} toDetail={() => navigation.navigate('DetailItem', { detail: item })} type="lebar" />
            ))
            :
            <Text>Loading...</Text>
          }
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
});
