import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 192, height: 192 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom, #0b0312, #010005)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Glow behind the lily icon */}
        <div
          style={{
            position: 'absolute',
            width: '110px',
            height: '110px',
            background: 'rgba(255, 122, 147, 0.45)',
            borderRadius: '50%',
            filter: 'blur(16px)',
          }}
        />
        {/* Star Sparkle */}
        <div
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            background: '#fffacd',
            transform: 'rotate(45deg)',
            top: '40px',
            left: '40px',
          }}
        />
        {/* Flower Center Symbol */}
        <div
          style={{
            background: '#fffacd',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '4px solid #f59e0b',
            boxShadow: '0 0 12px #fff',
          }}
        />
        {/* Radiant petals */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <div
            key={deg}
            style={{
              position: 'absolute',
              width: '18px',
              height: '42px',
              background: 'linear-gradient(to top, rgba(255, 122, 147, 0.95), #ffffff)',
              borderRadius: '50%',
              transform: `rotate(${deg}deg) translateY(-26px)`,
              transformOrigin: 'bottom center',
            }}
          />
        ))}
      </div>
    ),
    { ...size }
  );
}
