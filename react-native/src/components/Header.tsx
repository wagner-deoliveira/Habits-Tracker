import {View, TouchableOpacity, Text} from "react-native";
import {Feather} from "@expo/vector-icons"
import colors from "tailwindcss/colors"

import Logo from "../assets/logo.svg"
import {useNavigation} from "@react-navigation/native";

export function Header() {
    const {navigate} = useNavigation()
    return (
        <View className="w-full flex-row items-center justify-between">
            <Logo/>
            <TouchableOpacity
                activeOpacity={0.7}
                className="flex-row h-11 px-4 border border-violet-500 rounded-lg items-center"
                onPress={() => navigate('new')}
            >
                <Feather
                    name="plus"
                    size={20}
                    color={colors.violet[500]}
                />
                <Text className="text-white ml-3 font-semibold text-base">
                    New
                </Text>
            </TouchableOpacity>

        </View>
    )
}