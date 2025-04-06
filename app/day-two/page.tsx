"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function DayTwo() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<'back' | 'exit'>('back');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingDots, setLoadingDots] = useState('');
  
  const quote = [
    "Day Two is stasis,",
    "followed by irrelevance,",
    "followed by excrutiating, painful decline,",
    "followed by death.",
    "",
    "And that is why:",
    "It's Always Day One.",
  ];

  const [displayedText, setDisplayedText] = useState<string[]>(quote.map(() => ''));
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    let dotInterval: NodeJS.Timeout;
    if (isLoading) {
      dotInterval = setInterval(() => {
        setLoadingDots(prev => {
          if (prev.length >= 3) return '';
          return prev + '.';
        });
      }, 500);
    }
    return () => clearInterval(dotInterval);
  }, [isLoading]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedOption(prev => prev === 'back' ? 'exit' : 'back');
      } else if (e.key === 'Enter' || e.key === 'Delete' || e.key === 'Backspace' || e.key === 'Escape') {
        e.preventDefault();
        const isBack = (e.key === 'Delete' || e.key === 'Backspace') || (e.key === 'Enter' && selectedOption === 'back');
        const isExit = e.key === 'Escape' || (e.key === 'Enter' && selectedOption === 'exit');
        
        if (isBack || isExit) {
          setIsLoading(true);
          setTimeout(() => {
            if (isBack) {
              router.push('/');
            } else {
              window.location.href = 'about:blank';
            }
          }, 1500);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, selectedOption]);

  useEffect(() => {
    if (currentLine >= quote.length) return;

    const currentQuoteLine = quote[currentLine];
    if (currentChar >= currentQuoteLine.length) {
      const timeout = currentQuoteLine === "" ? 800 : 1200;
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }, timeout);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setDisplayedText(prev => {
        const newText = [...prev];
        newText[currentLine] = currentQuoteLine.slice(0, currentChar + 1);
        return newText;
      });
      setCurrentChar(prev => prev + 1);
    }, Math.random() * 50 + 50);

    return () => clearTimeout(timer);
  }, [currentLine, currentChar, quote]);

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono relative overflow-hidden select-none pointer-events-none cursor-default">
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,_rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] animate-scanline" />

      {/* CRT flicker effect */}
      <div className="absolute inset-0 pointer-events-none animate-flicker opacity-[0.15]" />

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* ASCII Art Header */}
          <pre className="text-green-500 text-xs leading-none mb-12 pointer-events-none select-none">
            {`
▓█████▄  ▄▄▄     ▓██   ██▓   ▄▄▄█████▓ █     █░ ▒█████  
▒██▀ ██▌▒████▄    ▒██  ██▒   ▓  ██▒ ▓▒▓█░ █ ░█░▒██▒  ██▒
░██   █▌▒██  ▀█▄   ▒██ ██░   ▒ ▓██░ ▒░▒█░ █ ░█ ▒██░  ██▒
░▓█▄   ▌░██▄▄▄▄██  ░ ▐██▓░   ░ ▓██▓ ░ ░█░ █ ░█ ▒██   ██░
░▒████▓  ▓█   ▓██▒ ░ ██▒▓░     ▒██▒ ░ ░░██▒██▓ ░ ████▓▒░
 ▒▒▓  ▒  ▒▒   ▓▒█░  ██▒▒▒      ▒ ░░   ░ ▓░▒ ▒  ░ ▒░▒░▒░ 
 ░ ▒  ▒   ▒   ▒▒ ░▓██ ░▒░        ░      ▒ ░ ░    ░ ▒ ▒░ 
 ░ ░  ░   ░   ▒   ▒ ▒ ░░       ░        ░   ░  ░ ░ ░ ▒  
   ░          ░  ░░ ░                      ░        ░ ░  
 ░                ░ ░                                     
`}
          </pre>

          {/* Terminal-style content */}
          <div className="space-y-6 text-sm sm:text-base">
            <div className="border border-green-500/30 p-6 bg-black/50 font-[Courier] leading-relaxed h-[300px] pointer-events-none">
              <div className="h-full flex flex-col">
                {displayedText.map((line, i) => (
                  <p key={i} className="mb-4 last:mb-0">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-col items-start justify-center gap-2 text-sm font-[Courier]">
              <div className="flex items-center gap-4 text-green-500/70">
                <span className="text-xs opacity-50">Use arrow keys to select, ENTER to confirm</span>
              </div>
              <div className="flex flex-col items-start gap-1 mt-2">
                <div className={`flex items-center gap-2 ${selectedOption === 'back' ? 'text-green-500' : 'text-green-500/50'}`}>
                  <span className="w-4">{selectedOption === 'back' ? '>' : ' '}</span>
                  <span>[DEL] GO BACK</span>
                </div>
                <div className={`flex items-center gap-2 ${selectedOption === 'exit' ? 'text-green-500' : 'text-green-500/50'}`}>
                  <span className="w-4">{selectedOption === 'exit' ? '>' : ' '}</span>
                  <span>[ESC] EXIT</span>
                </div>
              </div>
              {isLoading && (
                <div className="font-[Courier] text-green-500/70 h-6 flex items-center mt-4">
                  <span className="inline-block w-4">&gt;</span>
                  <span className="inline-block">LOADING{loadingDots}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Add this to your globals.css
const styles = `
@keyframes scanline {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}

@keyframes flicker {
  0% {
    opacity: 0.27861;
  }
  5% {
    opacity: 0.34769;
  }
  10% {
    opacity: 0.23604;
  }
  15% {
    opacity: 0.90626;
  }
  20% {
    opacity: 0.18128;
  }
  25% {
    opacity: 0.83891;
  }
  30% {
    opacity: 0.65583;
  }
  35% {
    opacity: 0.67807;
  }
  40% {
    opacity: 0.26559;
  }
  45% {
    opacity: 0.84693;
  }
  50% {
    opacity: 0.96019;
  }
  55% {
    opacity: 0.08594;
  }
  60% {
    opacity: 0.20313;
  }
  65% {
    opacity: 0.71988;
  }
  70% {
    opacity: 0.53455;
  }
  75% {
    opacity: 0.37288;
  }
  80% {
    opacity: 0.71428;
  }
  85% {
    opacity: 0.70419;
  }
  90% {
    opacity: 0.7003;
  }
  95% {
    opacity: 0.36108;
  }
  100% {
    opacity: 0.24387;
  }
}

.typing-effect {
  overflow: hidden;
  border-right: 2px solid transparent;
  white-space: nowrap;
  animation: typing 3.5s steps(40, end), blink-caret .75s step-end infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #22c55e }
}
`;
