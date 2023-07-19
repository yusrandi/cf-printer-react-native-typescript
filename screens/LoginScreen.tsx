import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useTheme } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LottieView from 'lottie-react-native'
import Spacing from '../constants/Spacing'
import AppTextInput from '../components/AppTextInput'
import Font from '../constants/Font'
import FontSize from '../constants/FontSize'
import { RootStackParamList } from '../navigators/RootNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ROLE, UserType } from '../type/user_type'
import { LoginApi } from '../api/AuthApi'
import Spinner from 'react-native-loading-spinner-overlay'
import { AuthContext } from '../context/AuthContext'


export default function LoginScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "login">) {
    const { colors } = useTheme()
    const animation = useRef(null);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { login, isLoading } = useContext(AuthContext);




    async function handleSUbmit() {
        console.log({ email });
        console.log({ password });

        if (email === '' || password === '') {
            return
        }
        login(email, password)

    }

    return (
        <View style={{ backgroundColor: colors.primary, flex: 1 }}>
            <StatusBar style='light' />
            <Spinner visible={false} />
            <Image source={require('../assets/images/top.png')} style={{ position: 'absolute', top: 0, right: 0 }} />
            <Image source={require('../assets/images/bot.png')} style={{ position: 'absolute', bottom: 0, left: 0 }} />
            <SafeAreaView
                edges={["top"]}
                style={{ position: "absolute", top: 0, left: 0, right: 0, height: '100%' }}
            >
                <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <LottieView
                            autoPlay
                            ref={animation}
                            style={{
                                width: 200,
                                height: '100%',
                                alignContent: 'center',
                                justifyContent: 'center',
                                alignItems: 'center'

                            }}
                            // Find more Lottie files at https://lottiefiles.com/featured
                            source={require('../assets/lotties/printer.json')}
                        />
                    </View>
                    <View style={{ flex: 1, width: '100%', height: '100%' }}>
                        <View style={{ width: '100%', paddingHorizontal: Spacing * 2 }}>
                            <AppTextInput placeholder="Email" onChangeText={newText => setEmail(newText)} value={email} />
                            <AppTextInput placeholder="Password" onChangeText={newText => setPassword(newText)} secureTextEntry value={password} />
                            <TouchableOpacity
                                disabled={isLoading}
                                onPress={handleSUbmit}
                                style={{ backgroundColor: '#265550', width: '100%', padding: Spacing, alignItems: 'center', marginTop: Spacing * Spacing / 2, borderRadius: Spacing, elevation: 5 }}>
                                <Text style={{ fontFamily: Font['poppins-bold'], fontSize: FontSize.large, color: 'white' }}>{isLoading ? '...' : 'Login'}</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('register')}
                            style={{ position: 'absolute', bottom: Spacing, left: 0, right: 0, flexDirection: 'row', gap: Spacing, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontFamily: Font['poppins-bold'], fontSize: FontSize.small, color: 'white' }}>Belum Punya Akun? </Text>
                            <Text style={{ fontFamily: Font['poppins-bold'], fontSize: FontSize.small, color: '#EA5656' }}>Daftar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </SafeAreaView>
        </View>
    )
}