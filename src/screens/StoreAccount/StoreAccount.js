import React, { useState, useRef, useEffect, Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Animated,
    LogBox,
    TouchableOpacity,
    Image,
    Pressable,
    Alert,
    Linking,
} from 'react-native';
import strings from '../../assets/Dictionary';
import { Item, Input, Icon, View, Button, Text, Textarea, Thumbnail, Picker } from 'native-base';
import { primeColor } from '../../configs/color';
import ScreenBase from '../../elements/SecreenBase';
import SellingItem from '../../elements/SellingItem';
import { profile } from '../../configs/profile';
import { fDB, fStorage } from '../../configs/firebase';
import ImagePicker from 'react-native-image-picker';
import Axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const StoreAccount = ({ navigation, route }) => {
    if (profile.data.storeName || route.params.type !== 'owner')
        return (
            <Store navigation={navigation} route={route} />
        );
    else
        return (
            <FormStore navigation={navigation} />
        );
}

class FormStore extends Component {
    state = {
        currentPosition: {},
        permission: true,
        position: { province: {}, district: {}, subDistrict: {} },
        storeName: '',
        storeLocation: '',
        phoneNumber: '',
        storeDetail: '',
        province: [],
        district: [],
        subDistrict: []
    }

    componentDidMount() {
        Axios.get('https://ibnux.github.io/data-indonesia/propinsi.json')
            .then((res) => {
                this.setState({ province: res.data })
            })
    }

    handleChangeProv = (e) => {
        this.setState({
            position: { province: e, district: {}, subDistrict: {} },
        }, this.handleSearchDistrict)
    }

    handleSearchDistrict = () => {
        Axios.get(`https://ibnux.github.io/data-indonesia/kabupaten/${this.state.position.province.id}.json`)
            .then((res) => {
                this.setState({ district: res.data })
            })
    }

    handleChangeDis = (e) => {
        this.setState({
            position: { ...this.state.position, district: e, subDistrict: {} }
        }, this.handleSearchSubDistric)
    }

    handleSearchSubDistric = () => {
        Axios.get(`https://ibnux.github.io/data-indonesia/kecamatan/${this.state.position.district.id}.json`)
            .then((res) => {
                this.setState({ subDistrict: res.data })
            })
    }

    handleChangeSubDis = (e) => {
        this.setState({
            position: { ...this.state.position, subDistrict: e }
        })
    }

    saveStore = () => {
        const { storeName, storeLocation, phoneNumber, storeDetail, position } = this.state
        if (storeName && storeLocation && phoneNumber && storeDetail && position.province.nama && position.subDistrict.nama && position.district.nama)
            fDB.ref('users')
                .child(profile.data.uid)
                .update({ ...profile.data, storeName, storeLocation, phoneNumber, storeDetail, position })
                .then(() => {
                    Alert.alert('Sukses', 'Your store is ready')
                    this.props.navigation.goBack()
                })
        else
            Alert.alert('Belum lengkap', 'Lengkapi isian yang tersedia!')
    }

