import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Icon } from 'native-base';
import ScreenBase from '../../elements/SecreenBase';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity, View } from 'react-native';
import { primeColor } from '../../configs/color';
export default class ListChat extends Component {
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
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            name="caret-back"
                            style={{ color: primeColor, fontSize: 26 }}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '700', fontSize: 24, color: primeColor }}>
                        Messages
                    </Text>
                    <Icon
                        name="caret-back"
                        style={{ color: 'transparent', fontSize: 26 }}
                    />
                </View>
                <ScrollView>
                    <List>
                        <ListItem avatar onPress={() => navigation.navigate('ChatScreen')}>
                            <Left>
                                <Thumbnail source={{ uri: 'https://herstory.co.id/data/images/articles/archive_20201117/pevita-pearce-20201117-084147.webp' }} />
                            </Left>
                            <Body>
                                <Text>Pevita Mart</Text>
                                <Text note>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note>3:43 pm</Text>
                            </Right>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={{ uri: 'https://herstory.co.id/data/images/articles/archive_20201117/pevita-pearce-20201117-084147.webp' }} />
                            </Left>
                            <Body>
                                <Text>Pevita Mart</Text>
                                <Text note>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note>3:43 pm</Text>
                            </Right>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={{ uri: 'https://herstory.co.id/data/images/articles/archive_20201117/pevita-pearce-20201117-084147.webp' }} />
                            </Left>
                            <Body>
                                <Text>Pevita Mart</Text>
                                <Text note>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note>3:43 pm</Text>
                            </Right>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={{ uri: 'https://herstory.co.id/data/images/articles/archive_20201117/pevita-pearce-20201117-084147.webp' }} />
                            </Left>
                            <Body>
                                <Text>Pevita Mart</Text>
                                <Text note>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note>3:43 pm</Text>
                            </Right>
                        </ListItem>
                    </List>
                </ScrollView>
            </ScreenBase>
        );
    }
}