import React from 'react'
import { Body, Content, Icon, Left, List, ListItem, Right, Text, View } from 'native-base'
import ScreenBase from '../../elements/SecreenBase'
import { StyleSheet, TouchableOpacity, Switch } from 'react-native'
import { primeColor } from '../../configs/color'

export default function Account({ navigation }) {
    return (
        <ScreenBase>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 45, paddingBottom: 10, paddingHorizontal: 32 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon
                        name="caret-back"
                        style={{ color: primeColor, fontSize: 26, fontWeight: "bold" }}
                    />
                </TouchableOpacity>
                <Text style={{ fontWeight: "bold", fontSize: 24, color: primeColor, marginLeft: 55 }}>
                    Account Setting
                </Text>
            </View>
            <Content>
                <List>
                    <ListItem itemDivider style={styles.itemDivider}>
                        <Text style={styles.textDivider}>My Account</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.menuItem}>
                        <Text>My Profile</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.menuItem}>
                        <Text>My Address</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.itemDivider}>
                        <Text style={styles.textDivider}>My Favorite</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.menuItem}>
                        <Text>Wishlist</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.menuItem}>
                        <Text>Favorite Store</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.itemDivider}>
                        <Text style={styles.textDivider}>Settings</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.menuItem}>
                        <Text>Share Application</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.menuItem}>
                        <Text>Rate Us</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.menuItem}>
                        <Left>
                            <Text>Language</Text>
                        </Left>
                        <Right style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text>EN</Text>
                            <Switch
                                trackColor={{ false: "#81b0ff", true: "#81b0ff" }}
                                thumbColor={primeColor}
                                value={false}
                            />
                            <Text>ID</Text>
                        </Right>
                    </ListItem>
                    <ListItem itemDivider style={styles.itemDivider}>
                        <Text style={styles.textDivider}>Support</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.menuItem}>
                        <Text>Help Center</Text>
                    </ListItem>
                    <ListItem itemDivider style={styles.menuItem}>
                        <Text>About</Text>
                    </ListItem>
                    <ListItem itemDivider icon style={styles.menuItem}>
                        <Left>
                            <Icon style={{ transform: [{ rotate: '180deg' }], }} name="log-out-outline" />
                        </Left>
                        <Body>
                            <Text>Log Out</Text>
                        </Body>
                    </ListItem>
                </List>
            </Content>
        </ScreenBase>
    )
}

const styles = StyleSheet.create({
    itemDivider: { backgroundColor: '#fff', borderBottomColor: '#ccc', borderBottomWidth: 1 },
    menuItem: { borderBottomColor: '#ccc', borderBottomWidth: 1 },
    textDivider: { fontSize: 14, color: 'gray', fontWeight: '700' },
})