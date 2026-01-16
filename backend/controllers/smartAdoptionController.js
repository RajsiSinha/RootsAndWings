import Adoption from '../models/adoption.js'; 
import moment from 'moment'; 

// 1. GET BOOKED DATES: Returns list of days that are already taken
export const getBookedDates = async (req, res) => {
  try {
    // Frontend sends ?month=2023-10
    const { month } = req.query; 
    
    // Define start/end of that month
    const startDate = moment(month).startOf('month');
    const endDate = moment(month).endOf('month');

    // Find all visits in this month
    const visits = await Adoption.find({
      date: { $gte: startDate.toDate(), $lte: endDate.toDate() },
      type: 'visit'
    });

    // Return just the array of days that are booked (e.g., [5, 12, 20])
    const bookedDays = visits.map(v => moment(v.date).date());

    res.json({ bookedDays });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. BOOK A VISIT: Simple endpoint to create a booking
export const bookVisit = async (req, res) => {
  try {
    const { date, userId } = req.body; // Expecting ISO date string

    const newVisit = new Adoption({
      userId, // Ensure you pass this from frontend (or req.user if using auth middleware)
      date: new Date(date),
      type: 'visit'
    });

    await newVisit.save();
    res.status(201).json({ message: "Visit booked successfully", visit: newVisit });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. IMPACT MATH (Kept as is)
export const getImpactRates = (req, res) => {
  const rates = {
    mealCost: 50,      
    supplementCost: 15, 
    educationCost: 200 
  };
  res.json(rates);
};