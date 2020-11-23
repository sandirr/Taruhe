import React from 'react'
import { Icon, Text } from 'native-base'
import { Pressable, View, Image, Dimensions, StyleSheet } from 'react-native'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function SellingItem({ data }) {
    const parser = (nom) => {
        if (nom) {
            nom = parseInt(nom.toString().replace(/[^0-9]/g, ''));
            return nom.toString().replace('.', '').split('').reverse().join('').match(/\d{1,3}/g).join('.').split('').reverse().join('');
        }
        else
            return null;
    };
    return (
        <Pressable>
            <View style={styles.root}>
                <Image
                    source={data.imagesURL[0]}
                    style={styles.thumb}
                />
                <View style={styles.itemInfo}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={styles.category}>{data.category}</Text>
                    <View style={styles.any}>
                        <Text style={styles.price}>Rp. {parser(data.price)} &#8722; </Text>
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
    thumb: { height: 140, width: '40%', borderRadius: 18 },
    itemInfo: { marginLeft: '5%', width: '55%' },
    title: { fontSize: 18, fontWeight: '700', color: '#555' },
    category: { color: 'gray', fontWeight: '700', marginVertical: 5 },
    any: { flexDirection: 'row', alignItems: 'center' },
    price: { fontSize: 18, fontWeight: '700', color: '#555' },
    star: { fontSize: 14, color: 'gray', marginLeft: 5 },
    rating: { color: 'gray' }
})