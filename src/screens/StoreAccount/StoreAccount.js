import React, { useState, useRef, useEffect } from 'react';
import {
    Dimensions,
    StyleSheet,
    Animated,
    LogBox,
    TouchableOpacity,
    Image,
} from 'react-native';
import strings from '../../assets/Dictionary';
import { Item, Input, Icon, View, Button, Text } from 'native-base';
import { primeColor } from '../../configs/color';
import ScreenBase from '../../elements/SecreenBase';
import { ScrollView } from 'react-native-gesture-handler';
import SellingItem from '../../elements/SellingItem';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const StoreAccount = (props) => {
    const scrollA = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, []);
    const [tabs] = useState([
        'Product',
        'Service'
    ])
    const [activeTab, setActiveTab] = useState(tabs[0])
    const { navigation } = props;
    const [isScroll, setIsScroll] = useState(false)
    const handleScroll = (e) => {
        const { contentSize, contentInset, contentOffset } = e.nativeEvent
        const maxOffset = contentSize.height - screenHeight + contentInset.bottom - 50;
        if (contentOffset.y > maxOffset) {
            setIsScroll(true)
        } else {
            setIsScroll(false)
        }
    }

    return (
        <ScreenBase barStyle="light-content">
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                    {
                        useNativeDriver: true,
                        listener: (event) => {
                            handleScroll(event);
                        },
                    }
                )}
                scrollEventThrottle={16}
            >
                <View style={styles.bannerContainer}>
                    <Animated.View style={styles.banner(scrollA)}>
                        <View style={{ backgroundColor: primeColor, flex: 1 }}>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Icon name="caret-back" style={styles.iconBack} />
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Button rounded small bordered
                                        style={styles.followBtn}>
                                        <Text style={styles.followText} >Follow</Text>
                                    </Button>
                                    <Icon name="ellipsis-vertical" style={styles.etc} />
                                </View>
                            </View>

                            <View style={styles.avatarContainer}>
                                <Image
                                    source={require('../../assets/images/sarung.jpg')}
                                    style={{ height: 120, width: 120 }}
                                />
                            </View>

                            <View style={styles.userInfo}>
                                <Text style={styles.storeName}>Kalea OFFICIAL</Text>
                                <Text style={styles.owner}>Susi Pudjiastuti</Text>
                            </View>

                            <View style={styles.contactContainer}>
                                <TouchableOpacity>
                                    <View style={styles.toConnect}>
                                        <Icon name="mail-outline" style={styles.iToConnect} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View style={styles.toConnect}>
                                        <Icon name="location-outline" style={styles.iToConnect} />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View style={styles.toConnect}>
                                        <Icon name="call-outline" style={styles.iToConnect} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animated.View>
                </View>

                <View style={styles.scrollView}>
                    <View style={styles.itemsContainer}>
                        <Button small rounded
                            style={[styles.btnTab, activeTab === tabs[0] &&
                                { backgroundColor: primeColor }]}
                            onPress={() => setActiveTab(tabs[0])}
                        >
                            <Text style={styles.tabText}>
                                {strings.Menu2}
                            </Text>
                        </Button>
                        <Button small rounded
                            style={[styles.btnTab, , activeTab === tabs[1] &&
                                { backgroundColor: primeColor }]}
                            onPress={() => setActiveTab(tabs[1])}
                        >
                            <Text style={styles.tabText}>
                                {strings.Menu3}
                            </Text>
                        </Button>
                    </View>
                    <View style={{ paddingBottom: 50 }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={isScroll}
                        >
                            <SellingItem />
                            <SellingItem />
                            <SellingItem />
                            <SellingItem />
                            <SellingItem />
                            <SellingItem />
                        </ScrollView>
                    </View>
                </View>
            </Animated.ScrollView>
        </ScreenBase>
    );
};

const styles = StyleSheet.create({
    searchItem: {
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 15,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        zIndex: 9999,
    },
    bannerContainer: {
        marginTop: -1000,
        paddingTop: 1000,
        alignItems: 'center',
        overflow: 'hidden',
    },
    banner: (scrollA) => ({
        height: screenHeight * 0.46,
        width: '100%',
        position: 'relative',
        transform: [
            {
                translateY: scrollA,
            },
        ],
    }),
    scrollView: {
        backgroundColor: '#f3f3f3',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        paddingTop: 18,
        paddingHorizontal: 25,
        marginTop: -25,
        height: (screenHeight - 50)
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingHorizontal: 32,
        paddingBottom: 15,
        alignItems: 'center'
    },
    iconBack: { color: '#fff', fontSize: 26 },
    followBtn: {
        borderColor: '#fff',
        height: 26,
        alignSelf: 'center',
        paddingHorizontal: 2
    },
    followText: { textTransform: 'capitalize', color: '#fff', fontSize: 12 },
    etc: { color: '#fff', fontSize: 26, marginLeft: 10 },
    avatarContainer: {
        alignSelf: 'center',
        height: 120,
        width: 120,
        borderRadius: 60,
        overflow: 'hidden',
        marginTop: -20
    },
    storeName: {
        fontSize: 24,
        color: '#fff',
        fontWeight: '700'
    },
    owner: {
        fontSize: 13,
        color: '#fff',
        textDecorationLine: 'underline',
    },
    contactContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16
    },
    userInfo: { alignItems: 'center', marginTop: 10 },
    toConnect: {
        height: 45,
        width: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        marginHorizontal: 10
    },
    iToConnect: { fontSize: 24 },
    itemsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 18
    },
    btnTab: {
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a8c8c7'
    },
    tabText: { textTransform: 'capitalize', fontSize: 16 }
});

export default StoreAccount;
