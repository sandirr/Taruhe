import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, TouchableOpacity, Pressable, Modal } from 'react-native'
import { Icon, Text, View, List, ListItem, Left, Body, Right, Thumbnail, Button } from 'native-base'
import strings from '../../assets/Dictionary'
import { primeColor } from '../../configs/color'
import FooterTabs from '../../elements/FooterTabs/FooterTabs'
import ScreenBase from '../../elements/SecreenBase'
import { fAuth } from '../../configs/firebase'
import { profile } from '../../configs/profile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native-gesture-handler'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function Account({ navigation }) {
    const { data } = profile;
    const [permission, setPermission] = useState(false)
    const removeUid = async () => {
        await AsyncStorage.removeItem('uid')
    }
    const toMyStore = () => {
        navigation.navigate('StoreAccount', { type: 'owner', uid: data.uid })
    }
    const logOutPermission = () => {
        setPermission(true)
    }
    return (
        <ScreenBase barStyle="light-content">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 55 }}>
                <View style={styles.root}>
                    <View style={styles.photoThumb}>
                        <View style={styles.profileThumb}>
                            {data?.photoURL ?
                                <Thumbnail
                                    source={{ uri: data?.photoURL }}
                                    style={styles.imageProfile}
                                /> :
                                <Icon name="person-circle" style={{ fontSize: 60 }} />
                            }
                            <Pressable onPress={() => navigation.navigate('Profile')} style={{ marginLeft: 10, marginTop: -5 }}>
                                <Text style={styles.storeName}>{data?.username}</Text>
                                <Text style={styles.toProfile}>{strings.VEP}</Text>
                            </Pressable>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('AccountSetting')}>
                            <Icon name="settings-outline" style={{ color: '#fff' }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Pressable style={styles.myStore} onPress={toMyStore}>

                    <Image
                        source={require('../../assets/images/storefront.png')}
                        tintColor={primeColor}
                        style={{ height: 42, width: 42 }}
                    />

                    <Text style={styles.myStoreStr}>{strings.MyStore}</Text>

                </Pressable>

                <View style={styles.featureContainer}>
                    <Pressable style={{ alignItems: 'center' }} onPress={() => navigation.navigate('Following')}>
                        <Icon style={styles.iconFeature} name="heart" />
                        <Text style={styles.strFeature}>{strings.Wishlist}</Text>
                    </Pressable>
                    <View style={{ alignItems: 'center' }}>
                        <Icon style={styles.iconFeature} name="time" />
                        <Text style={styles.strFeature}>{strings.History}</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Icon style={styles.iconFeature} name="share-social" />
                        <Text style={styles.strFeature}>{strings.Share}</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Icon style={styles.iconFeature} name="star" />
                        <Text style={styles.strFeature}>{strings.RateUs}</Text>
                    </View>
                </View>

                <View style={styles.scrollMenu} >
                    <List>
                        <ListItem itemDivider style={styles.itemDivider}>
                            <Text style={styles.textDivider}>{strings.MyFavorite}</Text>
                        </ListItem>
                        <ListItem icon itemDivider style={styles.menuItem} onPress={() => navigation.navigate('WishList')}>
                            <Left>
                                <Icon style={{ fontSize: 22 }} name="heart-outline" />
                            </Left>
                            <Body>
                                <Text>{strings.Wishlist}</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon itemDivider style={styles.menuItem} onPress={() => navigation.navigate('Following')}>
                            <Left>
                                <Icon style={{ fontSize: 22 }} name="flag-outline" />
                            </Left>
                            <Body>
                                <Text>Following</Text>
                            </Body>
                        </ListItem>
                        <ListItem itemDivider style={styles.itemDivider}>
                            <Text style={styles.textDivider}>{strings.MyAccount}</Text>
                        </ListItem>
                        <ListItem icon itemDivider style={styles.menuItem} onPress={() => navigation.push('Profile')}>
                            <Left>
                                <Icon style={{ fontSize: 22 }} name="person-outline" />
                            </Left>
                            <Body>
                                <Text>{strings.MyProfile}</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon itemDivider style={styles.menuItem} onPress={toMyStore}>
                            <Left>
                                <Image
                                    source={require('../../assets/images/storefront.png')}
                                    tintColor="#000"
                                    style={{ height: 22, width: 22 }}
                                />
                            </Left>
                            <Body>
                                <Text>{strings.MyStore}</Text>
                            </Body>
                        </ListItem>
                        <ListItem itemDivider style={styles.itemDivider}>
                            <Text style={styles.textDivider}>{strings.Support}</Text>
                        </ListItem>
                        <ListItem icon itemDivider style={styles.menuItem}>
                            <Left>
                                <Icon style={{ fontSize: 22 }} name="help-circle-outline" />
                            </Left>
                            <Body>
                                <Text>{strings.HelpCenter}</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon itemDivider style={styles.menuItem}>
                            <Left>
                                <Icon style={{ fontSize: 22 }} name="alert-circle-outline" />
                            </Left>
                            <Body>
                                <Text>{strings.About}</Text>
                            </Body>
                        </ListItem>
                        <ListItem icon itemDivider style={styles.menuItem} onPress={logOutPermission}>
                            <Left>
                                <Icon style={{ transform: [{ rotate: '180deg' }], fontSize: 22 }} name="log-out-outline" />
                            </Left>
                            <Body>
                                <Text>{strings.LogOut}</Text>
                            </Body>
                        </ListItem>
                    </List>
                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <Text style={styles.taruheVer}>Taruhe v 1.0.0</Text>
                    </View>
                </View>
            </ScrollView>
            <Modal visible={permission} transparent animationType="slide">
                {permission &&
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
                            paddingVertical: 16,
                            paddingHorizontal: 45,
                            marginBottom: 20,
                            borderColor: '#ccc',
                            borderWidth: 1
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                fontWeight: '700',
                                fontSize: 18
                            }}>
                                {strings.SureLogOut}?
                            </Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 16
                            }}>
                                <Button
                                    rounded
                                    bordered
                                    style={{
                                        marginHorizontal: 10,
                                        borderColor: primeColor
                                    }}
                                    small
                                    onPress={() => setPermission(false)}
                                >
                                    <Text style={{ textTransform: 'capitalize', color: primeColor }}>{strings.Cancel}</Text>
                                </Button>
                                <Button
                                    rounded
                                    style={{ marginHorizontal: 10, backgroundColor: primeColor }}
                                    small
                                    onPress={() => {
                                        fAuth.signOut().then(function () {
                                            removeUid()
                                            profile.data = {}
                                        }).catch(function (error) {
                                            Alert.alert(error.code, error.message)
                                        });
                                    }}
                                >
                                    <Text style={{ textTransform: 'capitalize' }}>{strings.LogOut}</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                }
            </Modal>
            <FooterTabs
                screen={strings.Menu5}
                navigation={navigation}
            />
        </ScreenBase>
    )
}

