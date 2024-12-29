// models/User.ts
import mongoose from 'npm:mongoose';


// mongoose automaticly convert model User to schme Users
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true }, 
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true }, 
  age: { type: Number, required: true },
  password: { type: String, required: true }, 
  bio: { type: String ,  required: true},
  tags: [{ type: String , required: true }], // Defined as an array of strings
  country: { type: String ,  required: true },
  language: { type: String ,  required: true },
  avatarUrl: { type: String  , required: true },
  linkedin: { type: String , required: true } , 
  website :  { type: String , required: true } , 
  repositoryUser : { type: String , required: true },
  lastLogin: { type: Date , required: true } ,
  theme: { type: String, enum: ['light', 'dark', 'custom'], default: 'light' } ,
  verified : { type: Boolean ,  required: true },
  emailVisibility : { type: Boolean ,  required: true },
}, { 
  timestamps: true // This option automatically creates createdAt and updatedAt fields
});

export const User = mongoose.model('User', userSchema);