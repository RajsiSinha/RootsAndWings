// src/components/SmartAdoption/Calendar.jsx
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { getBookedDates } from '../../api/adoption';
import BookingModal from './BookingModal';
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, 
  isSameDay, isBefore, getDate, isValid 
} from 'date-fns';
import { ChevronLeft, ChevronRight, Loader2, RefreshCw } from 'lucide-react';

const Calendar = () => {
  const { user } = useUser();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookedDays, setBookedDays] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // 1. FETCH DATES
  const fetchDates = async () => {
    setLoading(true);
    setApiError(false);
    try {
      const monthStr = format(currentDate, 'yyyy-MM'); 
      const data = await getBookedDates(monthStr);
      if (data && Array.isArray(data.bookedDays)) {
        setBookedDays(data.bookedDays);
      } else {
        setBookedDays([]);
      }
    } catch (error) {
      console.error("Failed to load calendar data", error);
      setApiError(true);
      setBookedDays([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDates();
  }, [currentDate]);

  // 2. Navigation Handlers
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // 3. Status Logic
  const getDayStatus = (day) => {
    if (!isSameMonth(day, currentDate)) return 'disabled';
    const today = new Date();
    if (isBefore(day, today) && !isSameDay(day, today)) return 'past';
    const dayNum = getDate(day);
    if (bookedDays.includes(dayNum)) return 'booked';
    return 'available';
  };

  const handleDayClick = (day, status) => {
    if (status === 'available') setSelectedDate(day);
  };

  // 4. Grid Generation
  let calendarDays = [];
  if (isValid(currentDate)) {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    calendarDays = eachDayOfInterval({ 
      start: startOfWeek(monthStart), 
      end: endOfWeek(monthEnd) 
    });
  }

  return (
    // CONTAINER: max-w-lg for bigger size, p-8 for spacious look
    <div className="bg-white p-8 rounded-[40px] shadow-xl shadow-slate-200/60 border border-slate-100 relative flex flex-col w-full max-w-lg mx-auto transition-all duration-300 hover:shadow-2xl">
      
      {/* --- Loading Overlay --- */}
      {loading && (
        <div className="absolute inset-0 bg-white/80 z-20 flex items-center justify-center rounded-[40px] backdrop-blur-[2px]">
          <Loader2 className="animate-spin text-cyan-500" size={40} />
        </div>
      )}

      {/* --- Error State --- */}
      {apiError && !loading && (
        <div className="absolute top-6 right-6 z-30">
           <button onClick={fetchDates} className="bg-red-50 text-red-500 p-2 rounded-full hover:bg-red-100 transition shadow-sm" title="Retry Connection">
             <RefreshCw size={18} />
           </button>
        </div>
      )}

      {/* --- Header --- */}
      <div className="flex items-center justify-between mb-8">
        {/* Left Arrow */}
        <button onClick={prevMonth} className="p-3 bg-slate-50 hover:bg-cyan-50 rounded-full transition-colors text-slate-500 hover:text-cyan-600 group">
            <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
          {isValid(currentDate) ? format(currentDate, 'MMMM yyyy') : 'Invalid'}
        </h2>

        {/* Right Arrow */}
        <button onClick={nextMonth} className="p-3 bg-slate-50 hover:bg-cyan-50 rounded-full transition-colors text-slate-500 hover:text-cyan-600 group">
            <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* --- Days Header --- */}
      <div className="grid grid-cols-7 mb-4">
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
          <div key={day} className="text-center text-xs font-bold text-slate-400 tracking-widest uppercase">
            {day}
          </div>
        ))}
      </div>
      
      {/* --- Calendar Grid --- */}
      <div className="grid grid-cols-7 gap-y-4 gap-x-2 place-items-center">
        {calendarDays.map((day, idx) => {
          const status = getDayStatus(day);
          
          // Base Circle Style
          let cellClasses = "h-12 w-12 flex items-center justify-center rounded-full text-base font-bold transition-all duration-300 relative cursor-pointer ";

          if (status === 'disabled') {
            cellClasses += "opacity-0 pointer-events-none"; 
          } else if (status === 'past') {
            cellClasses += "text-slate-300 bg-transparent cursor-not-allowed decoration-slate-300 line-through decoration-2";
          } else if (status === 'booked') {
            // Booked: Grayed out/Subtle
            cellClasses += "bg-slate-100 text-slate-400 cursor-not-allowed";
          } else {
            // AVAILABLE: Blue Theme
            // Default: Light Blue bg, Dark Text. Hover: Solid Blue bg, White Text.
            cellClasses += "bg-cyan-50 text-cyan-700 hover:bg-cyan-500 hover:text-white hover:shadow-lg hover:shadow-cyan-200 hover:scale-110 active:scale-95";
          }

          return (
            <div 
              key={idx} 
              className={cellClasses}
              onClick={() => handleDayClick(day, status)}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>

      {/* --- Footer Legend --- */}
      <div className="mt-10 flex items-center justify-center gap-8 border-t border-slate-100 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-slate-200"></div>
            <span className="text-sm font-bold text-slate-500">Booked</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-cyan-100 border-2 border-cyan-500"></div>
            <span className="text-sm font-bold text-slate-500">Available</span>
          </div>
      </div>

      {/* --- Booking Modal Integration --- */}
      {selectedDate && (
        <BookingModal 
          date={selectedDate} 
          userId={user?.id} 
          onClose={() => setSelectedDate(null)}
          onSuccess={() => fetchDates()}
        />
      )}
    </div>
  );
};

export default Calendar;