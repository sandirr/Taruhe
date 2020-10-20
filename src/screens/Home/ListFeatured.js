import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  ImageBackground,
  Text,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

export default class ListFeatured extends Component {
  state = {
    search: "",
    sliderIndex: 0,
    maxSlider: 2,
    banners: [
      {
        img:
          "https://ceritadestinasi.files.wordpress.com/2018/04/visit_sulsel-1522754153349.jpg?w=723",
        title: "Bara",
        location: "Sulawesi selatan",
      },
      {
        img:
          "https://cdn.idntimes.com/content-images/community/2018/11/tanjung-bira-1-wwwsenjamoktikacom-7e3b44f27058e7fbad17f2291b368051.jpg",
        title: "Pantai Bira",
        location: "Sulawesi selatan",
      },
      {
        img:
          "https://cdn.idntimes.com/content-images/community/2018/11/pantai-apparalang-1f492f8ed5cc123d4836c370c5ca7952_600x400.jpg",
        title: "Tebing Apparalang",
        location: "Sulawesi selatan",
      },
    ],
  };

  setRef = (c) => {
    this.listRef = c;
  };

  scrollToIndex = (index, animated) => {
    this.listRef && this.listRef.scrollToIndex({ index, animated });
  };

  componentDidMount() {
    setInterval(
      function () {
        const { sliderIndex, maxSlider } = this.state;
        let nextIndex = 0;

        if (sliderIndex < maxSlider) {
          nextIndex = sliderIndex + 1;
        }

        this.scrollToIndex(nextIndex, true);
        this.setState({ sliderIndex: nextIndex });
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
        keyExtractor={(item) => item.img}
        renderItem={({ item }) => {
          return (
            <ImageBackground
              source={{ uri: item.img }}
              style={styles.imageBack}
            >
              <View style={styles.textContainer}>
                <Text style={styles.titleFeatured}>{item.title}</Text>
                <Text style={styles.locationFeatured}>{item.location}</Text>
              </View>
            </ImageBackground>
          );
        }}
        onMomentumScrollEnd={(event) => {
          let sliderIndex = event.nativeEvent.contentOffset.x
            ? Math.ceil(event.nativeEvent.contentOffset.x / screenWidth)
            : 0;
          this.setState({ sliderIndex });
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
  },
  textContainer: { position: "absolute", bottom: 50, left: 25 },
  titleFeatured: {
    fontWeight: "bold",
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
