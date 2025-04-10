'use client'

import { useState, useRef } from 'react';

type Props = {
  src: string;
  poster?: string;
};

export default function CustomVideoCard({ src, poster }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden shadow-md group cursor-pointer">
      <video ref={videoRef}
        controls poster={poster}
        width={400}
        height={600}
        className="w-full h-auto object-cover rounded"
        muted
        loop
        playsInline
        onClick={togglePlay}
      >
        <source src={src} type='video/mp4'/>
      </video>

      <div
        className={`absolute inset-0 bg-black/40 flex items-center justify-center transition ${
          isPlaying ? 'bg-black/30 group-hover:bg-black/50' : 'bg-black/40 group-hover:bg-black/60'
        }`}
        onClick={(e) => {
          e.preventDefault();
          togglePlay();
        }}
      >
        {isPlaying? (
          // Pause svg
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill="white"
            className="w-14 h-14 opacity-0 hover:scale-110 group-hover:opacity-90 transition-transform"
          >
            <circle cx="50" cy="50" r="48" fill="rgba(255,255,255,0.2)" />
            <rect x="35" y="30" width="10" height="40" fill="white" />
            <rect x="55" y="30" width="10" height="40" fill="white" />
          </svg>
        ) : (
          // Play svg
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill="white"
            className="w-14 h-14 opacity-90 hover:scale-110 transition-transform"
          >
            <circle cx="50" cy="50" r="48" fill="rgba(255,255,255,0.2)" />
            <polygon points="40,30 70,50 40,70" fill="white" />
          </svg>
      )}
      </div>
    </div>
  );
}
