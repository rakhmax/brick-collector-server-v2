import { Schema, model } from 'mongoose'

const schema = new Schema({
  refreshToken: {
    type: String,
    required: true
  }
})

schema.set('toJSON', { virtuals: true })

export default model('Token', schema)
