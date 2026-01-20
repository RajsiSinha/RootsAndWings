// src/components/SmartAdoption/BookingModal.jsx
import React, { useState } from 'react';
import { X, Calendar as CalIcon, Loader2 } from 'lucide-react';
import { bookVisit } from '../../api/adoption'; // <--- IMPORT HERE

const BookingModal = ({ date, userId, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBook = async () => {
    if (!userId) {
      setError("You must be logged in to book a visit.");
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Use the new API function
      await bookVisit(date.toISOString(), userId);
      
      onSuccess(); // Trigger parent refresh
      onClose();   // Close modal
    } catch (err) {
      setError(err.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... (UI remains exactly the same as the previous response) ...
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            {/* ...Header... */}
            
            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                    {error}
                </div>
            )}

            {/* ...Buttons... */}
             <button 
                onClick={handleBook}
                disabled={loading}
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-bold"
             >
                {loading ? <Loader2 className="animate-spin mx-auto" /> : "Confirm Booking"}
             </button>
        </div>
    </div>
  );
};

export default BookingModal;