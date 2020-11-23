import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, StyleSheet, Animated, LogBox, TouchableOpacity } from 'react-native';
import strings from '../../assets/Dictionary';
import { Item, Input, Icon, View, Text } from 'native-base';
import { primeColor } from '../../configs/color';
import ScreenBase from '../../elements/SecreenBase';
import FooterTabs from '../../elements/FooterTabs/FooterTabs';
import ListFeatured from "./ListFeatured";
import ProductItem from '../../elements/ProductItem';
import { fDB } from '../../configs/firebase';

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
  const [products, setProducts] = useState([])
  // const [services, setServices] = useState([])
  // const [keys] = useState(['product', 'service'])
  // const [items, setItems] = useState([])
  // useEffect(() => {
  //   let data = products.concat(services)
  //   setItems(data)
  // }, [products, services])
  useEffect(() => {
    fDB.ref('product')
      .limitToLast(10)
      .on('value', (values) => {
        if (values.val()) {
          let allItems = []
          Object.keys(values.val()).map((value) => {
            allItems.push(values.val()[value]);
          })
          setProducts(allItems)
        }
      }, (error) => {
        Alert.alert(error.code)
      })
  }, [])

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

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array
  }

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
            height: 40,
          }}
        >
          <Icon active name="search-outline" style={{ color: primeColor }} />
          <Input
            placeholder={strings.Search}
            placeholderTextColor={primeColor}
            style={{ color: primeColor }}
          />
        </Item>
        <Icon name="heart" style={{ color: iconSearch }} />
        <TouchableOpacity onPress={() => navigation.navigate('ListChat')}>
          <Icon name="mail" style={{ color: iconSearch }} />
        </TouchableOpacity>
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
            {products.length ?
              products.map((item) => (
                <ProductItem row={item} key={item.id} toDetail={() => navigation.navigate('DetailItem', { detail: item })} />
              ))
              :
              <Text>Loading...</Text>
            }
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
    // height: screenHeight
  },
  scrollHandler: {
    marginTop: 10,
    backgroundColor: '#555',
    width: screenWidth * 0.15,
    height: 3,
    alignSelf: 'center',
  },
  scrollContainer: {
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
    fontWeight: '700',
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
