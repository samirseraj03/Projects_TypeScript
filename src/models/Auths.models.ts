import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resetToken: { type: String, required: true },
  expiresAt: { type: Date, required: true }, // Expiración del token
});

export const Auth = mongoose.model('Auth', authSchema);

