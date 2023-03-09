import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight, Platform, ActivityIndicator, KeyboardAvoidingView, SafeAreaView, ImageBackground, Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fonts, color, API_PATH } from '../common/styles'
import Toast from 'react-native-toast-message';
import { AuthContext } from './../../AuthProvider'

const Login = () => {
    const [mobile, setMobile] = useState('')
    const [error, setError] = useState('')
    const [emptyMobile, setemptyMobile] = useState(false)
    const [submitingData, setsubmitingData] = useState(false)
    const [agreedToTerms, setagreedToTerms] = useState(false)
    const [secureTextEntry, setsecureTextEntry] = useState(true)
    const [password, setpassword] = useState('')
    const [emptyPassword, setemptyPassword] = useState(false)
    const { isLoggedIn, setIsLoggedIn } = React.useContext(AuthContext);

    const _handleSubmitNumber = () => {
        if (mobile == '') {
            setemptyMobile(true)
            setError(`Mobile Number can't be blank`)
        } else if (mobile.length != 10) {
            setemptyMobile(true)
            setError(`Mobile Number must have 10 digit`)
        } else {
            setemptyMobile(false)
            setError(``)
        }
    }

    const _mobileField = (mobile) => {
        if (mobile.length == 10) {
            setemptyMobile(false)
            setError(``)
        }
        setMobile(mobile)
    }

    const _loginUser = async () => {
        setsubmitingData(true)
        var numberValid = /^[0-9]*$/.test(mobile);
        if (mobile == '') {
            setemptyMobile(true)
            setError(`Mobile Number can't be blank`)
            setsubmitingData(false)
        } else if (mobile.length != 10) {
            setemptyMobile(true)
            setError(`Mobile Number must have 10 digit`)
            setsubmitingData(false)
        } else if (!numberValid) {
            setemptyMobile(true)
            setError(`Only numbers allowed`)
            setsubmitingData(false)
        } else if (password == "") {
            setemptyPassword(true)
            setError(`Password is Mandatory`)
            setsubmitingData(false)
        } else {
            setemptyMobile(false)
            setError(``)


            setIsLoggedIn(true)
            return false;

            let postFormData = new FormData
            postFormData.append('email', mobile)
            postFormData.append('password', password)
            fetch(`${API_PATH}/falogin`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                body: postFormData
            })
                .then(res => res.json())
                .then(async result => {
                    setsubmitingData(false)
                    let { status, message, token = null, otp = null } = result
                    if (status && message == 'success') {
                        if (token != null && otp != null) {
                            // await AsyncStorage.setItem('mobile', mobile)
                            // await AsyncStorage.setItem('otp', otp.toString())
                            // this.props.navigation.navigate('Otp', { mobile: mobile})
                        }
                    } else if (!status) {
                        Toast.show({
                            type: 'error',
                            text1: `${message}`,
                            text2: `Error`
                        });
                    }
                })
                .catch(error => {
                    setsubmitingData(false)
                })
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ImageBackground source={require('./../assets/images/LoginBackground.jpg')} style={{ width: '100%', height: '100%' }}>
                <KeyboardAvoidingView style={styles._mainWrap} behavior="padding" enabled>
                    <SafeAreaView style={styles._bg}>

                        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            <View style={styles.contentWrap}>
                                <Text style={styles.heading}>Welcome!</Text>
                                <Text style={styles.subHead}>Field Associate.</Text>
                            </View>
                        </View>
                        <View style={styles.formWrap}>
                            <Text style={styles.inputLabel}>Login</Text>

                            <View style={styles.innerInputsWrap}>
                                <TextInput placeholderTextColor={color.placeholder} onChangeText={mobile => _mobileField(mobile)} value={mobile} style={[styles.inputField, emptyMobile ? styles._errorField : '']} placeholder="Enter Your Mobile Number?" keyboardType='number-pad' maxLength={10} />
                                {emptyMobile ?
                                    <Text style={styles._errorTxt}>
                                        {error}
                                    </Text>
                                    :
                                    <Text style={styles._blankTxt}></Text>
                                }
                                <Image source={require('./../assets/images/Mobile_Icon.png')} style={styles._absoluteInputIconLeft} />
                            </View>

                            <View style={styles.innerInputsWrap}>
                                <TextInput placeholderTextColor={color.placeholder} secureTextEntry={secureTextEntry} onChangeText={(d) => setpassword(d)} value={password} style={[styles.inputField, emptyPassword ? styles._errorField : '']} placeholder="xxxxxxx" maxLength={10} />

                                <Image source={require('./../assets/images/Password_Icon.png')} style={styles._absoluteInputIconLeft} />
                                <TouchableOpacity onPress={() => {
                                    setsecureTextEntry((d) => !d)
                                }} style={styles._absoluteInputIconRight}>
                                    <Image source={require('./../assets/images/Eye_Icon.png')} style={{ width: 20, height: 15 }} />
                                </TouchableOpacity>

                                {emptyPassword ?
                                    <Text style={styles._errorTxt}>
                                        {error}
                                    </Text>
                                    :
                                    <Text style={styles._blankTxt}></Text>
                                }
                            </View>

                            <View style={{ ...styles.innerInputsWrap }}>
                                <View style={styles._checkboxMain}>
                                    <TouchableHighlight style={[styles._checkboxMainInner]} underlayColor={color.underlayColor} onPress={() => setagreedToTerms((d) => !d)}>
                                        {
                                            agreedToTerms ? <Image source={require('./../assets/images/check-mark.png')} style={{ width: 15, height: 15 }} /> : <Text>{null}</Text>
                                        }
                                    </TouchableHighlight>
                                </View>
                                <TouchableOpacity onPress={() => setagreedToTerms((d) => !d)} style={{ paddingLeft: 40, paddingTop: 12 }}>
                                    <Text style={styles._agreedText}>I Agree Terms & Conditions</Text>
                                </TouchableOpacity>
                            </View>


                            <View style={styles._buttonWrapper}>
                                <TouchableHighlight style={styles.button} onPress={() => _loginUser()} activeOpacity={.6} underlayColor={color.green}>
                                    {submitingData ? <ActivityIndicator size={25} color={color.white} /> :
                                        <View style={styles._buttonLoginWrap}>
                                            <Text style={styles.btnText}>Login</Text>
                                            <View>
                                                <Image source={require('./../assets/images/Arrows_Icon_1.png')} style={styles._arrowIcon} />
                                            </View>
                                        </View>}
                                </TouchableHighlight>
                            </View>
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </ImageBackground>
        </TouchableWithoutFeedback >
    )

}


