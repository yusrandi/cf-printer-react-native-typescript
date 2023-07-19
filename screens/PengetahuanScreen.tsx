import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spacing from '../constants/Spacing'
import { useTheme } from '@react-navigation/native'
import Font from '../constants/Font'
import FontSize from '../constants/FontSize'
import { FlatList } from 'react-native-gesture-handler'
import { PengetahuanType, PengetahuanTypeResponse } from '../type/pengetahuan_type'
import { PengetahuanApi } from '../api/PengetahuanApi'
import { KerusakanType, KerusakanTypeResponse } from '../type/kerusakan_type'
import { KerusakanApi } from '../api/KerusakanApi'
import Accordion from '../components/Accordion'
import AccordionPengetahuan from '../components/AccordionPengetahuan'
import { RootStackParamList } from '../navigators/RootNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

export default function PengetahuanScreen({ navigation, route }: NativeStackScreenProps<RootStackParamList, "home">) {
    const { colors } = useTheme()
    const [kerusakans, setKerusakans] = useState<KerusakanType[]>([])
    const [kerusakan, setKerusakan] = useState<KerusakanType>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        kerusakanFromApi()
    }, [])
    async function kerusakanFromApi() {
        const kerusakanResponse: KerusakanTypeResponse = await KerusakanApi()
        console.log({ kerusakanResponse });
        const listKerusakan: KerusakanType[] = kerusakanResponse.responsedata
        setKerusakans(listKerusakan)
        setKerusakan(listKerusakan[0])
        setIsLoading(false)
    }
    useEffect(() => {
        navigation.addListener('focus', () => {
            console.log("reloaded");
            kerusakanFromApi()
        });
    }, [navigation]);
    return (
        <View style={{ paddingHorizontal: Spacing * 2 }}>

            {
                isLoading ? <Text>....</Text> :
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
                            const isSelected = kerusakan!.id === item.id;
                            return (
                                <TouchableOpacity
                                    onPress={() => setKerusakan(item)}
                                    style={{}}
                                >
                                    <AccordionPengetahuan code={item.kerusakanCode} title={item.kerusakanName} content={item.pengetahuans!} navigation={{
                                        navigation: navigation,
                                        route: route
                                    }} kerusakanId={item.id} />
                                </TouchableOpacity>
                            );
                        }}
                    />

            }
        </View>
    )
}