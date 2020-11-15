import React, { useEffect } from "react";
import { LogBox } from "react-native";
import SplashScreen from "react-native-splash-screen";
import Navigation from "./src/navigation";

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    // console.disableYellowBox = true;
  }, []);
  LogBox.ignoreAllLogs(true);
  return <Navigation />;

};

export default App;
