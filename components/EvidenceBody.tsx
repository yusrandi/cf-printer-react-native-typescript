import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import Spacing from '../constants/Spacing'
import Font from '../constants/Font'
import FontSize from '../constants/FontSize'

interface props {
    kode: string,
    title: string,
}
export default function EvidenceBody({ kode, title }: props) {
    const { colors } = useTheme()

    return (
        <View style={{ flexDirection: 'row', gap: Spacing * 2, borderBottomColor: colors.primary, borderBottomWidth: 0.2, marginBottom: Spacing, alignItems: 'center', paddingBottom: Spacing }}>
            <Text style={{ fontFamily: Font['poppins-bold'], color: colors.primary }}>{kode}</Text>
            <Text style={{ fontFamily: Font['poppins-regular'], flex: 1, fontSize: FontSize.small }}>{title}</Text>
        </View>
    )
}