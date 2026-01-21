
import React, { useState } from "react";
import StoryCard from "./StoryCard";
import { storiesData } from "./storiesData";

export default function ImpactStories() {
  const [filter, setFilter] = useState("all");

  const filteredStories =
    filter === "all"
      ? storiesData
      : storiesData.filter((s) => s.type === filter);

  return (
    <div
      className="min-h-screen bg-gradient-to-br
                 from-[#f9faf8] via-white to-[#eef7f4]
                 px-6 py-14"
    >

      {/* HEADER */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-[#3cc9e1] font-semibold">
          Roots of Love
        </span>

        <h1 className="mt-3 text-4xl md:text-5xl font-bold text-[#2f2a26]">
          Impact Stories
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Voices, moments and memories shared by elders and children —
          experienced through sound and sight.
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex justify-center gap-3 mb-14 flex-wrap">
        {["all", "audio", "video", "image"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition
              ${
                filter === type
                  ? "bg-[#3cc9e1] text-white"
                  : "bg-white border text-gray-600 hover:bg-[#eef7f4]"
              }`}
          >
            {type === "all"
              ? "All Stories"
              : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* STORIES GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>

      {/* CTA */}
      <div
        className="max-w-5xl mx-auto mt-24
                   bg-gradient-to-br from-[#3cc9e1] to-[#5a8c76]
                   rounded-3xl p-10 text-white text-center shadow-lg"
      >
        <h2 className="text-3xl font-bold">
          Your kindness is growing roots.
        </h2>

        <p className="mt-4 text-white/90 max-w-xl mx-auto">
          Each day you adopt becomes someone’s memory,
          someone’s peace, someone’s hope.
        </p>

        <button
          className="mt-6 bg-white text-[#2f2a26]
                     px-8 py-3 rounded-xl font-semibold
                     hover:scale-105 transition"
        >
          Create More Impact
        </button>
      </div>
    </div>
  );
}
