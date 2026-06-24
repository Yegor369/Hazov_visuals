"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying]   = useState(false);
  const [ready,   setReady]     = useState(false);
  const [volume,  setVolume]    = useState(0.35);
  const [showVol, setShowVol]   = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hideTimer = useRef<any>(null);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
    a.loop   = true;
    const onReady = () => setReady(true);
    a.addEventListener("canplaythrough", onReady);
    return () => a.removeEventListener("canplaythrough", onReady);
  }, []);

  // Fade in/out on toggle
  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;

    if (!playing) {
      a.volume = 0;
      await a.play().catch(() => {});
      setPlaying(true);
      // Fade in
      let v = 0;
      const up = setInterval(() => {
        v = Math.min(v + 0.02, volume);
        a.volume = v;
        if (v >= volume) clearInterval(up);
      }, 40);
    } else {
      // Fade out then pause
      let v = a.volume;
      const down = setInterval(() => {
        v = Math.max(v - 0.02, 0);
        a.volume = v;
        if (v <= 0) { clearInterval(down); a.pause(); setPlaying(false); }
      }, 40);
    }
  };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  const showVolume = () => {
    clearTimeout(hideTimer.current);
    setShowVol(true);
    hideTimer.current = setTimeout(() => setShowVol(false), 2500);
  };

  return (
    <div style={{ position: "fixed", bottom: 28, left: 28, zIndex: 200, display: "flex", alignItems: "center", gap: 10 }}>
      <audio ref={audioRef} src="/audio/music.mp3" preload="auto" />

      {/* Volume slider — appears on hover */}
      <AnimatePresence>
        {showVol && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 14px",
              background: "rgba(10,10,11,0.9)",
              border: "1px solid rgba(110,123,255,0.3)",
              backdropFilter: "blur(12px)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              {volume > 0 && <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>}
            </svg>
            <input
              type="range" min="0" max="1" step="0.05" value={volume}
              onChange={onVolumeChange}
              style={{
                width: 72, height: 2, appearance: "none",
                background: `linear-gradient(to right, #6E7BFF ${volume*100}%, rgba(255,255,255,0.15) ${volume*100}%)`,
                outline: "none", cursor: "pointer",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={toggle}
        onContextMenu={(e) => { e.preventDefault(); showVolume(); }}
        onMouseEnter={showVolume}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        title={playing ? "Выключить музыку (ПКМ — громкость)" : "Включить джаз"}
        style={{
          width: 46, height: 46,
          border: playing ? "1px solid rgba(110,123,255,0.6)" : "1px solid rgba(255,255,255,0.12)",
          background: playing ? "rgba(110,123,255,0.12)" : "rgba(10,10,11,0.8)",
          backdropFilter: "blur(12px)",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
          transition: "border-color 0.3s, background 0.3s",
        }}
      >
        {/* Ripple when playing */}
        {playing && (
          <>
            <motion.span animate={{ scale: [1, 1.8], opacity: [0.3, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid #6E7BFF" }} />
            <motion.span animate={{ scale: [1, 1.5], opacity: [0.2, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
              style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid #B66EFF" }} />
          </>
        )}

        <AnimatePresence mode="wait">
          {playing ? (
            <motion.span key="pause" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.15 }}>
              {/* Equalizer bars when playing */}
              <EqBars />
            </motion.span>
          ) : (
            <motion.span key="play" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.15 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

// Animated equalizer bars
function EqBars() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 16 }}>
      {[0, 0.15, 0.3, 0.45].map((delay, i) => (
        <motion.div
          key={i}
          animate={{ height: ["4px", "14px", "6px", "12px", "4px"] }}
          transition={{ duration: 0.9, repeat: Infinity, delay, ease: "easeInOut" }}
          style={{ width: 3, background: "#6E7BFF", borderRadius: 1 }}
        />
      ))}
    </div>
  );
}
