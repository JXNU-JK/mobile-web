const storage = window.localStorage
// 数据storage
const storageName = {
  loginState: 'loginState',
  userInfo: 'userInfo',
  testType: 'testType',
  resultString: 'resultString',
  resultNewString: 'resultNewString'
}

export function setLoginState (data) {
  storage.setItem(storageName.loginState, JSON.stringify(data))
}

export function getLoginState (callback) {
  return callback(storage.getItem(storageName.loginState))
}

export function removeLoginState () {
  storage.removeItem(storageName.loginState)
}

export function setUserInfo (data) {
  storage.setItem(storageName.userInfo, JSON.stringify(data))
}

export function getUserInfo (callback) {
  return callback(storage.getItem(storageName.userInfo))
}

export function removeUserInfo () {
  storage.removeItem(storageName.userInfo)
}

export function getTestType (callback) {
  return callback(storage.getItem(storageName.testType))
}

export function setTestType (data) {
  storage.setItem(storageName.testType, JSON.stringify(data))
}

export function removeTestType (callback) {
  storage.removeItem(storageName.testType)
}

export function getResultString (callback) {
  return callback(storage.getItem(storageName.resultString))
}

export function setResultString (data) {
  storage.setItem(storageName.resultString, JSON.stringify(data))
}

export function removeResultString (callback) {
  storage.removeItem(storageName.resultString)
}

export function getResultNewString (callback) {
  return callback(storage.getItem(storageName.resultNewString))
}

export function setResultNewString (data) {
  storage.setItem(storageName.resultNewString, JSON.stringify(data))
}

export function removeResultNewString (callback) {
  storage.removeItem(storageName.resultNewString)
}
