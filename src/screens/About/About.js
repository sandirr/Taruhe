import React, { useEffect, useState } from 'react'
import { Icon, Left, List, ListItem, Right, Text, View } from 'native-base'
import ScreenBase from '../../elements/SecreenBase'
import { StyleSheet, TouchableOpacity, Switch, Dimensions, ScrollView } from 'react-native'
import { primeColor } from '../../configs/color'
import strings from '../../assets/Dictionary'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { profile } from '../../configs/profile'

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
export default function About({ navigation }) {
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
                    {strings.About}
                </Text>
                <Icon
                    name="caret-back"
                    style={{ color: 'transparent', fontSize: 26 }}
                />
            </View>
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                        <Text style={styles.paragraf}>
                            TARUHE merupakan aplikasi e-commerce kebudayaan lokal Indonesia. Aplikasi ini bertujuan untuk melakukan jual beli barang dan jasa kebudayaan lokal di seluruh Indonesia serta memperkenalkan kekayaan pariwisata Indonesia.
                        </Text>
                        <Text style={styles.paragraf}>
                            Dalam aplikasi TARUHE, terdapat tiga menu utama, yaitu produk, jasa, dan pariwisata. Penjabarannya sebagai berikut:
                        </Text>
                        <Text style={styles.paragraf}>
                            1. Produk
                        </Text>
                        <Text style={styles.subParagraf}>
                            Menu produk adalah menu untuk menyewa atau membeli produk kebudayaan lokal. Produk-produk yang dapat ditemui dalam menu ini yaitu:
                        </Text>
                        <Text style={styles.subParagrafMenu}>
                            - Pakaian tradisional
                        </Text>
                        <Text style={styles.subPVal}>
                            Pakaian tradisional ini berupa pakian adat, pakaian khas daerah, dan kostum pertunjukan kebudayaan.
                        </Text>
                        <Text style={styles.subParagrafMenu}>
                            - Alat musik tradisional
                        </Text>
                        <Text style={styles.subPVal}>
                            Alat musik tradisional ini seperti, angklung, suling, basing, gendang dan alat musik tradisional lainnya.
                        </Text>
                        <Text style={styles.subParagrafMenu}>
                            - Aksesoris
                        </Text>
                        <Text style={styles.subPVal}>
                            Aksesoris khas daerah di seluruh Indonesia dapat anda ditemukan disini. Aksesoris ini dapat berupa tas, gelang, syal dan yang lainnya.
                        </Text>
                        <Text style={styles.subParagrafMenu}>
                            - Kuliner
                        </Text>
                        <Text style={styles.subPVal}>
                            Kuliner-kuliner khas daerah di seluruh Indonesia dapat anda temukan disini.
                        </Text>
                        <Text style={styles.paragraf}>
                            2. Jasa
                        </Text>
                        <Text style={styles.subParagraf}>
                            Dalam menu jasa, terdapat dua layanan utama yang akan kami sajikan, yaitu:
                        </Text>
                        <Text style={styles.subParagrafMenu}>
                            - Pertunjukan seni
                        </Text>
                        <Text style={styles.subPVal}>
                            Jasa pertunjukan seni ini dapat berupa jasa pertunjukan tari, wayang, dan lainnya. Ini sangat berguna bagi anda yang memerlukan jasa pertunjukan seni sebagai pengisi acara dalam kegiatan anda. Disini anda akan dengan mudah menemukan jasa pertunjukan seni sesuai dengan keinginan anda. Anda juga dapat menyewa jasa pertunjukan daerah lain tdengan mudah. Layanan ini merupakan pertama kali dan satu-satunya yang ada di Indonesia.
                        </Text>
                        <Text style={styles.subParagrafMenu}>
                            - Travel
                        </Text>
                        <Text style={styles.subPVal}>
                            Jasa Travel ini meliputi pramuwisata, penginapan, dan transportasi. Layanan ini sangat memudahkan anda yang ingin berkunjung ke tempat-tempat wisata di Indonesia akan tetapi tidak tau seluk beluk daerah tersebut. Layanan ini akan memberikan rasa aman dan nyawan kepada anda dan para wisatawan lainnya dalam melakukan kunjungan wisata.
                        </Text>
                        <Text style={styles.paragraf}>
                            3. Pariwisata
                        </Text>
                        <Text style={styles.subParagraf}>
                            Dalam menu wisata, kami akan menampilkan artikel tempat-tempat wisata di seluruh Indonesia lengakap dengan link untuk penyewaan jasa travel yang ketika di klik akan langsung terdirect ke menu jasa travel dan sudah otomatis terfilter sesuai tempat yang dia pilih.
                        </Text>
                        <Text style={styles.subParagraf}>
                            Kami akan berkomitmen untuk selalu berinovasi dalam pemajuan kebudayaan Indonesia.
                        </Text>
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
    paragraf: { textAlign: 'justify', marginVertical: 5 },
    subParagraf: { textAlign: 'justify', marginLeft: 18 },
    subParagrafMenu: { marginVertical: 5, marginLeft: 18 },
    subPVal: { marginLeft: 26 }
})