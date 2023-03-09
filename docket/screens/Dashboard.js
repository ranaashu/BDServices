import { View, Text, StyleSheet, Button, Image, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Tabs from './components/Tabs'
import { fonts, color, API_PATH } from '../common/styles'
import LocationEnabler from 'react-native-location-enabler';
import Modal from "react-native-modal";

const {
    PRIORITIES: { HIGH_ACCURACY },
    addListener,
    checkSettings,
    requestResolutionSettings
} = LocationEnabler

// Define configuration
const config = {
    priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
    alwaysShow: true, // default false
    needBle: false, // default false
};

const Dashboard = () => {
    const [LocationEnabled, setLocationEnabled] = useState(true)
    const listener = addListener(({ locationEnabled }) => {
        setLocationEnabled(locationEnabled)
    });

    useEffect(() => {
        // Check if location is enabled or not
        checkSettings(config);
        return () => {
            listener.remove();
        }
    }, [])


    return (
        <View style={styles.container}>
            <Header />

            <Modal isVisible={!LocationEnabled}>
                <View style={styles._modalWrapper}>
                    <View style={styles._locationImage}>
                        <Image source={require('./../assets/images/Location_Image.png')} style={{ width: '100%', height: 200, resizeMode: 'contain' }} />
                    </View>
                    <Text style={styles._locationHeading}>Location</Text>
                    <Text style={styles._locationText}>We Need To Know Your Location</Text>
                    <TouchableHighlight style={styles.button} onPress={() => requestResolutionSettings(config)} activeOpacity={.6} underlayColor={color.green}>
                        <View style={styles._buttonLoginWrap}>
                            <Text style={styles.btnText}>Enable Now</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </Modal>

            <Tabs activeTab="Dashboard" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: color.white
    },
    _locationImage: {
        width: "100%", height: 200, marginBottom: 15
    },
    _locationHeading: { fontSize: 24, color: color.blue, fontFamily: fonts.bold },
    _locationText: { fontSize: 16, fontFamily: fonts.regular, color: "#777879" },
    button: {
        width: 150, backgroundColor: "#0e5fa6", padding: 5, borderRadius: 25, elevation: 1, marginTop: 5, borderColor: "#c1e2ff", borderWidth: 3
    },
    btnText: {
        color: 'white', textAlign: 'center', fontSize: 15, fontFamily: fonts.bold
    },
    _modalWrapper: {
        width: '100%', padding: 20, backgroundColor: "#fff", borderRadius: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        shadowColor: "#bdbdbd",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 10
    }
})

export default Dashboard