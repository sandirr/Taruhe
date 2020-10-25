import { Button } from "native-base";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import strings from "../../assets/Dictionary";
import { primeColor } from "../../configs/color";
// import FooterTabs from "../../elements/FooterTabs/FooterTabs";
import ScreenBase from "../../elements/SecreenBase";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Welcome({ navigation }) {
  return (
    <ScreenBase>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Image
            style={styles.iconTaruhe}
            source={require("../../assets/images/taruhe_icon.png")}
          />
        </View>
        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>{strings.Welcome}</Text>
          <Text style={styles.welcomeText}>Taruhers !!!</Text>
        </View>
        <Text style={styles.aboutTaruhe}>{strings.aboutTaruhe}</Text>
        <View style={{ marginTop: screenHeight * 0.06 }}>
          <Button
            style={[
              {
                backgroundColor: "#ccc",
              },
              styles.button,
            ]}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={{ color: "#555", fontWeight: "bold" }}>
              {strings.RegisterForFree}
            </Text>
          </Button>
          <Button
            style={[
              {
                backgroundColor: primeColor,
              },
              styles.button,
            ]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              {strings.Login}
            </Text>
          </Button>
        </View>
      </ScrollView>
      {/* <FooterTabs screen={strings.Menu5} navigation={navigation} /> */}
    </ScreenBase>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f3f3",
    minHeight: screenHeight,
  },
  iconTaruhe: { width: 180, height: 180 },
  welcome: {
    display: "flex",
    alignItems: "center",
    marginTop: screenHeight * 0.09,
  },
  welcomeText: { fontSize: 24, fontWeight: "bold", color: "#555" },
  aboutTaruhe: { textAlign: "center", paddingHorizontal: screenWidth * 0.1 },
  button: {
    alignSelf: "center",
    width: screenWidth * 0.7,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    borderRadius: 20,
    height: 55,
    marginTop: 20,
  },
});
