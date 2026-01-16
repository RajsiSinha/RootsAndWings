import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle, Sparkles, Filter, Users } from 'lucide-react';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState('October 2023');

  // Mock data to match the image exactly
  const days = [
    { date: 1, status: 'default' },
    { date: 2, status: 'high_need', label: 'NO VISITS IN 21 DAYS' },
    { date: 3, status: 'default' },
    { date: 4, status: 'scheduled', label: '3 VISITS BOOKED' },
    { date: 5, status: 'default' },
    { date: 6, status: 'recommended', label: 'RECOMMENDED' },
    { date: 7, status: 'default' },
    { date: 8, status: 'default' },
    { date: 9, status: 'default' },
    { date: 10, status: 'default' },
    { date: 11, status: 'default' },
    { date: 12, status: 'default' },
    { date: 13, status: 'high_need', label: 'NO VISITS IN 14 DAYS' },
    { date: 14, status: 'default' },
    { date: 15, status: 'default' },
    { date: 16, status: 'default' },
    { date: 17, status: 'default' },
    { date: 18, status: 'default' },
    { date: 19, status: 'default' },
    { date: 20, status: 'default' },
    { date: 21, status: 'default' },
    // ... fill rest as needed
  ];

  // Helper to render cell content based on status
  const renderCellContent = (day) => {
    if (day.status === 'high_need') {
      return (
        <div className="flex flex-col h-full justify-between">
          <span className="text-slate-500 font-medium">{day.date}</span>
          <div className="bg-red-100/50 p-1.5 rounded text-[10px] font-bold text-red-600 leading-tight flex items-start gap-1">
            <AlertCircle size={10} className="mt-0.5 shrink-0" />
            {day.label}
          </div>
        </div>
      );
    }
    if (day.status === 'scheduled') {
      return (
        <div className="flex flex-col h-full justify-between">
          <span className="text-slate-500 font-medium">{day.date}</span>
          <div className="bg-cyan-100/50 p-1.5 rounded text-[10px] font-bold text-cyan-700 leading-tight">
            {day.label}
          </div>
        </div>
      );
    }
    if (day.status === 'recommended') {
      return (
        <div className="relative flex flex-col h-full justify-between z-10">
          <span className="text-cyan-600 font-bold">{day.date}</span>
          <div className="mt-auto">
             <div className="bg-cyan-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm inline-block mb-1">
               {day.label}
             </div>
             <Sparkles className="text-cyan-400 absolute bottom-1 right-1 fill-cyan-400" size={16} />
          </div>
        </div>
      );
    }
    return <span className="text-slate-500 font-medium">{day.date}</span>;
  };

  // Helper for cell styling
  const getCellClasses = (status) => {
    const base = "h-28 border border-slate-100 p-2 relative transition-all hover:bg-slate-50";
    switch (status) {
      case 'high_need': return `${base} bg-red-50/30`;
      case 'scheduled': return `${base} bg-cyan-50/20`;
      case 'recommended': return `${base} bg-white ring-2 ring-cyan-400 shadow-lg shadow-cyan-100 z-10 rounded-lg border-transparent`;
      default: return `${base} bg-white`;
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
      
      {/* --- Controls Header --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 bg-white">
                <Filter size={16} /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-cyan-400 text-white rounded-lg font-bold hover:bg-cyan-500 shadow-md shadow-cyan-200">
                <Users size={16} /> View All Residents
            </button>
        </div>
      </div>

      {/* --- Calendar Header --- */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-800">{currentMonth}</h2>
          <div className="flex gap-1">
            <button className="p-1 hover:bg-slate-100 rounded"><ChevronLeft size={20} className="text-slate-400" /></button>
            <button className="p-1 hover:bg-slate-100 rounded"><ChevronRight size={20} className="text-slate-400" /></button>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-red-100 border border-red-200"></div> High Need</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-cyan-100 border border-cyan-200"></div> Scheduled</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-slate-100 border border-slate-200"></div> Available</div>
        </div>
      </div>

      {/* --- Grid --- */}
      <div className="grid grid-cols-7 mb-2">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
          <div key={day} className="text-center text-xs font-bold text-slate-400 py-2">{day}</div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-0 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden">
        {/* Empty cells for previous month (Mon, Tue) assuming Month starts Wed */}
        <div className="h-28 bg-slate-50/50 border border-slate-100"></div>
        <div className="h-28 bg-slate-50/50 border border-slate-100"></div>
        
        {days.map((day) => (
          <div key={day.date} className={getCellClasses(day.status)}>
            {renderCellContent(day)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;