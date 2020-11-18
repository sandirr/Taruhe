import React, { Component } from 'react';
import { Dimensions, Image, ImageBackground, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Badge, Button, Icon, Input, Item, Text, Textarea } from 'native-base';
import ScreenBase from '../../elements/SecreenBase';
import strings from '../../assets/Dictionary';
import { primeColor } from '../../configs/color';
import ImagePicker from 'react-native-image-picker';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
class AddItem extends Component {
    state = {
        imagesUri: []
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

        if (handleFor === 'camera') {
            ImagePicker.launchCamera(options, (response) => {
                if (response.didCancel) {
                    // console.log('User cancelled image picker');
                } else if (response.error) {
                    // console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    // console.log('User tapped custom button: ', response.customButton);
                } else {
                    let imagesUri = this.state.imagesUri;
                    imagesUri.push({ uri: response.uri, new: true })
                    this.setState({ imagesUri })
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
                    let imagesUri = this.state.imagesUri;
                    imagesUri.push({ uri: response.uri, new: true })
                    this.setState({ imagesUri })
                }
            })
        }
    }
    handleDeletePhoto = (uri) => {
        const imagesUri = this.state.imagesUri.filter(image => image.uri !== uri)
        this.setState({ imagesUri })
    }
    render() {
        const { type } = this.props.route.params;
        const { imagesUri } = this.state;
        return (
            <ScreenBase barStyle="dark-content">
                <ScrollView
                    contentContainerStyle={{
                        flex: 1,
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
                            {type === 'product' && strings.Menu2}
                            {type === 'service' && strings.Menu3}
                        </Text>
                        <Image
                            style={{ width: 100, height: 25, marginTop: 5, marginRight: 5 }}
                            source={require("../../assets/images/taruhe_splash.png")}
                        />
                    </View>
                    <View>
                        <Item rounded style={styles.inputItem}>
                            <Input
                                style={{ fontSize: 14 }}
                                placeholder="Category"
                            />
                        </Item>
                        <Item rounded style={styles.inputItem}>
                            <Input
                                style={{ fontSize: 14 }}
                                placeholder="Add title"
                            />
                        </Item>
                        <Item rounded style={styles.inputItem}>
                            <Input
                                style={{ fontSize: 14 }}
                                placeholder="Price"
                            />
                        </Item>
                        <Item rounded style={styles.inputItem}>
                            <Input
                                style={{ fontSize: 14 }}
                                placeholder="Location"
                            />
                        </Item>
                        <Textarea
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
                                {imagesUri.length ? imagesUri.map((img) => (
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
                                                backgroundColor: 'red',
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
                        <Button
                            rounded
                            style={[
                                {
                                    backgroundColor: primeColor,
                                    marginVertical: 10,
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
                        >
                            <Text style={{ color: "#fff", fontWeight: '700', fontSize: 16 }}>
                                Upload
                            </Text>
                        </Button>
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
        height: 55,
        marginVertical: 10
    },
})

