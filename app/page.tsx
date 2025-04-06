"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "@/app/components/ui/calendar";
import { Background } from "@/app/components/background";

export default function Home() {
  const router = useRouter();
  const [date, setDate] = React.useState<Date>();
  const [maxDate, setMaxDate] = React.useState<Date>();

  React.useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setMaxDate(today);
  }, []);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      router.push(`/since/${year}/${month}/${day}`);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      <Background />

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl px-4 text-center">
        <h1 className="text-6xl font-bold text-white tracking-tight mb-8">
          It&apos;s Always{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Day One
          </span>
        </h1>

        <p className="text-xl text-zinc-400 mb-8">
          Every journey has a beginning. When did yours start?
        </p>

        <div className="flex justify-center">
          <div className="h-[400px] flex items-start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              disabled={(date) => {
                if (!maxDate) return true;
                const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                const max = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
                return d > max;
              }}
              className="rounded-lg bg-zinc-900/80 border border-zinc-800"
            />
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
        <a
          href="https://d1.awsstatic.com/executive-insights/en_US/elements_of_amazons_day_one_culture.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          Learn more about Day One →
        </a>
      </div>
    </main>
  );
}
