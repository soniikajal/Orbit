// models/User.ts
import mongoose, { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'user' }, // 'admin' or 'user'
  lastLogin: { type: Date, default: Date.now },
}, {
  timestamps: true
})

export default models.User || model('User', UserSchema)
