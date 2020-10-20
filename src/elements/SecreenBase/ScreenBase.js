import React from "react";
import { Container, View } from "native-base";
import { StatusBar, StyleSheet } from "react-native";

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
