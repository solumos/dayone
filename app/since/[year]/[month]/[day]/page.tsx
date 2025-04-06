'use client';

import { Background } from "../../../../components/background";
import { TimeDisplay } from "../../../../components/TimeDisplay";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DatePage({
  params,
}: {
  params: { year: string; month: string; day: string };
}) {
  const router = useRouter();
  
  // Create a date from the URL parameters
  const startDate = new Date(
    parseInt(params.year),
    parseInt(params.month) - 1,
    parseInt(params.day),
    0, // Set to midnight in local time
    0,
    0,
    0
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to midnight in local time
  startDate.setHours(0, 0, 0, 0); // Ensure both dates are set to midnight

  // Redirect to home page if date is in the future
  if (startDate.getTime() > today.getTime()) {
    router.push('/');
    return null;
  }

  const isToday = today.getTime() === startDate.getTime();

  // Format the dates nicely
  const formattedStartDate = startDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedToday = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      <Background />

      <div className="relative z-10 w-full max-w-2xl px-4 text-center space-y-16">
        {isToday ? (
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">
              Today is{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Day One
              </span>
            </h1>
            <p className="text-4xl font-bold text-white">Tomorrow, remember:</p>
            <p className="text-4xl font-bold text-white">
              It&apos;s Always{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Day One
              </span>
            </p>
          </div>
        ) : (
          <TimeDisplay startDate={startDate} />
        )}

        <div className="space-y-2 select-none">
          <p className="text-xl text-zinc-400">
            Your journey began on {formattedStartDate}
          </p>
          <p className="text-xl text-zinc-400">Today is {formattedToday}</p>
          <p className="text-sm text-zinc-600 mt-8 opacity-80">
            ⌘+D or Ctrl+D to bookmark this page for later
          </p>
        </div>
      </div>

      <Link 
        href="/day-two" 
        className="absolute bottom-6 text-[14px] text-zinc-800 opacity-0 hover:opacity-100 transition-all duration-700 cursor-help select-none hover:text-zinc-400"
      >
        but what about day two?
      </Link>
    </main>
  );
}
