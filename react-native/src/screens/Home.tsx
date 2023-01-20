import {Text, View, ScrollView, Alert} from "react-native";
import {Header} from "../components/Header";
import {HabitDay, DAY_SIZE} from "../components/HabitDay";
import {generateDatesFromYearBeginning} from "../utils/generateDatesFromYearBeginning"
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {api} from "../lib/axios";
import {Loading} from "../components/Loading";
import dayjs from "dayjs";

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const datesFromYearStart = generateDatesFromYearBeginning()
const minimumSummaryDatesSize = 18 * 5
const amountOfDaysToFill = minimumSummaryDatesSize - datesFromYearStart.length

type SummaryProps = Array<{
    id: string
    date: string
    amount: number
    completed: number
}>
export function Home() {
    const {navigate} = useNavigation()
    const [loading, setLoading] = useState(true)
    const [summary, setSummary] = useState<SummaryProps | null>(null)

    async function fetchData() {
        try {
            setLoading(true)
            const response = await api.get('summary')
            setSummary(response.data)
            console.log(summary)
        } catch (err) {
            console.log(err)
            Alert.alert('Opsie', 'Something is wrong')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loading) {
        return (<Loading/>)
    }

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
                {
                    summary &&
                    <View className="flex-row flex-wrap">
                        {datesFromYearStart.map(date => {
                            const dayWithhabits = summary.find(day => {
                                dayjs(date).isSame(day.date, 'day')
                            })
                            return (
                                <HabitDay
                                    key={date.toISOString()}
                                    onPress={() => navigate('habit', {date: date.toISOString()})}
                                    date={date}
                                    amountOfHabits={dayWithhabits?.amount}
                                    amountCompleted={dayWithhabits?.completed}
                                />
                            )
                        })}
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
                }
            </ScrollView>
        </View>
    )
}