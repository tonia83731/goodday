import axios from 'axios'
const dataId = import.meta.env.VITE_RAIN_ID
const key = import.meta.env.VITE_WEATHER_APIKEY
export const getRainVolumnByStatistic = async () => {
  try {
    const res = await axios.get(
      `https://opendata.cwa.gov.tw/api/v1/rest/datastore/${dataId}?Authorization=${key}&statistics=true`
    )
    return res?.data.records.location
  } catch (error) {
    console.log(error)
  }
}

export const getRainVolumnByTime = async (stationId, timefrom, timeto) => {
  try {
    const res = await axios.get(
      `https://opendata.cwa.gov.tw/api/v1/rest/datastore/${dataId}?Authorization=${key}&StationID=${stationId}&timeFrom=${timefrom}&timeTo=${timeto}`
    )
    return res?.data.records.location
  } catch (error) {
    console.log(error)
  }
}
