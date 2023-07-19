import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Svg, { G, Circle } from 'react-native-svg'
import Spacing from '../constants/Spacing'
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';
import { useTheme } from '@react-navigation/native';
import { RootStackParamList } from '../navigators/RootNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import moment from 'moment-timezone'
import CurrentDateTime from '../utils/currentdatetime';
import { EvidenceType, EvidenceTypeResponse } from '../type/evidence_type';
import { EvidenceApi } from '../api/EvidenceApi';


export default function UserScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "home">) {

    const size = 200
    const strokeWidth = 2
    const center = size / 2
    const radius = size / 2 - strokeWidth / 2
    const circumference = 2 * Math.PI * radius

    const progressReff = useRef(null)
    const { colors } = useTheme();

    const [currentDateTime, setCurrentDateTime] = useState<moment.Moment>(moment());
    const [evidences, setevidences] = useState<EvidenceType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)



    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDateTime(moment());
        }, 1000); // Update every second

        return () => {
            clearInterval(interval);
        };
    }, [])

    useEffect(() => {
        evidenceFromApi()
    }, [])
    async function evidenceFromApi() {
        const evidenceResponse: EvidenceTypeResponse = await EvidenceApi()
        console.log({ evidenceResponse });
        const listevidence: EvidenceType[] = evidenceResponse.responsedata
        setevidences(listevidence)
        setIsLoading(false)
    }


    const formattedDateTime = currentDateTime.tz('Asia/Makassar');

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing * 2 }}>
            <Text style={{ fontFamily: Font['poppins-bold'], fontSize: FontSize.xxLarge }}>MAKASSAR</Text>
            <Text style={{ fontSize: FontSize.large }}>{formattedDateTime.format('LL')}</Text>
            <Text style={{ fontSize: FontSize.xxLarge }}>{formattedDateTime.format('HH:mm:ss')}</Text>

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Svg width={size} height={size}>
                    <G rotation={'-90'} origin={center}>
                        <Circle stroke="#E6E7E8" cx={center} cy={center} r={radius} strokeWidth={strokeWidth} />
                        <Circle ref={progressReff} stroke="#493D8A" cx={center} cy={center} r={radius} strokeWidth={strokeWidth} strokeDasharray={100} strokeDashoffset={100} />
                    </G>
                </Svg>
                {
                    isLoading ? null :
                        <TouchableOpacity onPress={() => navigation.navigate('diagnosa', {
                            evidences: evidences
                        })} style={{ position: 'absolute', backgroundColor: colors.primary, borderRadius: 130, padding: Spacing * Spacing }}>
                            <Text style={{ fontWeight: '900', color: 'white', fontSize: FontSize.xxLarge }}>GO</Text>
                        </TouchableOpacity>
                }

            </View>
            <Text style={{}}>hit button "GO" to start diagnosa</Text>

        </View>
    )
}