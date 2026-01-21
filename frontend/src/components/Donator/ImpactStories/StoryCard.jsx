
// import React from "react";
// import AudioWaveform from "./AudioWaveform";

// export default function StoryCard({ story }) {
//   return (
//     <div className="bg-white rounded-3xl shadow-md border overflow-hidden hover:shadow-xl transition">

//       {/* Header */}
//       <div className="flex items-center gap-4 p-5 border-b">
//         <img src={story.orphanageLogo} className="w-12 h-12 rounded-full" />
//         <div>
//           <h3 className="font-bold">{story.orphanage}</h3>
//           <p className="text-xs text-gray-500">{story.location}</p>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-5">
//         {story.type === "audio" && (
//           <AudioWaveform
//             sources={story.media}
//             elderMode={story.elderMode}
//           />
//         )}

//         {story.type === "video" && (
//           <video controls className="w-full rounded-xl" src={story.media.video} />
//         )}

//         {story.type === "text" && (
//           <p className="text-gray-700 text-sm leading-relaxed">
//             {story.text}
//           </p>
//         )}
//       </div>

//       {/* Footer */}
//       <div className="bg-[#f9faf8] px-5 py-4 flex justify-between text-xs">
//         <span>🌱 Impact: {story.impact}</span>
//         <span className="text-[#3cc9e1] font-semibold">
//           {story.category}
//         </span>
//       </div>
//     </div>
//   );
// }

import React from "react";
import AudioWaveform from "./AudioWaveform";
import { Headphones, Play, Image as ImageIcon } from "lucide-react";


export default function StoryCard({ story }) {
  return (
    <div
      className="
        bg-white rounded-[28px]
        border border-black/10
        shadow-[0_10px_40px_rgba(0,0,0,0.08)]
        p-6 flex flex-col gap-5
        transition-all duration-300 ease-out
        hover:-translate-y-2
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]
        hover:border-[#3cc9e1]/40
        group
      "
    >

      {/* ===== TITLE ===== */}
    <div className="flex items-start gap-4">
     <div className="w-12 h-12 rounded-full bg-[#eaf6f8] flex items-center justify-center text-[#3cc9e1] transition-transform duration-300 group-hover:scale-110">
      {story.type === "audio" && <Headphones size={22} />}
      {story.type === "video" && <Play size={22} />}
      {story.type === "image" && <ImageIcon size={22} />}
     </div>
     
    <div>
          <h3 className="text-lg font-semibold text-[#2f2a26]">
            {story.title}
          </h3>
          <p className="text-sm text-gray-500">
            {story.subtitle}
          </p>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      {story.type === "audio" && (
        <AudioWaveform
          sources={story.media}
          elderMode={story.elderMode}
        />
      )}

      {story.type === "video" && (
        <div className="overflow-hidden rounded-2xl">
          <video
            src={story.media.video}
            controls
            className="
              w-full h-[180px] object-cover
              transition-transform duration-300
              group-hover:scale-[1.03]
            "
          />
        </div>
      )}

      {story.type === "image" && (
        <div className="overflow-hidden rounded-2xl">
          <img
            src={story.media.image}
            alt={story.title}
            className="
              w-full h-[180px] object-cover
              transition-transform duration-300
              group-hover:scale-[1.05]
            "
          />
        </div>
      )}

      {/* ===== FOOTER ===== */}
      <div className="flex items-center justify-between text-sm text-gray-600 pt-2">
        <span>{story.author}</span>
        <span>{story.duration}</span>
      </div>

      <p className="text-sm text-[#3cc9e1] font-medium">
        Linked Twin: {story.linkedTwin}
      </p>
    </div>
  );
}
