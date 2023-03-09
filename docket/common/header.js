import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image, ImageBackground } from 'react-native'
import { fonts, color, config, isImage } from '../common/styles'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Header = ({ backActive, pageTitle }) => {
    const navigation = useNavigation();
    const [mobile, setMobile] = useState(null)

    useEffect(() => {
        AsyncStorage.getItem('mobile').then(mobile => {
            setMobile(mobile)
        }).catch(er => {
            setMobile(null)
        })
    })

    return (
        <View style={styles.customHead}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableHighlight style={styles.menuBtn} activeOpacity={.85} underlayColor={"transparent"} onPress={() => navigation.goBack()}>
                    <Image source={require('./../assets/images/back_arrow_white.png')} style={styles.menuIcon} imageStyle={styles.menuIcon} />
                </TouchableHighlight>
                {
                    pageTitle ? <Text style={styles._logo_text}>{pageTitle}</Text> : <Text style={styles._logo_text}>Encash Your Trash</Text>
                }
            </View>

            {
                mobile && <View style={{ marginLeft: 'auto', flexDirection: 'row' }}>
                    <Text style={{ color: color.white, fontSize: 12 }}>Hi, {mobile}</Text>
                </View>
            }

        </View>
    )

}


const styles = StyleSheet.create({
    customHead: {
        height: 60, alignItems: 'center', paddingHorizontal: 10, flexDirection: 'row', backgroundColor: color.green
    },
    logoImg: {
        width: 50, height: 50
    },
    _header_icons: { width: 30, height: 30 },
    _logo_text: { fontFamily: fonts.bold, fontSize: 15, color: color.white, paddingLeft: 10 },
    menuBtn: {
        width: 36, height: 36, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "#083b4e", borderRadius: 20
    },
    menuIcon: {
        width: 18, height: 18
    },
    countWrap: {
        fontFamily: fonts.bold, color: color.black, textAlignVertical: 'center', position: 'absolute', top: 0, width: 15, height: 15, borderRadius: 10, backgroundColor: color.yellowLight, fontSize: 11, textAlign: 'center', right: -5
    },
})

export default Header