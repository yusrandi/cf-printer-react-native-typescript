import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spacing from '../constants/Spacing';
import Accordion from '../components/Accordion';
import { KerusakanType, KerusakanTypeResponse } from '../type/kerusakan_type';
import { KerusakanApi } from '../api/KerusakanApi';
import { RootStackParamList } from '../navigators/RootNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export default function KerusakanScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "home">) {

    const [kerusakans, setKerusakans] = useState<KerusakanType[]>([])
    const [kerusakan, setKerusakan] = useState<KerusakanType>()
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        kerusakanFromApi()
    }, [])
    useEffect(() => {
        navigation.addListener('focus', () => {
            console.log("reloaded");
            kerusakanFromApi()
        });
    }, [navigation]);

    async function kerusakanFromApi() {
        const kerusakanResponse: KerusakanTypeResponse = await KerusakanApi()
        console.log({ kerusakanResponse });
        const listKerusakan: KerusakanType[] = kerusakanResponse.responsedata
        setKerusakans(listKerusakan)
        setKerusakan(listKerusakan[0])
        setIsLoading(false)
    }
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
                                    onPress={() => {
                                        setKerusakan(item)
                                        navigation.navigate('kerusakanTambah', {
                                            kerusakan: kerusakans[index]
                                        })

                                    }}
                                    style={{}}
                                >
                                    <Accordion code={item.kerusakanCode} title={item.kerusakanName} content={item.perbaikan} />

                                </TouchableOpacity>
                            );
                        }}
                    />
            }
        </View>
    )
}