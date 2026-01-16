import React, { useState } from 'react';
import { Utensils, Pill, BookOpen, Calculator } from 'lucide-react';

const ImpactMath = () => {
  const [amount, setAmount] = useState('');
  
  // These rates usually come from the API (Part 1, Route 2)
  const rates = { meal: 50, supplement: 15, education: 200 };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mt-6">
      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
        <Calculator className="text-cyan-500" size={20} />
        Impact Calculator
      </h3>

      {/* Input Field */}
      <div className="relative mb-6">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
        <input 
          type="number" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter donation amount..."
          className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 font-bold text-slate-700"
        />
      </div>

      {/* Dynamic Results Grid */}
      {amount > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Meals */}
          <div className="p-3 bg-orange-50 border border-orange-100 rounded-xl flex flex-col items-center text-center">
            <Utensils className="text-orange-500 mb-1" size={20} />
            <span className="text-2xl font-black text-slate-800">
              {Math.floor(amount / rates.meal)}
            </span>
            <span className="text-xs font-bold text-orange-600 uppercase">Meals Funded</span>
          </div>

          {/* Supplements */}
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex flex-col items-center text-center">
            <Pill className="text-blue-500 mb-1" size={20} />
            <span className="text-2xl font-black text-slate-800">
              {Math.floor(amount / rates.supplement)}
            </span>
            <span className="text-xs font-bold text-blue-600 uppercase">Calcium Tabs</span>
          </div>

          {/* Education */}
          <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl flex flex-col items-center text-center">
            <BookOpen className="text-purple-500 mb-1" size={20} />
            <span className="text-2xl font-black text-slate-800">
              {Math.floor(amount / rates.education)}
            </span>
            <span className="text-xs font-bold text-purple-600 uppercase">Books Gifted</span>
          </div>
        </div>
      ) : (
        <div className="text-center text-slate-400 text-sm py-4 italic">
          Enter an amount to see the magic.
        </div>
      )}
    </div>
  );
};

export default ImpactMath;