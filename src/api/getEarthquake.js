import axios from 'axios'
const dataId = import.meta.env.VITE_EARTHQUAKE_ID
const key = import.meta.env.VITE_WEATHER_APIKEY
export const getEarthquake = async (timefrom) => {
  try {
    const res = await axios.get(
      `https://opendata.cwa.gov.tw/api/v1/rest/datastore/${dataId}?Authorization=${key}&timeFrom=${timefrom}`
    )
    return res?.data.records.Earthquake
  } catch (error) {
    console.log(error)
  }
}
