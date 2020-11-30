import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Tab, Text, Spinner, Icon } from "native-base";
import {
  View,
  StyleSheet,
  Dimensions,
  RefreshControl,
  Image,
  Pressable,
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
import LoadData from "../../elements/LoadData";
import NotFound from "../../elements/NotFound";
import { ScrollView } from "react-native-gesture-handler";

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

  const [loading, setLoading] = useState(true)

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
              let re = new RegExp(search.trim(), 'gi');
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
          setLoading(false)
        }, (error) => {
          setLoading(false)
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
          {loading ?
            <LoadData />
            :
            <DataList refreshing={refreshing} onRefresh={onRefresh} whenScroll={handleScroll} navigation={navigation} data={Clothing} />
          }
        </Tab>
        <Tab
          textStyle={{ color: "rgba(0.0, 109.0, 109.0, 0.4)" }}
          tabStyle={{ backgroundColor: "#fff" }}
          activeTabStyle={{ backgroundColor: "#fff" }}
          activeTextStyle={{ color: primeColor }}
          heading={strings.Accessories}
        >{loading ?
          <LoadData />
          :
          <DataList refreshing={refreshing} onRefresh={onRefresh} whenScroll={handleScroll} navigation={navigation} data={Accessories} />
          }
        </Tab>
        <Tab
          textStyle={{ color: "rgba(0.0, 109.0, 109.0, 0.4)" }}
          tabStyle={{ backgroundColor: "#fff" }}
          activeTabStyle={{ backgroundColor: "#fff" }}
          activeTextStyle={{ color: primeColor }}
          heading={strings.Culinar}
        >
          {loading ?
            <LoadData />
            :
            <DataList refreshing={refreshing} onRefresh={onRefresh} whenScroll={handleScroll} navigation={navigation} data={Culinar} />
          }
        </Tab>
        <Tab
          textStyle={{ color: "rgba(0.0, 109.0, 109.0, 0.4)" }}
          tabStyle={{ backgroundColor: "#fff" }}
          activeTabStyle={{ backgroundColor: "#fff" }}
          activeTextStyle={{ color: primeColor }}
          heading={strings.Musical}
        >
          {loading ?
            <LoadData />
            :
            <DataList refreshing={refreshing} onRefresh={onRefresh} whenScroll={handleScroll} navigation={navigation} data={Musical} />
          }
        </Tab>
      </Tabs>
      <FooterTabs screen={strings.Menu2} navigation={navigation} direction={currentDirection} />

      <EtcAct
        modalVisible={modalVisible}
        openEtc={(e) => setModalVisible(e)}
        navigation={navigation}
      />
    </ScreenBase>
  );
}

export const DataList = ({ whenScroll, data, navigation, refreshing, onRefresh }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f3f3f3', borderTopLeftRadius: 18, borderTopRightRadius: 18 }}>
      {data.length ?
        <ScrollView
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
            {data.map((item) => (
              <ProductItem row={item} key={item.id} toDetail={() => navigation.navigate('DetailItem', { detail: item })} />
            ))}
          </View>
        </ScrollView>
        :
        <NotFound />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {

  },
});
