import twCityDistricts from '../data/twCityDistricts.json'

export const getCityHelpers = () => {
  return twCityDistricts.map((item) => item.city)
}

export const twCity = [
  { label: '臺北市', value: 'Taipei' },
  { label: '新北市', value: 'NewTaipei' },
  { label: '桃園市', value: 'Taoyuan' },
  { label: '臺中市', value: 'Taichung' },
  { label: '臺南市', value: 'Tainan' },
  { label: '高雄市', value: 'Kaohsiung' },
  { label: '基隆市', value: 'Keelung' },
  { label: '新竹市', value: 'Hsinchu' },
  { label: '新竹縣', value: 'HsinchuCounty' },
  { label: '嘉義市', value: 'Chiayi' },
  { label: '苗栗縣', value: 'MiaoliCounty' },
  { label: '彰化縣', value: 'ChanghuaCounty' },
  { label: '南投縣', value: 'NantouCounty' },
  { label: '雲林縣', value: 'YunlinCounty' },
  { label: '嘉義縣', value: 'ChiayiCounty' },
  { label: '屏東縣', value: 'PingtungCounty' },
  { label: '宜蘭縣', value: 'YilanCounty' },
  { label: '花蓮縣', value: 'HualienCounty' },
  { label: '臺東縣', value: 'TaitungCounty' },
  { label: '澎湖縣', value: 'PenghuCounty' },
  { label: '金門縣', value: 'Kinmen County' },
  { label: '連江縣', value: 'LienchiangCounty' }
]
