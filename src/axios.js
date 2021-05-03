import axios from 'axios'
import {
  BRICKSET_API_KEY,
  BRICKSET_API_URL
} from './config'

const http = axios.create({
  baseURL: BRICKSET_API_URL,
  params: {
    apiKey: BRICKSET_API_KEY
  }
})

export default http
