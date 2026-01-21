
// import React, { useEffect, useRef, useState } from "react";
// import { Play, Pause, Volume2 } from "lucide-react";

// export default function AudioWaveform({ sources = {}, elderMode }) {
//   const audioRef = useRef(null);
//   const [lang, setLang] = useState(Object.keys(sources)[0]);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [volume, setVolume] = useState(1);

//   useEffect(() => {
//     if (elderMode && audioRef.current) {
//       audioRef.current.play().catch(() => {});
//       setIsPlaying(true);
//     }
//   }, [elderMode, lang]);

//   const onTimeUpdate = () => {
//     const a = audioRef.current;
//     if (!a) return;
//     setProgress((a.currentTime / a.duration) * 100 || 0);
//   };

//   return (
//     <div className="bg-[#f9faf8] rounded-2xl p-4 border space-y-4">

//       <audio
//         ref={audioRef}
//         src={sources?.[lang]}
//         onTimeUpdate={onTimeUpdate}
//       />

//       {/* Controls */}
//       <div className="flex items-center gap-4">
//         <button
//           onClick={() => {
//             if (!audioRef.current) return;
//             isPlaying ? audioRef.current.pause() : audioRef.current.play();
//             setIsPlaying(!isPlaying);
//           }}
//           className="w-12 h-12 rounded-full bg-[#3cc9e1] text-white flex items-center justify-center"
//         >
//           {isPlaying ? <Pause /> : <Play />}
//         </button>

//         <div className="flex-1 h-2 bg-gray-200 rounded-full">
//           <div
//             className="h-full bg-[#5a8c76]"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       </div>

//       {/* Volume + Language */}
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-2">
//           <Volume2 size={16} />
//           <input
//             type="range"
//             min="0"
//             max="1"
//             step="0.01"
//             value={volume}
//             onChange={(e) => {
//               setVolume(e.target.value);
//               audioRef.current.volume = e.target.value;
//             }}
//           />
//         </div>

//         <div className="flex gap-2">
//           {Object.keys(sources).map((l) => (
//             <button
//               key={l}
//               onClick={() => setLang(l)}
//               className={`px-3 py-1 text-xs rounded
//                 ${lang === l ? "bg-[#3cc9e1] text-white" : "bg-gray-100"}`}
//             >
//               {l.toUpperCase()}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

export default function AudioWaveform({ sources = {}, elderMode = false }) {
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const availableLangs = Object.keys(sources);
  const defaultLang = availableLangs.includes("en")
    ? "en"
    : availableLangs[0];

  const [lang, setLang] = useState(defaultLang);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.9);

  /* 🧑‍🦳 Auto-play for elders */
  useEffect(() => {
    if (elderMode && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [elderMode, lang]);

  /* ⏱ Progress */
  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) audio.pause();
    else audio.play();

    setIsPlaying(!isPlaying);
  };

  const seek = (e) => {
    const audio = audioRef.current;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
  };

  return (
    <div className="bg-[#f9faf8] rounded-2xl p-4 border space-y-4">

      <audio
        ref={audioRef}
        src={sources?.[lang]}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full
                     bg-[#3cc9e1]
                     text-white flex items-center justify-center"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>

        {/* Progress */}
        <div
          ref={progressRef}
          onClick={seek}
          className="flex-1 h-2 bg-gray-200 rounded-full cursor-pointer"
        >
          <div
            className="h-full bg-[#5a8c76]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Volume + Language */}
      <div className="flex items-center justify-between text-sm">

        <div className="flex items-center gap-2">
          <Volume2 size={16} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => {
              setVolume(e.target.value);
              audioRef.current.volume = e.target.value;
            }}
          />
        </div>

        <div className="flex gap-2">
          {availableLangs.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 rounded text-xs
                ${lang === l
                  ? "bg-[#3cc9e1] text-white"
                  : "bg-gray-100 text-gray-600"}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
