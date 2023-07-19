import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import {
    NativeStackScreenProps,
    createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { ActivityIndicator, View, useColorScheme } from "react-native";
import { CustomDefaultTheme } from "../themes/AppThemes";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabsNavigator, { TabsStackParamList } from "./TabsNavigator";
import HomeScreen from "../screens/HomeScreen";
import KerusakanTambah from "../screens/KerusakanTambah";
import DiagnosaScreen from "../screens/DiagnosaScreen";
import PakarScreen from "../screens/PakarScreen";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ProfileScreen from "../screens/ProfileScreen";
import { KerusakanType } from "../type/kerusakan_type";
import { EvidenceType } from "../type/evidence_type";
import EvidenceScreen from "../screens/EvidenceScreen";
import EvidenceFormScreen from "../screens/EvidenceForm";
import PengetahuanFormScreen from "../screens/PengetahuanFormScreen";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PengetahuanType } from "../type/pengetahuan_type";
import DiagnosaCFUserScreen from "../screens/DiagnosaCFUserScreen";
import DiagnosaResultScreen from "../screens/DiagnosaResultScreen";
import { UserType } from "../type/user_type";
import UserFormScreen from "../screens/UserFormScreen";
export type RootStackParamList = {
    tabs: NavigatorScreenParams<TabsStackParamList>;
    home: undefined
    login: undefined
    register: undefined
    kerusakanTambah: {
        kerusakan: KerusakanType;
    }
    evidenceForm: {
        evidence: EvidenceType;
    }
    diagnosa: {
        evidences: EvidenceType[]
    }
    pakar: undefined
    profile: undefined
    pengetahuanForm: {
        pengetahuan: PengetahuanType
    }
    diagnosaCFUser: undefined
    diagnosaResult: undefined
    userForm: {
        user: UserType
    }
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;


export default function RootNavigator() {

    const { isLoggedIn } = useContext(AuthContext)

    return (
        <NavigationContainer theme={CustomDefaultTheme}>
            <BottomSheetModalProvider>
                <RootStack.Navigator initialRouteName={isLoggedIn ? 'home' : 'login'} >

                    {
                        isLoggedIn ? (
                            <>
                                <RootStack.Screen
                                    name="home"
                                    component={HomeScreen}
                                    options={{
                                        headerShown: false,
                                    }}

                                />

                                <RootStack.Screen
                                    name="kerusakanTambah"
                                    component={KerusakanTambah}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                                <RootStack.Screen
                                    name="diagnosa"
                                    component={DiagnosaScreen}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                                <RootStack.Screen
                                    name="profile"
                                    component={ProfileScreen}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                                <RootStack.Screen
                                    name="evidenceForm"
                                    component={EvidenceFormScreen}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                                <RootStack.Screen
                                    name="pengetahuanForm"
                                    component={PengetahuanFormScreen}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                                <RootStack.Screen
                                    name="diagnosaCFUser"
                                    component={DiagnosaCFUserScreen}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                                <RootStack.Screen
                                    name="diagnosaResult"
                                    component={DiagnosaResultScreen}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                                <RootStack.Screen
                                    name="userForm"
                                    component={UserFormScreen}
                                    options={{
                                        headerShown: false,
                                    }}
                                />
                            </>
                        ) :
                            (
                                <>
                                    <RootStack.Screen
                                        name="login"
                                        component={LoginScreen}
                                        options={{
                                            headerShown: false,
                                        }}
                                    />
                                    <RootStack.Screen
                                        name="register"
                                        component={RegisterScreen}
                                        options={{
                                            headerShown: false,
                                        }}
                                    />
                                </>

                            )
                    }


                </RootStack.Navigator>
            </BottomSheetModalProvider>
        </NavigationContainer>
    )
}