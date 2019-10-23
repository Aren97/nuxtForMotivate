import Vue from 'vue'

Vue.prototype.$setCookie = (name, value) => {
  const expires = '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
  document.cookie = name + '=' + (value || '') + expires
}

Vue.prototype.$getCookie = (name) => {
  const cookieList = document.cookie ? document.cookie.split(';') : []
  const cookie = cookieList.find(item => {
    const cook = item.trim()
    if (cook.indexOf(name) === 0) {
      return cook.substr(name.length + 1, cook.length)
    }
  })
  return cookie ? cookie.trim().substr(name.length + 1, cookie.length) : null
}
export const eraseCookie = (name) => {
  document.cookie = name + '=; Max-Age=-99999999;'
}
