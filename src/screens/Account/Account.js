import React from 'react'
import { Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Icon, Text, View, List, ListItem, Left, Body, Right } from 'native-base'
import strings from '../../assets/Dictionary'
import { primeColor } from '../../configs/color'
import FooterTabs from '../../elements/FooterTabs/FooterTabs'
import ScreenBase from '../../elements/SecreenBase'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function Account({ navigation }) {
    return (
        <ScreenBase barStyle="light-content">
            <View style={styles.root}>
                <View style={styles.photoThumb}>
                    <View style={styles.profileThumb}>
                        <Image
                            source={require('../../assets/images/sarung.jpg')}
                            style={styles.imageProfile}
                        />
                        <View style={{ marginLeft: 10, marginTop: -5 }}>
                            <Text style={styles.storeName}>Kalea Official</Text>
                            <TouchableOpacity onPress={() => navigation.push('Profile')}>
                                <Text style={styles.toProfile}>{strings.VEP}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.push('AccountSetting')}>
                        <Icon name="settings-outline" style={{ color: '#fff' }} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.myStore}>
                <Image
                    source={require('../../assets/images/storefront.png')}
                    tintColor={primeColor}
                    style={{ height: 42, width: 42 }}
                />
                <Text style={styles.myStoreStr}>{strings.MyStore}</Text>
            </View>

            <View style={styles.featureContainer}>
                <View style={{ alignItems: 'center' }}>
                    <Icon style={styles.iconFeature} name="heart" />
                    <Text style={styles.strFeature}>{strings.Wishlist}</Text>
                </View>
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

            <ScrollView
                contentContainerStyle={styles.scrollMenu}
                showsVerticalScrollIndicator={false} >
                <List>
                    <ListItem itemDivider style={styles.itemDivider}>
                        <Text style={styles.textDivider}>{strings.MyFavorite}</Text>
                    </ListItem>
                    <ListItem icon itemDivider style={styles.menuItem}>
                        <Left>
                            <Icon style={{ fontSize: 22 }} name="heart-outline" />
                        </Left>
                        <Body>
                            <Text>{strings.Wishlist}</Text>
                        </Body>
                    </ListItem>
                    <ListItem itemDivider style={styles.itemDivider}>
                        <Text style={styles.textDivider}>{strings.MyAccount}</Text>
                    </ListItem>
                    <ListItem icon itemDivider style={styles.menuItem}>
                        <Left>
                            <Icon style={{ fontSize: 22 }} name="person-outline" />
                        </Left>
                        <Body>
                            <Text>{strings.MyProfile}</Text>
                        </Body>
                    </ListItem>
                    <ListItem icon itemDivider style={styles.menuItem}>
                        <Left>
                            <Icon style={{ fontSize: 22 }} name="location-outline" />
                        </Left>
                        <Body>
                            <Text>{strings.MyAddress}</Text>
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
                    <ListItem icon itemDivider style={styles.menuItem} onPress={() => {
                        navigation.navigate('Welcome')
                    }}>
                        <Left>
                            <Icon style={{ transform: [{ rotate: '180deg' }], fontSize: 22 }} name="log-out-outline" />
                        </Left>
                        <Body>
                            <Text>{strings.LogOut}</Text>
                        </Body>
                    </ListItem>
                </List>
                <Text style={styles.taruheVer}>Taruhe v 1.0.0</Text>
            </ScrollView>

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
        minHeight: 210,
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
    imageProfile: { height: 65, width: 65, borderRadius: 50 },
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
        paddingVertical: 14,
        marginTop: -36
    },
    myStoreStr: {
        fontSize: 18,
        color: primeColor,
        marginLeft: 5,
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
        marginTop: 2,
        minHeight: screenHeight * 0.7
    }
})