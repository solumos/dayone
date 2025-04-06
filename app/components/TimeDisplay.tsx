"use client";

import { useState } from "react";

type TimeUnit = "days" | "weeks" | "months" | "years";

type TimeDisplayProps = {
  startDate: Date;
};

export function TimeDisplay({ startDate }: TimeDisplayProps) {
  // Calculate days since start (today = 0, yesterday = 1, etc.)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const diffTime = today.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Calculate time units
  const weeks = Math.floor(diffDays / 7);
  const months = Math.floor(diffDays / 30.44); // Average days in a month
  const years = Math.floor(diffDays / 365.25); // Account for leap years

  // State for current time unit
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("days");

  // Get available time units
  const availableUnits: TimeUnit[] = ["days"];
  if (weeks >= 1) availableUnits.push("weeks");
  if (months >= 1) availableUnits.push("months");
  if (years >= 1) availableUnits.push("years");

  // Handle click to cycle through units
  const handleClick = () => {
    const currentIndex = availableUnits.indexOf(timeUnit);
    const nextIndex = (currentIndex + 1) % availableUnits.length;
    setTimeUnit(availableUnits[nextIndex]);
  };

  return (
    <div className="space-y-4">
      <h1 
        className="text-4xl font-bold text-white cursor-pointer hover:opacity-80 transition-opacity select-none"
        onClick={handleClick}
      >
        {(() => {
          switch (timeUnit) {
            case "years":
              return `${years} ${years === 1 ? "year has" : "years have"}`;
            case "months":
              return `${months} ${months === 1 ? "month has" : "months have"}`;
            case "weeks":
              return `${weeks} ${weeks === 1 ? "week has" : "weeks have"}`;
            default:
              return `${diffDays} ${diffDays === 1 ? "day has" : "days have"}`;
          }
        })()} passed, but:
      </h1>
      <p className="text-4xl font-bold text-white">
        It&apos;s Always{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          Day One
        </span>
      </p>
    </div>
  );
}
