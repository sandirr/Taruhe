import { Spinner, Text, View } from 'native-base';
import React from 'react';
import { primeColor } from '../../configs/color';

export default function LoadData() {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Spinner color={primeColor} />
            <Text>Loading...</Text>
        </View>
    )
}