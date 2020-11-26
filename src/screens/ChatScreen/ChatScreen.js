import { Body, Icon, Input, Left, List, ListItem, Right, Text, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { Alert, FlatList, Linking, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { primeColor } from '../../configs/color';
import { fDB } from '../../configs/firebase';
import Geolocation from '@react-native-community/geolocation';
import ScreenBase from '../../elements/SecreenBase';
import { profile } from '../../configs/profile';
import MapView from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';
import { parser } from '../../configs/helper';

class ChatSCreen extends Component {
    state = {
        textMessage: '',
        messageList: [],
        dbRef: fDB.ref('messages'),
        image: '',
        person: this.props.route.params.data,
        item: this.props.route.params.item || {},
        messageList: [],
        imageSource: profile.data.photoURL
            ? { uri: profile.data.photoURL }
            : {
                uri:
                    'https://cdn.iconscout.com/icon/free/png-256/account-profile-avatar-man-circle-round-user-30452.png',
            },
    };

    componentDidMount() {
        this.state.dbRef
            .child(profile.data.uid)
            .child(this.state.person.uid)
            .on('child_added', value => {
                this.setState(prevState => {
                    return {
                        messageList: [...prevState.messageList, value.val()],
                    };
                });
            });
        setTimeout(() => {
            this.checkItem()
        }, 500)
    }
    checkItem = () => {
        if (this.state.item.id) {
            this.sendCustomMessage(this.state.item)
        }
    }
    sendCustomMessage = async (customMssgs) => {
        let msgId = this.state.dbRef
            .child(`${profile.data.uid}`)
            .child(this.state.person.uid)
            .push().key;
        let updates = {};
        let message = {
            message: customMssgs,
            time: new Date().toISOString(),
            from: profile.data.uid,
        };
        updates[
            `${profile.data.uid}` + '/' + this.state.person.uid + '/' + msgId
        ] = message;
        updates[
            this.state.person.uid + '/' + `${profile.data.uid}` + '/' + msgId
        ] = message;
        this.state.dbRef.update(updates);
        this.setState({ textMessage: '' });
    };
    sendMessage = () => {
        if (this.state.textMessage.length > 0) {
            let msgId = this.state.dbRef
                .child(`${profile.data.uid}`)
                .child(this.state.person.uid)
                .push().key;
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: new Date().toISOString(),
                from: profile.data.uid,
            };
            updates[
                `${profile.data.uid}` + '/' + this.state.person.uid + '/' + msgId
            ] = message;
            updates[
                this.state.person.uid + '/' + `${profile.data.uid}` + '/' + msgId
            ] = message;
            this.state.dbRef.update(updates);
            this.setState({ textMessage: '' });
        }
    };
    convertTime = time => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + '.';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        var weekday = new Array(7);
        weekday[0] = 'Sunday';
        weekday[1] = 'Monday';
        weekday[2] = 'Tuesday';
        weekday[3] = 'Wednesday';
        weekday[4] = 'Thursday';
        weekday[5] = 'Friday';
        weekday[6] = 'Saturday';
        if (c.getDay() !== d.getDay()) {
            result = weekday[d.getDay()] + ', ' + result;
        } else if (c.getMonth() !== d.getMonth()) {
            result = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
        }
        return result;
    };
    handleChangeText = key => val => {
        this.setState({ [key]: val });
    };
    shareLocation = () => {
        Geolocation.getCurrentPosition(info => {
            var { latitude, longitude, accuracy } = info.coords;
            Alert.alert(
                'CONFIRM !',
                `Share your location ?\nAccuracy: ${Math.floor(accuracy) > 100 ? 99 : Math.floor(accuracy)
                }%`,
                [
                    {
                        text: 'NO',
                        style: 'cancel',
                    },
                    {
                        text: 'YES',
                        onPress: () => {
                            const location = {
                                latitude: latitude,
                                longitude: longitude,
                            };
                            this.sendCustomMessage(location);
                        },
                    },
                ],
            );
        }, err => {
            Alert.alert('Lokasi tidak ditemukan', 'Mohon aktifkan lokasi/GPS Anda')
        });
    };

    renderRow = ({ item }) => {
        if (typeof item.message === "string") {
            if (item.from === profile.data.uid) {
                return (
                    <View style={style.sendingChat}>
                        <View style={style.sendingText}>
                            <Text style={style.textSending}>{item.message}</Text>
                        </View>
                        <Text
                            note
                            style={{ alignSelf: 'flex-end', fontSize: 12, marginRight: 5 }}>
                            {this.convertTime(item.time)}
                        </Text>
                    </View>
                );
            } else {
                return (
                    <View style={style.incomingChat}>
                        <View style={style.incomingText}>
                            <Text style={{ fontSize: 16 }}>{item.message}</Text>
                        </View>
                        <Text note style={{ alignSelf: 'flex-start', fontSize: 12, marginLeft: 5 }}>
                            {this.convertTime(item.time)}
                        </Text>
                    </View>
                );
            }
        } else if (item.message.latitude || item.message.longitude) {
            if (item.from === profile.data.uid) {
                return (
                    <View style={{ marginBottom: 5, }}>
                        <Pressable
                            onPress={() =>
                                Linking.openURL(`geo:${item.message.latitude},${item.message.longitude}`)
                            }
                            style={{
                                flex: 1,
                                paddingHorizontal: 10,
                                paddingVertical: 8,
                                backgroundColor: primeColor,
                                borderRadius: 15,
                                alignSelf: 'flex-end',
                                width: '70%',
                            }}>
                            <MapView
                                liteMode
                                style={{ height: 150 }}
                                region={{
                                    latitude: item.message.latitude,
                                    longitude: item.message.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0922,
                                }}>
                                <MapView.Marker
                                    coordinate={{
                                        latitude: item.message.latitude,
                                        longitude: item.message.longitude,
                                    }}
                                    title={profile.data.username}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Thumbnail
                                            style={{
                                                width: 30,
                                                height: 30,
                                                borderWidth: 1,
                                                borderColor: '#fff',
                                            }}
                                            source={this.state.imageSource}
                                        />
                                        <Icon
                                            name="location"
                                            style={{
                                                zIndex: -1,
                                                color: primeColor,
                                                fontSize: 50,
                                                marginTop: -33,
                                            }}
                                        />
                                    </View>
                                </MapView.Marker>
                            </MapView>
                            <Text
                                note
                                style={{
                                    alignSelf: 'flex-end',
                                    fontSize: 12,
                                    color: '#fff'
                                }}>
                                {this.convertTime(item.time)}
                            </Text>
                        </Pressable>
                    </View>
                );
            } else if (item.from !== profile.data.uid) {
                return (
                    <View
                        style={{
                            flex: 1,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            backgroundColor: '#f3f3f3',
                            borderRadius: 15,
                            alignSelf: 'flex-start',
                            width: '70%',
                            marginBottom: 5,
                        }}>
                        <Pressable
                            onPress={() =>
                                Linking.openURL(`geo:${item.message.latitude},${item.message.longitude}`)
                            }>
                            <MapView
                                liteMode
                                style={{ height: 150 }}
                                region={{
                                    latitude: item.message.latitude,
                                    longitude: item.message.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0922,
                                }}>
                                <MapView.Marker
                                    coordinate={{
                                        latitude: item.message.latitude,
                                        longitude: item.message.longitude,
                                    }}
                                    title={this.state.person.username}>
                                    {this.state.image ? (
                                        <View style={{ alignItems: 'center' }}>
                                            <Thumbnail
                                                style={{
                                                    width: 30,
                                                    height: 30,
                                                    borderWidth: 1,
                                                    borderColor: '#fff',
                                                }}
                                                source={{
                                                    uri: this.state.image,
                                                }}
                                            />
                                            <Icon
                                                name="location"
                                                style={{
                                                    zIndex: -1,
                                                    color: primeColor,
                                                    fontSize: 50,
                                                    marginTop: -33,
                                                }}
                                            />
                                        </View>
                                    ) : (
                                            <View style={{ alignItems: 'center' }}>
                                                <Thumbnail
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                        borderWidth: 1,
                                                        borderColor: '#fff',
                                                    }}
                                                    source={{
                                                        uri: this.state.person.photoURL ||
                                                            'https://cdn.iconscout.com/icon/free/png-256/account-profile-avatar-man-circle-round-user-30452.png'
                                                    }}
                                                />
                                                <Icon
                                                    name="location"
                                                    style={{
                                                        zIndex: -1,
                                                        color: primeColor,
                                                        fontSize: 50,
                                                        marginTop: -33,
                                                    }}
                                                />
                                            </View>
                                        )}
                                </MapView.Marker>
                            </MapView>
                            <Text
                                note
                                style={{ alignSelf: 'flex-start', fontSize: 12, marginTop: 5 }}>
                                {this.convertTime(item.time)}
                            </Text>
                        </Pressable>
                    </View>
                );
            }
        } else {
            return (
                <Pressable avatar style={{
                    alignSelf: 'center',
                    marginBottom: 5,
                    borderWidth: 2,
                    borderColor: '#ccc',
                    padding: 5,
                    borderRadius: 18,
                    marginHorizontal: 25,
                    flexDirection: 'row'
                }}
                    onPress={() => this.props.navigation.navigate('DetailItem', { detail: item.message })}
                >
                    <Left>
                        <Thumbnail source={item.message.imagesURL[0]} />
                    </Left>
                    <Body style={{ borderBottomWidth: 0 }}>
                        <Text>{item.message.title}</Text>
                        <Text note>Rp. {parser(item.message.price)}</Text>
                    </Body>
                </Pressable>
            )
        }
    };
    render() {
        const { navigation } = this.props;
        const { person } = this.state
        return (
            <ScreenBase>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 45,
                    paddingBottom: 15,
                    paddingHorizontal: 35,
                    justifyContent: 'space-between'
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="caret-back" style={{ color: primeColor, fontSize: 26 }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
                            <Thumbnail style={{ width: 40, height: 40 }} source={{ uri: person.photoURL }} />
                            <View style={{ marginLeft: 5 }}>
                                <Text style={{ color: primeColor, fontWeight: '700', fontSize: 18 }}>{person.storeName || 'Loading...'}</Text>
                                <Text style={{ fontSize: 12, marginTop: -5 }} note>Last Seen ...</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Icon name="ellipsis-vertical" style={{ color: primeColor, fontSize: 26 }} />
                    </TouchableOpacity>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    ref={ref => (this.ScrollView = ref)}
                    onContentSizeChange={() =>
                        this.ScrollView.scrollToEnd({ animated: true })
                    }
                    onLayout={() => this.ScrollView.scrollToEnd({ animated: true })}>
                    <FlatList
                        style={{ padding: 10 }}
                        data={this.state.messageList}
                        renderItem={this.renderRow}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ScrollView>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                    }}>
                    <TouchableOpacity
                        onPress={this.shareLocation}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            width: 30,
                            marginRight: 10,
                        }}>
                        <Icon name="compass" style={{ color: primeColor, marginLeft: 4 }} />
                    </TouchableOpacity>
                    <Input
                        multiline
                        style={{
                            padding: 10,
                            paddingLeft: 20,
                            paddingRight: 20,
                            width: '85%',
                            borderRadius: 25,
                            backgroundColor: '#f3f3f3',
                        }}
                        value={this.state.textMessage}
                        placeholder="Message"
                        onChangeText={this.handleChangeText('textMessage')}
                    />
                    <TouchableOpacity
                        onPress={this.sendMessage}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            width: 30,
                            marginLeft: 10,
                        }}>
                        <Icon name="send" style={{ color: primeColor }} />
                    </TouchableOpacity>
                </View>
            </ScreenBase>
        )
    }
}

const style = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        marginLeft: 5,
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 50,
        marginRight: 5,
    },
    header: {
        backgroundColor: '#176781',
    },
    incomingChat: {
        alignItems: 'flex-start',
        marginBottom: 5,
    },
    sendingChat: {
        alignItems: 'flex-end',
        marginBottom: 5,
    },
    incomingText: {
        backgroundColor: '#f3f3f3',
        maxWidth: '80%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    sendingText: {
        backgroundColor: primeColor,
        maxWidth: '80%',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    textSending: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ChatSCreen;