import React, { useState } from "react";
import { Text } from "native-base";
import {
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import strings from "../../assets/Dictionary";
import { primeColor } from "../../configs/color";
import { profile } from "../../configs/profile";

const styles = StyleSheet.create({
  menuContainer: {
    height: 50,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  menuItem: { display: "flex", alignItems: "center", width: "20%" },
  iconMenu: { marginBottom: -4, color: "#555" },
  textMenu: { fontSize: 12, color: "#555" },

  textMenuActive: { fontSize: 12, color: primeColor },
  iconMenuActive: { marginBottom: -4, color: primeColor },
});
const iconSize = 24;
export default function FooterTabs(props) {
  const { screen, navigation, direction = "up" } = props;
  const [fadeAnim] = React.useState(new Animated.Value(0));
  const [listMenu, setListMenu] = useState([
    { title: strings.Menu1, icon: "home" },
    { title: strings.Menu2, icon: "cube" },
    { title: strings.Menu3, icon: "people" },
    { title: strings.Menu4, icon: "trail-sign" },
    { title: strings.Menu5, icon: "person-circle" }
  ])
  React.useEffect(() => {
    if (direction === "up")
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
      }).start();
    if (direction === "down")
      Animated.timing(fadeAnim, {
        toValue: -50,
        duration: 300,
      }).start();
  }, [direction]);
  return (
    <Animated.View style={[styles.menuContainer, { marginBottom: fadeAnim }]}>
      {listMenu.map((menu) => (
        <TouchableOpacity
          disabled
          style={styles.menuItem}
          key={menu.title}
          disabled={menu.title === strings.Menu5 && profile.loadData}
          onPress={() => navigation.navigate(menu.title)}
        >
          <Ionicons
            name={screen === menu.title ? menu.icon : menu.icon + "-outline"}
            size={iconSize}
            style={
              screen === menu.title ? styles.iconMenuActive : styles.iconMenu
            }
          />
          <Text
            style={
              screen === menu.title ? styles.textMenuActive : styles.textMenu
            }
          >
            {menu.title}
          </Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
}
