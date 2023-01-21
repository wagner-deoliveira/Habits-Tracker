import {Alert, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {BackButton} from "../components/BackButton";
import {CheckBox} from "../components/CheckBox";
import {useState} from "react";
import {Feather} from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import {api} from "../lib/axios";

const availableWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function New() {
    const [weekDays, setWeekDays] = useState<number[]>([])
    const [title, setTitle] = useState<string>('')

    function handleToggleState(weekDayIndex: number) {
        if (weekDays.includes(weekDayIndex)) {
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex])
        }
    }

    async function handleCreateNewHabit() {
        try {
            if (!title || weekDays.length === 0) {
                return Alert.alert('Ouch','No habit title and/or week days')
            }
            await api.post('habits', {
                title,
                weekDays
            })
            setTitle('')
            setWeekDays([])
            Alert.alert('New habit successfully created')
        } catch (err) {
            console.log(err)
            Alert.alert('New habit was not created')
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 100}}
            >
                <BackButton/>
                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Create a new habit
                </Text>
                <Text className="mt-6 text-white font-semibold text-base">
                    What's your resolution?
                </Text>
                <TextInput
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
                    placeholder="Exercises, sleep more, etc..."
                    placeholderTextColor={colors.zinc[400]}
                    onChangeText={setTitle}
                    value={title}
                />

                <Text className="font-semibold mt-4 mb-3 text-white text-base">
                    How often?
                </Text>

                {
                    availableWeekDays.map((weekDay, index) =>
                        <CheckBox
                            key={index}
                            title={weekDay}
                            checked={weekDays.includes(index)}
                            onPress={() => handleToggleState(index)}
                        />
                    )
                }
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
                    onPress={handleCreateNewHabit}
                >
                    <Feather
                        name="check"
                        size={20}
                        color={colors.white}
                    />
                    <Text className="font-semibold text-base text-white ml-2">
                        Confirm
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}