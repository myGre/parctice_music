
// 临时存储
export const setSesion = (key, value) => {
  return sessionStorage.setItem(key, JSON.stringify(value))
}
export const getSesion = (key) => {
  return JSON.parse(sessionStorage.getItem(key))
}
export const removeSesion = (key) => {
  sessionStorage.removeItem(key)
}

// 本地存储
export const setLocal = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value))
}
export const getLocal = (key) => {
  return JSON.parse(localStorage.getItem(key))
}
export const removeLocal = (key) => {
  localStorage.removeItem(key)
}