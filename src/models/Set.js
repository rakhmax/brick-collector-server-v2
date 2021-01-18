import { Schema, model } from 'mongoose'

const schema = new Schema({
  itemId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  categoryId: {
    type: Number,
    required: true
  },
  image: {
    type: Object,
    of: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  minifigures: Array,
  price: Number,
  comment: String,
  sealed: Boolean,
  pieces: Number,
  extraPieces: Number,
  qty: Number
}, { versionKey: false })

schema.set('toJSON', { virtuals: true });

const SetModel = (accessString) => {
  return model(`s${accessString}`, schema)
}

export default SetModel;
