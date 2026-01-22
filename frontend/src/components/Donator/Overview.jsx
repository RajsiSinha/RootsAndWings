import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

export default function Overview() {
  const [greeting, setGreeting] = useState('');
  const user = { name: "Ananya", totalDonated: 24500 }; 

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const upcomingEvents = [
    { id: 1, child: "Rahul S.", type: "Physical Visit", date: "22", month: "JAN", time: "10:30 AM", wing: "Orchard" },
    { id: 2, child: "Maya K.", type: "Virtual Meet", date: "28", month: "JAN", time: "04:00 PM", wing: "Video" },
    { id: 3, child: "Ishan G.", type: "Art Session", date: "05", month: "FEB", time: "11:00 AM", wing: "Creative" },
    { id: 4, child: "Sara V.", type: "Garden Tour", date: "12", month: "FEB", time: "09:00 AM", wing: "Green" },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:h-screen lg:overflow-hidden bg-[#FDFCFB] font-['Manrope'] text-[#0F172A]">
      <Sidebar />

      <main className="flex-1 flex flex-col p-6 lg:p-10 overflow-hidden">
        <div className="max-w-[1600px] w-full mx-auto flex flex-col h-full gap-6 lg:gap-8">
          
          {/* HEADER SECTION */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shrink-0">
            <div className="space-y-1">
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-[#3cc9e1]">Live Connection Hub</p>
              <h2 className="text-3xl lg:text-4xl font-light text-[#1E293B]">
                {greeting}, <span className="font-black text-[#1A4D48]">{user.name}</span>
              </h2>
            </div>
            
            <div className="flex gap-8 bg-white px-8 py-5 rounded-[2.5rem] border border-[#E2E8F0] shadow-sm">
              <HeaderStat label="Donation Streak" value="6 Months" />
              <div className="w-[1px] h-8 bg-[#F1F5F9]" />
              <HeaderStat label="Lives Impacted" value="42 Souls" color="text-[#3cc9e1]" />
              <div className="w-[1px] h-8 bg-[#F1F5F9]" />
              <HeaderStat label="Total Impact" value={`₹${user.totalDonated.toLocaleString()}`} />
            </div>
          </header>

          <div className="grid grid-cols-12 gap-6 lg:gap-8 flex-1 min-h-0">
            
            {/* LEFT COLUMN: Engagements & Allocation */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 lg:gap-8 min-h-0">
              
              {/* 1. CONFIRMED ENGAGEMENT (Horizontal Scroll) */}
              <div className="flex-[1.2] flex flex-col min-h-0">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#64748B] mb-4 px-2">Upcoming Engagements</h3>
                
                {/* Scroll Container: Shows 2 items completely on desktop */}
                <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory flex-1">
                  {upcomingEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="min-w-[85%] md:min-w-[48.5%] snap-start bg-white rounded-[2.5rem] p-7 border border-[#F1F5F9] shadow-sm flex items-center gap-6 hover:border-[#3cc9e1]/40 transition-all group shrink-0"
                    >
                      <div className="flex flex-col items-center justify-center bg-[#1A4D48] text-white size-24 rounded-[2rem] shrink-0 group-hover:bg-[#3cc9e1] transition-colors duration-500 shadow-lg shadow-[#1A4D48]/10">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-70">{event.month}</span>
                        <span className="text-4xl font-black leading-none">{event.date}</span>
                      </div>
                      <div className="space-y-2 truncate">
                        <span className="bg-[#FFF7ED] text-[#EA580C] text-[9px] font-black px-3 py-1 rounded-full uppercase border border-[#FFEDD5]">
                          {event.time}
                        </span>
                        <h4 className="text-xl lg:text-2xl font-black text-[#1E293B] leading-tight">
                          Meeting <span className="text-[#3cc9e1]">{event.child}</span>
                        </h4>
                        <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">{event.wing} Wing</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. FUND ALLOCATION (Remains as requested) */}
              <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
                <div className="flex justify-between items-end mb-4 px-2">
                   <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#64748B]">Fund Allocation</h3>
                   <span className="text-[10px] font-black text-[#1A4D48] bg-[#F1F5F9] px-4 py-1.5 rounded-full uppercase">
                     Total Budget: ₹{user.totalDonated.toLocaleString()}
                   </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-y-auto no-scrollbar pb-2">
                  <ImpactBox label="Nutrition" value="45%" amount="₹11,025" color="bg-[#1A4D48]" desc="Organic daily meals for residents." />
                  <ImpactBox label="Education" value="30%" amount="₹7,350" color="bg-[#3cc9e1]" desc="School supplies and tutor fees." />
                  <ImpactBox label="Healthcare" value="25%" amount="₹6,125" color="bg-[#EA580C]" desc="Regular checkups and vaccines." />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: IMPACT STORIES (Vertical Scroll with Visible Scrollbar) */}
            <div className="col-span-12 lg:col-span-4 flex flex-col min-h-0 bg-[#F8FAFC] rounded-[3.5rem] p-8 lg:p-10 border border-[#F1F5F9] shadow-sm">
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#64748B] mb-8 shrink-0">Impact Feed</h3>
              <div className="flex-1 overflow-y-auto pr-4 space-y-10">
                <StoryItem title="First Day of Art School" name="Rahul S." date="Jan 18" />
                <StoryItem title="Math Quiz Excellence" name="Maya K." date="Jan 15" />
                <StoryItem title="New Library Arrival" name="Community" date="Jan 12" />
                <StoryItem title="Garden Harvest Day" name="Community" date="Jan 05" />
                <StoryItem title="Weekly Health Assessment" name="Admin" date="Jan 02" />
                <StoryItem title="Winter Clothing Drive" name="System" date="Dec 28" />
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Logic to hide scrollbars for allocation section ONLY */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

// Sub-components
function HeaderStat({ label, value, color = "text-[#1A4D48]" }) {
  return (
    <div className="text-center">
      <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-base font-black ${color} tracking-tight`}>{value}</p>
    </div>
  );
}

function ImpactBox({ label, value, amount, color, desc }) {
  return (
    <div className="bg-white p-7 rounded-[2.5rem] border border-[#F1F5F9] flex flex-col justify-between hover:border-[#3cc9e1]/40 transition-all shadow-sm">
      <div>
        <div className={`size-2.5 ${color} rounded-full mb-4 shadow-sm`} />
        <h4 className="text-[11px] font-black uppercase tracking-widest text-[#94A3B8] mb-1">{label}</h4>
        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-black text-[#1E293B]">{value}</p>
          <p className="text-xs font-black text-[#3cc9e1]">{amount}</p>
        </div>
      </div>
      <p className="text-[10px] font-bold text-[#64748B] leading-relaxed mt-4">{desc}</p>
    </div>
  );
}

function StoryItem({ title, name, date }) {
  return (
    <div className="group cursor-pointer">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[9px] font-black text-[#3cc9e1] uppercase tracking-widest">{name}</span>
        <span className="text-[9px] font-bold text-[#CBD5E1] uppercase">{date}</span>
      </div>
      <h4 className="text-lg font-black text-[#1E293B] group-hover:text-[#1A4D48] transition-colors leading-tight">{title}</h4>
      <div className="mt-4 h-[1px] w-8 bg-[#F1F5F9] group-hover:w-full group-hover:bg-[#3cc9e1]/20 transition-all duration-500" />
    </div>
  );
}