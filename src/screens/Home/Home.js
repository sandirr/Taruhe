import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Dimensions, StyleSheet, Animated, LogBox, TouchableOpacity, RefreshControl } from 'react-native';
import strings from '../../assets/Dictionary';
import { Item, Input, Icon, View, Text, Spinner } from 'native-base';
import { primeColor } from '../../configs/color';
import ScreenBase from '../../elements/SecreenBase';
import FooterTabs from '../../elements/FooterTabs/FooterTabs';
import ListFeatured from "./ListFeatured";
import ProductItem from '../../elements/ProductItem';
import { fDB } from '../../configs/firebase';
import { wait } from '../../configs/helper';
import LoadData from '../../elements/LoadData';
import NotFound from '../../elements/NotFound';

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
  const [productservice, setProductService] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [dataSize, setDataSize] = useState(6)
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true)

  const [tourisms, setTourism] = useState([])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setDataSize(6)
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getData()
  }, [dataSize, search])

  useEffect(() => {
    let tourism = productservice.filter(e => e.category === 'Natural' || e.category === 'Cultural')
    setTourism(tourism)
  }, [productservice])

  const getData = () => {
    fDB.ref('product_service')
      .limitToLast(dataSize)
      .on('value', (values) => {
        if (values.val()) {
          let allItems = []
          Object.keys(values.val()).map((value) => {
            let newItem = values.val()[value];
            let re = new RegExp(search.trim(), 'gi');
            if (newItem.title.match(re)) {
              allItems.push(newItem);
            }
          })
          setProductService(allItems)
        }
        setLoading(false)
      }, (error) => {
        Alert.alert(error.code)
        setLoading(false)
      })
  }

  const handleScroll = (e) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent
    let yOffset = contentOffset.y;
    if (yOffset > 40) {
      const alpha = yOffset * 0.01;
      if (alpha >= 0.9) {
        setBgSearch(`#fff`);
        setIconSearch('#ccc');
        setColorSearch('#f3f3f3');
      } else {
        setBgSearch(`transparent`);
        setIconSearch('#fff');
        setColorSearch('#fff');
      }
    } else {
      setBgSearch('transparent');
      setColorSearch('#fff');
      setIconSearch('#fff');
    }
    let direction = yOffset > offset + 20 ? 'down' : 'up';
    if (yOffset > offset + 20 || yOffset + 20 < offset) {
      setOffset(yOffset);
      setDirection(direction);
    }
    if ((layoutMeasurement.height + yOffset) >= (contentSize.height - 20)) {
      setDataSize(dataSize + 6)
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
            height: 40,
          }}
        >
          <Icon active name="search-outline" style={{ color: primeColor }} />
          <Input
            placeholder={strings.Search}
            placeholderTextColor={primeColor}
            style={{ color: primeColor }}
            value={search}
            onChangeText={(e) => setSearch(e)}
          />
        </Item>
        <Icon name="heart" style={{
          color: iconSearch,
          textShadowColor: "#555",
          textShadowOffset: { width: -1, height: 1 },
          textShadowRadius: 5,
        }} />
        <TouchableOpacity onPress={() => navigation.navigate('ListChat')}>
          <Icon name="mail" style={{
            color: iconSearch,
            textShadowColor: "#555",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 5,
          }} />
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.bannerContainer}>
          <Animated.View style={styles.banner(scrollA)}>
            <ListFeatured data={tourisms} navigation={navigation} />
          </Animated.View>
        </View>
        {loading ?
          <LoadData />
          :
          <View style={styles.scrollView}>
            {productservice.length ?
              productservice.map((item) => (
                <ProductItem row={item} key={item.id} toDetail={() => navigation.navigate('DetailItem', { detail: item })} />
              )).reverse()
              :
              <NotFound />
            }
          </View>
        }
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
    paddingBottom: 50,
    paddingHorizontal: 20,
    marginTop: -25,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  scrollHandler: {
    marginTop: 10,
    backgroundColor: '#555',
    width: screenWidth * 0.15,
    height: 3,
    alignSelf: 'center',
  },
  scrollContainer: {
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
