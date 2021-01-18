import { connect } from 'mongoose'
import app from './app'
import { MONGO_URI, PORT } from './config'

export default async () => {
  try {
    await connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })

    console.clear()
    app.listen(PORT, () => console.log(`Server is running in http://localhost:${PORT}`))
  } catch (error) {
    console.error('Unable to connect to database\n')
    console.error(error)
    process.exit(1)
  }
}
