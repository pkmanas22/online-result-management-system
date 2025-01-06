import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
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
    contactNumber: {
      type: Number,
    }
  },
  { strict: false }
);

// Check if the model already exists to prevent overwriting
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;
