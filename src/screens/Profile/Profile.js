import React, { useState } from 'react'
import { Icon, Input, Item, Label, Left, List, ListItem, Right, Text, View } from 'native-base'
import ScreenBase from '../../elements/SecreenBase';
import { Image, Modal, StyleSheet, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { primeColor } from '../../configs/color';
import strings from '../../assets/Dictionary';
import ImagePicker from 'react-native-image-picker';

export default function Profile({ navigation }) {
    const [modalVisible, setModalVisible] = useState('');
    const [imageUri, setImageUri] = useState({ uri: '' })
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
                const source = { uri: response.uri };
                setImageUri(source)
            }

        })
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
                    {strings.MyProfile}
                </Text>
                <Icon
                    name="caret-back"
                    style={{ color: 'transparent', fontSize: 26 }}
                />
            </View>
            <View style={{ flex: 1, backgroundColor: '#f3f3f3', paddingTop: 30 }}>
                <List>
                    <ListItem onPress={() => setModalVisible('Picture')} itemDivider style={styles.menuItem}>
                        <Left>
                            <Text>Profile Picture</Text>
                        </Left>
                        <Right>
                            <Image
                                source={require('../../assets/images/sarung.jpg')}
                                style={{ height: 55, width: 55, borderRadius: 50 }}
                            />
                        </Right>
                    </ListItem>
                    <ListItem
                        onPress={() => setModalVisible('Username')}
                        itemDivider
                        style={styles.menuItem}>
                        <Left>
                            <Text>Username</Text>
                        </Left>
                        <Right>
                            <Text style={{ color: 'gray', fontStyle: 'italic' }}>A. Irsandi</Text>
                        </Right>
                    </ListItem>
                    <ListItem onPress={() =>
                        setModalVisible('Gender')} itemDivider style={styles.menuItem}>
                        <Left>
                            <Text>Gender</Text>
                        </Left>
                        <Right>
                            <Text style={{ color: 'gray', fontStyle: 'italic' }}>Male</Text>
                        </Right>
                    </ListItem>
                    <ListItem onPress={() => setModalVisible('Birthday')} itemDivider
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
                    <ListItem
                        onPress={() => setModalVisible('Change Email')}
                        itemDivider
                        style={styles.menuItem}>
                        <Text>Change Email</Text>
                    </ListItem>
                    <ListItem
                        onPress={() => setModalVisible('Change Password')}
                        itemDivider
                        style={styles.menuItem}>
                        <Text>Change Password</Text>
                    </ListItem>
                </List>
            </View>
            <Modal animationType="slide"
                transparent={true}
                visible={modalVisible ? true : false}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible('')}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {modalVisible === 'Picture' ?
                            <TouchableOpacity
                                onPress={uploadImage}
                            >
                                <ImageBackground
                                    source={imageUri.uri ? { uri: imageUri.uri } : require('../../assets/images/sarung.jpg')}
                                    style={{ height: 80, width: 80, justifyContent: 'flex-end' }}
                                >
                                    <View style={{
                                        alignItems: 'center',
                                        backgroundColor: 'rgba(255,255,255,.3)',
                                        borderTopLeftRadius: 50,
                                        borderTopRightRadius: 50,
                                        height: 30,
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{ color: '#fff', fontSize: 12 }}>Ubah</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            : modalVisible === 'Change Email' ? (
                                null)
                                : modalVisible === 'Change Password' ? (
                                    null)
                                    : <Item floatingLabel>
                                        <Label>
                                            {modalVisible}
                                        </Label>
                                        <Input />
                                    </Item>
                        }
                        <TouchableHighlight
                            style={{ ...styles.saveBtn, backgroundColor: "#2196F3" }}
                            onPress={() => {
                                setModalVisible('');
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
    itemDivider: {
        backgroundColor: '#f3f3f3',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    menuItem: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        backgroundColor: '#dcdee2'
    },
    textDivider: {
        fontSize: 14,
        color: 'gray',
        fontWeight: '700'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 45,
        paddingBottom: 15,
        paddingHorizontal: 32,
        backgroundColor: '#f3f3f3',
        justifyContent: 'space-between'
    },
    centeredView: {
        flex: 1,
        marginTop: 22
    },
    modalView: {
        margin: 20,
        marginTop: 50,
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
    saveBtn: {
        backgroundColor: primeColor,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 18,
        elevation: 2,
        marginTop: 16,
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