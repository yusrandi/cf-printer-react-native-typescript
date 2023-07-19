import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackParamList } from '../navigators/RootNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useAppSelector } from '../store/store'
import { FlatList } from 'react-native'
import Spacing from '../constants/Spacing'
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useTheme } from '@react-navigation/native'
import { ListKeyakinan } from '../type/keyakinan-type'
import { EvidenceType, EvidenceTypeResponse } from '../type/evidence_type'
import { EvidenceApi } from '../api/EvidenceApi'
import Spinner from 'react-native-loading-spinner-overlay'
import Font from '../constants/Font'

export default function DiagnosaCFUserScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "diagnosaCFUser">) {

    const maps = useAppSelector(state => state.userCF.maps)
    const { colors } = useTheme();
    const [evidences, setevidences] = useState<EvidenceType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)




    useEffect(() => {
        console.log({ maps });
    }, [])

    useEffect(() => {
        evidenceFromApi()
    }, [])
    async function evidenceFromApi() {
        const evidenceResponse: EvidenceTypeResponse = await EvidenceApi()
        // console.log({ evidenceResponse });
        const listevidence: EvidenceType[] = evidenceResponse.responsedata
        setevidences(listevidence)
        setIsLoading(false)
    }

    return (
        <View style={{ flex: 1, paddingBottom: Spacing * 2, paddingHorizontal: Spacing * 2 }}>
            <View style={{ marginTop: Spacing * 3, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', alignContent: 'flex-start', width: '100%' }}>
                <TouchableOpacity onPress={navigation.goBack} style={{ backgroundColor: colors.primary, borderRadius: 100, padding: Spacing * 2 }}>
                    <AntDesign name='arrowleft' size={24} color={"#FFF"} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={maps}
                keyExtractor={item => item.key.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingVertical: Spacing,
                    paddingHorizontal: Spacing,
                    gap: Spacing,
                }}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{}}>
                            <Text style={{ fontFamily: Font['poppins-regular'] }}>{evidences.find(data => data.id === item.key)?.evidenceName}?</Text>
                            <Text style={{ textAlign: 'left', fontFamily: Font['poppins-bold'] }}>- {ListKeyakinan.find(data => data.id === item.value)?.value}</Text>
                        </View>
                    );
                }}
            />
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('diagnosaResult')
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
                    Submit to Diagnosa
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