import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required : true
  },
  department: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
  },
  passwordUpdated: {
    type: Boolean,
    default: false,
  },
});

const Faculty = mongoose.models.Faculty || mongoose.model("Faculty", facultySchema);

export default Faculty;
