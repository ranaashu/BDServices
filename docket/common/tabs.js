import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { fonts, color, config, isImage } from '../common/styles'
import { useNavigation } from '@react-navigation/native';


const Tabs = ({ currentRoute }) => {
    const navigation = useNavigation();

    return (
        <>
            <View style={styles.parentWrap}>
                <TouchableHighlight style={styles.navBtn} activeOpacity={.75} onPress={() => navigation.navigate('ScrapOrders')} underlayColor="transparent">
                    <>
                        {
                            currentRoute == "ScrapOrders" && <View style={styles.activeNav}></View>
                        }

                        <ImageBackground source={require('./../assets/images/tabs-background.png')} resizeMode="cover" style={styles._tabsBg}>
                            <View style={styles.navInner}>
                                <Image source={require('./../assets/images/orders.png')} style={{ width: 20, height: 20 }} />
                                <Text style={styles.navText}>Scrap Orders</Text>
                            </View>
                        </ImageBackground>
                    </>
                </TouchableHighlight>
                <TouchableHighlight style={styles.navBtn} activeOpacity={.75} onPress={() => navigation.navigate('ProductOrders')} underlayColor="transparent" >
                    <>
                        {
                            currentRoute == "EcomOrders" && <View style={styles.activeNav}></View>
                        }
                        <ImageBackground source={require('./../assets/images/tabs-background.png')} resizeMode="cover" style={styles._tabsBg}>
                            <View style={styles.navInner}>
                                <Image source={require('./../assets/images/orders.png')} style={{ width: 20, height: 20 }} />
                                <Text style={styles.navText}>Ecom Orders</Text>
                            </View>
                        </ImageBackground>
                    </>
                </TouchableHighlight>
            </View>
        </>
    )

}


const styles = StyleSheet.create({
    activeNav: {
        width: 6, height: 6, backgroundColor: color.green, position: 'absolute', left: 10, top: 10, zIndex: 99, borderRadius: 10
    },
    parentWrap: {
        height: 60, backgroundColor: 'white', position: 'absolute', bottom: 0, width: '100%', flexDirection: 'row', justifyContent: 'space-between', zIndex: 10
    },
    navBtn: {
        width: '50%', alignItems: 'center', height: 60, justifyContent: 'center', backgroundColor: "#ddd", position: 'relative'
    },
    navIcon: {
        width: 18, height: 18
    },
    navText: {
        fontFamily: fonts.bold, fontSize: 11, marginTop: 3, color: color.black
    },
    navInner: {
        alignItems: 'center'
    },
    _tabsBg: {
        flex: 1,
        justifyContent: "center", width: '100%'
    },
    _cartPopup: {
        height: 60, paddingHorizontal: 20, borderRadius: 10, backgroundColor: color.green, position: 'absolute', bottom: 70, width: '95%', marginHorizontal: '2.5%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 10
    },
    _cartPopupInner: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
    },
    _proceedButtonText: {
        fontFamily: fonts.bold, fontSize: 16, color: color.white
    },
    _proceedCountMain: {
        backgroundColor: color.yellowLight, width: 25, height: 25, borderRadius: 3, justifyContent: 'center', marginLeft: 5
    },
    _proceedCountInner: {
        textAlign: 'center', color: color.white, fontFamily: fonts.bold
    },
    _closeCartPopup: {
        width: 35, height: 35, backgroundColor: color.white, borderRadius: 30, justifyContent: 'center', alignItems: 'center'
    }
})

export default Tabs