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
  children: { backgroundColor: "#fff", flex: 1, position: "relative" },
});
export default function ScreenBase(props) {
  const { children } = props;
  return (
    <Container>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      <View style={styles.children}>{children}</View>
    </Container>
  );
}
