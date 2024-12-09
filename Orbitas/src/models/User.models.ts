// models/User.ts
import mongoose from 'npm:mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: false },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);