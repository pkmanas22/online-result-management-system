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
    },
    contactNumber: {
      type: Number,
    }
  },
  { strict: false }
);

export default mongoose.model("admin", adminSchema);
