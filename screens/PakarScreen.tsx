import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { CategoriMenuType, ListCategories } from '../type/CategoryMenu'
import { useRoute, useTheme } from '@react-navigation/native';
import KerusakanScreen from './KerusakanScreen';
import EvidenceScreen from './EvidenceScreen';
import PengetahuanScreen from './PengetahuanScreen';
import { RootStackParamList } from '../navigators/RootNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Spacing from '../constants/Spacing';
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { EmptyKerusakanType } from '../type/kerusakan_type';
import { EmptyEvidenceType } from '../type/evidence_type';
import { EmptyPengetahuanType } from '../type/pengetahuan_type';



export default function PakarScreen({ navigation, route }: NativeStackScreenProps<RootStackParamList, "home">) {

    const { colors } = useTheme();

    const [categories, setCategories] = useState<CategoriMenuType[]>(ListCategories)
    const [kategori, setKategori] = useState<CategoriMenuType>(ListCategories[0])

    const router = useRoute()



    return (
        <View style={{ flex: 1 }}>
            <View>
                <FlatList
                    data={categories}
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        gap: 12,
                    }}
                    renderItem={({ item, index }) => {
                        const isSelected = kategori.id === item.id;
                        return (
                            <TouchableOpacity
                                onPress={() => setKategori(item)}
                                style={{
                                    backgroundColor: isSelected ? colors.primary : colors.card,
                                    paddingHorizontal: 20,
                                    paddingVertical: 12,
                                    borderRadius: 100,
                                    borderWidth: isSelected ? 0 : 1,
                                    borderColor: colors.border,
                                }}
                            >
                                <Text
                                    style={{
                                        color: isSelected ? colors.background : colors.text,
                                        fontWeight: "600",
                                        fontSize: 14,
                                        opacity: isSelected ? 1 : 0.5,
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
            <View style={{ flex: 1 }}>
                {
                    kategori.id === 2 ?
                        (
                            <KerusakanScreen navigation={navigation} route={route} />
                        ) :
                        kategori.id === 3 ?
                            (
                                <EvidenceScreen navigation={navigation} route={route} />
                            ) :
                            kategori.id === 4 ?
                                (
                                    <PengetahuanScreen navigation={navigation} route={route} />
                                ) :
                                <Text>{kategori.name}</Text>
                }
            </View>

            {
                kategori.id === 2 || kategori.id === 3 || kategori.id === 4 ?
                    <TouchableOpacity
                        onPress={() => {
                            if (kategori.id === 2) {
                                navigation.navigate('kerusakanTambah', {
                                    kerusakan: EmptyKerusakanType
                                })
                            } else if (kategori.id === 3) {
                                navigation.navigate('evidenceForm', {
                                    evidence: EmptyEvidenceType
                                })
                            } else {
                                navigation.navigate('pengetahuanForm', { pengetahuan: EmptyPengetahuanType })
                            }
                        }}
                        style={{
                            position: 'absolute', right: Spacing, bottom: Spacing,
                            backgroundColor: colors.primary,
                            width: 56,
                            height: 56,
                            borderRadius: 56 / 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            elevation: 8
                        }}>
                        <AntDesign
                            style={{}}
                            name='plus' size={24} color={'white'} />
                    </TouchableOpacity>
                    : null
            }
        </View>
    )
}