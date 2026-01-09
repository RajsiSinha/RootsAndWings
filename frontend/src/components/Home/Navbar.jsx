import React from 'react'
import logo from '../../assets/RootsWingsLogo.png'
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [open, setOpen] = React.useState(false)
  const { openSignIn } = useClerk()
  const { user } = useUser();

  return (
    // Outer container: w-full ensures background spans full width
    <nav className="w-full border-b border-gray-300 bg-white">
      {/* Inner container: Changed max-w-7xl/mx-auto to w-full */}
      <div className="flex w-full items-center justify-between px-6 py-4">
        
        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
          <img src={logo} className="h-10 w-auto object-contain" alt="Roots & Wings" />
          <h1 className="text-xl font-bold tracking-wide font-['Montserrat']">
            <span className="text-[#E67E22]">Roots</span>
            <span className="text-gray-400 mx-1">&</span>
            <span className="text-[#2C7873]">Wings</span>
          </h1>
          
          {user ? (
            <UserButton />
          ) : (
            <button
              onClick={() => openSignIn()}
              className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="sm:hidden">
          <svg width="21" height="15" viewBox="0 0 21 15">
            <rect width="21" height="1.5" rx=".75" fill="#426287" />
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
            <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
          </svg>
        </button>

        {/* Mobile Menu */}
        {open && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-md py-4 px-6 sm:hidden z-50">
            <button 
              onClick={() => openSignIn()}
              className="w-full px-6 py-2 bg-indigo-500 text-white rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;