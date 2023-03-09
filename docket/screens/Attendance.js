import React, { useState, useEffect } from 'react'
import { StyleSheet, Button, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fonts, color, API_PATH } from '../common/styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

function Attendance({ navigation }) {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // checkAttendance();
        return () => {
            setLoading(false); // This worked for me
        }
    }, [])


    function checkAttendance() {
        AsyncStorage.multiGet(['rider_id', 'token']).then(store => {
            let rider_id = store[0][1]
            let token = store[1][1]
            let postFormData = new FormData
            postFormData.append('rider_id', rider_id)
            postFormData.append('attendance', 'check')
            fetch(`${API_PATH}/riders-attendance`, {
                method: "POST",
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data'
                },
                body: postFormData
            }).then(res => res.json()).then(({ status, response }) => {
                if (!status && response == "Absent") {
                    setLoading(false);
                } else if (status && response == "Present") {
                    navigation.navigate('Dashboard')
                }
            }).catch(err => {

            })
        })
    }

    function markAttendance() {
        navigation.navigate('Dashboard')
        return false;
        AsyncStorage.multiGet(['rider_id', 'token']).then(store => {
            let rider_id = store[0][1]
            let token = store[1][1]
            let postFormData = new FormData
            postFormData.append('rider_id', rider_id)
            postFormData.append('attendance', '1')
            fetch(`${API_PATH}/riders-attendance`, {
                method: "POST",
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data'
                },
                body: postFormData
            }).then(res => res.json()).then(({ status, response }) => {
                if (status && response == "Present") {
                    navigation.navigate('Dashboard')
                }
            }).catch(err => {

            })
        })
    }

    return (
        <View style={styles.container}>
            <View style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: color.blue
            }}>
                <View style={{ flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    {loading ? <View style={styles.container}>
                        <ActivityIndicator size="large" color={color.white} />
                    </View> :
                        <TouchableOpacity style={styles.goToLoginButton} onPress={() => markAttendance()}>
                            <Text style={styles.loginText}>Mark Attendance</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loginText: {
        fontSize: 14, color: color.black, fontFamily: fonts.regular, paddingTop: 3
    },
    goToLoginButton: {
        width: "50%",
        borderRadius: 5,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff"
    }
})



export default Attendance