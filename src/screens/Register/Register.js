import { Button, Icon, Input, Item } from "native-base";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import strings from "../../assets/Dictionary";
import { primeColor } from "../../configs/color";
import ScreenBase from "../../elements/SecreenBase";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Register({ navigation }) {
  const [passwordVisible, setPasswordVisisble] = useState(false);
  return (
    <ScreenBase barStyle="light-content">
      <View style={styles.root}>
        <ScrollView
          contentContainerStyle={styles.loginContainer}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 25,
            }}
          >
            <Text style={{ fontSize: 24, color: "#555", fontWeight: "bold" }}>
              {strings.Register[0] + strings.Register.toLowerCase().slice(1)}
            </Text>
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../assets/images/taruhe_icon.png")}
            />
          </View>

          <Text style={styles.label}>Username</Text>
          <Item regular style={styles.inputItem}>
            <Input
              placeholder={strings.InputUsername}
              textContentType="username"
            />
          </Item>
          <Text style={styles.label}>Email</Text>
          <Item regular style={styles.inputItem}>
            <Input
              placeholder={strings.InputEmail}
              textContentType="username"
            />
          </Item>
          <Text style={styles.label}>{strings.Password}</Text>
          <Item regular style={styles.inputItem}>
            <Input
              placeholder={strings.InputPassword}
              secureTextEntry={!passwordVisible}
              textContentType="password"
            />
            <TouchableOpacity
              onPress={() => setPasswordVisisble(!passwordVisible)}
            >
              <Icon
                name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                style={{ color: "#555" }}
              />
            </TouchableOpacity>
          </Item>

          <Button
            style={[
              {
                backgroundColor: primeColor,
                marginTop: 35,
              },
              styles.button,
            ]}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              {strings.Register}
            </Text>
          </Button>

          <Text style={{ alignSelf: "center", marginBottom: 8, marginTop: 25 }}>
            {strings.AlreadyHaveAccount} ?
          </Text>

          <Button
            style={[
              {
                backgroundColor: "#ccc",
              },
              styles.button,
            ]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ color: "#555", fontWeight: "bold", fontSize: 16 }}>
              {strings.Login}
            </Text>
          </Button>
        </ScrollView>
      </View>
    </ScreenBase>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: primeColor,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  loginContainer: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    marginTop: screenHeight * 0.1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    padding: 45,
    minHeight: screenHeight,
  },
  label: {
    color: "#555",
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 3,
  },
  inputItem: {
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginLeft: -1,
    marginRight: -1,
    borderColor: primeColor,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  button: {
    alignSelf: "center",
    width: "100%",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    borderRadius: 20,
    height: 60,
  },
  forgotPass: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginHorizontal: 3,
  },
  reset: {
    color: "#000",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
