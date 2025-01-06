import mongoose from "mongoose";
const { Schema } = mongoose;

const marksSchema = new Schema({
  examId: {
    type: Schema.Types.ObjectId,
    ref: "exam",
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "student",
  },
  securedMarks: {
    type: Number,
    default: 0,
  },
});

const Mark = mongoose.models.Mark || mongoose.model("Mark", marksSchema);

export default Mark;
