import React, { useEffect, useState } from 'react'
import { Container, Text } from 'native-base'
import { StatusBar, AsyncStorage } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import strings from '../../assets/Dictionary'

export default function Loading({ navigation }) {
    const [activeLanguage, setActiveLanguage] = useState('')
    useEffect(() => {
        if (activeLanguage) {
            navigation.navigate(strings.Menu1)
        }
        getLanguage();
    }, [activeLanguage])

    const getLanguage = async () => {
        const language = await AsyncStorage.getItem('language');
        if (!language) {
            strings.setLanguage('id')
            await AsyncStorage.setItem('language', 'id')
            setActiveLanguage('id')
        } else {
            strings.setLanguage(language)
            setActiveLanguage(language)
        }
    }
    return (
        <Container>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
            <Ionicons name="alarm" />
            <Text>Loading</Text>
        </Container>
    )
}