import { Button, Icon, Input, Item } from "native-base";
import React, { useState } from "react";
import {
  Alert,
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
import { fAuth } from "../../configs/firebase";
import ScreenBase from "../../elements/SecreenBase";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function ForgotPassword({ navigation }) {
  const [field, setField] = useState({ email: '', password: '' });
  const changeField = (prop) => (text) => {
    setField({ ...field, [prop]: text });
  }
  const login = () => {
    const { email, password } = field;
    const emailAddress = email;
    let b = email.replace(/[a-zA-Z0-9.]/g, '');
    if (b !== '@') {
      Alert.alert('Email validation !', 'Wrong Email');
    } else {
      fAuth.sendPasswordResetEmail(emailAddress).then(function () {
        setField({ ...field, password: '' })
        Alert.alert('Permintaan sukses', 'Please check your email inbox')
      }).catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        Alert.alert(errorCode, errorMessage)
      });
    }
  }
  return (
    <ScreenBase barStyle="dark-content">
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
          <Text style={{ fontSize: 24, color: "#555", fontWeight: '700' }}>
            {strings.ForgotPass}
          </Text>
          {/* <Image
            style={{ width: 83, height: 25, marginTop: 5, marginRight: 5 }}
            source={require("../../assets/images/taruhe_splash.png")}
          /> */}
        </View>

        <Text style={styles.label}>Email</Text>
        <Item rounded style={styles.inputItem}>
          <Input
            value={field.email}
            placeholder={strings.InputEmail}
            textContentType="emailAddress"
            keyboardType="email-address"
            onChangeText={changeField('email')}
          />
        </Item>

        <TouchableOpacity
          style={[
            {
              backgroundColor: primeColor,
              marginTop: 35,
            },
            styles.button,
          ]}
          onPress={login}
        >
          <Text style={{ color: "#fff", fontWeight: '700', fontSize: 16 }}>
            SELANJUTNYA
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              backgroundColor: "#ccc",
              marginTop: 20
            },
            styles.button,
          ]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ color: "#555", fontWeight: '700', fontSize: 16 }}>
            {strings.Login}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </ScreenBase>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    padding: 45,
    paddingTop: 70,
    minHeight: screenHeight,
  },
  label: {
    color: "#555",
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 3,
  },
  inputItem: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginLeft: -1,
    marginRight: -1,
    borderColor: primeColor,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    height: 55
  },
  button: {
    alignSelf: "center",
    width: "90%",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height: 55,
    borderRadius: 50
  },
  forgotPass: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    width: '80%',
    alignSelf: 'center'
  },
  reset: {
    color: "#000",
    fontWeight: '700',
    textDecorationLine: "underline",
  },
});
