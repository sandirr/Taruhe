import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, StyleSheet, Animated, LogBox, ImageBackground, Image, TouchableOpacity, Linking } from 'react-native';
import { View, H3, Text, Button } from 'native-base';
import { primeColor } from '../../configs/color';
import ScreenBase from '../../elements/SecreenBase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import strings from '../../assets/Dictionary';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions'

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Home = (props) => {
    const scrollA = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, []);
    const { navigation } = props;
    const [readMore, setReadMore] = useState(false)
    const handleGetDirections = ({ latitude, longitude }) => {
        Linking.openURL('https://www.google.com/maps/search/?api=1&query=mega rezky residence')
    }
    return (
        <ScreenBase>
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                    {
                        useNativeDriver: true,
                    }
                )}
                scrollEventThrottle={16}
            >
                <View style={styles.bannerContainer}>
                    <Animated.View style={styles.banner(scrollA)}>
                        <ImageBackground
                            source={require('../../assets/images/sarung.jpg')}
                            style={{ height: screenHeight * 0.3, width: screenWidth }}
                        >
                            <View style={{ position: 'absolute', bottom: 45, left: 35 }}>
                                <Text style={{ fontSize: 24, fontWeight: '700', color: "#fff" }}>Tope (Kain Kajang)</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={require('../../assets/images/storefront.png')}
                                        style={{ height: 12, width: 12 }}
                                    />
                                    <Text style={{ color: '#fff', fontSize: 12, marginLeft: 5, textDecorationLine: 'underline' }}>Kalea Bulukumba Store</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                    <StarRating
                                        disabled
                                        maxStars={5}
                                        rating={3}
                                        starSize={12}
                                        fullStarColor="#fdcc0d"
                                        emptyStarColor="#fdcc0d"
                                        halfStarColor="#fdcc0d"
                                    />
                                    <Text style={{
                                        fontSize: 10,
                                        color: '#fff',
                                        marginLeft: 5,
                                    }}>
                                        (123)
                                    </Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </Animated.View>
                </View>
                <View style={styles.scrollView}>
                    <View style={styles.scrollContainer}>
                        <View style={styles.price}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="pricetag-outline" style={{ fontSize: 30 }} />
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: '700', color: '#555' }}>Rp. 875.000</Text>
                                    <View style={{
                                        flexDirection: 'row', alignItems: 'center', marginLeft: -2
                                    }}>
                                        <Ionicons name="location-outline"
                                            size={12} style={{ color: '#555' }} />
                                        <Text style={{
                                            fontSize: 12, color: '#555'
                                        }}>
                                            Bulukumba
                                        </Text>
                                    </View>
                                    <Text style={{ fontSize: 10, color: '#bb2205', fontWeight: '700' }}>22% Off</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 21 }}>
                            <H3 style={{ fontWeight: '700', color: '#555' }}>{strings.Description}</H3>
                            <Text style={[{
                                textAlign: 'justify', color: '#555', fontSize: 14
                            }, readMore ? null : { height: 42 }]}>
                                What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesettingn What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesettingn What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesettingn What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesettingn What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesettingn
                                </Text>
                            <TouchableOpacity onPress={() => setReadMore(!readMore)}>
                                <Text style={styles.readMore}>
                                    {readMore ? strings.ShowLess : strings.ReadMore}...
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-between', marginTop: 21
                        }}>
                            <View style={{
                                width: '60%', height: 220, justifyContent: 'space-between'
                            }}>
                                <Image
                                    source={require('../../assets/images/sarung.jpg')}
                                    style={{ height: 105, width: '100%', borderRadius: 18 }}
                                />
                                <Image
                                    source={require('../../assets/images/sarung.jpg')}
                                    style={{ height: 105, width: '100%', borderRadius: 18 }}
                                />
                            </View>
                            <View style={{ width: '37%' }}>
                                <Image
                                    source={require('../../assets/images/sarung.jpg')}
                                    style={{ height: 220, width: '100%', borderRadius: 18 }}
                                />
                            </View>
                        </View>

                        <View style={{ marginTop: 21 }}>
                            <View style={{ backgroundColor: '#ccc', borderRadius: 50, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, paddingHorizontal: 28, alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={require('../../assets/images/sarung.jpg')}
                                        style={{ height: 45, width: 45, borderRadius: 50, marginLeft: 6 }}
                                    />
                                    <View style={{ marginLeft: 10 }}>
                                        <TouchableOpacity onPress={() => navigation.navigate('StoreAccount')}>
                                            <Text style={{ fontSize: 20, color: '#555' }}>Kalea Official</Text>
                                            <Text style={{ fontSize: 12, color: '#555', textDecorationLine: 'underline', marginTop: -5 }}>Susi Pudjiastuti</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="heart" style={{ color: primeColor, fontSize: 26, marginHorizontal: 6 }} />
                                    <Ionicons name="mail" style={{ color: primeColor, fontSize: 26, marginHorizontal: 6 }} />
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 20, height: 180, width: '100%', padding: 5, backgroundColor: '#fff' }}>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => handleGetDirections({ latitude: 0.7893, longitude: 113.9213 })} >
                                <MapView
                                    liteMode
                                    style={{ flex: 1 }}
                                    provider={PROVIDER_GOOGLE}
                                    showsUserLocation
                                    initialRegion={{
                                        latitude: 0.7893,
                                        longitude: 113.9213,
                                        latitudeDelta: 1,
                                        longitudeDelta: 1,
                                    }}
                                >
                                    <Marker
                                        coordinate={{ latitude: 0.7893, longitude: 113.9213 }}
                                        title="Kalea Official"
                                    >
                                    </Marker>
                                </MapView>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Animated.ScrollView>
            <View style={styles.floatingOrder}>
                <View style={styles.favorite}>
                    <Ionicons name="heart-outline" style={styles.heart} />
                    <Text style={{ fontSize: 8, color: primeColor }}>{strings.Favorite}</Text>
                </View>
                <Button style={styles.buttonOrder}>
                    <Text style={{ fontSize: 14 }}>{strings.Order}</Text>
                </Button>
            </View>
        </ScreenBase>
    );
};

const styles = StyleSheet.create({
    bannerContainer: {
        marginTop: -1000,
        paddingTop: 1000,
        alignItems: 'center',
        overflow: 'hidden',
    },
    banner: (scrollA) => ({
        height: screenHeight * 0.35,
        width: '100%',
        position: 'relative',
        transform: [
            {
                translateY: scrollA,
            },
        ],
    }),
    scrollView: {
        backgroundColor: '#f3f3f3',
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        paddingTop: 25,
        paddingHorizontal: 35,
        marginTop: -65,
    },
    scrollHandler: {
        marginTop: 10,
        backgroundColor: '#555',
        width: screenWidth * 0.15,
        height: 3,
        alignSelf: 'center',
    },
    scrollContainer: {
        paddingBottom: 100
    },
    price: {
        backgroundColor: '#ccc',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 50
    },
    floatingOrder: { backgroundColor: '#fff', position: 'absolute', bottom: 0, right: 0, left: 0, paddingHorizontal: 24, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    favorite: { justifyContent: 'center', alignItems: 'center' },
    heart: { color: primeColor, fontSize: 28, marginBottom: -5 },
    buttonOrder: { backgroundColor: primeColor, width: screenWidth * 0.75, justifyContent: 'center', height: 35, borderRadius: 50 },
    readMore: {
        textDecorationLine: 'underline', color: '#555', fontSize: 14
    }
});

export default Home;
