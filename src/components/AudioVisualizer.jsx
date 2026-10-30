import React from 'react';

export default function AudioVisualizer({ isPlaying, isMuted }) {
  const active = isPlaying && !isMuted;

  return (
    <div className="flex items-end gap-1 h-5 w-6 px-1" title={active ? "Audio Playing" : "Audio Muted"}>
      <span
        className={`w-1 rounded-full bg-[#D2C3F6] transition-all duration-300 ${
          active ? 'animate-wave-1' : 'h-1.5 opacity-50'
        }`}
      />
      <span
        className={`w-1 rounded-full bg-[#D2C3F6] transition-all duration-300 ${
          active ? 'animate-wave-2' : 'h-2 opacity-50'
        }`}
      />
      <span
        className={`w-1 rounded-full bg-[#D2C3F6] transition-all duration-300 ${
          active ? 'animate-wave-3' : 'h-1.5 opacity-50'
        }`}
      />
      <span
        className={`w-1 rounded-full bg-[#D2C3F6] transition-all duration-300 ${
          active ? 'animate-wave-4' : 'h-2 opacity-50'
        }`}
      />
    </div>
  );
}
