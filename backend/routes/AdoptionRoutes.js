import express from 'express';
import { 
  getBookedDates, 
  bookVisit,
  getImpactRates 
} from '../controllers/smartAdoptionController.js'; 

const router = express.Router();

router.get('/booked-dates', getBookedDates); // GET /api/adoption/booked-dates?month=2023-10
router.post('/book', bookVisit);             // POST /api/adoption/book
router.get('/impact-rates', getImpactRates);

export default router;