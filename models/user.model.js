import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['buyer', 'seller'],
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
    phone: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  coordinates: {
    type: {
      lat: Number,
      lng: Number,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})
export const User = mongoose.model("User",UserSchema)