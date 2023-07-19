import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import Spacing from '../constants/Spacing';
import Font from '../constants/Font';

interface AccordionProps {
    code: string;
    title: string;
    content: string;
}

const Accordion: React.FC<AccordionProps> = ({ code, title, content }) => {
    const [collapsed, setCollapsed] = useState(true);
    const { colors } = useTheme()

    const toggleAccordion = () => {
        setCollapsed(!collapsed);
    };

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={toggleAccordion}>
                <View style={{ flexDirection: 'row', paddingVertical: Spacing, alignItems: 'center', borderBottomColor: colors.primary, borderBottomWidth: 0.5 }}>
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
                <View style={{ padding: Spacing, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: Font['poppins-bold'] }} >Perbaikan</Text>
                    <Text style={{ textAlign: 'center' }}>{content}</Text>
                </View>
            </Collapsible>
        </View>
    );
};

export default Accordion;
