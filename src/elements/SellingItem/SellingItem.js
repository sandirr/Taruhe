import React from 'react'
import { Icon, Text } from 'native-base'
import { Pressable, View, Image, Dimensions, StyleSheet } from 'react-native'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function SellingItem() {
    return (
        <Pressable>
            <View style={styles.root}>
                <Image
                    source={require('../../assets/images/sarung.jpg')}
                    style={styles.thumb}
                />
                <View style={styles.itemInfo}>
                    <Text style={styles.title}>Kain Selendang Tammaddohong</Text>
                    <Text style={styles.category}>Clothing</Text>
                    <View style={styles.any}>
                        <Text style={styles.price}>Rp. 29.000 &#8722; </Text>
                        <Icon name="star-outline" style={styles.star} />
                        <Text style={styles.rating}> 4.0</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    root: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    thumb: { height: 160, width: '40%', borderRadius: 18 },
    itemInfo: { marginLeft: '5%', width: '55%' },
    title: { fontSize: 18, fontWeight: '700', color: '#555' },
    category: { color: 'gray', fontWeight: '700', marginVertical: 5 },
    any: { flexDirection: 'row', alignItems: 'center' },
    price: { fontSize: 18, fontWeight: '700', color: '#555' },
    star: { fontSize: 14, color: 'gray', marginLeft: 5 },
    rating: { color: 'gray' }
})