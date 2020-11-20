import React, { useState, useRef, useEffect, Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Animated,
    LogBox,
    TouchableOpacity,
    Image,
    ToastAndroid,
    Modal,
    StatusBar,
    Pressable
} from 'react-native';
import strings from '../../assets/Dictionary';
import { Item, Input, Icon, View, Button, Text, Textarea, Fab } from 'native-base';
import { primeColor } from '../../configs/color';
import ScreenBase from '../../elements/SecreenBase';
import SellingItem from '../../elements/SellingItem';
import { ScrollView } from 'react-native-gesture-handler';
// import Geolocation from '@react-native-community/geolocation';
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import { currentLocation } from '../../configs/location';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const StoreAccount = ({ navigation }) => {
    return (
        <FormStore navigation={navigation} />
    );
}

class FormStore extends Component {
    state = {
        currentPosition: {},
        permission: true,
        position: {}
    }

    // componentDidMount() {
    //     this.getCurrentPosition()
    // }

    // getAddressFromCoordinates = ({ latitude, longitude }) => {
    //     return new Promise((resolve) => {
    //         const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=$AIzaSyC6X5ljOipfwatCZAOD9HW1dhbdr9zkLp0&mode=retrieveAddresses&prox=${latitude},${longitude}`
    //         fetch(url)
    //             .then(res => res.json())
    //             .then((resJson) => {
    //                 if (resJson
    //                     && resJson.Response
    //                     && resJson.Response.View
    //                     && resJson.Response.View[0]
    //                     && resJson.Response.View[0].Result
    //                     && resJson.Response.View[0].Result[0]) {
    //                     console.log(resJson.Response.View[0].Result[0].Location.Address.Label)
    //                     resolve(resJson.Response.View[0].Result[0].Location.Address.Label)
    //                 } else {
    //                     resolve()
    //                 }
    //             })
    //             .catch((e) => {
    //                 console.log('Error in getAddressFromCoordinates', e)
    //                 resolve()
    //             })
    //     })
    // }

    // getCurrentPosition = () => {
    //     Geolocation.getCurrentPosition((position) => {
    //         setTimeout(() => {
    //             this.setState({ permission: true, currentPosition: position.coords })
    //         }, 10)
    //     }, error => {
    //         console.log(error)
    //         this.setState({ permission: false })
    //     })
    // }

    render() {
        // const { currentPosition, permission, position } = this.state;
        return (
            <ScreenBase barStyle="dark-content">
                <ScrollView
                    contentContainerStyle={{
                        flex: 1,
                        backgroundColor: '#f3f3f3',
                        padding: 45,
                        minHeight: screenHeight,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 25,
                        }}
                    >
                        <Text style={{ fontSize: 24, color: "#555", fontWeight: '700' }}>
                            {strings.MyStore}
                        </Text>
                        <Image
                            style={{ width: 100, height: 25, marginTop: 5, marginRight: 5 }}
                            source={require("../../assets/images/taruhe_splash.png")}
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Nama Toko</Text>
                        <Item rounded style={styles.inputItem}>
                            <Input
                                textContentType="organizationName"
                            />
                        </Item>
                        <Text style={styles.label}>Lokasi Toko</Text>
                        <Textarea
                            placeholder="Nama jalan/Perumahan, Kelurahan, Kecamatan, Kota, Kode POS"
                            style={{
                                borderColor: primeColor,
                                borderWidth: 2,
                                borderRadius: 18,
                                padding: 10
                            }}
                            rowSpan={5}
                        />
                        <Text style={styles.label}>Nomor Handphone</Text>
                        <Item rounded style={styles.inputItem}>
                            <Input
                                textContentType="telephoneNumber"
                                keyboardType="number-pad"
                            />
                        </Item>
                        <Text style={styles.label}>Detail Toko</Text>
                        <Textarea
                            placeholder="Toko ini menyediakan..."
                            style={{
                                borderColor: primeColor,
                                borderWidth: 2,
                                borderRadius: 18,
                                padding: 10
                            }}
                            rowSpan={5}
                        />
                    </View>
                    <Button
                        rounded
                        style={[
                            {
                                backgroundColor: primeColor,
                                marginVertical: 35,
                            },
                            {
                                alignSelf: "center",
                                width: "90%",
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center",
                                height: 55,
                            }
                        ]}
                    >
                        <Text style={{ color: "#fff", fontWeight: '700', fontSize: 16 }}>
                            Simpan
                        </Text>
                    </Button>
                </ScrollView>
                {/* <Modal visible={!permission} transparent animationType="slide">
                    {!permission &&
                        <View style={{
                            flex: 1,
                            justifyContent: "flex-end",
                            alignItems: 'center',
                            backgroundColor: 'transparent'
                        }}>
                            <View style={{
                                backgroundColor: '#fff',
                                width: '90%',
                                borderRadius: 18,
                                paddingVertical: 20,
                                paddingHorizontal: 45,
                                marginBottom: 20,
                                borderColor: '#ccc',
                                borderWidth: 1
                            }}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontWeight: '700'
                                }}>
                                    Anda harus mengaktifkan GPS/Lokasi terlebih dahulu
                            </Text>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    marginTop: 12
                                }}>
                                    <Button
                                        rounded
                                        style={{
                                            marginHorizontal: 10,
                                            backgroundColor: primeColor
                                        }}
                                        small
                                        onPress={() => this.props.navigation.goBack()}
                                    >
                                        <Text style={{ textTransform: 'capitalize' }}>Kembali</Text>
                                    </Button>
                                    <Button
                                        rounded
                                        style={{ marginHorizontal: 10, backgroundColor: primeColor }}
                                        small
                                        onPress={this.getCurrentPosition}
                                    >
                                        <Text style={{ textTransform: 'capitalize' }}>Selesai</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    }
                </Modal> */}
            </ScreenBase>
        );
    }
}

