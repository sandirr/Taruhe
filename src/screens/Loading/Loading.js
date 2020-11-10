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

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const language = await AsyncStorage.getItem('language');
        if (!language) {
            strings.setLanguage('id')
            await AsyncStorage.setItem('language', 'id')
            this.props.navigation.navigate('AppCore')
        } else {
            strings.setLanguage(language)
            this.props.navigation.navigate('AppCore')
        }
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