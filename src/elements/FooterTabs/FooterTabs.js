import React from "react";
import { Container, View, Text } from "native-base";
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import strings from "../../assets/Dictionary";

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
  iconMenu: { marginBottom: -4, color: "gray" },
  textMenu: { fontSize: 12, color: "gray" },

  textMenuActive: { fontSize: 12, color: "#006d6d" },
  iconMenuActive: { marginBottom: -4, color: "#006d6d" },
});
const iconSize = 24;
const listMenu = [
  { title: strings.Menu1, icon: "home" },
  { title: strings.Menu2, icon: "cube" },
  { title: strings.Menu3, icon: "people" },
  { title: strings.Menu4, icon: "trail-sign" },
  { title: strings.Menu5, icon: "person-circle" },
];
export default function FooterTabs(props) {
  const { screen, children, navigation, direction = "up" } = props;
  const [fadeAnim] = React.useState(new Animated.Value(0));
  React.useEffect(() => {
    if (direction === "up")
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
      }).start();
    if (direction === "down")
      Animated.timing(fadeAnim, {
        toValue: -50,
        duration: 500,
      }).start();
  }, [direction]);
  return (
    <Animated.View style={[styles.menuContainer, { marginBottom: fadeAnim }]}>
      {listMenu.map((menu) => (
        <TouchableOpacity
          style={styles.menuItem}
          key={menu.title}
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
