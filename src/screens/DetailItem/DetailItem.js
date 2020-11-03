import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, StyleSheet, Animated, LogBox, ImageBackground, Image, TouchableOpacity, Pressable } from 'react-native';
import { View, H3, Text, Button } from 'native-base';
import { primeColor } from '../../configs/color';
import ScreenBase from '../../elements/SecreenBase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';
import strings from '../../assets/Dictionary';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Home = (props) => {
    const scrollA = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, []);
    const { navigation } = props;
    const [readMore, setReadMore] = useState(false)

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
                                <Text style={{ fontSize: 24, fontWeight: 'bold', color: "#fff" }}>Tope (Kain Kajang)</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                                    <Ionicons name="home" style={{ color: '#fff', fontSize: 12 }} />
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
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#555' }}>Rp. 875.000</Text>
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
                                    <Text style={{ fontSize: 10, color: '#bb2205', fontWeight: 'bold' }}>22% Off</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-between', marginTop: 32
                        }}>
                            <View style={{
                                width: '60%', height: 200, justifyContent: 'space-between'
                            }}>
                                <Image
                                    source={require('../../assets/images/sarung.jpg')}
                                    style={{ height: 95, width: '100%', borderRadius: 18 }}
                                />
                                <Image
                                    source={require('../../assets/images/sarung.jpg')}
                                    style={{ height: 95, width: '100%', borderRadius: 18 }}
                                />
                            </View>
                            <View style={{ width: '37%' }}>
                                <Image
                                    source={require('../../assets/images/sarung.jpg')}
                                    style={{ height: 200, width: '100%', borderRadius: 18 }}
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: 32 }}>
                            <H3 style={{ fontWeight: 'bold', color: '#555' }}>{strings.Description}</H3>
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
                    </View>
                </View>
            </Animated.ScrollView>
            <Button style={styles.buttonOrder}>
                <Text style={styles.textOrder}>
                    {strings.Order}
                </Text>
                <View style={styles.nextBtn}>
                    <Ionicons name="chevron-forward" size={24} style={{
                        color: primeColor
                    }} />
                </View>
            </Button>
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
        borderRadius: 18
    },
    buttonOrder: {
        position: 'absolute', bottom: 15, backgroundColor: primeColor,
        width: '65%', alignSelf: 'center', paddingHorizontal: 15, borderRadius: 50, flexDirection: 'row',
        alignItems: 'center', justifyContent: 'space-between', height: 75
    },
    textOrder: {
        fontSize: 32, color: '#fff', marginLeft: 28, marginBottom: 3, textTransform: 'capitalize'
    },
    nextBtn: { backgroundColor: '#fff', borderRadius: 50, padding: 14 },
    readMore: {
        textDecorationLine: 'underline', color: '#555', fontSize: 14
    }
});

export default Home;
