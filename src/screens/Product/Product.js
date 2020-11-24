import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Tab, Text } from "native-base";
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from "react-native";
import strings from "../../assets/Dictionary";
import { primeColor } from "../../configs/color";
import FooterTabs from "../../elements/FooterTabs/FooterTabs";
import ScreenBase from "../../elements/SecreenBase";
import Header from "../../elements/Header";
import EtcAct from "../../elements/EtcAct";
import ProductItem from "../../elements/ProductItem";
import { fDB } from "../../configs/firebase";
import { wait } from '../../configs/helper';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function Product({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentDirection, setDirection] = useState("up");

  const [itemsKey] = useState(['Clothing', 'Accessories', 'Culinar', 'Musical'])

  const [Clothing, setClothing] = useState([])
  const [Accessories, setAccessories] = useState([])
  const [Culinar, setCulinar] = useState([])
  const [Musical, setMusical] = useState([])

  const [refreshing, setRefreshing] = useState(false);
  const [dataSize, setDataSize] = useState(6)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setDataSize(6)
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const handleScroll = (e) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent
    let currentOffset = e.nativeEvent.contentOffset.y;
    let direction = currentOffset > offset + 20 ? "down" : "up";
    if (currentOffset > offset + 20 || currentOffset + 20 < offset) {
      setOffset(currentOffset);
      setDirection(direction);
    }
    if ((layoutMeasurement.height + contentOffset.y) >= (contentSize.height - 20)) {
      setDataSize(dataSize + 6)
    }
  };

  useEffect(() => {
    getData()
  }, [dataSize, search])

  const getData = () => {
    itemsKey.forEach((item) => {
      fDB.ref('product_service')
        .limitToLast(10)
        .orderByChild('category')
        .equalTo(item)
        .on('value', (values) => {
          if (values.val()) {
            let allItems = []
            Object.keys(values.val()).map((value) => {
              let newItem = values.val()[value];
              let re = new RegExp(search, 'gi');
              if (newItem.title.match(re)) {
                allItems.push(newItem);
              }
            })
            if (item === 'Clothing')
              setClothing(allItems)
            else if (item === 'Accessories')
              setAccessories(allItems)
            else if (item === 'Culinar')
              setCulinar(allItems)
            else if (item === 'Musical')
              setMusical(allItems)
          }
        }, (error) => {
          Alert.alert(error.code)
        })
    })
  }

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
          <DataList refreshing={refreshing} onRefresh={onRefresh} whenScroll={handleScroll} navigation={navigation} data={Clothing} />
        </Tab>
        <Tab
          textStyle={{ color: "rgba(0.0, 109.0, 109.0, 0.4)" }}
          tabStyle={{ backgroundColor: "#fff" }}
          activeTabStyle={{ backgroundColor: "#fff" }}
          activeTextStyle={{ color: primeColor }}
          heading={strings.Accessories}
        >
          <DataList refreshing={refreshing} onRefresh={onRefresh} whenScroll={handleScroll} navigation={navigation} data={Accessories} />
        </Tab>
        <Tab
          textStyle={{ color: "rgba(0.0, 109.0, 109.0, 0.4)" }}
          tabStyle={{ backgroundColor: "#fff" }}
          activeTabStyle={{ backgroundColor: "#fff" }}
          activeTextStyle={{ color: primeColor }}
          heading={strings.Culinar}
        >
          <DataList refreshing={refreshing} onRefresh={onRefresh} whenScroll={handleScroll} navigation={navigation} data={Culinar} />
        </Tab>
        <Tab
          textStyle={{ color: "rgba(0.0, 109.0, 109.0, 0.4)" }}
          tabStyle={{ backgroundColor: "#fff" }}
          activeTabStyle={{ backgroundColor: "#fff" }}
          activeTextStyle={{ color: primeColor }}
          heading={strings.Musical}
        >
          <DataList refreshing={refreshing} onRefresh={onRefresh} whenScroll={handleScroll} navigation={navigation} data={Musical} />
        </Tab>
      </Tabs>
      <FooterTabs screen={strings.Menu2} navigation={navigation} direction={currentDirection} />

      <EtcAct
        modalVisible={modalVisible}
        openEtc={(e) => setModalVisible(e)}
        navigation={navigation}
      >
        <Text>Pesanan</Text>
        <Text>Bantuan</Text>
        <Text>FAQ</Text>
        <Text>Pengaturan</Text>
      </EtcAct>
    </ScreenBase>
  );
}

export const DataList = ({ whenScroll, data, navigation, refreshing, onRefresh }) => {
  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: "#f3f3f3",
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        flex: 1
      }}
      onScroll={(e) => whenScroll(e)}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 25,
          paddingBottom: 50,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {data.length ?
          data.map((item) => (
            <ProductItem row={item} key={item.id} toDetail={() => navigation.navigate('DetailItem', { detail: item })} />
          ))
          :
          <Text>No Data</Text>
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {

  },
});
