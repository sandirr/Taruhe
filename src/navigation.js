import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "./screens/Home";
import Loading from "./screens/Loading";
import Login from "./screens/Login";
import Product from "./screens/Product";
import Register from "./screens/Register";
import Service from "./screens/Service";
import Tourism from "./screens/Tourism";
import Account from "./screens/Account";
import strings from "./assets/Dictionary";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AppStack = createStackNavigator();

// const AppTabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Beranda') {
//             iconName = focused
//               ? 'home'
//               : 'home-outline';
//           } else if (route.name === 'Jasa') {
//             iconName = focused ? 'people' : 'people-outline';
//           } else if (route.name === 'Produk') {
//             iconName = focused ? 'cube' : 'cube-outline';
//           } else if (route.name === 'Pariwisata') {
//             iconName = focused ? 'trail-sign' : 'trail-sign-outline';
//           } else if (route.name === 'Akun') {
//             iconName = focused ? 'person' : 'person-outline';
//           }

//           // You can return any component that you like here!
//           return <Ionicons name={iconName} size={size} color={color} style={{ marginBottom: -5 }} />;
//         },
//       })}
//       tabBarOptions={{
//         activeTintColor: '#006d6d',
//         inactiveTintColor: 'gray',
//         style: { paddingBottom: 5 }
//       }}
//     >
//       <Tab.Screen name="Beranda" component={Home} />
//       <Tab.Screen name="Produk" component={Product} />
//       <Tab.Screen name="Jasa" component={Service} />
//       <Tab.Screen name="Pariwisata" component={Tourism} />
//       <Tab.Screen name="Akun" component={Account} />
//     </Tab.Navigator>
//   )
// }

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
    </AppStack.Navigator>
  );
};

export default function navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AppCore">
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="AppCore"
          component={AppFeature}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
