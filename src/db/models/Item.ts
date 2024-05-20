import { Schema, Model, ObjectId } from "mongoose";

const itemSchema = new Schema(
  {
    items: {
      type: String,
    },
    userId: {
      type: Schema.ObjectId,
    },
  },
  { timestamps: true }
);
