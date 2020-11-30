import { Image, Modal, Pressable, StatusBar, TouchableWithoutFeedback } from "react-native";
import React, { Component } from 'react';
import { Icon, View } from "native-base";
import { primeColor } from "../../configs/color";

class ImageViewer extends Component {
    render() {
        return (
            <Modal
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%) !important' }}
                animationType='fade'
                transparent={true}
                onRequestClose={() => this.props.closeModal()}
                visible={this.props.modalVisible ? true : false}
            >
                <StatusBar backgroundColor="#000" />
                <TouchableWithoutFeedback onPress={() => this.props.closeModal()}>
                    <View style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: '#000'
                    }} />
                </TouchableWithoutFeedback>
                <Pressable onPress={() => this.props.closeModal()} style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                }}>
                    <Icon name="close" style={{ color: primeColor, fontSize: 32 }} />
                </Pressable>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ padding: 20, backgroundColor: '#fff', borderRadius: 10 }}>
                        <Image style={{ width: 400, height: 600 }} source={{ uri: this.props.modalVisible }} />
                    </View>
                </View>
            </Modal>
        )
    }
}

export default ImageViewer;