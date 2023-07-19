import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { RootStackParamList, RootStackScreenProps } from '../navigators/RootNavigator';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Icons from "@expo/vector-icons/AntDesign";
import BottomSheet from "@gorhom/bottom-sheet";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FontSize from '../constants/FontSize';
import Font from '../constants/Font';
import AppTextInput from '../components/AppTextInput';
import Spacing from '../constants/Spacing';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import CustomDialog from '../components/CustomDialog/CustomDialog';
import PopUpCOntent from '../components/PopUpContent/PopUpCOntent';
import { UserType, UserTypeResponse } from '../type/user_type';
import { UserDeleteApi, UserUpdateApi } from '../api/UserApi';


export default function UserFormScreen({ navigation, route: {
    params: { user },
}, }: NativeStackScreenProps<RootStackParamList, "userForm">) {

    const { colors } = useTheme();
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [userResult, setuserResult] = useState<UserType>(user)
    const [password, setPassword] = useState<string>("")
    const [confPassword, setConfPassword] = useState<string>("")

    const [isModalOpen, setModalStatus] = useState(false);
    const [status, setStatus] = useState(0);
    const [error, setError] = useState("");

    async function userUpdate() {

        try {
            const response: UserTypeResponse = await UserUpdateApi(userResult, password)
            console.log({ response });
            setIsLoading(false)
            if (response.responsecode === 1) {
                navigation.goBack();
            } else {
                setError(response.responsemsg)
            }

        } catch (error) {
            console.log({ error });

        }
    }
    async function userDelete() {
        try {
            const response: UserTypeResponse = await UserDeleteApi(user.id)
            console.log({ response });
            setIsLoading(false)
            if (response.responsecode === 1) {
                navigation.goBack();
            } else {
                setError(response.responsemsg)
            }
        } catch (error) {
            console.log({ error });

        }
    }

    function handleSubmit() {

        setModalStatus(false)
        setIsLoading(true)
        status === 1 ? userUpdate() : userDelete()
    }

    function dialogConfirm() {

        setError("")
        console.log({ userResult });

        if (userResult.name === "" || userResult.email === "") {
            setError("Harap mengisi semua kolom")
            return;
        }
        if (password !== "") {
            if (password !== confPassword) {
                setError("Password and Confirm Password dosnt match")
                return;
            }
        }

        setModalStatus(true)
    }

    function CustomDialogModal() {
        return (
            <CustomDialog
                isVisible={isModalOpen}
                dismissAction={() => setModalStatus(false)}>
                <PopUpCOntent pressAction={() => setModalStatus(false)} pressYesAction={handleSubmit} subTitle={`anda yakin ingin ${status === 0 ? 'Menambah' : status === 1 ? 'Mengubah' : 'Menghapus'} data`} />
            </CustomDialog>
        )
    }



    return (
        <View style={{ flex: 1 }}>
            <StatusBar style='light' />
            <Image
                source={require('../assets/images/bg_printer.jpg')}
                style={{ flex: 1 }}
                resizeMode='repeat'
            />
            <SafeAreaView
                edges={["top"]}
                style={{ position: "absolute", top: 0, left: 0, right: 0 }}
            >
                <StatusBar style="light" />
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 20,
                        gap: 8,
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
                        {user.id === 0 ? "Tambah" : "Edit"} {user.name}
                    </Text>

                    <ScrollView>
                        <AppTextInput placeholderTextColor={'grey'} placeholder="Kode user" value={userResult.name} onChangeText={newText => setuserResult({ ...userResult, name: newText })} />
                        <AppTextInput placeholderTextColor={'grey'} placeholder="Nama user" value={userResult.email} onChangeText={newText => setuserResult({ ...userResult, email: newText })} />
                        <AppTextInput placeholderTextColor={'grey'} placeholder="New Password? " secureTextEntry value={password} onChangeText={newText => setPassword(newText)} />
                        <AppTextInput placeholderTextColor={'grey'} placeholder="Confirm New Password? " secureTextEntry value={confPassword} onChangeText={newText => setConfPassword(newText)} />
                    </ScrollView>

                    <Text style={{ fontSize: FontSize.small, color: 'red', textAlign: 'center', alignItems: 'center' }}>
                        {error}
                    </Text>



                    <View>
                        <View style={{ alignItems: "center", width: '100%', gap: Spacing }}>

                            <TouchableOpacity
                                onPress={() => {
                                    setStatus(1)
                                    dialogConfirm()
                                }}
                                disabled={isLoading}
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
                                    {isLoading && status === 1 ? "Updating..." : "Update"}
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
                                    <Icons name="edit" size={24} color={colors.text} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setStatus(2)
                                    dialogConfirm()
                                }}
                                disabled={isLoading}
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
                                    {isLoading && status === 2 ? "Deleting..." : "Delete"}
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
                                    <Icons name="deleteuser" size={24} color={colors.text} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>



                </View>


            </SafeAreaView>

            <CustomDialogModal />



        </View>
    )
}