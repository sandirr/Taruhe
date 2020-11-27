import { Icon, Text } from "native-base";
import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import strings from "../../assets/Dictionary";
import { primeColor } from "../../configs/color";

export default function EtcAct(props) {
  const { children, openEtc, modalVisible, navigation } = props;
  const navigateTo = (to) => {
    navigation.navigate(to)
    openEtc(false)
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        openEtc(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => openEtc(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {children
            ||
            <View style={{
              backgroundColor: '#f3f3f3',
              borderRadius: 20,
            }}
            >
              <Pressable
                style={styles.pressable}
                onPress={() => navigateTo('ListChat')}
              >
                <Icon name="mail-outline" style={{ fontSize: 22, marginRight: 5 }} />
                <Text style={styles.modalText}>{strings.Message}</Text>
              </Pressable>
              <View style={{ backgroundColor: 'gray', height: 2 }} />
              <Pressable
                style={styles.pressable}
                onPress={() => navigateTo('HelpCenter')}
              >
                <Icon name="information-circle-outline" style={{ fontSize: 22, marginRight: 5 }} />
                <Text style={styles.modalText}>{strings.HelpCenter}</Text>
              </Pressable>
              <View style={{ backgroundColor: 'gray', height: 2 }} />
              <Pressable
                style={styles.pressable}
                onPress={() => navigateTo('AccountSetting')}
              >
                <Icon name="settings-outline" style={{ fontSize: 22, marginRight: 5 }} />
                <Text style={styles.modalText}>{strings.Setting}</Text>
              </Pressable>
            </View>}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "flex-end",
    marginTop: 20,
  },
  modalView: {
    margin: 25,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    paddingHorizontal: 15,

  },
  closeButton: {
    backgroundColor: primeColor,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: '700'
  },

  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
  },
});
