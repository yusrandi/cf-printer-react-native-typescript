import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackParamList } from '../navigators/RootNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Icons from "@expo/vector-icons/AntDesign";
import { useTheme } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import AppTextInput from '../components/AppTextInput'
import Spacing from '../constants/Spacing'
import { AuthContext } from '../context/AuthContext'


export default function ProfileScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "profile">) {
    const { colors } = useTheme();
    const { user, logOut } = useContext(AuthContext);

    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    return (
        <View style={{ flex: 1 }}>
            <StatusBar style='light' />
            <Image source={require('../assets/images/bg_printer.jpg')} style={{ flex: 1 }} resizeMode='repeat' />
            <SafeAreaView
                edges={["top"]}
                style={{ position: "absolute", top: 0, left: 0, right: 0 }}
            >
                <View
                    style={{
                        flexDirection: "row", alignItems: "center", padding: 20, gap: 8,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            width: 52,
                            backgroundColor: 'white',
                            aspectRatio: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 52,
                            borderWidth: 1,
                            borderColor: "#fff",
                        }}
                    >
                        <Icons name="arrowleft" size={24} color={colors.primary} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <SafeAreaView
                edges={["top"]}
                style={{ position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: '#f4f4f4', margin: Spacing * 3, borderRadius: Spacing * 2, elevation: Spacing, height: '70%' }}
            >

                <View style={{ padding: 16, flex: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight: "600", color: colors.text }}>
                        Profil
                    </Text>


                    <ScrollView style={{ margin: Spacing }}>
                        <AppTextInput placeholderTextColor={'grey'} placeholder="Name" onChangeText={newText => setName(newText)} value={name} />
                        <AppTextInput placeholderTextColor={'grey'} placeholder="Email" onChangeText={newText => setEmail(newText)} value={email} />
                        <AppTextInput placeholderTextColor={'grey'} placeholder="New Password? " secureTextEntry />
                        <AppTextInput placeholderTextColor={'grey'} placeholder="Confirm New Password? " secureTextEntry />
                    </ScrollView>


                    <View style={{ flex: 1 }} />
                    <View style={{ alignItems: "center", width: '100%', gap: Spacing }}>

                        <TouchableOpacity

                            style={{
                                width: '100%',
                                backgroundColor: colors.primary,
                                height: 64,
                                borderRadius: 64,
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                                flexDirection: "row",
                                padding: 12,
                            }}
                        >
                            <Text
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    textAlign: 'center',
                                    flex: 1,
                                    fontSize: 16,
                                    fontWeight: "600",
                                    color: colors.background,
                                    paddingHorizontal: 16,
                                }}
                            >
                                Submit
                            </Text>

                            <View
                                style={{
                                    backgroundColor: colors.card,
                                    width: 40,
                                    aspectRatio: 1,
                                    borderRadius: 40,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Icons name="arrowright" size={24} color={colors.text} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity

                            onPress={() => logOut()}
                            style={{
                                width: '100%',
                                backgroundColor: 'red',
                                height: 64,
                                borderRadius: 64,
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                                flexDirection: "row",
                                padding: 12,
                            }}
                        >
                            <Text
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    textAlign: 'center',
                                    flex: 1,
                                    fontSize: 16,
                                    fontWeight: "600",
                                    color: colors.background,
                                    paddingHorizontal: 16,
                                }}
                            >
                                Logout
                            </Text>

                            <View
                                style={{
                                    backgroundColor: colors.card,
                                    width: 40,
                                    aspectRatio: 1,
                                    borderRadius: 40,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Icons name="arrowright" size={24} color={colors.text} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


            </SafeAreaView>


        </View>
    )
}