import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export default async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(45deg, 
              rgba(79, 79, 79, 0.1) 0%, 
              rgba(79, 79, 79, 0.1) 1px, 
              transparent 1px
            ),
            linear-gradient(-45deg, 
              rgba(79, 79, 79, 0.1) 0%, 
              rgba(79, 79, 79, 0.1) 1px, 
              transparent 1px
            )`,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
          }}
        />

        {/* Glowing gradients */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: `
              radial-gradient(circle 600px at 20% 20%, rgba(59, 130, 246, 0.15), transparent),
              radial-gradient(circle 600px at 80% 80%, rgba(99, 102, 241, 0.15), transparent)
            `,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '40px',
            position: 'relative',
            zIndex: '1',
          }}
        >
          <div
            style={{
              fontSize: '96px',
              fontWeight: 'bold',
              color: 'white',
              margin: '0',
              letterSpacing: '-0.02em',
              lineHeight: '1.2',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span>It&apos;s Always</span>
            <span
              style={{
                background: 'linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Day One
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
} 