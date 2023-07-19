import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import Icons from "@expo/vector-icons/MaterialIcons";
import { FontAwesome, AntDesign } from "@expo/vector-icons";


import { ParamListBase, useTheme } from "@react-navigation/native";
import FontSize from "../constants/FontSize";

const CustomBottomTabs = (props: BottomTabBarProps) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView edges={["bottom"]} style={{ backgroundColor: colors.card }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        {props.state.routes.map((route, i) => {
          const isActive = i == props.state.index;
          return (
            <TabItem
              key={i}
              isActive={isActive}
              routeName={route.name}
              navigation={props.navigation}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default CustomBottomTabs;

const TabItem = ({
  routeName,
  isActive,
  navigation,
}: {
  routeName: string;
  isActive: boolean;
  navigation: any;
}) => {
  const { colors } = useTheme();

  const onTap = () => {
    navigation.navigate(routeName);
  };

  return (
    <Pressable
      onPress={onTap}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingVertical: 8,
      }}
    >
      <View
        style={[
          {
            width: 36,
            height: 36,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 32,
            backgroundColor: isActive ? colors.primary : "transparent",
          },
        ]}
      >
        <AntDesign
          name={
            routeName === "home"
              ? "home"
              : routeName === "kerusakan"
                ? "setting"
                : routeName === "evidence"
                  ? "notification"
                  : "user"
          }
          size={20}
          color={isActive ? colors.card : colors.text}
          style={{
            opacity: isActive ? 1 : 0.5,
          }}
        />

      </View>
      <Text
        style={{
          fontSize: 12,
          color: colors.text,
          opacity: isActive ? 1 : 0.5,
        }}
      >
        {routeName}
      </Text>

    </Pressable>
  );
};
