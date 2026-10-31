import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Music2 } from 'lucide-react';
import AudioVisualizer from './AudioVisualizer';

export default function FloatingAudioWidget({
  videoRef,
  isPlaying,
  setIsPlaying,
  isAudioMuted,
  toggleAudio,
  isAudioPlaying,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    if (!videoRef?.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef?.current) {
      videoRef.current.volume = val;
    }
    if (isAudioMuted && val > 0) {
      toggleAudio();
    }
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-40 transition-all duration-300"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div
        className={`rounded-2xl transition-all duration-300 shadow-2xl backdrop-blur-xl border ${
          isPlaying && !isAudioMuted
            ? 'bg-[#180E2E]/95 dark:bg-[#140B25]/95 border-[#D2C3F6]/50 shadow-[#8B5CF6]/20'
            : 'bg-white/95 dark:bg-[#120921]/90 border-purple-100 dark:border-[#36255C]/70 shadow-black/20 dark:shadow-black/60'
        }`}
      >
        {/* Compact Pill (Always Visible) */}
        <div className="flex items-center gap-3 px-4 py-2.5 cursor-pointer">
          {/* Play / Pause Video Button */}
          <button
            onClick={handleTogglePlay}
            className={`p-1.5 rounded-xl transition-all cursor-pointer ${
              isPlaying
                ? 'bg-[#D2C3F6]/25 text-[#4C2F8A] dark:text-[#D2C3F6]'
                : 'bg-purple-50 hover:bg-purple-100 dark:bg-[#1B1233] text-stone-500'
            }`}
            title={isPlaying ? 'Click to Pause Video' : 'Click to Play Video'}
            aria-label="Toggle Video Play"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>

          <div className="w-px h-5 bg-purple-100 dark:border-[#36255C]/70" />

          {/* Sound Mute / Unmute Button */}
          <button
            onClick={toggleAudio}
            className="flex items-center gap-2 group cursor-pointer"
            title={isAudioMuted ? 'Click to Enable Salon Atmosphere' : 'Click to Mute'}
            aria-label="Toggle Sound"
          >
            <div
              className={`p-1.5 rounded-xl transition-all ${
                !isAudioMuted
                  ? 'bg-[#D2C3F6]/25 text-[#4C2F8A] dark:text-[#D2C3F6]'
                  : 'bg-purple-100/70 dark:bg-[#251745] text-[#8B5CF6] dark:text-[#D2C3F6] animate-pulse hover:bg-[#D2C3F6]/25'
              }`}
            >
              {!isAudioMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </div>

            <AudioVisualizer isPlaying={isAudioPlaying && isPlaying} isMuted={isAudioMuted} />

            <div className="text-left hidden sm:block">
              <div className="flex items-center gap-1.5">
                {isPlaying && !isAudioMuted ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D2C3F6] animate-pulse" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                )}
                <span className="text-[10px] uppercase tracking-wider font-bold text-stone-900 dark:text-stone-100">
                  {isPlaying && !isAudioMuted ? 'Playing Live' : 'Click For Sound'}
                </span>
              </div>
              <span className="block text-[9px] text-stone-500 dark:text-stone-400 tracking-wider">
                {!isAudioMuted ? 'Salon Atmosphere On' : 'Tap to Listen'}
              </span>
            </div>
          </button>
        </div>

        {/* Hover Expanded Drawer Details */}
        {isExpanded && (
          <div className="px-4 pb-3.5 pt-1 border-t border-purple-100 dark:border-[#36255C]/70 animate-in fade-in slide-in-from-bottom-2 duration-200 w-64 text-stone-900 dark:text-white">
            <div className="flex items-center justify-between text-[11px] mb-2 pt-1 text-stone-500 dark:text-stone-400">
              <span className="flex items-center gap-1 font-semibold text-stone-700 dark:text-stone-300">
                <Music2 className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>Atelier Soundscape</span>
              </span>
              <span className="flex items-center gap-1 text-[10px] text-[#6D3ABF] dark:text-[#D2C3F6] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D2C3F6] animate-ping" />
                <span>{!isAudioMuted ? 'Active' : 'Click to Enable'}</span>
              </span>
            </div>

            {/* Volume Slider */}
            <div className="flex items-center gap-2 pt-1">
              <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isAudioMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-purple-100 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#8B5CF6]"
                aria-label="Volume level"
              />
              <Volume2 className="w-3.5 h-3.5 text-[#8B5CF6]" />
            </div>

            <div className="text-[10px] text-stone-500 dark:text-stone-400 mt-2 text-center">
              {!isAudioMuted ? 'Calming acoustic lounge soundscape' : 'Click the icon or tap anywhere on page to enable'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
