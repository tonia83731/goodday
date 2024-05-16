import twCityDistricts from '../data/twCityDistricts.json'

export const getCityHelpers = () => {
  return twCityDistricts.map((item) => item.city)
}
