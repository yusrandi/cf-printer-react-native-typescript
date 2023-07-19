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
import { KerusakanCreateApi, KerusakanDeleteApi, KerusakanUpdateApi } from '../api/KerusakanApi';
import { KerusakanType, KerusakanTypeResponse } from '../type/kerusakan_type';


const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

export default function KerusakanTambah({ navigation, route: {
    params: { kerusakan },
}, }: NativeStackScreenProps<RootStackParamList, "kerusakanTambah">) {

    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const [count, setCount] = useState(1);
    const [size, setSize] = useState(SIZES[0]);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [code, setCode] = useState(kerusakan.kerusakanCode)
    const [name, setName] = useState(kerusakan.kerusakanName)
    const [perbaikan, setPerbaikan] = useState(kerusakan.perbaikan)

    const [isModalOpen, setModalStatus] = useState(false);
    const [status, setStatus] = useState(0);
    const [error, setError] = useState("");



    async function kerusakanCreate() {
        const kerusakanResult: KerusakanType = {
            id: kerusakan.id,
            kerusakanCode: code,
            kerusakanName: name,
            perbaikan: perbaikan
        }
        try {
            const response: KerusakanTypeResponse = await KerusakanCreateApi(kerusakanResult)
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
    async function kerusakanUpdate() {
        const kerusakanResult: KerusakanType = {
            id: kerusakan.id,
            kerusakanCode: code,
            kerusakanName: name,
            perbaikan: perbaikan
        }
        try {
            const response: KerusakanTypeResponse = await KerusakanUpdateApi(kerusakanResult)
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
    async function kerusakanDelete() {
        try {
            const response: KerusakanTypeResponse = await KerusakanDeleteApi(kerusakan.id)
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
        status === 0 ? kerusakanCreate() : status === 1 ? kerusakanUpdate() : kerusakanDelete()
    }

    function dialogConfirm() {

        setError("")
        if (code === "" || name === "" || perbaikan === "") {
            setError("Harap mengisi semua kolom")
            return;
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
                        {kerusakan.id === 0 ? "Tambah" : "Edit"} Kerusakan
                    </Text>

                    {/* <Text
                        style={{ color: colors.text, opacity: 0.75 }}
                        numberOfLines={3}
                    >
                        disinimi form untuk pakar tambah kerusakan dari android
                    </Text> */}

                    <ScrollView>
                        <AppTextInput placeholderTextColor={'grey'} placeholder="Kode Kerusakan" value={code} onChangeText={newText => setCode(newText)} />
                        <AppTextInput placeholderTextColor={'grey'} placeholder="Nama Kerusakan" value={name} onChangeText={newText => setName(newText)} />
                        <AppTextInput placeholderTextColor={'grey'} placeholder="Perbaikan" value={perbaikan} onChangeText={newText => setPerbaikan(newText)} />
                    </ScrollView>

                    <Text style={{ fontSize: FontSize.small, color: 'red', textAlign: 'center', alignItems: 'center' }}>
                        {error}
                    </Text>

                    {
                        kerusakan.id === 0 ? (
                            <View style={{ alignItems: "center", width: '100%' }}>

                                <TouchableOpacity
                                    onPress={() => {
                                        setStatus(0)
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
                                        {isLoading ? "Submitting..." : "Submit"}
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
                        ) :
                            (
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
                                                <Icons name="arrowright" size={24} color={colors.text} />
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
                                                <Icons name="arrowright" size={24} color={colors.text} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            )
                    }


                </View>


            </SafeAreaView>

            <CustomDialogModal />



        </View>
    )
}