const styles = StyleSheet.create({
    itemDivider: { backgroundColor: '#fff', borderBottomColor: '#ccc', borderBottomWidth: 1 },
    menuItem: { borderBottomColor: '#ccc', borderBottomWidth: 1, backgroundColor: '#dcdee2' },
    textDivider: { fontSize: 14, color: 'gray', fontWeight: '700', marginTop: 5 },
    header: { flexDirection: 'row', alignItems: 'center', paddingTop: 45, paddingBottom: 15, paddingHorizontal: 32, backgroundColor: '#f3f3f3', justifyContent: 'space-between' },
    root: {
        minHeight: 180,
        backgroundColor: primeColor,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        justifyContent: 'center',
    },
    photoThumb: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 50
    },
    profileThumb: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageProfile: { height: 60, width: 60 },
    storeName: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
    toProfile: {
        fontSize: 12,
        color: '#fff',
        textDecorationLine: 'underline'
    },
    myStore: {
        backgroundColor: '#dcdee2',
        width: '85%',
        alignSelf: 'center',
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginTop: -36
    },
    myStoreStr: {
        fontSize: 18,
        color: primeColor,
        marginLeft: 15,
    },
    featureContainer: {
        backgroundColor: '#dcdee2',
        width: '85%',
        alignSelf: 'center',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        paddingHorizontal: 8,
        marginTop: 20
    },
    iconFeature: { fontSize: 26, color: primeColor },
    strFeature: { fontSize: 10, color: primeColor },
    taruheVer: {
        fontSize: 12,
        alignSelf: 'center',
        color: 'gray',
        marginTop: 6
    },
    scrollMenu: {
        backgroundColor: '#f3f3f3',
    }
})