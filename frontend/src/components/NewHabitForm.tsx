import {Check} from "phosphor-react";
import * as CheckBox from "@radix-ui/react-checkbox";
import {FormEvent, useState} from "react";
import {api} from "../lib/axios";

const availableWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export function NewHabitForm() {
    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])

    async function createNewHabit(event: FormEvent) {
        event.preventDefault()

        if (!title || weekDays.length === 0) {
            alert('No habit title and/or week days')
        }

        await api.post('habits', {
            title,
            weekDays
        })
        setTitle('')
        setWeekDays([])
    }

    function handleToogleWeekDay(weekDay: number) {
        if (weekDays.includes(weekDay)) {
            const removeWeekDays = weekDays.filter(day => day !== weekDay)
            setWeekDays(removeWeekDays)
        } else {
            const addWeekDays = [...weekDays, weekDay]
            setWeekDays(addWeekDays)
        }
    }

    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                What's your resolution?
            </label>
            <input
                type="text"
                id="title"
                placeholder="Enter a good habit"
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none
                    focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
                autoFocus
                value={title}
                onChange={event => setTitle(event.target.value)}
            />
            <label htmlFor="frequency" className="font-semibold leading-tight mt-3">
                How often?
            </label>

            <div className="flex flex-col gap-2 group">
                {availableWeekDays.map((weekday, index) => {
                    return (
                        <CheckBox.Root
                            key={weekday}
                            className="flex items-center gap-3 group rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-600"
                            onCheckedChange={() => handleToogleWeekDay(index)}
                            checked={weekDays.includes(index)}
                        >
                            <div
                                className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2
                                    border-zinc-800 group-data-[state=checked]:bg-green-500
                                    group-data-[state=checked]:border-green-500 transition-colors
                                    group-focus:ring-offset-2 group-focus:ring-violet-700 group-focus:ring-offset-zinc-900"
                            >
                                <CheckBox.Indicator>
                                    <Check size={20} className="text-white"/>
                                </CheckBox.Indicator>
                            </div>

                            <span
                                className="text-white leading-tight"
                            >
                                {weekday}
                            </span>
                        </CheckBox.Root>
                    )
                })}

            </div>

            <button type="submit"
                    className="mt-6 rounded-lg p-4 flex gap-6  items-center justify-center gap-3
                    font-semibold bg-green-600 hover:bg-green-500 transition-colors
                    focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
                <Check size={20} weight="bold"/>
                Confirm
            </button>
        </form>
    )
}