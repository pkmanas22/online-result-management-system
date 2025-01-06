import mongoose from "mongoose";
const { Schema } = mongoose;
const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  rollNo: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "subject",
    },
  ],
  department: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
  }
});

// Check if the model already exists to prevent overwriting
const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);

export default Student;
