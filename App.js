import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import Navigation from "./src/navigation";

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    // console.disableYellowBox = true;
  }, []);
  // LogBox.ignoreAllLogs(disable);
  return <Navigation />;

};

export default App;
