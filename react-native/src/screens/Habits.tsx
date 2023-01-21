import {Alert, ScrollView, Text, View} from "react-native";
import {useRoute} from "@react-navigation/native";
import {BackButton} from "../components/BackButton";
import dayjs from "dayjs";
import {ProgressBar} from "../components/ProgressBar";
import {CheckBox} from "../components/CheckBox";
import {useEffect, useState} from "react";
import {Loading} from "../components/Loading";
import {api} from "../lib/axios";
import {generateProgressPercentage} from "../utils/generateProgressPercentage";
import {EmptyHabits} from "../components/EmptyHabits";
import clsx from "clsx";

interface HabitsParams {
    date: string;
}

interface DayInfoProps {
    completedHabits: string
    possibleHabits: Array<{
        id: string
        title: string
    }>
}

export function Habits() {
    const [loading, setLoading] = useState(true)
    const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
    const [completedHabits, setCompletedHabits] = useState<string[]>([])
    const route = useRoute()
    const {date} = route.params as HabitsParams
    const parsedDate = dayjs(date)
    const isDateInPate = parsedDate.endOf('day').isBefore(new Date())
    const dayOfTheWeek = parsedDate.format('dddd')
    const dayAndMonth = parsedDate.format('MM/DD')
    const habitsProgress = dayInfo?.possibleHabits.length ? generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) : 0

    async function fetchHabits() {
        try {
            setLoading(true)
            const response = await api.get('/day', {
                params: {date}
            })
            setDayInfo(response.data)
            setCompletedHabits(response.data.completedHabits)
        } catch (err) {
            Alert.alert('Ouch', 'Error when loading habits')
        } finally {
            setLoading(false)
        }
    }

    async function handleToggleHabit(habitId: string) {
        try {
            await api.patch(`/habits/${habitId}/toggle`)
            if (completedHabits.includes(habitId)) {
                setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
            } else {
                setCompletedHabits(prevState => [...prevState, habitId])
            }
        } catch (err) {
            console.error(err)
            Alert.alert('Ouch', 'Habit update failed')
        }

    }

    useEffect(() => {
        fetchHabits()
    }, [])

    if (loading) {
        return <Loading/>
    }

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
                <ProgressBar progress={habitsProgress}/>
                <View className={clsx("mt-6", {
                    "opacity-50": isDateInPate
                })}>
                    {
                        dayInfo?.possibleHabits ?
                            dayInfo?.possibleHabits.map(habit =>
                                <CheckBox
                                    key={habit.id}
                                    title={habit.title}
                                    checked={completedHabits.includes(habit.id)}
                                    disabled={isDateInPate}
                                    onPress={() => handleToggleHabit(habit.id)}
                                />
                            )
                            : <EmptyHabits/>
                    }
                </View>
                {
                    isDateInPate &&
                    <Text className="text-white mt-10 text-center">
                        You're not allowed to change any of your past habits... Play fare 🤷‍♂️
                    </Text>
                }
            </ScrollView>
        </View>
    )
}