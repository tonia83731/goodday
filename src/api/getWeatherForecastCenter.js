import axios from 'axios'
const dataIdwithPeople = import.meta.env.VITE_WEATHER_CENTER_PEOPLE
const dataIdnoPeople = import.meta.env.VITE_WEATHER_CENTER_PEOPLE
const key = import.meta.env.VITE_WEATHER_APIKEY

export const getWeatherCenterWithPeople = async () => {
  try {
    const res = await axios.get(
      `https://opendata.cwa.gov.tw/api/v1/rest/datastore/${dataIdwithPeople}?Authorization=${key}&status=%E7%8F%BE%E5%AD%98%E6%B8%AC%E7%AB%99`
    )
    const data = res?.data.records.data.stationStatus.station
    const result = data.map((item) => {
      return {
        stationName: item.StationName,
        stationID: item.StationID,
        countyName: item.CountyName
      }
    })
    return result
  } catch (error) {
    console.log(error)
  }
}

export const getWeatherCenterNoPeople = async () => {
  try {
    const res = await axios.get(
      `https://opendata.cwa.gov.tw/api/v1/rest/datastore/${dataIdnoPeople}?Authorization=${key}&status=%E7%8F%BE%E5%AD%98%E6%B8%AC%E7%AB%99`
    )
    const data = res?.data.records.data.stationStatus.station
    const result = data.map((item) => {
      return {
        stationName: item.StationName,
        stationID: item.StationID,
        countyName: item.CountyName
      }
    })
    return result
  } catch (error) {
    console.log(error)
  }
}

export const getAllWeatherCenter = async () => {
  try {
    const data1 = await getWeatherCenterWithPeople()
    const data2 = await getWeatherCenterNoPeople()
    return [...data1, ...data2]
  } catch (error) {
    console.log(error)
  }
}
