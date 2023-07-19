import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Spacing from '../constants/Spacing';
import Accordion from '../components/Accordion';
import { RootStackParamList } from '../navigators/RootNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ROLE, UserType, UserTypeResponse } from '../type/user_type';
import { UsersApi } from '../api/UserApi';
import AnimatedLottieView from 'lottie-react-native';
import { useTheme } from '@react-navigation/native';

export default function UserListScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "home">) {

    const AVATAR_URL = "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";

    const [users, setUsers] = useState<UserType[]>([])
    const [user, setUser] = useState<UserType>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const animation = useRef(null);

    const { colors } = useTheme()

    useEffect(() => {
        userFromApi()
    }, [])
    useEffect(() => {
        navigation.addListener('focus', () => {
            console.log("reloaded");
            userFromApi()
        });
    }, [navigation]);

    async function userFromApi() {
        const userResponse: UserTypeResponse = await UsersApi()
        console.log({ userResponse });
        const listuser: UserType[] = userResponse.responsedata
        setUsers(listuser)
        setIsLoading(false)
    }
    return (
        <View style={{}}>

            {
                isLoading ? <Text>....</Text> :
                    <FlatList
                        data={users.filter(data => data.role !== ROLE.ADMIN)}
                        keyExtractor={item => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            gap: Spacing
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('userForm', {
                                            user: item
                                        })
                                    }}
                                    style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: colors.primary, borderBottomWidth: 0.2, padding: Spacing * 2, gap: Spacing }}
                                >
                                    <Image source={{ uri: AVATAR_URL, }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} resizeMode="cover" />
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: Spacing / 4, color: colors.text, }} numberOfLines={1}>
                                            {item.name}
                                        </Text>
                                        <Text style={{ color: colors.text, opacity: 0.75 }} numberOfLines={1}>
                                            {item.email}
                                        </Text>
                                    </View>

                                </TouchableOpacity>
                            );
                        }}
                    />
            }
        </View>
    )
}