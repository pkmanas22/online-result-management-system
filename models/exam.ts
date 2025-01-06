import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  totalMarks: {
    type: Number,
    default: 100,
  },
  date: {
    type: String,
    required: true,
  },
});

const Exam = mongoose.models.Exam || mongoose.model("Exam", examSchema);

export default Exam;
