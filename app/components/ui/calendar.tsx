"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState<Date>(props.defaultMonth || new Date())
  
  // Generate an array of years (e.g., from 1900 to current year + 10)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1900 + 11 }, (_, i) => 1900 + i)

  const handleYearSelect = (year: string) => {
    const newDate = new Date(month)
    newDate.setFullYear(parseInt(year))
    setMonth(newDate)
  }

  return (
    <DayPicker
      month={month}
      onMonthChange={setMonth}
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-zinc-900/90 text-white rounded-lg border border-zinc-800", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-white",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-white border-zinc-700 hover:bg-zinc-800 hover:text-white"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-zinc-400 rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-blue-500/20",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100 text-zinc-300 hover:bg-zinc-800 hover:text-white focus:text-white"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-blue-500 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white",
        day_today: "bg-zinc-800 text-white",
        day_outside:
          "text-zinc-600 aria-selected:bg-blue-500/20 aria-selected:text-zinc-400",
        day_disabled: "text-zinc-600 opacity-50",
        day_range_middle:
          "aria-selected:bg-zinc-800 aria-selected:text-white",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="h-4 w-4 text-white" {...props} />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="h-4 w-4 text-white" {...props} />
        ),
        Caption: ({ displayMonth }) => {
          const previousMonth = new Date(displayMonth)
          previousMonth.setMonth(previousMonth.getMonth() - 1)
          
          const nextMonth = new Date(displayMonth)
          nextMonth.setMonth(nextMonth.getMonth() + 1)
          
          return (
            <div className="flex justify-center pt-1 relative items-center">
              <button
                onClick={() => setMonth(previousMonth)}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1 text-white border-zinc-700 hover:bg-zinc-800 hover:text-white"
                )}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex justify-center items-center gap-1">
                <span className="text-sm font-medium text-white">
                  {displayMonth.toLocaleString('default', { month: 'long' })}
                </span>
                <select
                  value={displayMonth.getFullYear()}
                  onChange={(e) => handleYearSelect(e.target.value)}
                  className="bg-transparent text-white text-sm font-medium focus:outline-none focus:ring-0 appearance-none cursor-pointer hover:text-zinc-300 transition-colors"
                >
                  {years.map((year) => (
                    <option key={year} value={year} className="bg-zinc-800">
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setMonth(nextMonth)}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1 text-white border-zinc-700 hover:bg-zinc-800 hover:text-white"
                )}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )
        }
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
