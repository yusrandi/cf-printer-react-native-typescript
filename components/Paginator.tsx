import { View, Text, Animated, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import { Boarding } from '../screens/DiagnosaScreen'
import { useTheme } from '@react-navigation/native'
import { EvidenceType } from '../type/evidence_type'

interface props {
    item: EvidenceType[]
    currentIndex: number
}
export default function Paginator({ item, currentIndex }: props) {
    const { width } = useWindowDimensions()
    const { colors } = useTheme();


    return (
        <View style={{ flexDirection: 'row', height: 64 }}>
            {
                item.map((_, i) => {
                    const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
                    return <View style={[{ height: 10, borderRadius: 5, backgroundColor: i === currentIndex ? colors.primary : 'grey', marginHorizontal: 8 }, { width: i === currentIndex ? 30 : 10 }]} key={i.toString()} />
                })
            }
        </View>
    )
}