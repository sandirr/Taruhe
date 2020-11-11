import React from "react";
import { Container, View } from "native-base";
import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  children: { backgroundColor: "#fff", flex: 1, position: "relative" },
});
export default function ScreenBase(props) {
  const { children, barStyle } = props;
  return (
    <Container>
      <StatusBar
        backgroundColor={barStyle ? 'transparent' : "rgba(255,255,255,.2)"}
        barStyle={barStyle || "dark-content"}
        translucent
      />
      <View style={styles.children}>{children}</View>
    </Container>
  );
}