    render() {
        const { storeName, storeLocation, phoneNumber, storeDetail, province, district, subDistrict } = this.state
        return (
            <ScreenBase barStyle="dark-content">
                <ScrollView
                    contentContainerStyle={{
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
                                value={storeName}
                                onChangeText={(text) => this.setState({ storeName: text })}
                                textContentType="organizationName"
                            />
                        </Item>
                        <Text style={styles.label}>Lokasi Toko</Text>
                        <Textarea
                            placeholder="Nama jalan/perumahan/nomor rumah"
                            style={{
                                borderColor: primeColor,
                                borderWidth: 2,
                                borderRadius: 18,
                                padding: 10
                            }}
                            rowSpan={3}
                            value={storeLocation}
                            onChangeText={(text) => this.setState({ storeLocation: text })}
                        />
                        <Text style={styles.label}>Provinsi</Text>
                        <Item picker rounded style={styles.inputItem}>
                            <Picker
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.position?.province}
                                onValueChange={(val) => this.handleChangeProv(val)}
                            >
                                <Picker.Item label="" value="" />
                                {province.map((loc) => (
                                    <Picker.Item label={loc.nama} value={loc} key={loc.id} />
                                ))}
                            </Picker>
                        </Item>
                        <Text style={styles.label}>Kabupaten/Kota</Text>
                        <Item picker rounded style={styles.inputItem}>
                            <Picker
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.position?.district}
                                onValueChange={(val) => this.handleChangeDis(val)}
                            >
                                <Picker.Item label="" value="" />
                                {district.length ? district.map((loc) => (
                                    <Picker.Item label={loc.nama} value={loc} key={loc.id} />
                                )) :
                                    <Picker.Item label="Pilih provinsi terlebih dahulu" value="" />
                                }
                            </Picker>
                        </Item>
                        <Text style={styles.label}>Kecamatan</Text>
                        <Item picker rounded style={styles.inputItem}>
                            <Picker
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.position?.subDistrict}
                                onValueChange={(val) => this.handleChangeSubDis(val)}
                            >
                                <Picker.Item label="" value="" />
                                {subDistrict.length ? subDistrict.map((loc) => (
                                    <Picker.Item label={loc.nama} value={loc} key={loc.id} />
                                )) :
                                    <Picker.Item label="Pilih Kabupaten/kota terlebih dahulu" value="" />
                                }
                            </Picker>
                        </Item>
                        <Text style={styles.label}>Nomor Handphone</Text>
                        <Item rounded style={styles.inputItem}>
                            <Input
                                value={phoneNumber}
                                onChangeText={(text) => this.setState({ phoneNumber: text })}
                                textContentType="telephoneNumber"
                                keyboardType="number-pad"
                            />
                        </Item>
                        <Text style={styles.label}>Detail Toko</Text>
                        <Textarea
                            value={storeDetail}
                            onChangeText={(text) => this.setState({ storeDetail: text })}
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
                        onPress={this.saveStore}
                    >
                        <Text style={{ color: "#fff", fontWeight: '700', fontSize: 16 }}>
                            Simpan
                        </Text>
                    </Button>
                </ScrollView>

            </ScreenBase>
        );
    }
}

