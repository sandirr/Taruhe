import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Icon } from 'native-base';
import ScreenBase from '../../elements/SecreenBase';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity, View } from 'react-native';
import { primeColor } from '../../configs/color';
import { profile } from '../../configs/profile';
import { fDB } from '../../configs/firebase';
export default class ListChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            users: [],
        };
    }
    componentDidMount() {
        this.getFromFirebase();
    }

    getFromFirebase = () => {
        let dbRef = fDB.ref('users');
        dbRef.on('child_added', val => {
            let person = val.val();
            person.uid = val.key;
            if (person.uid !== profile.data.uid) {
                fDB.ref('messages')
                    .child(profile.data.uid)
                    .child(person.uid)
                    .limitToLast(1)
                    .on('child_added', value => {
                        person.last_time = value.val().time;
                        person.last_message = value.val().message;
                    });

                fDB.ref('messages')
                    .child(profile.data.uid)
                    .child(person.uid)
                    .on('value', value => {
                        if (value.val()) {
                            if (!this.state.users.includes(person)) {
                                this.setState(prevState => {
                                    return {
                                        users: [...prevState.users, person],
                                    };
                                });
                            }
                        }
                    });
            }
        });
    };

    render() {
        const { navigation } = this.props;
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
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            name="caret-back"
                            style={{ color: primeColor, fontSize: 26 }}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '700', fontSize: 24, color: primeColor }}>
                        Messages
                    </Text>
                    <Icon
                        name="caret-back"
                        style={{ color: 'transparent', fontSize: 26 }}
                    />
                </View>
                <ScrollView>
                    {this.state.users.map((user) => (
                        <List>
                            <ListItem avatar onPress={() => navigation.navigate('ChatScreen', { data: user })}>
                                <Left>
                                    <Thumbnail source={{
                                        uri: user.photoURL ||
                                            'https://cdn.iconscout.com/icon/free/png-256/account-profile-avatar-man-circle-round-user-30452.png'
                                    }} />
                                </Left>
                                <Body>
                                    <Text>{user.storeName}</Text>
                                    <Text note>{user.last_message.latitude ? 'Location shared' : user.last_message}</Text>
                                </Body>
                                <Right style={{
                                    borderBottomWidth: 0,
                                    padding: 0
                                }}>
                                    {new Date(user.last_time).getMonth() !== new Date().getMonth() ? (
                                        <Text note>
                                            {new Date(user.last_time).getDate()}/
                                            {new Date(user.last_time).getMonth()}/
                                            {new Date(user.last_time).getFullYear()}
                                        </Text>
                                    ) : (
                                            <Text note>
                                                {new Date(user.last_time).getDay() !== new Date().getDay() ? (
                                                    this.getDay(new Date(user.last_time).getDay())
                                                ) : null}
                                                {new Date(user.last_time).getHours() < 10 ? '0' : null}
                                                {new Date(user.last_time).getHours()}
                                                {'.'}
                                                {new Date(user.last_time).getMinutes() < 10 ? '0' : null}
                                                {new Date(user.last_time).getMinutes()}
                                            </Text>
                                        )}
                                </Right>
                            </ListItem>
                        </List>
                    ))}
                </ScrollView>
            </ScreenBase>
        );
    }
}