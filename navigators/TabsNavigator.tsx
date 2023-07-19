import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackScreenProps } from "./RootNavigator";
import HomeScreen from "../screens/HomeScreen";
import { AntDesign } from "@expo/vector-icons";
import ProfileScreen from "../screens/ProfileScreen";
import KerusakanScreen from "../screens/KerusakanScreen";
import EvidenceScreen from "../screens/EvidenceScreen";
import CustomBottomTabs from "../components/CustomBottomTabs";



export type TabsStackParamList = {
    home: undefined;
    kerusakan: undefined;
    evidence: undefined;
    profile: undefined;
};

const TabsStack = createBottomTabNavigator<TabsStackParamList>();
export type TabsStackScreenProps<T extends keyof TabsStackParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<TabsStackParamList, T>,
        RootStackScreenProps<"tabs">
    >;

export default function TabsNavigator() {
    return (
        <TabsStack.Navigator screenOptions={{ tabBarShowLabel: false }}
            tabBar={(props) => <CustomBottomTabs {...props} />}
        >
            <TabsStack.Screen name="home" component={HomeScreen} options={{ headerShown: false, tabBarIcon(props) { return <AntDesign name="home" {...props} /> }, }} />
            <TabsStack.Screen name="kerusakan" component={KerusakanScreen} options={{ headerShown: false, tabBarIcon(props) { return <AntDesign name="setting" {...props} /> }, }} />
            <TabsStack.Screen name="evidence" component={EvidenceScreen} options={{ headerShown: false, tabBarIcon(props) { return <AntDesign name="notification" {...props} /> }, }} />
            <TabsStack.Screen name="profile" component={ProfileScreen} options={{ headerShown: false, tabBarIcon(props) { return <AntDesign name="user" {...props} /> }, }} />

        </TabsStack.Navigator>
    )
}