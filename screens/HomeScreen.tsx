import { View, Text, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import FontSize from '../constants/FontSize';
import { StatusBar } from 'expo-status-bar';
import Spacing from '../constants/Spacing';
import { CategoriMenuType, ListCategories } from '../type/CategoryMenu';
import Accordion from '../components/Accordion';
import { RootStackParamList } from '../navigators/RootNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import EvidenceScreen from './EvidenceScreen';
import KerusakanScreen from './KerusakanScreen';
import PengetahuanScreen from './PengetahuanScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import PakarScreen from './PakarScreen';
import UserScreen from './UserScreen';
import { AuthContext } from '../context/AuthContext';
import { ROLE } from '../type/user_type';
import UserListScreen from './UserListScreen';



export default function HomeScreen({ navigation, route }: NativeStackScreenProps<RootStackParamList, "home">) {
    const AVATAR_URL = "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
    const { colors } = useTheme();
    const { isLoading, logOut, user, isLoggedIn } = useContext(AuthContext)



    function Header() {
        return (
            <View style={{ paddingHorizontal: Spacing * 2, flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Image source={{ uri: AVATAR_URL, }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} resizeMode="cover" />
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: Spacing / 4, color: colors.text, }} numberOfLines={1}>
                        Hi, {user.name} 👋
                    </Text>
                    <Text style={{ color: colors.text, opacity: 0.75 }} numberOfLines={1}>
                        {user.role}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('profile')}
                    style={{
                        width: 52,
                        aspectRatio: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 52,
                        borderWidth: 1,
                        borderColor: colors.border,
                    }}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <AntDesign name="setting" size={32} color={colors.text} style={{ position: 'relative' }} />
                        <View
                            style={{
                                position: 'absolute',
                                backgroundColor: 'red',
                                width: 16,
                                height: 16,
                                borderRadius: 15 / 2,
                                right: 0,
                                top: +10,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: "#FFFFFF",
                                    fontSize: FontSize.medium,
                                }}>
                                *
                            </Text>
                        </View>
                    </View>

                </TouchableOpacity>
            </View>
        )
    }
    function SearchBar() {
        return (
            <View style={{ flexDirection: "row", paddingHorizontal: Spacing * 2, gap: 12 }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        height: 52,
                        borderRadius: 52,
                        borderWidth: 1,
                        borderColor: colors.border,
                        alignItems: "center",
                        paddingHorizontal: 24,
                        flexDirection: "row",
                        gap: 12,
                    }}
                >
                    <AntDesign
                        name="search1"
                        size={24}
                        color={colors.text}
                        style={{ opacity: 0.5 }}
                    />
                    <Text
                        style={{
                            flex: 1,
                            fontSize: 16,
                            color: colors.text,
                            opacity: 0.5,
                        }}
                    >
                        Search
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        width: 52,
                        aspectRatio: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 52,
                        backgroundColor: colors.primary,
                    }}
                >
                    <AntDesign name="API" size={24} color={colors.background} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ gap: Spacing * 2, flex: 1 }}>
            <StatusBar style='auto' />
            <Header />
            <SearchBar />
            <View style={{ flex: 1 }}>
                {
                    user.role === ROLE.ADMIN ? <UserListScreen navigation={navigation} route={route} /> : user.role === ROLE.PAKAR ? <PakarScreen navigation={navigation} route={route} /> : user.role === ROLE.USER ? <UserScreen navigation={navigation} route={route} /> : <Text>Hello Anonim</Text>
                }
            </View>
        </SafeAreaView>
    )


}