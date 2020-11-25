import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Tab, Text } from "native-base";
import { ScrollView, View, StyleSheet, RefreshControl } from "react-native";
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

export default function Tourism({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentDirection, setDirection] = useState("up");
  const [itemsKey] = useState(['Natural', 'Cultural'])

  const [Natural, setNatural] = useState([])
  const [Cultural, setCultural] = useState([])

  const [refreshing, setRefreshing] = useState(false);
  const [dataSize, setDataSize] = useState(6)

  const [loading, setLoading] = useState(true)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setDataSize(6)
    wait(1000).then(() => setRefreshing(false));
  }, []);

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
            if (item === 'Natural')
              setNatural(allItems)
            else if (item === 'Cultural')
              setCultural(allItems)
          }
          setLoading(false)
        }, (error) => {
          setLoading(false)
          Alert.alert(error.code)
        })
    })
  }

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

  return (
    <ScreenBase>
      <Header
        title={strings.Menu4}
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
          heading={strings.Natural}
        >{loading ?
          <LoadData />
          :
          <DataList refreshing={refreshing} onRefresh={onRefresh} whenScroll={handleScroll} navigation={navigation} data={Natural} />
          }
        </Tab>
        <Tab
          textStyle={{ color: "rgba(0.0, 109.0, 109.0, 0.4)" }}
          tabStyle={{ backgroundColor: "#fff" }}
          activeTabStyle={{ backgroundColor: "#fff" }}
          activeTextStyle={{ color: primeColor }}
          heading={strings.Cultural}
        >
          {loading ?
            <LoadData />
            :
            <DataList refreshing={refreshing} onRefresh={onRefresh} whenScroll={handleScroll} navigation={navigation} data={Cultural} />
          }
        </Tab>
      </Tabs>
      <FooterTabs
        screen={strings.Menu4}
        navigation={navigation}
        direction={currentDirection}
      />
      <EtcAct
        modalVisible={modalVisible}
        openEtc={(e) => setModalVisible(e)}
        navigation={navigation}
      >
        <Text style={styles.modalText}>Pesanan</Text>
        <Text style={styles.modalText}>Bantuan</Text>
        <Text style={styles.modalText}>FAQ</Text>
        <Text style={styles.modalText}>Pengaturan</Text>
      </EtcAct>
    </ScreenBase>
  );
}

export const DataList = ({ whenScroll, data, navigation, refreshing, onRefresh }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f3f3f3', borderTopLeftRadius: 18, borderTopRightRadius: 18, }}>
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
          {data.length ?
            data.map((item) => (
              <ProductItem row={item} key={item.id} toDetail={() => navigation.navigate('DetailItem', { detail: item })} type="lebar" />
            ))
            :
            <NotFound />
          }
        </View>
      </ScrollView>
    </View>
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
