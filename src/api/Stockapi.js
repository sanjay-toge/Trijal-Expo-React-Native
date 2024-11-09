import axios from 'axios'
import { apiUrl, defaultAvatar } from '../config'
// Replace with your API URL

export const stock = async (data) => {
  // console.log(apiUrl, defaultAvatar)
  // return API_URL;
  try {
    console.log(data)
    const response = await axios.post(`${apiUrl}api/Stocks/recommendation`, data, {
      'ngrok-skip-browser-warning': 'true',
    })
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error // Optional: re-throw the error for handling
  }
}
