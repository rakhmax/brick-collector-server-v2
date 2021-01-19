import { Schema, model } from 'mongoose'

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

schema.set('toJSON', { virtuals: true })

export default model('User', schema)
