import {Text, View, ScrollView} from "react-native";
import {Header} from "../components/Header";
import {HabitDay, DAY_SIZE} from "../components/HabitDay";
import {generateDatesFromYearBeginning} from "../utils/generateDatesFromYearBeginning"

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const datesFromYearStart = generateDatesFromYearBeginning()
const minimumSummaryDatesSize = 18 * 5
const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length

export function Home() {
    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header/>
            <View className="flex-row mt-6 mb-2">
                {weekdays.map((weekday, i) => (
                    <Text
                        key={`${weekday}-${i}`}
                        className="text-zinc-400 text-xl font-bold text-center mx-1"
                        style={{width: DAY_SIZE}}
                    >
                        {weekday}
                    </Text>
                ))}
            </View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}}
            >
                <View className="flex-row flex-wrap">
                    {datesFromYearStart.map(date => (
                        <HabitDay key={date.toISOString()}/>
                    ))}
                    {amountOfDaysToFill > 0 && Array
                        .from({length: amountOfDaysToFill})
                        .map((_, index) => (
                            <View
                                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                                style={{width: DAY_SIZE, height: DAY_SIZE}}
                                key={index}
                            />
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}