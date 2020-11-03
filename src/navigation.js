import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import Loading from "./screens/Loading";
import Login from "./screens/Login";
import Product from "./screens/Product";
import Register from "./screens/Register";
import Service from "./screens/Service";
import Tourism from "./screens/Tourism";
import Account from "./screens/Account";
import strings from "./assets/Dictionary";
import Welcome from "./screens/Welcome";
import DetailItem from "./screens/DetailItem";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AppStack = createStackNavigator();

const AppFeature = () => {
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
        component={Account}
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
