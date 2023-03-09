import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { fonts, color, API_PATH } from '../../common/styles'

const Header = ({ title, NightMode }) => {
    const navigation = useNavigation()
    const { height, width } = useWindowDimensions();

    return (
        <View style={[styles._headerWrapper]}>
            <View style={{ width: '50%', }}>
                <Image source={require('./../../assets/images/logo-web.png')} style={{ width: 130, height: 35, resizeMode: 'contain' }} />
            </View>
            <View style={{ height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableHighlight onPress={() => navigation.navigate('Updates')} underlayColor="transparent">
                    <View style={{ width: 35, height: 35, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('./../../assets/images/BD-profile-icon.jpg')} style={styles._header_icons} />
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    _headerWrapper: { flexDirection: 'row', paddingTop: 5, paddingBottom: 5, justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, position: 'relative' },
    _header_icons: { width: 30, height: 30 }
})

export default Header