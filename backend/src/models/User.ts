import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  displayName: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true,  unique: true},
  phoneNumber: {type: String, required: true, unique: true},
  createdAt: {type: Date, default: Date.now},
  role: {type: String, default: 'user'}
})
const User = mongoose.model('User', UserSchema);
export default User;
