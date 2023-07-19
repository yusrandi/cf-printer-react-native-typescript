import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spacing from '../constants/Spacing'
import { useTheme } from '@react-navigation/native'
import Font from '../constants/Font'
import FontSize from '../constants/FontSize'
import EvidenceBody from '../components/EvidenceBody'
import { EvidenceType, EvidenceTypeResponse } from '../type/evidence_type'
import { EvidenceApi } from '../api/EvidenceApi'
import { FlatList } from 'react-native-gesture-handler'
import { RootStackParamList } from '../navigators/RootNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export default function EvidenceScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "home">) {
    const { colors } = useTheme()
    const [evidences, setevidences] = useState<EvidenceType[]>([])
    const [evidence, setevidence] = useState<EvidenceType>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        evidenceFromApi()
    }, [])
    async function evidenceFromApi() {
        const evidenceResponse: EvidenceTypeResponse = await EvidenceApi()
        console.log({ evidenceResponse });
        const listevidence: EvidenceType[] = evidenceResponse.responsedata
        setevidences(listevidence)
        setevidence(listevidence[0])
        setIsLoading(false)
    }
    useEffect(() => {
        navigation.addListener('focus', () => {
            console.log("reloaded");
            evidenceFromApi()
        });
    }, [navigation]);
    return (
        <View style={{ paddingHorizontal: Spacing * 2 }}>

            {
                isLoading ? <Text>....</Text> :
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
                            const isSelected = evidence!.id === item.id;
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('evidenceForm', {
                                            evidence: item
                                        })
                                    }}
                                    style={{}}
                                >
                                    <EvidenceBody key={item.id} kode={item.evidenceCode} title={item.evidenceName} />
                                </TouchableOpacity>
                            );
                        }}
                    />
            }
        </View>
    )
}