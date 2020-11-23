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
import { fAuth, fDB } from "../../configs/firebase";
import { profile } from "../../configs/profile";
import ScreenBase from "../../elements/SecreenBase";
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Login({ navigation }) {
  const [passwordVisible, setPasswordVisisble] = useState(false);
  const [field, setField] = useState({ email: '', password: '' });
  const [loginDisabled, setLoginDis] = useState(false)
  const changeField = (prop) => (text) => {
    setField({ ...field, [prop]: text });
  }
  const saveUserProfile = async (data) => {
    await AsyncStorage.setItem('uid', data)
  }
  const login = () => {
    setLoginDis(true)
    const { email, password } = field;
    fAuth.signInWithEmailAndPassword(email, password).then((res) => {
      if (res.user.emailVerified) {
        fDB.ref('users/' + res.user.uid).on('value', val => {
          saveUserProfile(val.val().uid);
          profile.data = val.val();
          navigation.replace('AppCore');
        })
      } else {
        Alert.alert('Email not verified', 'Please check your email inbox and verify your account');
        fAuth.signOut().then(function () {
          // Sign-out successful.
        }).catch(function (error) {
          // An error happened.
        });
        setLoginDis(false)
      }
    }).catch(function (error) {
      setLoginDis(false)
      let errorCode = error.code;
      let errorMessage = error.message;
      Alert.alert(errorCode, errorMessage)
    });
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
            {strings.Login[0] + strings.Login.toLowerCase().slice(1)}
          </Text>
          <Image
            style={{ width: 83, height: 25, marginTop: 5, marginRight: 5 }}
            source={require("../../assets/images/taruhe_splash.png")}
          />
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
        <Text style={styles.label}>{strings.Password}</Text>
        <Item rounded style={styles.inputItem}>
          <Input
            value={field.password}
            placeholder={strings.InputPassword}
            secureTextEntry={!passwordVisible}
            textContentType="password"
            onChangeText={changeField('password')}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisisble(!passwordVisible)}
          >
            <Icon
              name={!passwordVisible ? "eye-off-outline" : "eye-outline"}
              style={{ color: "#555" }}
            />
          </TouchableOpacity>
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
          disabled={loginDisabled}
        >
          <Text style={{ color: "#fff", fontWeight: '700', fontSize: 16 }}>
            {strings.Login}
          </Text>
        </TouchableOpacity>

        <View style={styles.forgotPass}>
          <Text>{strings.ForgotPass}?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
            <Text style={styles.reset}>{strings.ResetHere}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}>
          <Image
            style={{ width: 40, height: 40, marginHorizontal: 15 }}
            source={require("../../assets/images/facebook.png")}
          />
          <Image
            style={{ width: 38, height: 38, marginHorizontal: 15 }}
            source={require("../../assets/images/google.png")}
          />
        </View>

        <Text style={{ alignSelf: "center", marginBottom: 8, marginTop: 25 }}>
          {strings.NotHaveAccount}?
          </Text>

        <TouchableOpacity
          style={[
            {
              backgroundColor: "#ccc",
            },
            styles.button,
          ]}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={{ color: "#555", fontWeight: '700', fontSize: 16 }}>
            {strings.RegisterNew}
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
