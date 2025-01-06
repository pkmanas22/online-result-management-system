import mongoose from "mongoose";
const { Schema } = mongoose;
const subjectSchema = new Schema({
  subjectName: {
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
  }
});

// Check if the model already exists to prevent overwriting
const Subject = mongoose.models.Subject || mongoose.model("Subject", subjectSchema);

export default Subject;
