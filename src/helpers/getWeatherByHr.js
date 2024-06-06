export const getWeatherByTime = (currHour) => {
  const morningStart = 6
  const eveningStart = 18
  let time = 6
  if (currHour >= morningStart && currHour < eveningStart) {
    time = 6
  } else {
    time = 18
  }
  const resultTime = time + ':00:00'
  return resultTime
}
