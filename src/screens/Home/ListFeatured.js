import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ImageBackground,
  Text,
  Pressable,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

export default class ListFeatured extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: "",
      sliderIndex: 0,
      maxSlider: 2,
      banners: [],
    };
  }

  setRef = (c) => {
    this.listRef = c;
  };

  scrollToIndex = (index, animated) => {
    this.listRef && this.listRef.scrollToIndex({ index, animated });
  };

  componentDidUpdate(prevProps) {
    if (this.props.data && prevProps.data !== this.props.data) {
      this.setState({ banners: this.props.data })
    }
  }

  componentDidMount() {
    setInterval(
      function () {
        if (this.state.banners.length > 1) {
          const { sliderIndex, maxSlider } = this.state;
          let nextIndex = 0;

          if (sliderIndex < maxSlider) {
            nextIndex = sliderIndex + 1;
          }

          this.scrollToIndex(nextIndex, true);
          this.setState({ sliderIndex: nextIndex });
        }
      }.bind(this),
      3000
    );
  }
  render() {
    return (
      <FlatList
        ref={this.setRef}
        data={this.state.banners}
        horizontal={true}
        pagingEnabled={true}
        keyExtractor={(item) => item.imagesURL[0].uri}
        renderItem={({ item }) => {
          return (
            <ImageBackground
              source={{ uri: item.imagesURL[0].uri }}
              style={styles.imageBack}
            >
              <Pressable style={styles.textContainer} onPress={() => this.props.navigation.navigate('DetailItem', { detail: item })}>
                <Text style={styles.titleFeatured}>{item.title}</Text>
                <Text style={styles.locationFeatured}>{item.position.province.nama}</Text>
              </Pressable>
            </ImageBackground>
          );
        }}
        onMomentumScrollEnd={(event) => {
          if (this.state.banners.length > 1) {
            let sliderIndex = event.nativeEvent.contentOffset.x
              ? Math.ceil(event.nativeEvent.contentOffset.x / screenWidth)
              : 0;
            this.setState({ sliderIndex });
          }
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  imageBack: {
    height: "100%",
    width: screenWidth,
    position: "relative",
    backgroundColor: '#f3f3f3'
  },
  textContainer: { position: "absolute", bottom: 50, left: 25 },
  titleFeatured: {
    fontWeight: '700',
    color: "#fff",
    fontSize: 24,
    textShadowColor: "#555",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  locationFeatured: {
    color: "#fff",
    marginTop: -3,
    fontSize: 12,
    textShadowColor: "#555",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3,
  },
});
