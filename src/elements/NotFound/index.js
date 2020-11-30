import { Icon, Text, View } from 'native-base'
import React from 'react'
import strings from '../../assets/Dictionary'
export default function NotFound({ m }) {
    return (
        <View style={{ alignItems: 'center', flexGrow: 1, justifyContent: 'center', alignSelf: 'center' }}>
            <Icon name="cloud-offline-outline" style={{ color: '#ccc', fontSize: 100 }} />
            <Text style={{ fontWeight: 'bold', color: '#ccc', fontSize: 16 }}>{strings.Sorry}</Text>
            <Text style={{ fontWeight: 'bold', color: '#ccc', fontSize: 16 }}>{m || strings.NoData}</Text>
        </View>
    )
}