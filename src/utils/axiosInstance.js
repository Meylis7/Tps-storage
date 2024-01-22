import axios from 'axios'
import { token } from './index'

const BASE_URL = 'http://216.250.8.93:8092/'
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 100000,

  headers: {
    Authorization: 'Bearer ' + token(),
    "Accept": "application/json",
    'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
    // Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwibmFtZSI6IktlcmltIiwiaWF0IjoxNjE2NDUwNjU3fQ.v8iyHYmwNlKVhLUA7LzxybICB8zzbVjRyXeFZbV7IPw'
  }
})
export { BASE_URL, axiosInstance }