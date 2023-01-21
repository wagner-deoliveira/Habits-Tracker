import {useEffect, useState} from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import {Check} from "phosphor-react";
import {api} from "../lib/axios";
import dayjs from "dayjs";

interface HabitsListProps {
    date: Date;
    onCompletedChange: (completed: number) => void;
}

interface HabitInfo {
    possibleHabits: {
        id: string;
        title: string;
        create_at: string;
    }[];
    completedHabits: string[];
}

export function HabitsList({date, onCompletedChange}: HabitsListProps) {
    const [habitsInfo, setHabitsInfo] = useState<HabitInfo>();

    useEffect(() => {
        api.get("day", {
            params: {
                date: date.toISOString(),
            },
        })
            .then((response) => {
                setHabitsInfo(response.data);
            });
    }, []);

    const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

    async function handleToogleHabit(habitId: string) {
        const isHabitCompleted = habitsInfo!.completedHabits.includes(habitId)
        await api.patch(`/habits/${habitId}/toggle`)

        let completedHabits: string[]
        if (isHabitCompleted) {
            completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)

        } else {
            completedHabits = [...habitsInfo!.completedHabits, habitId]
        }
        setHabitsInfo({
            possibleHabits: habitsInfo!.possibleHabits,
            completedHabits

        })

        onCompletedChange(completedHabits.length)
    }

    return (
        <div className="mt-6 flex flex-col gap-3">
            {habitsInfo?.possibleHabits.map((habit) => {
                return (
                    <Checkbox.Root
                        key={habit.id}
                        onCheckedChange={() => handleToogleHabit(habit.id)}
                        checked={habitsInfo?.completedHabits.includes(habit.id)}
                        disabled={isDateInPast}
                        className="flex items-center gap-3 group"
                    >
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                            <Checkbox.Indicator>
                                <Check size={20}/>
                            </Checkbox.Indicator>
                        </div>
                        <span
                            className="font-semibold text-xl leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                            {habit.title}
                        </span>
                    </Checkbox.Root>
                );
            })}
        </div>
    );
}
