import React from 'react'
import { Icon, Text, View } from 'native-base'
import ScreenBase from '../../elements/SecreenBase'
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { primeColor } from '../../configs/color'
import strings from '../../assets/Dictionary'

export default function HelpCenter({ navigation }) {
    return (
        <ScreenBase barStyle="dark-content">
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon
                        name="caret-back"
                        style={{ color: primeColor, fontSize: 26 }}
                    />
                </TouchableOpacity>
                <Text style={{ fontWeight: '700', fontSize: 24, color: primeColor }}>
                    {strings.HelpCenter}
                </Text>
                <Icon
                    name="caret-back"
                    style={{ color: 'transparent', fontSize: 26 }}
                />
            </View>
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={{ paddingHorizontal: 20, marginVertical: 12 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Kami di sini untuk kamu!</Text>
                        <Text style={{ textAlign: 'justify' }}>Setiap kamu butuh bantuan atau memiliki pertanyaan mengenai Taruhe, kamu bisa menghubungi kami melalui:</Text>
                        <Text style={{ alignSelf: 'center', marginTop: 28 }}>contact.taruhe@gmail.com</Text>
                    </View>
                </ScrollView>
            </View>
        </ScreenBase>
    )
}

const styles = StyleSheet.create({
    itemDivider: { backgroundColor: '#f3f3f3', borderBottomColor: '#ccc', borderBottomWidth: 1 },
    menuItem: { borderBottomColor: '#ccc', borderBottomWidth: 1, backgroundColor: '#dcdee2' },
    textDivider: { fontSize: 14, color: 'gray', fontWeight: '700' },
    header: { flexDirection: 'row', alignItems: 'center', paddingTop: 45, paddingBottom: 15, paddingHorizontal: 32, backgroundColor: '#fff', justifyContent: 'space-between' },
})