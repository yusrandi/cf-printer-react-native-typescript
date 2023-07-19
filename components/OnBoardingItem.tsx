import { View, Text, useWindowDimensions, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Boarding } from '../screens/DiagnosaScreen'
import Spacing from '../constants/Spacing'
import SelectDropdown from 'react-native-select-dropdown'
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useTheme } from '@react-navigation/native'
import { CustomDefaultTheme } from '../themes/AppThemes'


interface props {
    item: Boarding
}
export default function OnBoardingItem({ item }: props) {
    const { width } = useWindowDimensions()
    const countries = ["Pasti", "Hampir Pasti", "Kemungkinan Besar", "Mungkin", "Tidak Tahu"]
    const { colors } = useTheme();

    return (
        <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, { width }]}>
            <Image source={item.image} style={[{ flex: 0.7, justifyContent: 'center' }, { width, resizeMode: 'contain' }]} />
            <View style={{ flex: 0.3, gap: Spacing }}>
                <Text style={{ fontWeight: '800', fontSize: 20, textAlign: 'center' }}>{item.title}</Text>
                <Text style={{ fontWeight: '300', textAlign: 'center' }}>{item.description}</Text>

                <SelectDropdown
                    data={countries}
                    defaultValueByIndex={0}
                    // defaultValue={'Egypt'}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                    }}
                    // defaultButtonText={'Select country'}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                        return item;
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={colors.primary} size={18} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={styles.dropdown1DropdownStyle}
                    rowStyle={styles.dropdown1RowStyle}
                    rowTextStyle={styles.dropdown1RowTxtStyle}
                />


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dropdown1BtnStyle: {
        width: '80%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: CustomDefaultTheme.colors.primary,
    },
    dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
})