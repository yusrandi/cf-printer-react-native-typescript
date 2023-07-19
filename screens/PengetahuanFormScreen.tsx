import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackParamList } from '../navigators/RootNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Icons from "@expo/vector-icons/AntDesign";
import { useTheme } from '@react-navigation/native'
import Spacing from '../constants/Spacing'
import Font from '../constants/Font'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import FontSize from '../constants/FontSize'
import { KerusakanType, KerusakanTypeResponse } from '../type/kerusakan_type'
import { KerusakanApi } from '../api/KerusakanApi'
import { EvidenceType, EvidenceTypeResponse } from '../type/evidence_type'
import { EvidenceApi } from '../api/EvidenceApi'
import Spinner from 'react-native-loading-spinner-overlay'
import { KeyakinanType, ListKeyakinan } from '../type/keyakinan-type'
import { PengetahuanType, PengetahuanTypeResponse } from '../type/pengetahuan_type'
import { PengetahuanCreateApi, PengetahuanDeleteApi, PengetahuanUpdateApi } from '../api/PengetahuanApi'
import CustomDialog from '../components/CustomDialog/CustomDialog'
import PopUpCOntent from '../components/PopUpContent/PopUpCOntent'


export default function PengetahuanFormScreen({ navigation, route: { params: { pengetahuan } } }: NativeStackScreenProps<RootStackParamList, "pengetahuanForm">) {
    const { colors } = useTheme();

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const bottomSheetModalRefEvidence = useRef<BottomSheetModal>(null);
    const bottomSheetModalRefKeyakinan = useRef<BottomSheetModal>(null);

    const [kerusakans, setKerusakans] = useState<KerusakanType[]>([])
    const [kerusakan, setKerusakan] = useState<KerusakanType>(pengetahuan.kerusakan!)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [evidences, setevidences] = useState<EvidenceType[]>([])
    const [evidence, setevidence] = useState<EvidenceType>(pengetahuan.evidence!)
    const [keyakinan, setKeyakinan] = useState<KeyakinanType>(ListKeyakinan.find(item => item.id === pengetahuan.bobot)!)

    const [error, setError] = useState("");
    const [status, setStatus] = useState(0);

    const [isModalOpen, setModalStatus] = useState(false);





    const openFilterModal = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const openFilterModalEvidence = useCallback(() => {
        bottomSheetModalRefEvidence.current?.present();
    }, []);
    const openFilterModalKeyakinan = useCallback(() => {
        bottomSheetModalRefKeyakinan.current?.present();
    }, []);

    useEffect(() => { getListKeyakinan() }, [])
    function getListKeyakinan() {
        if (pengetahuan.bobot === 0) {
            setKeyakinan(ListKeyakinan[0])
        }
    }
    useEffect(() => {
        evidenceFromApi()
    }, [])
    async function evidenceFromApi() {
        const evidenceResponse: EvidenceTypeResponse = await EvidenceApi()
        console.log({ evidenceResponse });
        const listevidence: EvidenceType[] = evidenceResponse.responsedata
        setevidences(listevidence)
        if (evidence === undefined) {
            setevidence(listevidence[0])
        }
        setIsLoading(false)
    }

    useEffect(() => {
        kerusakanFromApi()
    }, [])

    async function kerusakanFromApi() {
        const kerusakanResponse: KerusakanTypeResponse = await KerusakanApi()
        console.log({ kerusakanResponse });
        const listKerusakan: KerusakanType[] = kerusakanResponse.responsedata
        setKerusakans(listKerusakan)
        if (kerusakan === undefined) {
            setKerusakan(listKerusakan[0])
        }
        setIsLoading(false)
    }



    function BottomModal() {
        return (
            <BottomSheetModal

                snapPoints={["75%"]}
                index={0}
                ref={bottomSheetModalRef}
                // backdropComponent={(props) => <CustomBackdrop {...props} />}
                backgroundStyle={{
                    borderRadius: 24,
                    backgroundColor: colors.card,
                }}
                handleIndicatorStyle={{
                    backgroundColor: colors.primary,
                }}
            >
                <View style={{ padding: Spacing * 2, gap: Spacing * 2 }}>
                    <Text style={{ fontFamily: Font['poppins-semiBold'], fontSize: FontSize.medium }}>Pilih jenis Evidence</Text>
                    <FlatList
                        data={kerusakans}
                        keyExtractor={item => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingVertical: Spacing,
                            paddingHorizontal: Spacing,
                            gap: Spacing,
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    setKerusakan(item)
                                    bottomSheetModalRefEvidence.current?.close()

                                }} style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: Font['poppins-regular'], flex: 1 }}>{item.kerusakanName}</Text>
                                    <Text style={{ fontFamily: Font['poppins-semiBold'], fontSize: FontSize.large / 2, backgroundColor: "#F6F6F6", paddingHorizontal: Spacing * 2, paddingVertical: Spacing / 2, borderRadius: Spacing / 2, textAlign: 'center' }}>{item.kerusakanCode}</Text>
                                </TouchableOpacity>
                            );
                        }}
                    />

                </View>
            </BottomSheetModal>
        )
    }

    function BottomModalEvidence() {
        return (
            <BottomSheetModal
                snapPoints={["75%"]}
                index={0}
                ref={bottomSheetModalRefEvidence}
                // backdropComponent={(props) => <CustomBackdrop {...props} />}
                backgroundStyle={{
                    borderRadius: 24,
                    backgroundColor: colors.card,
                }}
                handleIndicatorStyle={{
                    backgroundColor: colors.primary,
                }}
            >
                <View style={{ padding: Spacing * 2, gap: Spacing * 2 }}>
                    <Text style={{ fontFamily: Font['poppins-semiBold'], fontSize: FontSize.medium }}>Pilih jenis Evidence</Text>
                    <FlatList
                        data={evidences}
                        keyExtractor={item => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingVertical: Spacing,
                            paddingHorizontal: Spacing,
                            gap: Spacing,
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    setevidence(item)
                                    bottomSheetModalRefEvidence.current?.close()

                                }} style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: Font['poppins-regular'], flex: 1 }}>{item.evidenceName}</Text>
                                    <Text style={{ fontFamily: Font['poppins-semiBold'], fontSize: FontSize.large / 2, backgroundColor: "#F6F6F6", paddingHorizontal: Spacing * 2, paddingVertical: Spacing / 2, borderRadius: Spacing / 2, textAlign: 'center' }}>{item.evidenceCode}</Text>
                                </TouchableOpacity>
                            );
                        }}
                    />

                </View>
            </BottomSheetModal>
        )
    }
    function BottomModalKeyakinan() {
        return (
            <BottomSheetModal
                snapPoints={["75%"]}
                index={0}
                ref={bottomSheetModalRefKeyakinan}
                // backdropComponent={(props) => <CustomBackdrop {...props} />}
                backgroundStyle={{
                    borderRadius: 24,
                    backgroundColor: colors.card,
                }}
                handleIndicatorStyle={{
                    backgroundColor: colors.primary,
                }}
            >
                <View style={{ padding: Spacing * 2, gap: Spacing * 2 }}>
                    <Text style={{ fontFamily: Font['poppins-semiBold'], fontSize: FontSize.medium }}>Pilih nilai CF</Text>
                    <FlatList
                        data={ListKeyakinan}
                        keyExtractor={item => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingVertical: Spacing,
                            paddingHorizontal: Spacing,
                            gap: Spacing,
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    setKeyakinan(item)
                                    bottomSheetModalRefKeyakinan.current?.close()

                                }} style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: Font['poppins-regular'], flex: 1 }}>{item.value}</Text>
                                    <Text style={{ fontFamily: Font['poppins-semiBold'], fontSize: FontSize.large / 2, backgroundColor: "#F6F6F6", paddingHorizontal: Spacing * 2, paddingVertical: Spacing / 2, borderRadius: Spacing / 2, textAlign: 'center' }}>{item.id}</Text>
                                </TouchableOpacity>
                            );
                        }}
                    />

                </View>
            </BottomSheetModal>
        )
    }


    async function pengetahuanCreate() {

        setIsLoading(true)
        const pengetahuan: PengetahuanType = {
            id: 0,
            kerusakanId: kerusakan?.id!,
            evidenceId: evidence?.id!,
            bobot: keyakinan.id
        }

        try {
            const response: PengetahuanTypeResponse = await PengetahuanCreateApi(pengetahuan)
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

    async function pengetahuanUpdate() {
        setIsLoading(true)
        const pengetahuanResult: PengetahuanType = {
            id: pengetahuan.id,
            kerusakanId: kerusakan?.id!,
            evidenceId: evidence?.id!,
            bobot: keyakinan.id
        }

        try {
            const response: PengetahuanTypeResponse = await PengetahuanUpdateApi(pengetahuanResult)
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
    async function pengetahuanDelete() {
        setIsLoading(true)


        try {
            const response: PengetahuanTypeResponse = await PengetahuanDeleteApi(pengetahuan.id)
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
        status === 0 ? pengetahuanCreate() : status === 1 ? pengetahuanUpdate() : pengetahuanDelete()
    }

    function dialogConfirm() {

        setError("")
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
                style={{ padding: Spacing * 2, position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: '#f4f4f4', margin: Spacing * 3, borderRadius: Spacing * 2, elevation: Spacing, height: '70%', gap: Spacing }}
            >
                <Text style={{ fontSize: 20, fontWeight: "600", color: colors.text, marginBottom: Spacing * 2 }}>
                    Tambah Basis Pengetahuan
                </Text>


                <TouchableOpacity onPress={openFilterModal} style={{ backgroundColor: '#e6e6e6', width: '100%', height: 50, borderRadius: Spacing, padding: Spacing }}>
                    <View style={{ flex: 1, flexDirection: 'row', gap: Spacing, alignItems: 'center' }}>
                        <Text style={{ fontFamily: Font['poppins-bold'] }} >{isLoading ? "..." : kerusakan?.kerusakanCode}</Text>
                        <Text style={{ fontFamily: Font['poppins-regular'] }} >{isLoading ? "..." : kerusakan?.kerusakanName}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={openFilterModalEvidence} style={{ backgroundColor: '#e6e6e6', width: '100%', height: 50, borderRadius: Spacing, padding: Spacing }}>
                    <View style={{ flex: 1, flexDirection: 'row', gap: Spacing, alignItems: 'center' }}>
                        <Text style={{ fontFamily: Font['poppins-bold'] }} >{evidence?.evidenceCode}</Text>
                        <Text style={{ fontFamily: Font['poppins-regular'] }} >{evidence?.evidenceName}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={openFilterModalKeyakinan} style={{ backgroundColor: '#e6e6e6', width: '100%', height: 50, borderRadius: Spacing, padding: Spacing }}>
                    <View style={{ flex: 1, flexDirection: 'row', gap: Spacing, alignItems: 'center' }}>
                        <Text style={{ fontFamily: Font['poppins-bold'] }} >{keyakinan?.id}</Text>
                        <Text style={{ fontFamily: Font['poppins-regular'] }} >{keyakinan?.value}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 1 }} />

                <Text style={{ fontSize: FontSize.small, color: 'red', textAlign: 'center', alignItems: 'center' }}>
                    {error}
                </Text>

                {
                    pengetahuan.id === 0 ? (
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


            </SafeAreaView>
            <BottomModal />
            <BottomModalEvidence />
            <BottomModalKeyakinan />
            <CustomDialogModal />
            <Spinner visible={isLoading} />
        </View>
    )
}