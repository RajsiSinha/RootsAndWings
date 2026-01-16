import React from 'react'
import Calendar from '@/components/SmartAdoption/Calender'
import SmartSuggestion from '@/components/SmartAdoption/SmartSuggestion'

export default function SmartAdoption() {
  return (
    // Page Container with background color
    <div className="min-h-screen bg-[#f8fcfc] p-4 md:p-8 font-['Manrope']">
      
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- Header Section (Matches Reference) --- */}
        <div className="space-y-2">
           <div className="text-sm text-slate-500 font-medium">Home &gt; Smart Adoption Calendar</div>
           <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
             Schedule Meaningful Time
           </h1>
           <p className="text-slate-600 max-w-2xl text-lg">
             Our AI analyzes companionship gaps to ensure every resident feels seen and heard.
           </p>
        </div>

        {/* --- Main Layout Grid --- */}
        <div className="flex flex-col xl:flex-row gap-8 items-start">
            
            {/* Left Side: Calendar (Takes remaining space) */}
            <div className="flex-1 w-full">
                <Calendar/>
            </div>

            {/* Right Side: Suggestion Sidebar (Fixed width on large screens) */}
            <div className="w-full xl:w-[400px] shrink-0 space-y-6">
                <SmartSuggestion/>
                
                {/* Placeholder for the "Community Impact" card seen in reference image (Optional) */}
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                        <span className="material-symbols-outlined text-yellow-500">verified</span>
                        Community Impact
                    </h4>
                    <div className="mt-4 flex items-center gap-4">
                        <div className="p-3 bg-cyan-50 rounded-full text-cyan-600 font-bold text-xl">422</div>
                        <div className="text-sm text-slate-500 font-medium">Smiles Delivered <br/> this month</div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  )
}