import { Schema, model, Types } from 'mongoose'

const schema = new Schema({
  itemId: {
    type: String,
    required: true
  },
  userId: {
    type: Types.ObjectId,
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
  year: {
    type: Number,
    required: true
  },
  image: String,
  thumbnail: String,
  inWishlist: Boolean,
  minifigures: Array,
  price: Number,
  comment: String,
  sealed: Boolean,
  qty: Number
})

schema.index({ itemId: 1, userId: 1 }, { unique: true })

schema.set('toJSON', { virtuals: true })

export default model('Set', schema)
