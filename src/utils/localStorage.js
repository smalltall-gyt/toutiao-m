export function set (key, value) {
  if (typeof value === 'object') {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else {
    window.localStorage.setItem(key, value)
  }
}
export function get (key) {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
export function remove (key) {
  window.localStorage.removeItem(key)
}
export function clear () {
  window.localStorage.clear()
}
