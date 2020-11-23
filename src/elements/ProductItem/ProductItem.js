import React from 'react'
import { StyleSheet, Image, Pressable } from 'react-native';
import { Text, View } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';

export default function ProductItem({ type, toDetail, row }) {
    return (
        <Pressable style={styles.contentContainer(type)} onPress={toDetail}>
            <View style={styles.item(type)}>
                <Image
                    source={row?.imagesURL[0]}
                    style={styles.imageItem}
                />
                <Text style={styles.titleItem}>{row?.title || 'Contoh'}</Text>
                <View style={styles.containerItemLoc}>
                    <Ionicons name="location-outline" />
                    <Text style={styles.loc}>{row?.position.district.nama}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 12, marginTop: 3 }}>
                    <StarRating
                        disabled
                        maxStars={5}
                        rating={2.5}
                        starSize={12}
                        fullStarColor="#fdcc0d"
                        emptyStarColor="#fdcc0d"
                        halfStarColor="#fdcc0d"
                        style={styles.rating}
                    />
                    <Text style={styles.numberRate}>
                        (123)
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    contentContainer: (type) => ({
        width: type === 'lebar' ? '100%' : '50%',
        alignItems: 'center',
        marginBottom: 15,
    }),
    item: (type) => ({
        width: type === 'lebar' ? '97%' : '92%',
        borderRadius: 18,
        overflow: 'hidden',
        backgroundColor: '#fff',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 25,

        elevation: 8,

        paddingBottom: 15,
    }),
    imageItem: { width: '100%', height: 155 },
    titleItem: { fontSize: 16, marginHorizontal: 12, marginTop: 5, height: 22, fontWeight: '700', color: '#555' },
    containerItemLoc: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    loc: {
        fontFamily: 'Poppins-Thin',
        fontSize: 12,
        marginLeft: 5,
        color: '#555',
        height: 18
    },
    rating: {
        display: 'flex',
        alignSelf: 'flex-start',
        marginLeft: 12,
        marginTop: 5,
    },
    numberRate: {
        fontSize: 12,
        color: '#555',
        marginLeft: 5,
    }
});