interface  HabitProps {
    completed: number
}
export function Habit (props: HabitProps) {
    return (
        <div className="bg-orange-300 w-20 text-blue rounded m-2 text-center">Habit completed {props.completed}</div>
    )
}