import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import Spacing from '../constants/Spacing';
import Font from '../constants/Font';
import { PengetahuanType } from '../type/pengetahuan_type';
import { RootStackParamList } from '../navigators/RootNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface AccordionProps {
    kerusakanId: number;
    code: string;
    title: string;
    content: PengetahuanType[];
    navigation: NativeStackScreenProps<RootStackParamList, "home">
}

const AccordionPengetahuan: React.FC<AccordionProps> = ({ kerusakanId, code, title, content, navigation }) => {
    const [collapsed, setCollapsed] = useState(true);
    const { colors } = useTheme()

    const toggleAccordion = () => {
        setCollapsed(!collapsed);
    };

    return (
        <View>
            <TouchableOpacity onPress={toggleAccordion}>
                <View style={{ flexDirection: 'row', paddingVertical: Spacing, alignItems: 'center', borderBottomColor: colors.primary, borderBottomWidth: 0.2 }}>
                    <View style={{ flex: 1, flexDirection: 'row', gap: Spacing }}>
                        <Text style={{ fontFamily: Font['poppins-bold'] }} >{code}</Text>
                        <Text style={{ fontFamily: Font['poppins-regular'] }} >{title}</Text>
                    </View>
                    <Ionicons
                        name={collapsed ? 'arrow-down-circle' : 'arrow-up-circle'}
                        size={24}
                        color={colors.primary}
                    />
                </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed}>
                <View style={{ padding: Spacing }}>
                    {
                        content.map((item, key) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => navigation.navigation.navigate('pengetahuanForm', { pengetahuan: item })}
                                    key={key} style={{ paddingVertical: Spacing / 2, flexDirection: 'row', gap: Spacing, alignItems: 'center' }}>
                                    <View style={{ flex: 1, flexDirection: 'row', gap: Spacing }}>
                                        <Text style={{ fontFamily: Font['poppins-bold'] }}>{item.evidence?.evidenceCode}</Text>
                                        <Text style={{ fontFamily: Font['poppins-regular'] }}>{item.evidence?.evidenceName}</Text>
                                    </View>
                                    <Text style={{}}>{item.bobot}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </Collapsible>
        </View>
    );
};

export default AccordionPengetahuan;
