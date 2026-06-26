import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://retail-analytics-dashboard-75ds.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default axiosClient
