import React from 'react';
import {
    View,
    Text,
    StatusBar,
} from 'react-native';
import { Spinner } from 'native-base';
import strings from '../../assets/Dictionary'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { primeColor } from '../../configs/color';

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._bootstrapAsync()
    }

    _removeUid = async () => {
        await AsyncStorage.removeItem('uid')
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const { navigation } = this.props;
        let language = await AsyncStorage.getItem('language');
        // let uid = await AsyncStorage.getItem('uid')
        // profile.data = JSON.parse(userData);

        strings.setLanguage(language || 'id')
        await AsyncStorage.setItem('language', language || 'id')
        navigation.replace('AppCore')

        // fAuth.onAuthStateChanged(function (user) {
        //     if (user && uid) {
        //         fDB.ref('users/' + uid).on('value', val => {
        //             profile.data = val.val()
        //         })
        //     } else {
        //         this._removeUid()
        //         navigation.replace('AppCore')
        //     }
        // });

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
    };

    // Render any loading content that you like here
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <StatusBar
                    backgroundColor="rgba(255,255,255,.2)"
                    barStyle="dark-content"
                    translucent
                />
                <View>
                    <Text style={{ fontSize: 16 }}>Hi, Taruhers</Text>
                </View>
                <Spinner color={primeColor} />
            </View>
        );
    }
}