import { Icon, Text, Thumbnail } from 'native-base';
import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { primeColor } from '../../configs/color';
import ScreenBase from '../../elements/SecreenBase';

class ChatSCreen extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <ScreenBase>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 45,
                    paddingBottom: 15,
                    paddingHorizontal: 35,
                    justifyContent: 'space-between'
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="caret-back" style={{ color: primeColor, fontSize: 26 }} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
                            <Thumbnail style={{ width: 40, height: 40 }} source={{ uri: 'https://herstory.co.id/data/images/articles/archive_20201117/pevita-pearce-20201117-084147.webp' }} />
                            <View style={{ marginLeft: 5 }}>
                                <Text style={{ color: primeColor, fontWeight: '700', fontSize: 18 }}>Pevita Mart</Text>
                                <Text style={{ fontSize: 12, marginTop: -5 }} note>Last Seen 08.17</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Icon name="ellipsis-vertical" style={{ color: primeColor, fontSize: 26 }} />
                    </TouchableOpacity>
                </View>
            </ScreenBase>
        )
    }
}

export default ChatSCreen;