import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Icon } from 'native-base';
import ScreenBase from '../../elements/SecreenBase';
import { ScrollView } from 'react-native-gesture-handler';
import { Linking, RefreshControl, TouchableOpacity, View } from 'react-native';
import { primeColor } from '../../configs/color';
import { profile } from '../../configs/profile';
import { fDB } from '../../configs/firebase';
import { wait } from '../../configs/helper';
import LoadData from '../../elements/LoadData';
import NotFound from '../../elements/NotFound';
export default class ListChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            users: [],
            refreshing: false,
            loading: true
        };
    }
    componentDidMount() {
        this.setState({ users: [] })
        this.getData();
    }

    getData = () => {
        this.setState({ users: [] })
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
            this.setState({ loading: false })
        });
    };

    getDay = time => {
        var weekday = new Array(7);
        weekday[0] = 'Sunday';
        weekday[1] = 'Monday';
        weekday[2] = 'Tuesday';
        weekday[3] = 'Wednesday';
        weekday[4] = 'Thursday';
        weekday[5] = 'Friday';
        weekday[6] = 'Saturday';
        return <Text note>{weekday[time]}, </Text>;
    };

    onRefresh = () => {
        this.setState({ refreshing: true })
        this.getData()
        setTimeout(() => {
            this.setState({ refreshing: false })
        }, 1000)
    }

    render() {
        const { navigation } = this.props;
        const { loading } = this.state
        return (
            <ScreenBase>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 45,
                    paddingBottom: 15,
                    paddingHorizontal: 25,
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
                {loading ?
                    <LoadData />
                    :
                    <View style={{ flex: 1, backgroundColor: '#f3f3f3', borderTopLeftRadius: 18, borderTopRightRadius: 18, marginTop: 10 }}>
                        <ScrollView refreshControl={
                            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                        }>
                            {this.state.users.length ? this.state.users.map((user) => (

                                <ListItem avatar onPress={() => navigation.navigate('ChatScreen', { data: user })}>
                                    <Left>
                                        <Thumbnail source={{
                                            uri: user.photoURL ||
                                                'https://cdn.iconscout.com/icon/free/png-256/account-profile-avatar-man-circle-round-user-30452.png'
                                        }} />
                                    </Left>
                                    <Body style={{
                                        borderBottomWidth: 1,
                                        paddingBottom: 18
                                    }}>
                                        <Text>{user.storeName}</Text>
                                        <Text note>{user.last_message.latitude ?
                                            'Location shared' :
                                            user.last_message.id ?
                                                user.last_message.title :
                                                user.last_message.substr(0, 22) + '...'}</Text>
                                    </Body>
                                    <Right style={{
                                        borderBottomWidth: 1,
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
                            ))
                                :
                                <NotFound m="No Messages Found" />
                            }
                        </ScrollView>
                    </View>
                }
            </ScreenBase>
        );
    }
}