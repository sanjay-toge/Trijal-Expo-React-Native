import axios from 'axios'
import { apiUrl, defaultAvatar } from '../config'
// Replace with your API URL
const API_URL = `${apiUrl}Users/register`

export const register = async (data) => {
  // console.log(apiUrl, defaultAvatar)
  // return API_URL;
  try {
    console.log(data)
    const response = await axios.post(API_URL, data, {
      'ngrok-skip-browser-warning': 'true',
    })
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error // Optional: re-throw the error for handling
  }
}
