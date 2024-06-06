import jsSHA from 'jssha'
import.meta.env
const getAuthorizationHeader = async () => {
  let AppID = import.meta.env.VITE_CLIENTS_ID
  let AppKey = import.meta.env.VITE_CLIENTS_KEY
  let GMTString = new Date().toGMTString()
  let ShaObj = new jsSHA('SHA-1', 'TEXT')
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update('x-date: ' + GMTString)
  let HMAC = ShaObj.getHMAC('B64')
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"'
  return { Authorization: Authorization, 'X-Date': GMTString }
}

export default getAuthorizationHeader
