import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import Loading from "./screens/Loading";
import Login from "./screens/Login";
import Product from "./screens/Product";
import Register from "./screens/Register";
import Service from "./screens/Service";
import Tourism from "./screens/Tourism";
import AccountSetting from "./screens/AccountSetting";
import strings from "./assets/Dictionary";
import Welcome from "./screens/Welcome";
import DetailItem from "./screens/DetailItem";
import Account from "./screens/Account";
import Profile from "./screens/Profile";
import StoreAccount from "./screens/StoreAccount/StoreAccount";
import AddItem from "./screens/AddItem";
import ListChat from "./screens/ListChat";
import ChatSCreen from "./screens/ChatScreen";
import { fAuth, fDB } from "./configs/firebase";
import ForgotPassword from "./screens/ForgotPassword";
import { profile } from "./configs/profile";
import AsyncStorage from '@react-native-async-storage/async-storage'
import WishList from "./screens/WishList";
import EtcAct from "./elements/EtcAct";
import Following from "./screens/Following";
import History from "./screens/History";
import About from "./screens/About";
import HelpCenter from "./screens/HelpCenter";

const Stack = createStackNavigator();
const AppStack = createStackNavigator();

const AppFeature = () => {
  const [isUser, setIsUser] = useState(true)
  useEffect(() => {
    fAuth.onAuthStateChanged(function (user) {
      if (user) {
        fDB.ref('users/' + user.uid).on('value', val => {
          profile.data = val.val()
          setIsUser(true)
        })
        fDB.ref('wishlist/' + user.uid).on('value', val => {
          if (val.val()) {
            let wishlistData = []
            let wishlist = []
            Object.keys(val.val()).forEach((item) => {
              wishlistData.push(val.val()[item])
              wishlist.push(item)
            })
            profile.wishlistData = wishlistData
            profile.wishlist = wishlist
          }
        })
        fDB.ref('following/' + user.uid).on('value', val => {
          if (val.val()) {
            let following = []
            Object.keys(val.val()).forEach((item) => {
              following.push(val.val()[item])
            })
            profile.following = following
          }
        })
        fDB.ref('others/').on('value', val => {
          if (val.val())
            profile.others = val.val()
        })
      } else {
        profile.data = {}
        profile.wishlistData = []
        profile.wishlist = []
        profile.following = []
        setIsUser(false)
        AsyncStorage.clear()
      }
    });
  }, [])
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name={strings.Menu1}
        component={Home}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={strings.Menu2}
        component={Product}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={strings.Menu3}
        component={Service}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={strings.Menu4}
        component={Tourism}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name={strings.Menu5}
        component={isUser ? Account : Welcome}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Profile"
        component={isUser ? Profile : Welcome}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="ForgotPass"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="AccountSetting"
        component={isUser ? AccountSetting : Welcome}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="StoreAccount"
        component={isUser ? StoreAccount : Welcome}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="AddItem"
        component={AddItem}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="ListChat"
        component={isUser ? ListChat : Welcome}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="ChatScreen"
        component={isUser ? ChatSCreen : Welcome}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="DetailItem"
        component={DetailItem}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="WishList"
        component={isUser ? WishList : Welcome}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Following"
        component={isUser ? Following : Welcome}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="History"
        component={isUser ? History : Welcome}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="About"
        component={About}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="HelpCenter"
        component={HelpCenter}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};

export default function navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AppCore"
          component={AppFeature}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