const styles = StyleSheet.create({
    _mainWrap: {
        flex: 1, justifyContent: 'center'
    },
    _bg: {
        justifyContent: "center"
    },
    contentWrap: {
        padding: 15, paddingTop: 0, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'
    },
    heading: {
        color: color.white, fontFamily: fonts.bold, fontSize: 26, width: '100%'
    },
    headingInner: {
        color: color.green
    },
    subHead: {
        color: color.white, fontFamily: fonts.regular, fontSize: 16, lineHeight: 20, width: '100%'
    },
    formWrap: {
        margin: 15, backgroundColor: "#fefefe", borderRadius: 10, padding: 15, paddingBottom: 25, paddingTop: 25,
        shadowColor: "#bdbdbd",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        elevation: 10
    },
    inputLabel: {
        color: color.blue, fontSize: 16, fontFamily: fonts.bold, marginBottom: 5, borderBottomWidth: 2, borderBottomColor: color.blue, width: 45, paddingBottom: 5
    },
    inputField: {
        width: '100%', color: color.black, backgroundColor: 'white', borderRadius: 30, borderWidth: 1, borderColor: color.blue, fontSize: 12, fontFamily: fonts.regular, height: 42, padding: 10, textAlignVertical: "center", paddingLeft: 35, letterSpacing: 1
    },
    button: {
        width: 150, backgroundColor: "#0e5fa6", padding: 5, borderRadius: 25, elevation: 1, marginTop: 5, borderColor: "#c1e2ff", borderWidth: 3
    },
    btnText: {
        color: 'white', textAlign: 'center', fontSize: 15, fontFamily: fonts.bold
    },
    _backArrow: {
        position: 'relative', marginBottom: 30, padding: 15, width: 60
    },
    _errorTxt: {
        fontSize: 10, color: color.danger, fontFamily: fonts.regular, paddingLeft: 25, paddingTop: 5
    },
    _errorField: {
        borderColor: color.danger
    },
    _blankTxt: {
        display: 'none'
    },
    _backBtnImg: {
        width: 16, height: 15
    },
    _bottomBox: {
        display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30
    },
    _bottomCont: {
        fontSize: 13, fontFamily: fonts.bold, color: color.black
    },
    _resendBtn: {
        paddingVertical: 8, paddingHorizontal: 8
    },
    _resendTxt: {
        fontSize: 13, textAlign: 'center', fontFamily: fonts.bold, textDecorationLine: "underline", color: color.green
    },
    innerInputsWrap: {
        justifyContent: 'center', position: 'relative', marginBottom: 10, marginTop: 10
    },
    _absoluteInputIconLeft: {
        position: 'absolute', top: 10, left: 10, width: 20, height: 20
    },
    _absoluteInputIconRight: {
        position: 'absolute', top: 15, right: 15, width: 20, height: 20
    },
    _arrowIcon: {
        width: 25, height: 23, marginLeft: 10
    },
    _buttonWrapper: {
        alignItems: 'center', width: '100%', marginTop: 10
    },
    _buttonLoginWrap: {
        flexDirection: 'row', justifyContent: 'center'
    },
    _checkboxMain: {
        width: 20, marginRight: 15, position: 'absolute', top: 10, left: 10, zIndex: 99
    },
    _checkboxMainInner: {
        width: 20, height: 20, borderWidth: 1, borderColor: color.blue, backgroundColor: color.white, borderRadius: 5, position: 'absolute', top: '45%', justifyContent: 'center', alignItems: 'center'
    },
    _agreedText: {
        fontFamily: fonts.bold, fontSize: 11, color: color.blue
    }
})

export default Login;