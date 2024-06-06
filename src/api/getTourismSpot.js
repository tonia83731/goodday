import axios from 'axios'
import getAuthorizationHeader from './getAuthorizationHeader'
const baseURL = 'https://tdx.transportdata.tw/api/basic'

export const getAllTourisumSpot = async () => {
  try {
    const response = axios.get(`${baseURL}/v2/Tourism/ScenicSpot`, {
      headers: getAuthorizationHeader()
    })
    // console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
// 取得指定縣市觀光景點資料
export const getTourisumspotByCity = async (city) => {
  try {
    const response = axios.get(`${baseURL}/v2/Tourism/ScenicSpot/${city}`, {
      headers: getAuthorizationHeader()
    })
    // console.log(response.data)
    return response
  } catch (error) {
    console.log(error)
  }
}
// 取得指定縣市觀光餐飲資料
export const getTourisumrestByCity = async (city) => {
  try {
    const response = axios.get(`${baseURL}/v2/Tourism/Restaurant/${city}`, {
      headers: getAuthorizationHeader()
    })
    // console.log(response.data)
    return response
  } catch (error) {
    console.log(error)
  }
}
// 取得指定縣市觀光旅宿資料
export const getTourisumhotelByCity = async (city) => {
  try {
    const response = axios.get(`${baseURL}/v2/Tourism/Hotel/${city}`, {
      headers: getAuthorizationHeader()
    })
    // console.log(response.data)
    return response
  } catch (error) {
    console.log(error)
  }
}
// 取得指定縣市觀光活動資料
export const getTourisumactivityByCity = async (city) => {
  try {
    const response = axios.get(`${baseURL}/v2/Tourism/Activity/${city}`, {
      headers: getAuthorizationHeader()
    })
    // console.log(response.data)
    return response
  } catch (error) {
    console.log(error)
  }
}
