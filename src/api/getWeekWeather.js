import axios from 'axios'
const dataId = import.meta.env.VITE_WEEK_WEATHER_ID
const key = import.meta.env.VITE_WEATHER_APIKEY
export const getWeekWeather = async (locationName) => {
  try {
    const res = axios.get(
      `https://opendata.cwa.gov.tw/api/v1/rest/datastore/${dataId}?Authorization=${key}&locationName=${locationName}&elementName=Wx&elementName=PoP12h&elementName=MaxT&elementName=MinT`
    )
    return res
  } catch (error) {
    console.log(error)
  }
}