const Store = ({ navigation, route }) => {
    const scrollA = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, []);
    const [tabs] = useState([
        'Product',
        'Service'
    ]);
    const [isAdd, setIsAdd] = useState(false)
    const [activeTab, setActiveTab] = useState(tabs[0])
    const [isScroll, setIsScroll] = useState(false)
    const [items, setItems] = useState([])
    const [visited, setVisited] = useState({
        photoURL: '',
        username: '',
        storeName: ''
    })
    const [loading, setLoading] = useState(true)
    const handleScroll = (e) => {
        const { contentSize, contentInset, contentOffset } = e.nativeEvent
        const maxOffset = contentSize.height - screenHeight + contentInset.bottom - 50;
        if (contentOffset.y > maxOffset) {
            setIsScroll(true)
        } else {
            setIsScroll(false)
        }
    }
    const { type, uid, storeData } = route.params;
    const { data } = profile
    useEffect(() => {
        if (type === 'owner') {
            setVisited({ photoURL: data.photoURL, username: data.username, storeName: data.storeName })
        } else {
            setVisited({ photoURL: storeData.photoURL, username: storeData.username, storeName: storeData.storeName })
        }
    }, [type, profile.data])

    useEffect(() => {
        setItems([])
        setLoading(true)
        fDB.ref(activeTab.toLowerCase())
            .orderByChild('uid')
            .equalTo(uid)
            .on('value', (values) => {
                if (values.val()) {
                    let allItems = []
                    Object.keys(values.val()).map((value) => {
                        allItems.push(values.val()[value]);
                    })
                    setItems(allItems)
                }
            }, (error) => {
                Alert.alert(error.code)
            })
        setLoading(false)
    }, [type, activeTab])

    const updateData = (newData) => {
        fDB
            .ref('users')
            .child(data.uid)
            .update(newData)
            .then(() => {
                Alert.alert('Sukses', 'Perubahan tersimpan, mungkin aplikasi perlu di refresh untuk melihat perubahan');
                profile.data = newData;
                setVisited({ photoURL: newData.photoURL, username: newData.username, storeName: newData.storeName })
            }).catch(err => {
                Alert.alert(err.code, err.message)
            })
    }
    const uploadImage = () => {
        const options = {
            quality: 0.7,
            allowsEditing: true,
            mediaType: 'photo',
            noData: true,
            storageOptions: {
                skipBackup: true,
                waitUntilSaved: true,
                path: 'images',
                cameraRoll: true,
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                // console.log('User cancelled image picker');
            } else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            } else {
                uploadFile(response.uri)
            }
        })
    }
    const uploadFile = async (uri) => {
        const file = await uriToBlob(uri)
        const extArr = file._data.name.split('.')
        const ext = extArr[extArr.length - 1]
        fStorage
            .ref(`profile_pictures/${data.uid}.${ext}`)
            .put(file)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                updateData({ ...data, photoURL: url })
            })
            .catch(error => {
                Alert.alert(error.code, error.message);
            })
    };
    const uriToBlob = uri => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new Error('Upload Image Failed'));
            };

            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
    };
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
                                    {type !== 'owner' &&
                                        <Button rounded small bordered
                                            style={styles.followBtn}>
                                            <Text style={styles.followText} >Follow</Text>
                                        </Button>
                                    }
                                    <Icon name="ellipsis-vertical" style={styles.etc} />
                                </View>
                            </View>

                            <View style={styles.avatarContainer}>
                                <Thumbnail
                                    source={visited.photoURL ? { uri: visited.photoURL } : require('../../assets/images/storefront.png')}
                                    style={{ height: 120, width: 120 }}
                                />
                                {type === 'owner' &&
                                    <TouchableOpacity style={styles.editBtn} onPress={uploadImage}>
                                        <Icon name="create-outline" style={{
                                            fontSize: 22,
                                            marginTop: 4
                                        }} />
                                    </TouchableOpacity>
                                }
                            </View>

                            <View style={styles.userInfo}>
                                <Text style={styles.storeName}>{visited.storeName}</Text>
                                <Text style={styles.owner}>{visited.username}</Text>
                            </View>

                            <View style={styles.contactContainer}>
                                {type === 'owner'
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
                                        <TouchableOpacity onPress={() =>
                                            Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${storeData.position.subDistrict.nama}`)}>
                                            <View style={styles.toConnect}>
                                                <Icon name="location-outline" style={styles.iToConnect} />
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => Linking.openURL(`tel:${storeData.phoneNumber}`)}>
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
                    <View style={styles.scrollHandler} />
                    <View style={styles.itemsContainer}>
                        <TouchableOpacity
                            style={[styles.btnTab, activeTab === tabs[0] &&
                                { backgroundColor: primeColor }]}
                            onPress={() => setActiveTab(tabs[0])}
                        >
                            <Text style={styles.tabText}>
                                {strings.Menu2}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btnTab, , activeTab === tabs[1] &&
                                { backgroundColor: primeColor }]}
                            onPress={() => setActiveTab(tabs[1])}
                        >
                            <Text style={styles.tabText}>
                                {strings.Menu3}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingBottom: 50 }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={isScroll}
                        >
                            {items.length ? items.map(item => (
                                <SellingItem key={item.id} data={item} />
                            )) :
                                loading ?
                                    <>
                                        <Text>Loading...</Text>
                                    </>
                                    :
                                    <>
                                        <Text>Belum ada {activeTab.toLowerCase()}</Text>
                                    </>
                            }
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
        alignItems: 'center',
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
        backgroundColor: '#a8c8c7',
        paddingVertical: 7,
        borderRadius: 50
    },
    tabText: { textTransform: 'capitalize', fontSize: 16, color: '#fff', fontWeight: '700' },
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
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 3,
        fontSize: 14
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
        height: 45
    },
    scrollHandler: {
        marginVertical: 10,
        backgroundColor: 'gray',
        width: screenWidth * 0.15,
        height: 5,
        alignSelf: 'center',
        borderRadius: 20
    },
});

export default StoreAccount;
