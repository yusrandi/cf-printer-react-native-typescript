import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { RootStackParamList } from '../navigators/RootNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Spacing from '../constants/Spacing'
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useTheme } from '@react-navigation/native'
import { useAppSelector } from '../store/store'
import { EvidenceType, EvidenceTypeResponse } from '../type/evidence_type'
import { EvidenceApi } from '../api/EvidenceApi'
import { KerusakanType, KerusakanTypeResponse } from '../type/kerusakan_type'
import { KerusakanApi } from '../api/KerusakanApi'
import Spinner from 'react-native-loading-spinner-overlay'
import { PengetahuanType } from '../type/pengetahuan_type'
import Font from '../constants/Font'
import FontSize from '../constants/FontSize'
import { ResultCFType } from '../store/feature/ResultSlice'
import { AuthContext } from '../context/AuthContext'
import { DiagnosaCreateApi } from '../api/DiagnosaApi'


export default function DiagnosaResultScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "diagnosaResult">) {
    const { colors } = useTheme();
    const results = useAppSelector(state => state.result.results)
    const [maxObject, setMaxObject] = useState<ResultCFType>()
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const { user } = useContext(AuthContext)

    useEffect(() => {
        console.log({ results });
        const maxObject = results.reduce((prev, current) =>
            prev.nilai > current.nilai ? prev : current
        );
        setMaxObject(maxObject)
        console.log({ maxObject });

    }, [])

    async function diagnosaCreate() {

        try {
            const response = await DiagnosaCreateApi(user.id, maxObject?.id!, Number((maxObject?.nilai! * 100).toFixed()))
            console.log({ response });
            setIsLoading(false)
            navigation.navigate('home');

        } catch (error) {
            console.log({ error });

        }
    }
    return (
        <View style={{ flex: 1, paddingHorizontal: Spacing * 2, width: '100%' }}>

            <View style={{ flex: 1 }}>
                <Image source={require('../assets/images/printer.png')} style={{ alignSelf: 'center' }} />
                {
                    results.map((item) => (
                        <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <View style={{ flexDirection: 'row', gap: Spacing }}>
                                <Text style={{ fontFamily: Font['poppins-regular'] }}>{item.kerusakanCode}</Text>
                                <Text style={{ fontFamily: Font['poppins-regular'] }}>{item.kerusakanName}</Text>
                            </View>
                            <Text style={{ textAlign: 'left', fontFamily: Font['poppins-bold'] }}>{(item.nilai * 100).toFixed(0)}%</Text>
                        </View>
                    ))
                }

                <Text style={{ marginVertical: Spacing * 2, fontFamily: Font['poppins-regular'], textAlign: 'center' }}>Kesimpulan dari hasil diagnosa dengan jenis kerusakan
                    <Text style={{ fontFamily: Font['poppins-bold'], fontSize: FontSize.large, color: colors.primary }}> {maxObject?.kerusakanName} </Text> sebesar <Text style={{ fontFamily: Font['poppins-bold'], fontSize: FontSize.large, color: colors.primary }}>{(maxObject?.nilai! * 100).toFixed()}%</Text>
                </Text>
                <Text style={{ fontFamily: Font['poppins-bold'], fontSize: FontSize.large, color: colors.primary, textAlign: 'center' }}>perbaikan</Text>
                <Text style={{ textAlign: 'center' }}>{maxObject?.perbaikan}</Text>

            </View>

            <TouchableOpacity
                onPress={() => {
                    diagnosaCreate()
                }}
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
                    marginBottom: Spacing * 2
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
                    SELESAI
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
                    <AntDesign name="arrowright" size={24} color={colors.text} />
                </View>
            </TouchableOpacity>
            <Spinner visible={isLoading} />

        </View>
    )
}