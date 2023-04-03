import mongoose from "mongoose";

const { Schema, model } = mongoose;

const crudSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Crud", crudSchema);
