export function Background() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.7)_100%)] z-[2]" />
        <div 
          className="absolute w-full h-full grid-background"
          style={{
            backgroundImage: `
              linear-gradient(to right, #4f4f4f33 1px, transparent 1px),
              linear-gradient(to bottom, #4f4f4f33 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            transformOrigin: 'top',
          }}
        />
      </div>
      
      {/* Animated gradients */}
      <div className="absolute inset-0 z-[1]">
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-60%,#3b82f660,transparent)]"
          style={{ animation: 'pulse 4s ease-in-out infinite' }}
        />
        <div 
          className="absolute inset-0 bg-[radial-gradient(circle_800px_at_80%_60%,#6366f160,transparent)]"
          style={{ animation: 'pulse 4s ease-in-out infinite alternate' }}
        />
      </div>

      {/* Prism effect */}
      <div className="absolute inset-0 overflow-hidden mix-blend-soft-light">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-40"
          style={{
            background: 'conic-gradient(from 0deg, #3b82f6, #6366f1, #8b5cf6, #3b82f6)',
            filter: 'blur(100px)',
            animation: 'rotate 10s linear infinite',
          }}
        />
      </div>
    </div>
  )
} 