import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { RootStackParamList } from '../navigators/RootNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { StatusBar } from 'expo-status-bar';
import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedLottieView from 'lottie-react-native';
import AppTextInput from '../components/AppTextInput';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function RegisterScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "register">) {
    const { colors } = useTheme()
    const animation = useRef(null);

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")

    const { register, isLoading } = useContext(AuthContext);


    async function handleSUbmit() {
        console.log({ email });
        console.log({ password });

        if (name === '' || email === '' || password === '' || confPassword === '') {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Jasbi',
                text2: `all field are required 👋`,
            });
            return
        }
        if (password !== confPassword) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Jasbi',
                text2: `password and confirm password dsn't match 👋`,
            });
            return
        }
        register(name, email, password)

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
                        <AnimatedLottieView
                            autoPlay
                            ref={animation}
                            style={{
                                width: 150,
                                alignContent: 'center',
                                justifyContent: 'center',
                                alignItems: 'center'

                            }}
                            // Find more Lottie files at https://lottiefiles.com/featured
                            source={require('../assets/lotties/printer.json')}
                        />
                    </View>
                    <View style={{ flex: 3, width: '100%', height: '100%' }}>
                        <View style={{ width: '100%', paddingHorizontal: Spacing * 2 }}>
                            <AppTextInput placeholder="Fullname" onChangeText={newText => setName(newText)} value={name} />
                            <AppTextInput placeholder="Email" onChangeText={newText => setEmail(newText)} value={email} />
                            <AppTextInput placeholder="Password" onChangeText={newText => setPassword(newText)} secureTextEntry value={password} />
                            <AppTextInput placeholder="Confirm Password" onChangeText={newText => setConfPassword(newText)} secureTextEntry value={confPassword} />
                            <TouchableOpacity
                                disabled={isLoading}
                                onPress={handleSUbmit}
                                style={{ backgroundColor: '#265550', width: '100%', padding: Spacing, alignItems: 'center', marginTop: Spacing * Spacing / 2, borderRadius: Spacing, elevation: 5 }}>
                                <Text style={{ fontFamily: Font['poppins-bold'], fontSize: FontSize.large, color: 'white' }}>{isLoading ? '...' : 'Register'}</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('login')}
                            style={{ position: 'absolute', bottom: Spacing, left: 0, right: 0, flexDirection: 'row', gap: Spacing, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontFamily: Font['poppins-bold'], fontSize: FontSize.small, color: 'white' }}>Sudah Punya Akun? </Text>
                            <Text style={{ fontFamily: Font['poppins-bold'], fontSize: FontSize.small, color: '#EA5656' }}>Masuk</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </SafeAreaView>
            <Toast />
        </View>
    )
}