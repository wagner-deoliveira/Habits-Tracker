import {HabitDay} from "./HabitDay";
import {generateDatesFromYearBeginning} from "../utils/generateDatesFromYearBeginning";

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const summaryDates = generateDatesFromYearBeginning()
const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length
export function SummaryTable() {
    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekdays.map((weekday, i) => {
                    return (
                        <div key={`${weekday}-${i}`}
                             className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center mx-3">
                            {weekday}
                        </div>
                    )
                })}
            </div>
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {summaryDates.map(date => {
                    return <HabitDay key={date.toString()}/>
                })}

                {amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill}).map((_, i) => {
                    return <div key={i}  className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed" />
                })}
            </div>
        </div>
    )
}