const Store = ({ navigation }) => {
    const scrollA = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, []);
    const [tabs] = useState([
        'Product',
        'Service'
    ])
    const [isAdd, setIsAdd] = useState(false)
    const [activeTab, setActiveTab] = useState(tabs[0])
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
                                    {activeTab === tabs[1] &&
                                        <Button rounded small bordered
                                            style={styles.followBtn}>
                                            <Text style={styles.followText} >Follow</Text>
                                        </Button>
                                    }
                                    <Icon name="ellipsis-vertical" style={styles.etc} />
                                </View>
                            </View>

                            <View style={styles.avatarContainer}>
                                <Image
                                    source={require('../../assets/images/sarung.jpg')}
                                    style={{ height: 120, width: 120 }}
                                />
                                {activeTab === tabs[0] &&
                                    <View style={styles.editBtn}>
                                        <Icon name="create-outline" style={{
                                            fontSize: 22,
                                            marginTop: 4
                                        }} />
                                    </View>
                                }
                            </View>

                            <View style={styles.userInfo}>
                                <Text style={styles.storeName}>Kalea OFFICIAL</Text>
                                <Text style={styles.owner}>Susi Pudjiastuti</Text>
                            </View>

                            <View style={styles.contactContainer}>
                                {activeTab === tabs[0]
                                    ?
                                    <>
                                        {isAdd &&
                                            <Pressable onPress={() => navigation.navigate('AddItem', { type: 'product' })}>
                                                <View
                                                    style={{
                                                        backgroundColor: '#fff',
                                                        marginHorizontal: 10,
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        borderRadius: 25,
                                                        width: 70,
                                                        paddingVertical: 3
                                                    }}
                                                    rounded
                                                >
                                                    <Icon name="cube-outline" style={styles.iToConnect} />
                                                    <Text style={{
                                                        color: '#000',
                                                        fontSize: 12,
                                                        marginTop: -3
                                                    }}
                                                    >
                                                        {strings.Menu2}
                                                    </Text>
                                                </View>
                                            </Pressable>
                                        }
                                        {!isAdd &&
                                            <Button
                                                style={{
                                                    backgroundColor: '#fff',
                                                    marginHorizontal: 10,
                                                }}
                                                rounded
                                                onPress={() => setIsAdd(!isAdd)}
                                            >
                                                <Icon name="add-circle-outline" style={styles.iToConnect} />
                                            </Button>
                                        }
                                        {isAdd &&
                                            <Pressable onPress={() => navigation.navigate('AddItem', { type: 'service' })}>
                                                <View
                                                    style={{
                                                        backgroundColor: '#fff',
                                                        marginHorizontal: 10,
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        borderRadius: 25,
                                                        width: 70,
                                                        paddingVertical: 3
                                                    }}
                                                    rounded
                                                >
                                                    <Icon name="people-outline" style={styles.iToConnect} />
                                                    <Text style={{
                                                        color: '#000',
                                                        fontSize: 12,
                                                        marginTop: -3
                                                    }}
                                                    >
                                                        {strings.Menu3}
                                                    </Text>
                                                </View>
                                            </Pressable>
                                        }
                                    </>
                                    :
                                    <>
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
                                    </>
                                }
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
        </ScreenBase >
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
        paddingTop: 45,
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
        marginTop: -20,
        position: 'relative'
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
    iToConnect: { fontSize: 24, color: '#000' },
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
    tabText: { textTransform: 'capitalize', fontSize: 16 },
    editBtn: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 35,
        alignItems: 'center',
    },
    label: {
        color: "#555",
        marginTop: 20,
        marginBottom: 8,
        marginLeft: 3,
    },
    inputItem: {
        paddingHorizontal: 5,
        paddingVertical: 3,
        marginLeft: -1,
        marginRight: -1,
        borderColor: primeColor,
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        height: 55
    },
});

export default StoreAccount;
