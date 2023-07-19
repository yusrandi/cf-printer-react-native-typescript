import { View, Text, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Svg, { G, Circle } from 'react-native-svg'
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import Spacing from '../constants/Spacing';
import { useTheme } from '@react-navigation/native';


interface props {
    percentage: number,
    scrollTo: () => void
}
export default function NextButton({ percentage, scrollTo }: props) {
    const size = 128
    const strokeWidth = 2
    const center = size / 2
    const radius = size / 2 - strokeWidth / 2
    const circumference = 2 * Math.PI * radius

    const progressAnimation = useRef(new Animated.Value(0)).current
    const progressReff = useRef<any>(null)
    const [strokeDashofset, setStrokeDashofset] = useState(0)

    const { colors } = useTheme();


    const animation = (toValue: any) => {
        return Animated.timing(progressAnimation, {
            toValue, duration: 250, useNativeDriver: true
        }).start()
    }

    useEffect(() => {
        animation(percentage)
    }, [percentage])

    useEffect(() => {
        progressAnimation.addListener(
            (value) => {
                const strokeDashofset = circumference - (circumference * value.value) / 100

                if (progressReff?.current) {
                    setStrokeDashofset(strokeDashofset)
                    progressReff!.current!.setNativeProps({
                        strokeDashofset
                    })
                }
            },
            // [percentage]

        )
    })

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Svg width={size} height={size}>
                <G rotation={'-90'} origin={center}>
                    <Circle stroke="#E6E7E8" cx={center} cy={center} r={radius} strokeWidth={strokeWidth} />
                    <Circle ref={progressReff} stroke={colors.primary} cx={center} cy={center} r={radius} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={strokeDashofset} />
                </G>
            </Svg>
            <TouchableOpacity onPress={scrollTo} style={{ position: 'absolute', backgroundColor: colors.primary, borderRadius: 100, padding: Spacing * 4 }}>
                <AntDesign name='arrowright' size={32} color={"#FFF"} />
            </TouchableOpacity>

        </View>
    )
}