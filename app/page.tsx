'use client';

import { useState, useEffect } from 'react';

interface Star {
  id: number;
  left: string;
  top: string;
  duration: string;
  delay: string;
}

export default function Page() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate 50 stars on component mount to prevent hydration mismatch in Next.js Server Side Rendering (SSR)
    const generatedStars = Array.from({ length: 50 }).map((_, index) => ({
      id: index,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${Math.random() * 4 + 3}s`,
      delay: `${Math.random() * 5}s`,
    }));
    setTimeout(() => {
      setStars(generatedStars);
    }, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_#2a0813_0%,_#050102_100%)] flex flex-col items-center justify-center overflow-hidden relative font-serif" id="stars-field-container">
      {/* Dynamic stellar starfield background */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute w-1 h-1 bg-yellow-100 rounded-full opacity-0 shadow-[0_0_8px_2px_#fef08a] pointer-events-none"
          style={{
            left: star.left,
            top: star.top,
            animation: `twinkle ${star.duration} infinite ${star.delay} alternate ease-in-out`,
          }}
          id={`star-${star.id}`}
        />
      ))}

      {/* Main Interactive Flower Container */}
      <div className="z-10 scale-75 sm:scale-100 mt-8 sm:mt-0 transition-transform duration-1000" id="flower-container-wrapper">
        <div className="flower" id="flower-root">
          {/* Individual Petals (6 items) */}
          <div className="petal petal1" id="petal-element-1" />
          <div className="petal petal2" id="petal-element-2" />
          <div className="petal petal3" id="petal-element-3" />
          <div className="petal petal4" id="petal-element-4" />
          <div className="petal petal5" id="petal-element-5" />
          <div className="petal petal6" id="petal-element-6" />

          {/* Individual Stamens (6 items; pollen mapping takes place in CSS via after pseudoclass tags) */}
          <div className="stamen stamen1" id="stamen-element-1" />
          <div className="stamen stamen2" id="stamen-element-2" />
          <div className="stamen stamen3" id="stamen-element-3" />
          <div className="stamen stamen4" id="stamen-element-4" />
          <div className="stamen stamen5" id="stamen-element-5" />
          <div className="stamen stamen6" id="stamen-element-6" />

          {/* Golden Center Disc */}
          <div className="center" id="center-element" />
        </div>
      </div>
    </div>
  );
}
