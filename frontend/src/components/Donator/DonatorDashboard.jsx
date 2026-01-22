import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/clerk-react";
import Sidebar from './Sidebar';
import StatCard from './StatCard';
import AdoptedDays from './AdoptedDays';
import MonthlyContributions from './MonthlyContributions';
import MealsFunded from './MealsFunded';
import SaplingLevel from './Saplinglevel';
import MoneyBreakdown from './MoneyBreakdown';
import { getUserAdoptions } from '../../api/adoption';
import { format } from 'date-fns';

export default function DonatorDashboard() {
  const { user } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdoptions = async () => {
      if (user) {
        try {
          const data = await getUserAdoptions(user.id);
          setAdoptions(data);
        } catch (err) {
          console.error("Failed to fetch adoptions", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchAdoptions();
  }, [user]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f9f8f4] font-['Manrope'] text-[#2d312f] relative">

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 overflow-y-auto pb-12">
        <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[#3cc9e1]]">
              <span className="material-symbols-outlined font-bold">eco</span>
              <span className="font-extrabold tracking-tight">Roots of Love</span>
            </div>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 bg-white rounded-xl shadow-sm border border-[#e8e4db]"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>

          <header className="space-y-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-black text-[#7d6e63]">
                Good Morning, {user?.firstName || 'Priya'} 👋
              </h2>
              <p className="text-[#3cc9e1]] text-lg font-medium">Your kindness is changing lives.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard icon="payments" label="Total Donated" value={`₹${adoptions.length * 5000}`} />
              <StatCard icon="event_available" label="Visits Booked" value={adoptions.length} />
              <StatCard icon="restaurant" label="Meals Funded" value={adoptions.length * 50} />
              <StatCard icon="volunteer_activism" label="Volunteer Hours" value="18" />
            </div>
          </header>

          {/* New Section: Your Bookings */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#e8e4db]">
            <h3 className="text-xl font-bold text-[#7d6e63] mb-4">Your Recent Impact</h3>
            {loading ? (
              <p>Loading your impact...</p>
            ) : adoptions.length === 0 ? (
              <p className="text-gray-500">You haven't made any bookings yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100 text-sm text-gray-400">
                      <th className="py-2">Date</th>
                      <th className="py-2">Type</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adoptions.map((item) => (
                      <tr key={item._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                        <td className="py-3 font-medium text-[#2d312f]">
                          {format(new Date(item.date), 'MMMM dd, yyyy')}
                        </td>
                        <td className="py-3 capitalize text-[#3cc9e1]">
                          <span className="bg-[#e0f7fa] px-2 py-1 rounded text-xs font-bold">{item.type}</span>
                        </td>
                        <td className="py-3 text-green-600 text-sm">
                          Confirmed
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* 12-Column Layout */}
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 space-y-8">
              <AdoptedDays />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <MonthlyContributions />
                <MealsFunded />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 space-y-8">
              <SaplingLevel />
              <MoneyBreakdown />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}