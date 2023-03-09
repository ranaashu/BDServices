import React, { useState, useEffect } from 'react'
import { View, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen'
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { AuthContext } from './AuthProvider'
import { fonts, color, API_PATH } from './docket/common/styles'
const Stack = createNativeStackNavigator();

import Login from './docket/screens/Login'
import Attendance from './docket/screens/Attendance'
import Dashboard from './docket/screens/Dashboard'

const Routes = () => {
    const { isLoggedIn, setIsLoggedIn } = React.useContext(AuthContext);
    const [checking, setIsChecking] = useState(true)
    useEffect(() => {
        async function callInit() {
            try {
                const token = await AsyncStorage.getItem('token')
                const isVerified = await AsyncStorage.getItem('isVerified')
                if (token !== null && isVerified == "1") {
                    console.log("LOGGED IN");
                    setIsLoggedIn(true)
                } else {
                    console.log("NOT LOGGED IN");
                    setIsLoggedIn(false) ///  MAKE THIS FLAG TO TRUE ***
                }
                setIsChecking(false)
            } catch (e) {
                console.log(e)
            }
        }
        callInit()
    }, [])


    const hideSplashScreen = () => {
        SplashScreen.hide()
    }

    if (checking) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={color.white} />
            </View>
        );
    }


    return (
        <NavigationContainer onReady={() => hideSplashScreen()}>
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }} >
                {isLoggedIn ?
                    <>
                        <Stack.Screen name="Dashboard" component={Dashboard} />
                        <Stack.Screen name="Attendance" component={Attendance} />
                    </>
                    :
                    <>
                        <Stack.Screen name="Login" component={Login} />
                    </>
                }
            </Stack.Navigator>
            <Toast position={"bottom"} />
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.blue
    },
    highlight: {
        fontWeight: '700',
    },
});

export default Routes