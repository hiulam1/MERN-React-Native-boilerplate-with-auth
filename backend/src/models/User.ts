import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    // displayName: {type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;
