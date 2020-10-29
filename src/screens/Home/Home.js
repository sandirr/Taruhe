import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, StyleSheet, Animated, LogBox } from 'react-native';
import strings from '../../assets/Dictionary';
import { Item, Input, Icon, View } from 'native-base';
import { primeColor } from '../../configs/color';
import ScreenBase from '../../elements/SecreenBase';
import FooterTabs from '../../elements/FooterTabs/FooterTabs';
import ListFeatured from "./ListFeatured";
import ProductItem from '../../elements/ProductItem';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Home = (props) => {
  const scrollA = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);
  const { navigation } = props;
  const [bgSearch, setBgSearch] = useState('transparent');
  const [colorSearch, setColorSearch] = useState('#fff');
  const [iconSearch, setIconSearch] = useState('#fff');
  const [offset, setOffset] = useState(0);
  const [currentDirection, setDirection] = useState('up');

  const handleScroll = (e) => {
    if (e.nativeEvent.contentOffset.y > 40) {
      const alpha = e.nativeEvent.contentOffset.y * 0.009;
      setBgSearch(`rgba(255,255,255,${alpha < 1 ? alpha : 1})`);
      if (alpha >= 0.9) {
        setIconSearch('#ccc');
        setColorSearch('#f3f3f3');
      } else {
        setIconSearch('#fff');
        setColorSearch('#fff');
      }
    } else {
      setBgSearch('transparent');
      setColorSearch('#fff');
      setIconSearch('#fff');
    }
    let currentOffset = e.nativeEvent.contentOffset.y;
    let direction = currentOffset > offset + 20 ? 'down' : 'up';
    if (currentOffset > offset + 20 || currentOffset + 20 < offset) {
      setOffset(currentOffset);
      setDirection(direction);
    }
  };

  return (
    <ScreenBase>
      <View
        style={[
          styles.searchItem,
          {
            backgroundColor: bgSearch,
          },
          bgSearch === 'rgba(255,255,255,1)' ? styles.shadowSearch : null,
        ]}
      >
        <Item
          rounded
          style={{
            width: '75%',
            backgroundColor: colorSearch,
            borderColor: colorSearch,
            height: 45,
          }}
        >
          <Icon active name="search-outline" style={{ color: primeColor }} />
          <Input
            placeholder={strings.Search}
            placeholderTextColor={primeColor}
            style={{ color: primeColor, fontFamily: 'roboto_thin' }}
          />
        </Item>
        <Icon name="heart" style={{ color: iconSearch }} />
        <Icon name="mail" style={{ color: iconSearch }} />
      </View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollA } } }],
          {
            useNativeDriver: true,
            listener: (event) => {
              handleScroll(event);
            },
          }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.bannerContainer}>
          <Animated.View style={styles.banner(scrollA)}>
            <ListFeatured />
          </Animated.View>
        </View>
        <View style={styles.scrollView}>
          <View style={styles.scrollContainer}>
            <ProductItem toDetail={() => navigation.navigate('DetailItem')} />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
          </View>
        </View>
      </Animated.ScrollView>
      <FooterTabs
        screen={strings.Menu1}
        navigation={navigation}
        direction={currentDirection}
      />
    </ScreenBase>
  );
};

const styles = StyleSheet.create({
  searchItem: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 15,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 9999,
  },
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
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingTop: 25,
    paddingHorizontal: 20,
    marginTop: -25,
  },
  scrollHandler: {
    marginTop: 10,
    backgroundColor: '#555',
    width: screenWidth * 0.15,
    height: 3,
    alignSelf: 'center',
  },
  scrollContainer: {
    // minHeight: screenHeight,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 75,
  },
  shadowSearch: {
    shadowColor: '#000',
    elevation: 10,
    shadowOpacity: 0.5,
  },
  imageBack: {
    height: '100%',
    width: screenWidth,
    position: 'relative',
  },
  textContainer: { position: 'absolute', bottom: 50, left: 25 },
  titleFeatured: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 24,
    textShadowColor: '#555',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  locationFeatured: {
    color: '#fff',
    marginTop: -3,
    fontSize: 12,
    textShadowColor: '#555',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3,
  },
});

export default Home;
