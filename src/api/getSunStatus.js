import axios from 'axios'
const dataId = import.meta.env.VITE_SUNSTATUS_ID
const key = import.meta.env.VITE_WEATHER_APIKEY
export const getSunStatus = async (locationName, timefrom, timeto) => {
  try {
    const res = await axios.get(
      `https://opendata.cwa.gov.tw/api/v1/rest/datastore/${dataId}?Authorization=${key}&CountyName=${locationName}&timeFrom=${timefrom}&timeTo=${timeto}`
    )
    return res?.data.records.locations.location
  } catch (error) {
    console.log(error)
  }
}
