import {Text} from "react-native";
import {useNavigation} from "@react-navigation/native";

export function EmptyHabits() {
    const {navigate} = useNavigation()
    return (
        <Text className="text-zinc-400 text-base">
            No habits were set for this day
            <Text
                className="text-violet-400 text-base underline active:text-violet-500"
                onPress={() => navigate('new')}
            >
                Create a new habit here
            </Text>
        </Text>
    )
}