import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { fonts, color, API_PATH } from '../../common/styles'

const Tabs = ({ currentRoute, activeTab = null }) => {
    const navigation = useNavigation();
    return (
        <>
            <View style={[styles.parentWrap]}>
                <TouchableHighlight activeOpacity={.75} onPress={() => navigation.navigate('Dashboard')} underlayColor="transparent" style={[styles.navBtn, activeTab == "Dashboard" && styles.activeNav]} >
                    <View style={styles.navInner} >
                        {
                            activeTab == "Dashboard" ?
                                <Image source={require('./../../assets/images/Home_White_Icon.png')} style={[styles._tabsIcon]} />
                                :
                                <Image source={require('./../../assets/images/Home_White_Blue.png')} style={[styles._tabsIcon]} />
                        }

                    </View>
                </TouchableHighlight>
                <TouchableHighlight activeOpacity={.75} onPress={() => navigation.navigate('Explore')} underlayColor="transparent" style={[styles.navBtn, styles.navBtnSeparator, { borderRightColor: "#efefef", borderLeftColor: "#efefef" }, activeTab == "Cases" && styles.activeNav]}  >
                    <View style={styles.navInner} >
                        <Image source={require('./../../assets/images/Panding_Case_Blue.png')} style={[styles._tabsIcon, activeTab == "Explore" && styles.activeNav]} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight activeOpacity={.75} onPress={() => navigation.navigate('Bookmarks')} underlayColor="transparent" style={[styles.navBtn, activeTab == "Profile" && styles.activeNav]} >
                    <View style={styles.navInner} >
                        <Image source={require('./../../assets/images/Profie_Icon_Blue.png')} style={[styles._tabsIcon, activeTab == "Bookmark" && styles.activeNav]} />
                    </View>
                </TouchableHighlight>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    activeNav: {
        backgroundColor: color.blue
    },
    parentWrap: {
        height: 50, position: 'absolute', bottom: 0, width: '100%', flexDirection: 'row', justifyContent: 'space-between', zIndex: 10, borderTopWidth: 1, borderTopColor: "#efefef"
    },
    navBtn: {
        width: '33%', alignItems: 'center', height: 50, justifyContent: 'center', position: 'relative'
    },
    navIcon: {
        width: 18, height: 18
    },
    navText: {
        fontFamily: fonts.bold, fontSize: 11, marginTop: 3, color: color.blue
    },
    navInner: {
        alignItems: 'center', width: '100%'
    },
    _tabsBg: {
        flex: 1,
        justifyContent: "center", width: '100%'
    },
    _tabsIcon: {
        width: 23, height: 23, opacity: 1
    },
    _cartPopup: {
        height: 60, paddingHorizontal: 20, borderRadius: 10, backgroundColor: color.blue, position: 'absolute', bottom: 70, width: '95%', marginHorizontal: '2.5%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 10
    },
    _cartPopupInner: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
    },
    _proceedButtonText: {
        fontFamily: fonts.bold, fontSize: 16, color: color.blue
    },
    _proceedCountMain: {
        backgroundColor: color.blue, width: 25, height: 25, borderRadius: 3, justifyContent: 'center', marginLeft: 5
    },
    _proceedCountInner: {
        textAlign: 'center', color: color.blue, fontFamily: fonts.bold
    },
    _closeCartPopup: {
        width: 35, height: 35, backgroundColor: color.blue, borderRadius: 30, justifyContent: 'center', alignItems: 'center'
    },
    navBtnSeparator: { borderRightWidth: 1, borderLeftWidth: 1, height: 50, marginTop: 0 }
})

export default Tabs