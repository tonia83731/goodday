import axios from 'axios'
const dataId = import.meta.env.VITE_36HRS_ID
const key = import.meta.env.VITE_WEATHER_APIKEY
// console.log(key, dataId)
export const getCurrentWeather = async (locationName) => {
  try {
    const res = await axios.get(
      `https://opendata.cwa.gov.tw/api/v1/rest/datastore/${dataId}?Authorization=${key}&locationName=${locationName}`
    )
    return res?.data.records.location
  } catch (error) {
    console.log(error)
  }
}
