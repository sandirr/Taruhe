import { Button, Icon, Input, Item } from "native-base";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import strings from "../../assets/Dictionary";
import { primeColor } from "../../configs/color";
import { fAuth, fDB } from "../../configs/firebase";
import ScreenBase from "../../elements/SecreenBase";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Register({ navigation }) {
  const [passwordVisible, setPasswordVisisble] = useState(false);
  const [field, setField] = useState({ email: '', password: '', passwordV: '', username: '' })
  const [regisDisabled, setRegisDis] = useState(false);
  const changeField = (prop) => (text) => {
    setField({ ...field, [prop]: text });
  }
  const regis = () => {
    setRegisDis(true);
    const { email, password, passwordV, username } = field;
    if (email.toString().length < 5) {
      Alert.alert('Not valid !', 'Wrong email');
    } else if (password.length < 8) {
      Alert.alert('Not valid !', 'Password contains at least 8 characters');
    } else if (username.length < 1) {
      Alert.alert('Not valid !', 'Please input your username');
    } else if (password !== passwordV) {
      Alert.alert('Not valid !', 'Password not same');
    } else {
      let b = email.replace(/[a-zA-Z0-9.]/g, '');
      if (b !== '@') {
        Alert.alert('Email validation !', 'Wrong Email');
      } else {
        fAuth.createUserWithEmailAndPassword(email, password).then(res => {
          fAuth.currentUser.updateProfile(({
            displayName: username,
          })).then(() => {
            fDB.ref('users/' + res.user.uid).set({
              username: username,
              email: email,
              gender: '-',
              photoURL: '',
              birthday: '',
              uid: res.user.uid,
              password: password,
              phoneNumber: '',
              storeName: '',
              storeLocation: '',
              storeDetail: ''
            }).then(() => {
              fAuth.currentUser.sendEmailVerification().then(function () {
                Alert.alert('Berhasil', 'Verifikasi email anda sebelum login');
                fAuth.signOut().then(function () {
                  // Sign-out successful.
                }).catch(function (error) {
                  // An error happened.
                });
                setTimeout(() => {
                  navigation.replace('Login');
                }, 3000)
              }).catch(function (error) {
                setRegisDis(false);
                var errorMessage = error.message;
                Alert.alert('Something wrong', errorMessage);
              });
            }).catch(error => {
              setRegisDis(false);
              var errorMessage = error.message;
              Alert.alert('Something wrong', errorMessage);
            })
          }).catch(error => {
            setRegisDis(false);
            var errorMessage = error.message;
            Alert.alert('Something wrong', errorMessage);
          })
        }).catch(function (error) {
          setRegisDis(false);
          var errorMessage = error.message;
          Alert.alert('Registration error', errorMessage);
        });
      }
    }
  }
  return (
    <ScreenBase barStyle="dark-content">
      <ScrollView contentContainerStyle={styles.loginContainer} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Text style={{ fontSize: 24, color: "#555", fontWeight: '700' }}>
            {strings.Register[0] + strings.Register.toLowerCase().slice(1)}
          </Text>
          <Image
            style={{ width: 83, height: 25, marginTop: 5, marginRight: 5 }}
            source={require("../../assets/images/taruhe_splash.png")}
          />
        </View>

        <Text style={styles.label}>Username</Text>
        <Item rounded style={styles.inputItem}>
          <Input
            placeholder={strings.InputUsername}
            value={field.username}
            textContentType="username"
            onChangeText={changeField('username')}
          />
        </Item>
        <Text style={styles.label}>Email</Text>
        <Item rounded style={styles.inputItem}>
          <Input
            value={field.email}
            placeholder={strings.InputEmail}
            textContentType="email"
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
        <Text style={styles.label}>{strings.Retype} {strings.Password.toLowerCase()}</Text>
        <Item rounded style={styles.inputItem}>
          <Input
            value={field.passwordV}
            placeholder={strings.InputPassword}
            secureTextEntry={!passwordVisible}
            textContentType="password"
            onChangeText={changeField('passwordV')}
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

        <Button
          rounded
          style={[
            {
              backgroundColor: primeColor,
              marginTop: 35,
            },
            styles.button,
          ]}
          disabled={regisDisabled}
          onPress={regis}
        >
          <Text style={{ color: "#fff", fontWeight: '700', fontSize: 16 }}>
            {strings.Register}
          </Text>
        </Button>

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
          {strings.AlreadyHaveAccount}?
          </Text>

        <Button
          rounded
          style={[
            {
              backgroundColor: "#ccc",
            },
            styles.button,
          ]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ color: "#555", fontWeight: '700', fontSize: 16 }}>
            {strings.Login}
          </Text>
        </Button>
      </ScrollView>
    </ScreenBase>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    padding: 45,
    minHeight: screenHeight,
  },
  label: {
    color: "#555",
    marginTop: 15,
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
  },
  forgotPass: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginHorizontal: 3,
  },
  reset: {
    color: "#000",
    fontWeight: '700',
    textDecorationLine: "underline",
  },
});
