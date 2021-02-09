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
    ToastAndroid,
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
import EtcAct from '../../elements/EtcAct';
import LoadData from '../../elements/LoadData';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const StoreAccount = ({ navigation, route }) => {
    const [editStore, setEditStore] = useState(false)
    if ((profile.data.storeName || route.params.type !== 'owner') && !editStore)
        return (
            <Store navigation={navigation} route={route} handleToEdit={() => setEditStore(true)} />
        );
    else
        return (
            <FormStore navigation={navigation} editable={editStore} />
        );
}

class FormStore extends Component {
    state = {
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

        if (this.props.editable) {
            const { data } = profile
            this.setState({
                position: data.position,
                storeName: data.storeName,
                storeLocation: data.storeLocation,
                phoneNumber: data.phoneNumber,
                storeDetail: data.storeDetail,
            })
        }
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
        const { storeName, storeLocation, phoneNumber, storeDetail, province, district, subDistrict, position } = this.state
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
                            marginBottom: 12,
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
                                <Picker.Item label={position.province?.nama || ''} value={position.province} />
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
                                <Picker.Item label={position.district?.nama || ''} value={position.district} />
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
                                <Picker.Item label={position.subDistrict?.nama || ''} value={position.subDistrict} />
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
                    <TouchableOpacity
                        style={{
                            backgroundColor: primeColor,
                            marginVertical: 16,
                            borderRadius: 50,
                            alignSelf: "center",
                            width: "90%",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "center",
                            height: 55,
                        }}
                        onPress={this.saveStore}
                    >
                        <Text style={{ color: "#fff", fontWeight: '700', fontSize: 16 }}>
                            {strings.Save}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>

            </ScreenBase>
        );
    }
}

