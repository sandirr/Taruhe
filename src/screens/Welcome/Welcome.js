import { Button } from "native-base";
import React from "react";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
import strings from "../../assets/Dictionary";
import { primeColor } from "../../configs/color";
import FooterTabs from "../../elements/FooterTabs/FooterTabs";
import ScreenBase from "../../elements/SecreenBase";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Welcome({ navigation }) {
  return (
    <ScreenBase>
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f3f3f3",
          minHeight: screenHeight,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Image
            style={{ width: 180, height: 180 }}
            source={require("../../assets/images/taruhe_icon.png")}
          />
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: screenHeight * 0.09,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#555" }}>
            {strings.Welcome}
          </Text>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#555" }}>
            Taruhers !!!
          </Text>
        </View>
        <Text
          style={{ textAlign: "center", paddingHorizontal: screenWidth * 0.1 }}
        >
          {strings.tWelcome}
        </Text>
        <View style={{ marginTop: screenHeight * 0.06 }}>
          <Button
            style={{
              alignSelf: "center",
              width: screenWidth * 0.7,
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#ccc",
              borderRadius: 20,
              height: 55,
              marginTop: 20,
            }}
          >
            <Text style={{ color: "#000", fontWeight: "bold" }}>
              {strings.RegisterForFree}
            </Text>
          </Button>
          <Button
            style={{
              alignSelf: "center",
              width: screenWidth * 0.7,
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              backgroundColor: primeColor,
              borderRadius: 20,
              height: 55,
              marginTop: 20,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              {strings.Login}
            </Text>
          </Button>
        </View>
      </ScrollView>
      <FooterTabs screen={strings.Menu5} navigation={navigation} />
    </ScreenBase>
  );
}
