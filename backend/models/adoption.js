import mongoose from 'mongoose';

const adoptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true },
  type: { type: String, enum: ['visit', 'donation'], default: 'visit' },
  amount: { type: Number, default: 0 } 
});

export default mongoose.model('Adoption', adoptionSchema);