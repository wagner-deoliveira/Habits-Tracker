interface ProgressBarProps {
    progress: number;
}
export function ProgressBar(props: ProgressBarProps) {
    return (
        <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
            <div
                role="progressbar"
                aria-label="Habit's progress completed this day"
                aria-valuenow={75}
                className="h-3 rounded-xl bg-violet-600 w-3/4"
                style={{width: `${props.progress}%`}}
            >
            </div>
        </div>
    )
}

//       TODO: Try to use Progress.Indicator radix-ui
// <Progress.Root className="ProgressRoot" value={66}>
//     <Progress.Indicator
//         className="h-3 rounded-xl bg-white-100 w-full mt-4 transition-transform"
//         style={{transform: `translateX(-${100 - progress}%)`}}
//     />
// </Progress.Root>
// <Popover.Arrow height={8} width={16} className="fill-zinc-900"/>