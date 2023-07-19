import { View, Text, FlatList, ImageSourcePropType, Animated, ViewToken, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import OnBoardingItem from '../components/OnBoardingItem'
import Paginator from '../components/Paginator'
import NextButton from '../components/NextButton'
import Spacing from '../constants/Spacing'
import { useTheme } from '@react-navigation/native'
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { RootStackParamList } from '../navigators/RootNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import FontSize from '../constants/FontSize'
import Font from '../constants/Font'
import { KeyakinanType, ListKeyakinan } from '../type/keyakinan-type'
import { EvidenceType, EvidenceTypeResponse } from '../type/evidence_type'
import { EvidenceApi } from '../api/EvidenceApi'
import Spinner from 'react-native-loading-spinner-overlay'
import { KerusakanType, KerusakanTypeResponse } from '../type/kerusakan_type'
import { KerusakanApi } from '../api/KerusakanApi'
import { PengetahuanType } from '../type/pengetahuan_type'
import { useAppDispatch } from '../store/store'
import { addItem, clearItem } from '../store/feature/UserCFSlice'
import { addResultItem, clearResultItem } from '../store/feature/ResultSlice'


type Boarding = {
    id: number
    title: string
    description: string
    image: ImageSourcePropType
}
const list: Boarding[] = [
    {
        id: 1,
        title: 'Evidence 01',
        description: 'Seberapa parah kerusakan printer anda?',
        image: require('../assets/images/image1.png')
    },
    {
        id: 2,
        title: 'This is title 2',
        description: 'This is title description 2',
        image: require('../assets/images/image2.png')
    },
    {
        id: 3,
        title: 'This is title 3',
        description: 'This is title description 3',
        image: require('../assets/images/image3.png')
    },
    {
        id: 4,
        title: 'This is title 1',
        description: 'This is title description 1',
        image: require('../assets/images/image1.png')
    },
    {
        id: 5,
        title: 'This is title 2',
        description: 'This is title description 2',
        image: require('../assets/images/image2.png')
    },
    {
        id: 6,
        title: 'This is title 3',
        description: 'This is title description 3',
        image: require('../assets/images/image3.png')
    }
]
export default function DiagnosaScreen({ navigation, route: {
    params: { evidences },
}, }: NativeStackScreenProps<RootStackParamList, "diagnosa">) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const scrollx = useRef(new Animated.Value(0)).current
    const slideRef = useRef<any>(null)
    const { width } = useWindowDimensions()

    const [keyakinan, setKeyakinan] = useState<KeyakinanType>(ListKeyakinan[0])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [kerusakans, setKerusakans] = useState<KerusakanType[]>([])
    const [mapResult, setMapResult] = useState<Map<number, number>>()

    const dispatch = useAppDispatch()




    const { colors } = useTheme();

    const viewAbleItemChanged = useRef(({ viewableItems }: any) => {
        setCurrentIndex(viewableItems[0].index)
        // console.log({ scrollx });

    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;



    useEffect(() => {
        dispatch(clearItem())
    }, [])
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const openFilterModal = useCallback(() => {
        console.log({ mapResult });
        console.log(mapResult?.get(1));
        bottomSheetModalRef.current?.present();
    }, []);

    useEffect(() => {
        kerusakanFromApi()
    }, [])



    async function kerusakanFromApi() {
        const kerusakanResponse: KerusakanTypeResponse = await KerusakanApi()
        console.log({ kerusakanResponse });
        const listKerusakan: KerusakanType[] = kerusakanResponse.responsedata
        setKerusakans(listKerusakan)
        setIsLoading(false)
    }

    const scrollTo = () => {
        if (currentIndex < evidences.length - 1) {
            slideRef!.current!.scrollToIndex({ index: currentIndex + 1 })
        } else {
            dispatch(clearResultItem())
            console.log('Last Item');
            console.log({ mapResult });
            kerusakans.forEach((kerusakan: KerusakanType) => {
                console.log(kerusakan.kerusakanCode);
                // console.log(kerusakan.pengetahuans);

                let listMin: number[] = []
                let cfOld: number = 0
                let resultCf: number = 0

                kerusakan.pengetahuans?.forEach((peng: PengetahuanType) => {
                    // console.log(peng.evidenceId);
                    if (mapResult?.get(peng.evidenceId)) {
                        listMin.push(mapResult?.get(peng.evidenceId)!)
                    } else {
                    }

                })

                // console.log(listMin!);
                const minValue = Math.min(...listMin)
                console.log(`Min Value ${minValue}`);

                kerusakan.pengetahuans?.forEach((peng: PengetahuanType) => {
                    // console.log(peng.evidenceId);
                    if (mapResult?.get(peng.evidenceId)) {
                        const cfCombine = peng.bobot * minValue
                        const cfGabungan = (cfOld + cfCombine * (1 - cfOld))
                        console.log(`id ${peng.evidenceId} CF Dokter ${peng.bobot} * Cf User ${minValue} = CF Combine ${cfCombine.toFixed(2)} CF Gabungan ${cfGabungan.toFixed(2)}`);

                        cfOld = cfGabungan
                        resultCf = cfOld
                    }

                })

                console.log(`Result CF ${resultCf.toFixed(2)}`);
                dispatch(addResultItem({
                    id: kerusakan.id,
                    kerusakanCode: kerusakan.kerusakanCode,
                    kerusakanName: kerusakan.kerusakanName,
                    perbaikan: kerusakan.perbaikan,
                    nilai: Number(resultCf.toFixed(2))
                }))

            })

            navigation.navigate("diagnosaCFUser")



        }
    }

    function BottomModal() {
        return (
            <BottomSheetModal
                snapPoints={["65%"]}
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
                    <Text style={{ fontFamily: Font['poppins-semiBold'], fontSize: FontSize.medium }}>Pilih Nilai CF </Text>
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
                                    const newMap = new Map(mapResult);
                                    newMap.set(evidences[currentIndex].id, item.id);
                                    setMapResult(newMap);
                                    dispatch(addItem({ key: evidences[currentIndex].id, value: item.id }))
                                    setKeyakinan(item)
                                    bottomSheetModalRef.current?.close()

                                }} style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: Font['poppins-regular'], flex: 1 }}>{item.value}</Text>
                                    <Text style={{ fontFamily: Font['poppins-semiBold'], fontSize: FontSize.large / 2, backgroundColor: "#F6F6F6", width: 50, paddingVertical: Spacing / 2, borderRadius: Spacing / 2, textAlign: 'center' }}>{item.id}</Text>
                                </TouchableOpacity>
                            );
                        }}
                    />

                </View>
            </BottomSheetModal>
        )
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ marginLeft: Spacing * 2, marginTop: Spacing * 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', alignContent: 'flex-start', width: '100%' }}>
                <TouchableOpacity onPress={navigation.goBack} style={{ backgroundColor: colors.primary, borderRadius: 100, padding: Spacing * 2 }}>
                    <AntDesign name='arrowleft' size={24} color={"#FFF"} />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
                <FlatList
                    keyExtractor={item => item.id.toString()}
                    data={evidences}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    renderItem={({ item }) => {
                        return <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, { width }]}>
                            <Image source={require('../assets/images/printer.png')} style={[{ flex: 0.7, justifyContent: 'center' }, { width: width / 1.5, resizeMode: 'contain' }]} />
                            <View style={{ flex: 0.3, gap: Spacing }}>
                                <Text style={{ fontWeight: '800', fontSize: 20, textAlign: 'center' }}>{item.evidenceCode}</Text>
                                <Text style={{ fontWeight: '300', textAlign: 'center' }}>{item.evidenceName}?</Text>
                                <TouchableOpacity onPress={openFilterModal} style={{ backgroundColor: '#e6e6e6', width: '100%', height: 50, borderRadius: Spacing, padding: Spacing, alignSelf: 'center' }}>
                                    <View style={{ flex: 1, flexDirection: 'row', gap: Spacing, alignItems: 'center', width: width / 1.5, justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: Font['poppins-bold'], textAlign: 'center' }} >{mapResult?.get(evidences[currentIndex].id) ? ListKeyakinan.find(item => item.id === mapResult?.get(evidences[currentIndex].id))?.id : "Silahkan pilih"}</Text>
                                        <Text style={{ fontFamily: Font['poppins-regular'], textAlign: 'center' }} >{mapResult?.get(evidences[currentIndex].id) ? ListKeyakinan.find(item => item.id === mapResult?.get(evidences[currentIndex].id))?.value : ""}</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>
                    }

                    }
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollx } } }], {
                        useNativeDriver: false
                    })}
                    onViewableItemsChanged={viewAbleItemChanged}
                    viewabilityConfig={viewConfig}
                    ref={slideRef}

                />
            </View>
            <Paginator item={evidences} currentIndex={currentIndex} />
            {
                isLoading ? null : <NextButton percentage={(currentIndex + 1) * (100 / evidences.length)} scrollTo={scrollTo} />
            }
            <BottomModal />
            <Spinner visible={isLoading} />
        </View >
    )
}