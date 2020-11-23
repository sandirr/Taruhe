import React, { Component } from 'react';
import { Alert, Dimensions, Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, Input, Item, Label, Picker, Text, Textarea } from 'native-base';
import ScreenBase from '../../elements/SecreenBase';
import strings from '../../assets/Dictionary';
import { primeColor } from '../../configs/color';
import ImagePicker from 'react-native-image-picker';
import { profile } from '../../configs/profile';
import { fDB, fStorage } from '../../configs/firebase';
import { ScrollView } from 'react-native-gesture-handler';
import Axios from 'axios';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
class AddItem extends Component {
    state = {
        imagesURL: [],
        title: '',
        category: '',
        price: '',
        description: '',
        location: '',
        position: { province: {}, district: {}, subDistrict: {} },
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
    addPhoto = (handleFor) => {
        const options = {
            quality: 0.7,
            allowsEditing: true,
            mediaType: 'photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        if (this.state.imagesURL.length < 5) {
            if (handleFor === 'camera') {
                ImagePicker.launchCamera(options, (response) => {
                    if (response.didCancel) {
                        // console.log('User cancelled image picker');
                    } else if (response.error) {
                        // console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        // console.log('User tapped custom button: ', response.customButton);
                    } else {
                        this.uploadFile(response.uri)
                    }
                })
            } else if (handleFor === 'image') {
                ImagePicker.launchImageLibrary(options, (response) => {
                    if (response.didCancel) {
                        // console.log('User cancelled image picker');
                    } else if (response.error) {
                        // console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        // console.log('User tapped custom button: ', response.customButton);
                    } else {
                        this.uploadFile(response.uri)
                    }
                })
            }
        } else {
            Alert.alert('Sudah mencapai batas', 'Maksimal 5 photo')
        }
    }
    uploadFile = async (uri) => {
        const file = await this.uriToBlob(uri)
        const extArr = file._data.name.split('.')
        const ext = extArr[extArr.length - 1]
        fStorage
            .ref(`taruhe_${this.props.route.params.type}/${Date.now()}.${ext}`)
            .put(file)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                let imagesURL = this.state.imagesURL;
                imagesURL.push({ uri: url })
                this.setState({ imagesURL })
            })
            .catch(error => {
                Alert.alert(error.code, error.message);
            })
    };
    uriToBlob = uri => {
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
    handleDeletePhoto = (uri) => {
        const imagesURL = this.state.imagesURL.filter(image => image.uri !== uri)
        this.setState({ imagesURL })
    }
    submitData = () => {
        const { imagesURL, title, category, price, description, location, position } = this.state;
        const id = Date.now();
        if (imagesURL.length && title && category && price && description && location && position.province.nama && position.subDistrict.nama && position.district.nama) {
            fDB
                .ref(this.props.route.params.type + '/' + id).set({
                    imagesURL, title, category, price, description, location, position,
                    id: id,
                    created_by: { ...profile.data, password: '', email: '' },
                    uid: profile.data.uid,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }).then(() => {
                    Alert.alert('Sukses', 'Berhasil menambahkan item')
                    this.props.navigation.goBack()
                }).catch((err) => {
                    Alert.alert(err.code, err.message)
                })
        }
        else
            Alert.alert('Belum lengkap', 'Mohon lengkapi isian yang disediakan sebelum mengupload produk/jasa anda')
    }
    render() {
        const { type } = this.props.route.params;
        const { imagesURL, title, category, price, description, location, province, district, subDistrict, position } = this.state;
        console.log(position)
        return (
            <ScreenBase barStyle="dark-content">
                <ScrollView
                    contentContainerStyle={{
                        backgroundColor: '#f3f3f3',
                        paddingVertical: 45,
                        paddingHorizontal: 35,
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
                            {type === 'product' && strings.Menu2}
                            {type === 'service' && strings.Menu3}
                        </Text>
                        <Image
                            style={{ width: 100, height: 25, marginTop: 5, marginRight: 5 }}
                            source={require("../../assets/images/taruhe_splash.png")}
                        />
                    </View>
                    <View>
                        <Item picker rounded style={styles.inputItem} >
                            {!category && <Label style={{ fontSize: 14, marginLeft: 8 }}>Category</Label>}
                            {type === 'product' ?
                                <Picker
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    mode="dropdown"
                                    selectedValue={category}
                                    onValueChange={(text) => this.setState({ category: text })}
                                >
                                    <Picker.Item label='' value='' />
                                    <Picker.Item label={strings.Clothing} value='Clothing' />
                                    <Picker.Item label={strings.Accessories} value='Accessories' />
                                    <Picker.Item label={strings.Culinar} value='Culinar' />
                                    <Picker.Item label={strings.Musical} value='Musical' />
                                </Picker>
                                :
                                <Picker
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    mode="dropdown"
                                    selectedValue={category}
                                    onValueChange={(text) => this.setState({ category: text })}
                                >
                                    <Picker.Item label='' value='' />
                                    <Picker.Item label={strings.ArtShow} value='ArtShow' />
                                    <Picker.Item label={strings.Travel} value='Travel' />
                                </Picker>
                            }
                        </Item>
                        <Item rounded style={styles.inputItem}>
                            <Input
                                value={title}
                                onChangeText={(val) => this.setState({ title: val })}
                                style={{ fontSize: 14 }}
                                placeholder="Add title"
                            />
                        </Item>
                        <Item rounded style={styles.inputItem}>
                            <Label style={{ fontSize: 14 }}> Rp</Label>
                            <Input
                                value={price}
                                onChangeText={(val) => {
                                    let intVal = val.replace(/[^0-9]/g, '')
                                    this.setState({ price: intVal })
                                }}
                                style={{ fontSize: 14 }}
                                placeholder="Price"
                                keyboardType="numeric"
                            />
                        </Item>
                        <Text note style={{ marginTop: 5, marginLeft: 3 }}>Location</Text>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                location: profile.data.storeLocation,
                                position: profile.data.position
                            })
                        }}
                            style={{ paddingVertical: 5 }}
                        >
                            <Text style={{ fontSize: 12, alignSelf: 'center' }} note>Klik di sini jika lokasi {type} sama dengan lokasi toko</Text>
                        </TouchableOpacity>
                        <Item rounded style={styles.inputItem}>
                            <Input
                                value={location}
                                onChangeText={(val) => this.setState({ location: val })}
                                style={{ fontSize: 14 }}
                                placeholder="Street name/home number/etc..."
                            />
                        </Item>
                        <Item picker rounded style={styles.inputItem} disabled>
                            <Picker
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={position.province}
                                onValueChange={(val) => this.handleChangeProv(val)}
                            >
                                <Picker.Item label={this.state.position.province.nama || "Province"} value={this.state.position.province} />
                                {province.map((loc) => (
                                    <Picker.Item label={loc.nama} value={loc} key={loc.id} />
                                ))}
                            </Picker>
                        </Item>
                        <Item picker rounded style={styles.inputItem}>
                            <Picker
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={position?.district}
                                onValueChange={(val) => this.handleChangeDis(val)}
                            >
                                <Picker.Item label={this.state.position.district.nama || "District"} value={this.state.position.district} />
                                {district.length ? district.map((loc) => (
                                    <Picker.Item label={loc.nama} value={loc} key={loc.id} />
                                )) :
                                    <Picker.Item label="Pilih provinsi terlebih dahulu" value="" />
                                }
                            </Picker>
                        </Item>
                        <Item picker rounded style={styles.inputItem}>
                            <Picker
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={position?.subDistrict}
                                onValueChange={(val) => this.handleChangeSubDis(val)}
                            >
                                <Picker.Item label={this.state.position.subDistrict.nama || "Sub District"} value={this.state.position.subDistrict} />
                                {subDistrict.length ? subDistrict.map((loc) => (
                                    <Picker.Item label={loc.nama} value={loc} key={loc.id} />
                                )) :
                                    <Picker.Item label="Pilih Kabupaten/kota terlebih dahulu" value="" />
                                }
                            </Picker>
                        </Item>

                        <Textarea
                            value={description}
                            onChangeText={(val) => this.setState({ description: val })}
                            placeholder="Describe what you are offering"
                            style={{
                                borderColor: primeColor,
                                borderWidth: 2,
                                borderRadius: 18,
                                padding: 10,
                                marginVertical: 10,
                                fontSize: 14
                            }}
                            rowSpan={5}
                        />
                        <View style={{ alignItems: 'center', marginVertical: 10, }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginBottom: 5
                                }}
                            >
                                {imagesURL.length ? imagesURL.map((img) => (
                                    <ImageBackground key={img.uri} source={{ uri: img.uri }}
                                        style={{
                                            height: 55,
                                            width: 55,
                                            marginHorizontal: 2.5,
                                            borderRadius: 5,
                                            position: 'relative'
                                        }}
                                    >
                                        <TouchableOpacity
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                position: 'absolute',
                                                top: -5,
                                                right: -5,
                                                backgroundColor: '#006d6d',
                                                paddingVertical: 5,
                                                paddingHorizontal: 10,
                                                borderRadius: 50
                                            }}
                                            onPress={() => this.handleDeletePhoto(img.uri)}
                                        >
                                            <Text style={{ fontSize: 14, color: '#fff' }}>X</Text>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                )) :
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: '#555',
                                        }}
                                    >
                                        Upload setidaknya 1 foto, maksimal 5 foto
                                    </Text>
                                }
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                width: '90%',
                                justifyContent: 'space-between'
                            }}
                            >
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#ccc',
                                        width: '49%',
                                        alignItems: 'center',
                                        height: 50,
                                        justifyContent: 'center',
                                        borderTopLeftRadius: 25,
                                        borderBottomLeftRadius: 25
                                    }}
                                    onPress={() => this.addPhoto('camera')}
                                >
                                    <Icon name="camera-outline" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#ccc',
                                        width: '49%',
                                        alignItems: 'center',
                                        height: 50,
                                        justifyContent: 'center',
                                        borderTopRightRadius: 25,
                                        borderBottomRightRadius: 25
                                    }}
                                    onPress={() => this.addPhoto('image')}
                                >
                                    <Icon name="image-outline" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={[
                                {
                                    backgroundColor: primeColor,
                                    marginVertical: 10,
                                    borderRadius: 50
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
                            onPress={this.submitData}
                        >
                            <Text style={{ color: "#fff", fontWeight: '700', fontSize: 16 }}>
                                Upload
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ScreenBase>
        )
    }
}

export default AddItem;

const styles = StyleSheet.create({
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
        height: 45,
        marginVertical: 5
    },
})

