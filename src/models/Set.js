import { Schema, model } from 'mongoose'

const schema = new Schema({
  itemId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
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

schema.index({ itemId: 1, userId: 1 }, { unique: true })

schema.set('toJSON', { virtuals: true })

export default model('Set', schema)
