import {ScrollView, Text, View} from "react-native";
import {useRoute} from "@react-navigation/native";
import {BackButton} from "../components/BackButton";
import dayjs from "dayjs";
import {ProgressBar} from "../components/ProgressBar";
import {CheckBox} from "../components/CheckBox";

interface HabitsParams {
    date: string;
}

export function Habits() {
    const route = useRoute()
    const {date} = route.params as HabitsParams
    const parsedDate = dayjs(date)
    const dayOfTheWeek = parsedDate.format('dddd')
    const dayAndMonth = parsedDate.format('MM/DD')
    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}}
            >
                <BackButton/>
                <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
                    {dayOfTheWeek}
                </Text>
                <Text className="text-white font-extrabold text-3xl">
                    {dayAndMonth}
                </Text>
                <ProgressBar progress={89}/>
                <View className="mt-6">
                    <CheckBox title="rere" checked={false} />
                    <CheckBox title="bfdbd" checked={true} />
                </View>
            </ScrollView>
        </View>
    )
}