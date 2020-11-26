import { Icon, Text, View } from 'native-base'
import React from 'react'
export default function NotFound({ m }) {
    return (
        <View style={{ alignItems: 'center', flex: 1 }}>
            <Icon name="cloud-offline-outline" style={{ color: '#ccc', fontSize: 160 }} />
            <Text style={{ fontWeight: 'bold', color: '#ccc', fontSize: 21 }}>Sorry</Text>
            <Text style={{ fontWeight: 'bold', color: '#ccc', fontSize: 21 }}>{m || "No Data Found"}</Text>
        </View>
    )
}