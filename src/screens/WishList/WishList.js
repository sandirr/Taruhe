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

export default function WishList({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState("");

    const [WishList, setWishList] = useState([])

    const [refreshing, setRefreshing] = useState(false);

    const [loading, setLoading] = useState(true)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getData()
        wait(1000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        getData()
    }, [search])

    const getData = () => {
        let re = new RegExp(search.trim(), 'gi');
        if (profile.wishlistData.length) {
            let wishListData = profile.wishlistData.filter(data => data.title.match(re))
            setWishList(wishListData)
            setLoading(false)
        } else {
            setWishList([])
            setLoading(false)
        }
    }

    return (
        <ScreenBase>
            <Header
                title="Wishlist"
                openEtc={(e) => setModalVisible(e)}
                navigation={navigation}
                searchValue={search}
                onChangeSearch={(e) => setSearch(e)}
            />
            {loading ?
                <LoadData />
                :
                <View style={{ flex: 1, backgroundColor: '#f3f3f3', borderTopLeftRadius: 18, borderTopRightRadius: 18, marginTop: 10 }}>
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
                            {WishList.length ?
                                WishList.map((item) => (
                                    <ProductItem row={item} key={item.id} toDetail={() => navigation.navigate('DetailItem', { detail: item })} />
                                ))
                                :
                                <NotFound />
                            }
                        </View>
                    </ScrollView>
                </View>
            }
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

const styles = StyleSheet.create({
    scrollContainer: {
        display: "flex",

        paddingBottom: 75,
    },
});
