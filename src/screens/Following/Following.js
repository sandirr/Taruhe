import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Tab, Text, ListItem, Left, Thumbnail, Body } from "native-base";
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

export default function Following({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [search, setSearch] = useState("");

    const [Following, setFollowing] = useState([])

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
        if (profile.following.length) {
            let following = profile.following.filter(data => data.storeName.match(re) || data.username.match(re))
            setFollowing(following)
            setLoading(false)
        } else {
            setFollowing([])
            setLoading(false)
        }
    }

    return (
        <ScreenBase>
            <Header
                title="Following"
                openEtc={(e) => setModalVisible(e)}
                navigation={navigation}
                searchValue={search}
                onChangeSearch={(e) => setSearch(e)}
            />
            {loading ?
                <LoadData />
                :
                <View style={{ flex: 1, backgroundColor: '#f3f3f3', borderTopLeftRadius: 18, borderTopRightRadius: 18, marginTop: 10 }}>
                    {Following.length ?
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                        >
                            {Following.map((item) => (
                                <ListItem avatar onPress={() => navigation.navigate('StoreAccount', { type: 'visitor', uid: item.uid })}>
                                    <Left>
                                        <Thumbnail source={{
                                            uri: item.photoURL ||
                                                'https://cdn.iconscout.com/icon/free/png-256/account-profile-avatar-man-circle-round-item-30452.png'
                                        }} />
                                    </Left>
                                    <Body style={{
                                        borderBottomWidth: 1,
                                        paddingBottom: 18
                                    }}>
                                        <Text>{item.storeName}</Text>
                                        <Text note>{item.username}</Text>
                                    </Body>
                                </ListItem>
                            ))
                            }
                        </ScrollView>
                        :
                        <NotFound />
                    }
                </View>
            }
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
