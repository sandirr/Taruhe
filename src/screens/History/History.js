import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Tab, Text } from "native-base";
import { ScrollView, View, StyleSheet, RefreshControl } from "react-native";
import strings from "../../assets/Dictionary";
import ScreenBase from "../../elements/SecreenBase";
import Header from "../../elements/Header";
import EtcAct from "../../elements/EtcAct";
import ProductItem from "../../elements/ProductItem";
import { fDB } from "../../configs/firebase";
import { wait } from '../../configs/helper';
import LoadData from "../../elements/LoadData";
import NotFound from "../../elements/NotFound";
import { profile } from "../../configs/profile";

export default function History({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState("");
    const [dataSize, setDataSize] = useState(10)

    const [History, setHistory] = useState([])

    const [refreshing, setRefreshing] = useState(false);

    const [loading, setLoading] = useState(true)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getData()
        wait(1000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        getData()
    }, [search, dataSize])

    const getData = () => {
        fDB.ref('history')
            .child(profile.data.uid)
            .limitToLast(dataSize)
            .on('value', values => {
                if (values.val()) {
                    let filteredItems = []
                    Object.keys(values.val()).forEach((value) => {
                        let newItem = values.val()[value];
                        let re = new RegExp(search.trim(), 'gi');
                        if (newItem.title.match(re)) {
                            filteredItems.push(newItem);
                        }
                    })
                    setHistory(filteredItems)
                }
                setLoading(false)
            }, (error) => {
                Alert.alert(error.code)
                setLoading(false)
            })
    }

    const whenScroll = (e) => {
        const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent
        if ((layoutMeasurement.height + contentOffset.y) >= (contentSize.height - 20)) {
            setDataSize(dataSize + 10)
        }
    };

    return (
        <ScreenBase>
            <Header
                title="History"
                openEtc={(e) => setModalVisible(e)}
                navigation={navigation}
                searchValue={search}
                onChangeSearch={(e) => setSearch(e)}
            />
            <View style={{ flex: 1, backgroundColor: '#f3f3f3', borderTopLeftRadius: 18, borderTopRightRadius: 18, marginTop: 10 }}>
                {loading ?
                    <LoadData />
                    :
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
                            {History.length ?
                                History
                                    .sort((a, b) => b.history_at - a.history_at)
                                    .map((item) => (
                                        <ProductItem row={item} key={item.id} toDetail={() => navigation.navigate('DetailItem', { detail: item })} />
                                    ))
                                :
                                <NotFound />
                            }
                        </View>
                    </ScrollView>
                }
            </View>
            <EtcAct
                modalVisible={modalVisible}
                openEtc={(e) => setModalVisible(e)}
                navigation={navigation}
            />
        </ScreenBase>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        display: "flex",

        paddingBottom: 75,
    },
});
