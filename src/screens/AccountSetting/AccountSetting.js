import React, { useEffect, useState } from 'react'
import { Icon, Left, List, ListItem, Right, Text, View } from 'native-base'
import ScreenBase from '../../elements/SecreenBase'
import { StyleSheet, TouchableOpacity, Switch, Dimensions, ScrollView, Share, Linking, Alert } from 'react-native'
import { primeColor } from '../../configs/color'
import strings from '../../assets/Dictionary'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { profile } from '../../configs/profile'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default function AccountSetting({ navigation }) {
    const [activeLanguage, setActiveLanguage] = useState('')
    useEffect(() => {
        const language = strings.getLanguage()
        setActiveLanguage(language)
    }, [strings.getLanguage()])
    const setToLocal = async (val) => {
        await AsyncStorage.setItem('language', val)
    }
    return (
        <ScreenBase barStyle="dark-content">
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon
                        name="caret-back"
                        style={{ color: primeColor, fontSize: 26 }}
                    />
                </TouchableOpacity>
                <Text style={{ fontWeight: '700', fontSize: 24, color: primeColor }}>
                    {strings.AccountSetting}
                </Text>
                <Icon
                    name="caret-back"
                    style={{ color: 'transparent', fontSize: 26 }}
                />
            </View>
            <ScrollView contentContainerStyle={{ backgroundColor: '#f3f3f3', minHeight: screenHeight }} showsVerticalScrollIndicator={false} >
                <List>
                    <ListItem itemDivider style={styles.itemDivider}>
                        <Text style={styles.textDivider}>{strings.MyAccount}</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
                        <Text>{strings.MyProfile}</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.menuItem} onPress={() => navigation.navigate('StoreAccount', { type: 'owner', uid: profile.data.uid })}>
                        <Text>{strings.MyStore}</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.itemDivider}>
                        <Text style={styles.textDivider}>{strings.MyFavorite}</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.menuItem} onPress={() => navigation.navigate('WishList')}>
                        <Text>{strings.Wishlist}</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.menuItem} onPress={() => navigation.navigate('Following')}>
                        <Text>{strings.Following}</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.itemDivider}>
                        <Text style={styles.textDivider}>{strings.Settings}</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.menuItem} onPress={() => {
                        Share.share({
                            url: `${profile.others.linkTaruhe}`,
                            message: `${profile.others.pitch} ${profile.others.linkTaruhe}`,
                            title: 'Taruhe Art & Media'
                        });
                    }}>
                        <Text>{strings.ShareApp}</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.menuItem} onPress={() => {
                        Linking.openURL(profile.others.rateURL).catch(() =>
                            Alert.alert(strings.Error, strings.error1)
                        );
                    }}>
                        <Text>{strings.RateUs}</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.menuItem}>
                        <Left>
                            <Text>{strings.Language}</Text>
                        </Left>
                        <Right style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text>EN</Text>
                            <Switch
                                trackColor={{ false: '#00a1a1', true: '#00a1a1' }}
                                thumbColor={primeColor}
                                value={activeLanguage === 'id' ? true : false}
                                onValueChange={() => {
                                    strings.setLanguage(activeLanguage === 'id' ? 'en' : 'id')
                                    setActiveLanguage(activeLanguage === 'id' ? 'en' : 'id')
                                    setToLocal(activeLanguage === 'id' ? 'en' : 'id')
                                }}
                            />
                            <Text>ID</Text>
                        </Right>
                    </ListItem>
                    <ListItem itemDivider style={styles.itemDivider}>
                        <Text style={styles.textDivider}>{strings.Support}</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.menuItem} onPress={() => navigation.navigate('HelpCenter')}>
                        <Text>{strings.HelpCenter}</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.menuItem} onPress={() => navigation.navigate('About')}>
                        <Text>{strings.About}</Text>
                    </ListItem>
                </List>
                <Text style={{ fontSize: 12, alignSelf: 'center', color: 'gray', marginTop: 14 }}>Taruhe v {profile.others.version}</Text>
            </ScrollView>
        </ScreenBase>
    )
}

const styles = StyleSheet.create({
    itemDivider: { backgroundColor: '#f3f3f3', borderBottomColor: '#ccc', borderBottomWidth: 1 },
    menuItem: { borderBottomColor: '#ccc', borderBottomWidth: 1, backgroundColor: '#dcdee2' },
    textDivider: { fontSize: 14, color: 'gray', fontWeight: '700' },
    header: { flexDirection: 'row', alignItems: 'center', paddingTop: 45, paddingBottom: 15, paddingHorizontal: 32, backgroundColor: '#f3f3f3', justifyContent: 'space-between' }
})