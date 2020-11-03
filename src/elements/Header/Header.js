import React from "react";
import { Text, Icon, Item, Input } from "native-base";
import { View, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import strings from "../../assets/Dictionary";
import { primeColor } from "../../configs/color";

export default function Header(props) {
  const {
    navigation,
    title,
    searchValue = "",
    onChangeSearch,
    openEtc,
  } = props;
  return (
    <View
      style={{
        backgroundColor: "#fff",
        paddingTop: 45,
        paddingHorizontal: 28,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="caret-back"
            style={{ color: primeColor, fontSize: 26, fontWeight: "bold" }}
          />
        </TouchableOpacity>
        <Text style={{ fontWeight: "bold", fontSize: 24, color: primeColor }}>
          {title}
        </Text>
        <TouchableOpacity
          onPress={() => {
            openEtc(true);
          }}
        >
          <Ionicons
            name="ellipsis-vertical"
            style={{ color: primeColor, fontSize: 24 }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <Item
          rounded
          style={{
            width: "82%",
            backgroundColor: "#f3f3f3",
            borderColor: "#f3f3f3",
            height: 40,
          }}
        >
          <Icon active name="search-outline" style={{ color: primeColor }} />
          <Input
            placeholder={strings.Search}
            placeholderTextColor={primeColor}
            style={{ color: primeColor, fontFamily: "roboto_thin" }}
            value={searchValue}
            onChangeText={(e) => onChangeSearch(e)}
          />
        </Item>
        <Icon name="filter" style={{ color: primeColor, marginRight: 7 }} />
      </View>
    </View>
  );
}
