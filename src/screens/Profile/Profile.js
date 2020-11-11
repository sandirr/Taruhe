import React, { useState } from 'react'
import { Icon, Left, List, ListItem, Right, Text, View } from 'native-base'
import ScreenBase from '../../elements/SecreenBase';
import { Dimensions, Image, Modal, StyleSheet, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { primeColor } from '../../configs/color';
import strings from '../../assets/Dictionary';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function Profile({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
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
                    {strings.MyProfile}
                </Text>
                <Icon
                    name="caret-back"
                    style={{ color: 'transparent', fontSize: 26 }}
                />
            </View>
            <View style={{ flex: 1, backgroundColor: '#f3f3f3', paddingTop: 30 }}>
                <List>
                    <ListItem onPress={() => setModalVisible(true)} itemDivider style={styles.menuItem}>
                        <Left>
                            <Text>Profile Pictures</Text>
                        </Left>
                        <Right>
                            <Image
                                source={require('../../assets/images/sarung.jpg')}
                                style={{ height: 55, width: 55, borderRadius: 50 }}
                            />
                        </Right>
                    </ListItem>
                    <ListItem onPress={() => setModalVisible(true)} itemDivider style={styles.menuItem}>
                        <Left>
                            <Text>Username</Text>
                        </Left>
                        <Right>
                            <Text style={{ color: 'gray', fontStyle: 'italic' }}>A. Irsandi</Text>
                        </Right>
                    </ListItem>
                    <ListItem onPress={() => setModalVisible(true)} itemDivider style={styles.menuItem}>
                        <Left>
                            <Text>Gender</Text>
                        </Left>
                        <Right>
                            <Text style={{ color: 'gray', fontStyle: 'italic' }}>Male</Text>
                        </Right>
                    </ListItem>
                    <ListItem onPress={() => setModalVisible(true)} itemDivider
                        style={styles.menuItem}>
                        <Left>
                            <Text>Birthday</Text>
                        </Left>
                        <Right>
                            <Text style={{ color: 'gray', fontStyle: 'italic' }}>10/09/2020</Text>
                        </Right>
                    </ListItem>
                </List>
                <List style={{ marginTop: 40 }}>
                    <ListItem onPress={() => setModalVisible(true)} itemDivider style={styles.menuItem}>
                        <Text>Change Email</Text>
                    </ListItem>
                    <ListItem onPress={() => setModalVisible(true)} itemDivider style={styles.menuItem}>
                        <Text>Change Password</Text>
                    </ListItem>
                </List>
            </View>
            <Modal animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>

                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        >
                            <Text style={styles.textStyle}>Simpan</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        </ScreenBase>
    )
}

const styles = StyleSheet.create({
    itemDivider: { backgroundColor: '#f3f3f3', borderBottomColor: '#ccc', borderBottomWidth: 1 },
    menuItem: { borderBottomColor: '#ccc', borderBottomWidth: 1, backgroundColor: '#dcdee2' },
    textDivider: { fontSize: 14, color: 'gray', fontWeight: '700' },
    header: { flexDirection: 'row', alignItems: 'center', paddingTop: 45, paddingBottom: 15, paddingHorizontal: 32, backgroundColor: '#f3f3f3', justifyContent: 'space-between' },
    centeredView: {
        flex: 1,
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 28,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: primeColor,
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalOverlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "transparent",
    },
})