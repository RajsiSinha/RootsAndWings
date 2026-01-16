import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const SmartSuggestion = () => {
  return (
    <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-200 relative overflow-hidden">
      
      {/* Background Gradient Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="text-cyan-400 fill-cyan-400" size={24} />
        <h3 className="text-xl font-bold tracking-wide">Smart Suggestion</h3>
      </div>

      {/* Main Info Card */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 mb-6">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Best time to visit</p>
        <h2 className="text-2xl font-bold text-white mb-1">Friday, Oct 6th</h2>
        <p className="text-cyan-400 font-medium text-sm">Between 2:00 PM - 5:00 PM</p>
      </div>

      {/* Insight Text */}
      <div className="space-y-4 mb-8">
        <p className="text-slate-300 text-sm leading-relaxed">
          Resident group <span className="font-bold text-white">"Orchard Wing"</span> has had 
          <span className="text-red-300 font-semibold"> 60% fewer visits</span> this week. 
          Your presence would make the greatest impact here.
        </p>

        {/* Progress Bar */}
        <div>
           <div className="flex justify-between text-xs font-bold mb-2">
             <span className="text-cyan-400">Impact Forecast</span>
             <span className="text-white">85% Reduction in Loneliness</span>
           </div>
           <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
             <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 w-[85%] rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
           </div>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-[#3cc9e1] hover:bg-[#35b5cc] text-slate-900 font-extrabold text-base py-4 rounded-xl shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
        Confirm Best Time
        <ArrowRight size={18} className="text-slate-800" />
      </button>

    </div>
  );
};

export default SmartSuggestion;