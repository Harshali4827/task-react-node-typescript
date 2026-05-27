import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    phoneNumber: String,
    dateOfBirth: String,
    gender: String,
    address: String,
    courseEnrolled: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Student", studentSchema);