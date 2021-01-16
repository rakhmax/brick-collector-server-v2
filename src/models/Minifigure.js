import { Schema, model } from 'mongoose'

const schema = new Schema({
  itemId: {
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
  price: Number,
  comment: String
}, { versionKey: false })

schema.set('toJSON', { virtuals: true })

const MinifigureModel = (accessString) => {
  return model(`mf${accessString}`, schema)
}

export default MinifigureModel
