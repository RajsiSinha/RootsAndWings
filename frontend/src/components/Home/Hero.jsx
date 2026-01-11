import React from 'react';
import { Particles } from "@/components/ui/particles";
import img1 from '../../assets/hero_rw1.jpeg';
import img2 from '../../assets/hero_rw2.jpeg';
import img3 from '../../assets/hero_rw3.jpeg';

const Hero = () => {
  const particleColor = "#94a3b8"; 

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50/40 pt-32 pb-20 lg:h-[600px] lg:pt-28 lg:pb-16 flex items-center">

      {/* --- PARTICLES BACKGROUND --- */}
      <Particles
        className="absolute inset-0 z-0 opacity-50"
        quantity={60} 
        ease={80}
        color={particleColor}
        refresh
      />

      {/* --- RESPONSIVE CIRCLE IMAGES (Z-10) --- */}
      {/* MOBILE STRATEGY: 
         - Use corners (Top-Right, Bottom-Left, Bottom-Right) to frame text.
         - Use negative margins (-right-xx) to push them partially off-screen for a subtle look.
      */}

      {/* 1. Circle 1 (Elder) - Mobile: Top Right Corner */}
      <div className="absolute z-10 rounded-full overflow-hidden shadow-xl animate-fade-in-up border-4 border-white
                      /* Mobile: High up in the corner, smaller */
                      top-20 -right-12 w-32 h-32
                      /* Desktop: Original Large Position */
                      lg:top-[-1%] lg:right-[15%] lg:w-[320px] lg:h-[320px] lg:border-[6px]">
        <img src={img1} alt="Elder Teaching Youth" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
      </div>

      {/* 2. Circle 2 (Hands) - Mobile: Bottom Left Corner (Moved from right to balance) */}
      <div className="absolute z-10 rounded-full overflow-hidden shadow-xl animate-fade-in-left delay-100 border-4 border-white
                      /* Mobile: Bottom Left, small */
                      bottom-32 -left-12 w-28 h-28
                      /* Desktop: Middle Right */
                      lg:bottom-auto lg:top-[30%] lg:left-auto lg:right-[-2%] lg:w-[260px] lg:h-[260px] lg:border-[6px]">
        <img src={img2} alt="Community" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
      </div>

      {/* 3. Circle 3 (Child) - Mobile: Bottom Right Corner */}
      <div className="absolute z-10 rounded-full overflow-hidden shadow-xl animate-fade-in-up delay-200 border-4 border-white
                      /* Mobile: Bottom Right, pushed down */
                      -bottom-6 -right-6 w-36 h-36
                      /* Desktop: Bottom Center */
                      lg:bottom-[-5%] lg:right-auto lg:left-[48%] lg:w-[280px] lg:h-[280px] lg:border-[6px]">
        <img src={img3} alt="Happy Child" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
      </div>


      {/* --- CONTENT SECTION (Z-30) --- */}
      <div className="relative z-30 px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl w-full pointer-events-none">
        <div className="w-full md:w-2/3 lg:w-1/2 pointer-events-auto text-center lg:text-left mx-auto lg:mx-0">

          {/* Headline */}
          <h1 className="tracking-tighter leading-tight relative">
            <span className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-800 block mb-2">
              Stability for those <br className="hidden sm:block" /> who raised us,
            </span>
            <span className="font-serif italic font-normal text-4xl sm:text-5xl lg:text-5xl text-cyan-500 block">
              Wings for those <br className="hidden sm:block" /> who will lead us.
            </span>
          </h1>

          <p className="mt-6 font-sans text-sm sm:text-base font-normal leading-relaxed text-slate-600 max-w-md mx-auto lg:mx-0 relative">
            <strong>Roots & Wings</strong> is an integrated sanctuary where elders share wisdom and children find a home.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8 w-full sm:w-auto relative">
            <a href="#adopt" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white transition-all duration-200 bg-cyan-500 rounded-full shadow-md hover:bg-cyan-600 hover:shadow-cyan-500/40 hover:-translate-y-0.5">
              Get Started
            </a>

            <a href="#story" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-slate-700 transition-all duration-200 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:border-cyan-200 hover:text-cyan-600">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M8.0416 4.9192C7.37507 4.51928 6.5271 4.99939 6.5271 5.77669L6.5271 18.2232C6.5271 19.0005 7.37507 19.4806 8.0416 19.0807L18.4137 12.8574C19.061 12.469 19.061 11.5308 18.4137 11.1424L8.0416 4.9192Z" /></svg>
              Watch Story
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}
export default Hero;