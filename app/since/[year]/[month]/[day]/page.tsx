import { Background } from "../../../../components/background"
import { TimeDisplay } from "../../../../components/TimeDisplay"

export default function DatePage({ params }: { params: { year: string; month: string; day: string } }) {
  // Create a date from the URL parameters
  const startDate = new Date(
    parseInt(params.year),
    parseInt(params.month) - 1,
    parseInt(params.day)
  );

  // Format the dates nicely
  const formattedStartDate = startDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const today = new Date();
  const formattedToday = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      <Background />

      <div className="relative z-10 w-full max-w-2xl px-4 text-center space-y-16">
        <div className="space-y-4">
          <TimeDisplay startDate={startDate} />
          <p className="text-4xl font-bold text-white mt-8 select-none">
            But it&apos;s always{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Day One
            </span>
          </p>
        </div>

        <div className="space-y-2 select-none">
          <p className="text-xl text-zinc-400">
            Your journey began on {formattedStartDate}
          </p>
          <p className="text-xl text-zinc-400">
            Today is {formattedToday}
          </p>
        </div>
      </div>
    </main>
  );
} 