const Store = ({ navigation, route, handleToEdit }) => {
    const scrollA = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, []);
    const [tabs] = useState([
        'Product',
        'Service',
        'Tourism'
    ]);
    const [isAdd, setIsAdd] = useState(false)
    const [activeTab, setActiveTab] = useState(tabs[0])
    const [isScroll, setIsScroll] = useState(false)
    const [items, setItems] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [visited, setVisited] = useState({})
    const [loading, setLoading] = useState(true)
    const [isFollow, setIsFollow] = useState(false)
    const handleScroll = (e) => {
        const { contentSize, contentInset, contentOffset } = e.nativeEvent
        const maxOffset = contentSize.height - screenHeight + contentInset.bottom - 50;
        if (contentOffset.y > maxOffset) {
            setIsScroll(true)
        } else {
            setIsScroll(false)
        }
    }
    const { type, uid } = route.params;
    const { data, following } = profile;
    useEffect(() => {
        if (type === 'owner') {
            setVisited({ storePhotoURL: data.storePhotoURL, username: data.username, storeName: data.storeName })
        } else {
            let followed = following.filter(f => f.uid === uid);
            if (followed.length) {
                setIsFollow(true)
            } else {
                setIsFollow(false)
            }
            fDB.ref('users/' + uid).on('value', val => {
                setVisited(val.val())
            })
        }
    }, [type, profile.data, uid, following])

    useEffect(() => {
        fDB.ref('product_service')
            .orderByChild('uid')
            .equalTo(uid)
            .on('value', (values) => {
                if (values.val()) {
                    let allItems = []
                    Object.keys(values.val()).map((value) => {
                        let newData = values.val()[value]
                        if (newData.type === activeTab.toLowerCase())
                            allItems.push(newData);
                    })
                    setItems(allItems)
                }
                setLoading(false)
            }, (error) => {
                setLoading(false)
                Alert.alert(error.code)
            })
    }, [type, activeTab])

    const updateData = (newData) => {
        fDB
            .ref('users')
            .child(data.uid)
            .update(newData)
            .then(() => {
                Alert.alert(strings.Success)
                profile.data = newData;
                setVisited({ ...visited, storePhotoURL: newData.storePhotoURL })
            }).catch(err => {
                Alert.alert(err.code, err.message)
            })
    }
    const uploadImage = () => {
        const options = {
            quality: 0.3,
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
                updateData({ ...data, storePhotoURL: url })
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
    const refreshFollowing = (id) => {
        if (id) {
            let newFollowing = profile.following.filter(e => e.uid != id)
            profile.following = newFollowing
        } else
            fDB.ref('following/' + profile.data.uid).on('value', val => {
                if (val.val()) {
                    let following = []
                    Object.keys(val.val()).forEach((item) => {
                        following.push(val.val()[item])
                    })
                    profile.following = following
                }
            })
    }
    const setToFollow = () => {
        if (isFollow) {
            fDB.ref('following/' + profile.data.uid).child(visited.uid).remove()
                .then(() => {
                    ToastAndroid.showWithGravity(
                        "Unfollowed",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                    refreshFollowing(visited.uid)
                    setIsFollow(false)
                })
        } else {
            fDB.ref('following/' + profile.data.uid).child(visited.uid).set({
                ...visited,
            }).then(() => {
                ToastAndroid.showWithGravity(
                    "Followed",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                refreshFollowing()
                setIsFollow(true)
            })
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
                                    {uid !== profile.data.uid &&
                                        <Button
                                            rounded
                                            small
                                            bordered
                                            style={styles.followBtn}
                                            onPress={setToFollow}
                                        >
                                            <Text style={styles.followText} >{isFollow ? 'Followed' : 'Follow'}</Text>
                                        </Button>
                                    }
                                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                                        <Icon name="ellipsis-vertical" style={styles.etc} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.avatarContainer}>
                                <Thumbnail
                                    source={visited.storePhotoURL ? { uri: visited.storePhotoURL } : require('../../assets/images/storefront.png')}
                                    style={{ height: 120, width: 120 }}
                                />
                                {uid === profile.data.uid &&
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
                                {uid === profile.data.uid
                                    ?
                                    <>
                                        {isAdd &&
                                            <Pressable onPress={() => navigation.navigate('AddItem', { type: 'product' })}>
                                                <View style={styles.addItem} rounded>
                                                    <Icon name="cube-outline" style={styles.iToConnect} />
                                                    <Text style={styles.addItemText}>
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
                                                <View style={styles.addItem} rounded>
                                                    <Icon name="people-outline" style={styles.iToConnect} />
                                                    <Text style={styles.addItemText}>
                                                        {strings.Menu3}
                                                    </Text>
                                                </View>
                                            </Pressable>
                                        }
                                        {isAdd && profile.data.admin &&
                                            <Pressable onPress={() => navigation.navigate('AddItem', { type: 'tourism' })}>
                                                <View style={styles.addItem} rounded>
                                                    <Icon name="trail-sign-outline" style={styles.iToConnect} />
                                                    <Text style={styles.addItemText}>
                                                        {strings.Menu4}
                                                    </Text>
                                                </View>
                                            </Pressable>
                                        }
                                    </>
                                    :
                                    <>
                                        <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', { data: visited })}>
                                            <View style={styles.toConnect}>
                                                <Icon name="mail-outline" style={styles.iToConnect} />
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() =>
                                            Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${visited.position.subDistrict.nama}`)}>
                                            <View style={styles.toConnect}>
                                                <Icon name="location-outline" style={styles.iToConnect} />
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => Linking.openURL(`tel:${visited.phoneNumber}`)}>
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
                                { backgroundColor: primeColor },
                            ((type === 'visitor' && visited.admin) || (type === 'owner' && profile.data.admin)) ?
                                { width: '32%' } : { width: '48%' }]}
                            onPress={() => setActiveTab(tabs[0])}
                        >
                            <Text style={styles.tabText}>
                                {strings.Menu2}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btnTab, activeTab === tabs[1] &&
                                { backgroundColor: primeColor },
                            ((type === 'visitor' && visited.admin) || (type === 'owner' && profile.data.admin)) ?
                                { width: '32%' } : { width: '48%' }]}
                            onPress={() => setActiveTab(tabs[1])}
                        >
                            <Text style={styles.tabText}>
                                {strings.Menu3}
                            </Text>
                        </TouchableOpacity>
                        {((type === 'visitor' && visited.admin) || (type === 'owner' && profile.data.admin)) &&
                            <TouchableOpacity
                                style={[styles.btnTab, activeTab === tabs[2] &&
                                    { backgroundColor: primeColor },
                                { width: '32%' }]}
                                onPress={() => setActiveTab(tabs[2])}
                            >
                                <Text style={styles.tabText}>
                                    {strings.Menu4}
                                </Text>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={{ paddingBottom: 50 }}>
                        {loading ?
                            <LoadData />
                            :
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={isScroll}
                            >

                                {items.length ? items.map(item => (
                                    <SellingItem key={item.id} data={item} toDetail={() => {
                                        if (item.uid === data.uid)
                                            navigation.navigate('AddItem', { type: item.type, edit: true, item: item })
                                        else
                                            navigation.navigate('DetailItem', { detail: item })
                                    }} />
                                )).reverse() :
                                    <Text>Belum ada item {activeTab.toLowerCase()}</Text>
                                }
                            </ScrollView>
                        }
                    </View>
                </View>
            </Animated.ScrollView>
            <EtcAct
                modalVisible={modalVisible}
                openEtc={(e) => setModalVisible(e)}
                navigation={navigation}
            >
                <View style={{
                    backgroundColor: '#f3f3f3',
                    borderRadius: 20,
                }}
                >
                    <Pressable onPress={handleToEdit}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: 45,
                            paddingHorizontal: 15
                        }}
                    >
                        <Icon name="create-outline" style={{ fontSize: 22, marginRight: 5 }} />
                        <Text style={styles.modalText}>{strings.EditY}</Text>
                    </Pressable>
                    <View style={{ backgroundColor: 'gray', height: 2 }} />
                    <Pressable onPress={() => {
                        setModalVisible(false)
                        navigation.replace(strings.Menu1)
                    }}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: 45,
                            paddingHorizontal: 15
                        }}
                    >
                        <Icon name="home-outline" style={{ fontSize: 22, marginRight: 5 }} />
                        <Text style={styles.modalText}>{strings.BackToHome}</Text>
                    </Pressable>
                </View>
            </EtcAct>
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
        height: screenHeight * 0.50,
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
        marginTop: -3
    },
    contactContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 8
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
    addItem: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 25,
        width: 85,
        paddingVertical: 3
    },
    addItemText: {
        color: '#000',
        fontSize: 12,
        marginTop: -3
    }
});

export default StoreAccount;
