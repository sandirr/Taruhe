import React, { useEffect, useState } from 'react'
import { Content, DatePicker, Icon, Input, Item, Label, Left, List, ListItem, Picker, Right, Text, Thumbnail, View } from 'native-base'
import ScreenBase from '../../elements/SecreenBase';
import { Image, Modal, StyleSheet, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, ImageBackground, Alert } from 'react-native';
import { primeColor } from '../../configs/color';
import strings from '../../assets/Dictionary';
import ImagePicker from 'react-native-image-picker';
import { profile } from '../../configs/profile';
import { fAuth, fDB, fStorage } from '../../configs/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Profile({ navigation }) {
    const { data } = profile;
    const [passwordVisible, setPasswordVisisble] = useState(false);
    const [profileData, setProfileData] = useState({})
    useEffect(() => {
        setProfileData(data)
    }, [])
    const [modalVisible, setModalVisible] = useState('');
    const [imageUri, setImageUri] = useState({ uri: '' })
    const [inputValue, setInputValue] = useState('')
    const [cE, setCE] = useState({ email: '', password: '' });
    const [cP, setCP] = useState({ newPassword: '', oldPassword: '' });
    const removeUid = async () => {
        await AsyncStorage.removeItem('uid')
    }
    const handleUpdateProfile = () => {
        if (modalVisible === 'Picture') {
            uploadFile()
        } else if (modalVisible === 'Change Email') {
            if (cE.password !== profileData.password) {
                Alert.alert('Gagal', 'Password yang anda masukkan salah')
            } else if (!cE.email.length) {
                Alert.alert('Gagal', 'Mohon masukkan email anda')
            } else {
                let b = cE.email.replace(/[a-zA-Z0-9.]/g, '');
                if (b !== '@') {
                    Alert.alert('Email validation !', 'Wrong Email');
                } else {
                    fAuth.signInWithEmailAndPassword(profileData.email, profileData.password)
                        .then(() => {
                            fAuth.currentUser.updateEmail(cE.email).then(() => {
                                setProfileData({ ...profileData, email: cE.email },
                                    updateData({ ...profileData, email: cE.email }))
                                removeUid()
                                profile.data = {}
                                fAuth.currentUser.sendEmailVerification()
                                Alert.alert('Success', `Please check your email ${cE.email} inbox to verify your new email`)
                                fAuth.signOut().then(function () {
                                }).catch(function (error) {
                                    Alert.alert(error.code, error.message)
                                });
                            }).catch(function (error) {
                                Alert.alert(error.code, error.message)
                            });
                        })
                }
            }
        } else if (modalVisible === 'Change Password') {
            if (!cP.newPassword.length || !cP.oldPassword) {
                Alert.alert('Gagal', 'Lengkapi password anda')
            } else if (cP.oldPassword !== profileData.password) {
                Alert.alert('Gagal', 'Password sebelumnya salah')
            } else if (cP.newPassword === profileData.password) {
                Alert.alert('Gagal', 'Password baru tidak boleh sama dengan password sebelumnya')
            } else {
                fAuth.signInWithEmailAndPassword(profileData.email, profileData.password)
                    .then(() => {
                        fAuth.currentUser.updatePassword(cP.newPassword).then(() => {
                            setProfileData({ ...profileData, password: cP.newPassword },
                                updateData({ ...profileData, password: cP.newPassword }))
                            removeUid()
                            profile.data = {}
                            fAuth.currentUser.sendEmailVerification()
                            Alert.alert('Success', `Password berhasil diubah`)
                            fAuth.signOut().then(function () {
                            }).catch(function (error) {
                                Alert.alert(error.code, error.message)
                            });
                        }).catch(function (error) {
                            Alert.alert(error.code, error.message)
                        });
                    })
            }
        } else {
            if (inputValue.toString().length) {
                setProfileData({ ...profileData, [modalVisible.toLowerCase()]: inputValue },
                    updateData({ ...profileData, [modalVisible.toLowerCase()]: inputValue }))
                setModalVisible('')
            } else {
                Alert.alert('Isi Input', 'Inputan tidak boleh kosong')
            }
        }
    }
    const updateData = (data) => {
        fDB
            .ref('users')
            .child(profileData.uid)
            .update(data)
            .then(() => {
                // Alert.alert('Sukses', 'Perubahan tersimpan');
                setModalVisible('')
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
                const source = { uri: response.uri };
                setImageUri(source)
            }

        })
    }
    const uploadFile = async () => {
        const file = await uriToBlob(imageUri.uri);
        fStorage
            .ref(`profile_pictures/${profileData.uid}.png`)
            .put(file)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                setImageUri({ uri: url })
                setProfileData({ ...profileData, photoURL: url },
                    updateData({ ...profileData, photoURL: url }))
            })
            .catch(error => {
                setImageUri({ uri: '' })
                Alert.alert(error.code, error.message);
            });
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
                    <ListItem onPress={() => {
                        setModalVisible('Picture')
                    }} itemDivider style={styles.menuItem}>
                        <Left>
                            <Text>Profile Picture</Text>
                        </Left>
                        <Right>
                            {profileData.photoURL ?
                                <Thumbnail
                                    source={{ uri: profileData.photoURL }}
                                    style={{ height: 55, width: 55 }}
                                /> :
                                <Icon name="person-circle" style={{ fontSize: 55 }} />
                            }
                        </Right>
                    </ListItem>
                    <ListItem
                        onPress={() => {
                            setInputValue(profileData.username)
                            setModalVisible('Username')
                        }}
                        itemDivider
                        style={styles.menuItem}>
                        <Left>
                            <Text>Username</Text>
                        </Left>
                        <Right>
                            <Text style={{ color: 'gray', marginLeft: -15 }}>{profileData.username}</Text>
                        </Right>
                    </ListItem>
                    <ListItem onPress={() => {
                        setInputValue(profileData.gender)
                        setModalVisible('Gender')
                    }} itemDivider style={styles.menuItem}>
                        <Left>
                            <Text>Gender</Text>
                        </Left>
                        <Right>
                            <Text style={{ color: 'gray', marginLeft: -15 }}>{profileData.gender || '-'}</Text>
                        </Right>
                    </ListItem>
                    <ListItem onPress={() => {
                        setInputValue(profileData.birthday)
                        setModalVisible('Birthday')
                    }} itemDivider
                        style={styles.menuItem}>
                        <Left>
                            <Text>Birthday</Text>
                        </Left>
                        <Right>
                            <Text style={{ color: 'gray', marginLeft: -15 }}>
                                {profileData.birthday ?
                                    new Date(profileData.birthday).toISOString().substring(0, 10)
                                    : '-'}</Text>
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
                        {modalVisible === 'Picture' && (
                            <TouchableOpacity
                                onPress={uploadImage}
                            >
                                {profileData.photoURL || imageUri.uri ?
                                    <ImageBackground
                                        source={{ uri: imageUri.uri || profileData.photoURL }}
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
                                    </ImageBackground> :
                                    <Icon name="person-circle" style={{ fontSize: 80, color: '#555' }} />
                                }

                            </TouchableOpacity>
                        )}
                        {modalVisible === 'Change Email' && (
                            <>
                                <Item floatingLabel>
                                    <Label>
                                        Email yang baru
                                        </Label>
                                    <Input value={cE.email} onChangeText={(text) => setCE({ ...cE, email: text })} keyboardType="email-address" textContentType="emailAddress" />
                                </Item>
                                <Item style={{ marginTop: 10 }}>
                                    <Input value={cE.password} onChangeText={(text) => setCE({ ...cE, password: text })} textContentType="password" secureTextEntry={!passwordVisible} placeholder="Password" />
                                    <TouchableOpacity
                                        onPress={() => setPasswordVisisble(!passwordVisible)}
                                    >
                                        <Icon
                                            name={!passwordVisible ? "eye-off-outline" : "eye-outline"}
                                            style={{ color: "#555" }}
                                        />
                                    </TouchableOpacity>
                                </Item>
                            </>
                        )}
                        {modalVisible === 'Change Password' &&
                            <>
                                <Item floatingLabel>
                                    <Label>
                                        Password baru
                                    </Label>
                                    <Input value={cP.newPassword} onChangeText={(text) => setCP({ ...cP, newPassword: text })} keyboardType="password" textContentType="password" secureTextEntry={!passwordVisible} />
                                </Item>
                                <Item style={{ marginTop: 10 }}>
                                    <Input value={cP.oldPassword} onChangeText={(text) => setCP({ ...cP, oldPassword: text })} textContentType="password" secureTextEntry={!passwordVisible} placeholder="Password sebelumnya" />
                                    <TouchableOpacity
                                        onPress={() => setPasswordVisisble(!passwordVisible)}
                                    >
                                        <Icon
                                            name={!passwordVisible ? "eye-off-outline" : "eye-outline"}
                                            style={{ color: "#555" }}
                                        />
                                    </TouchableOpacity>
                                </Item>
                            </>
                        }
                        {modalVisible === 'Username' &&
                            <Item floatingLabel>
                                <Label>
                                    {modalVisible}
                                </Label>
                                <Input value={inputValue} onChangeText={(text) => {
                                    setInputValue(text)
                                }} />
                            </Item>
                        }
                        {modalVisible === 'Gender' &&
                            <Item picker >
                                <Picker mode="dropdown" selectedValue={inputValue} onValueChange={(text) => {
                                    setInputValue(text)
                                }} >
                                    <Picker.Item label="Tidak ingin memberti tahu" value="-" />
                                    <Picker.Item label="Male" value="Male" />
                                    <Picker.Item label="Female" value="Female" />
                                </Picker>
                            </Item>
                        }
                        {modalVisible === 'Birthday' &&
                            <DatePicker
                                defaultDate={new Date(inputValue || '1980-01-02T00:00:00.000Z')}
                                locale={"en"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"fade"}
                                androidMode={"default"}
                                placeHolderText="Select Date"
                                textStyle={{ color: "green" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                disabled={false}
                                onDateChange={(newDate) => {
                                    setInputValue(newDate)
                                }}
                            />
                        }

                        <TouchableHighlight
                            style={{ ...styles.saveBtn, backgroundColor: "#2196F3" }}
                            onPress={() => handleUpdateProfile()}
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