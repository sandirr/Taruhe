import { Container, Text } from 'native-base'
import React from 'react'
import { StatusBar } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function Loading() {
    return (
        <Container>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
            <Ionicons name="alarm" />
            <Text>Loading</Text>
        </Container>
    )
}