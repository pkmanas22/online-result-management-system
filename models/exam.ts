import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  examname: {
    type: String,
    required: true,
    trim: true,
  },
  subjectCode: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  totalMarks: {
    type: Number,
    default: 10,
  },
  year: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export default mongoose.model("exam", examSchema);
