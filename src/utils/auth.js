import Cookies from 'js-cookie'

const TokenKey = 'token'
const TypeKey = 'type'
const NameKey = 'name'
const PidKey = 'pid'
const PpurKey = 'ppur'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getType () {
  return Cookies.get(TypeKey)
}

export function setType (type) {
  return Cookies.set(TypeKey, type)
}

export function removeType () {
  return Cookies.remove(TypeKey)
}

export function getName () {
  return Cookies.get(NameKey)
}

export function setName (name) {
  return Cookies.set(NameKey, name)
}

export function removeName () {
  return Cookies.remove(NameKey)
}

export function getPid () {
  return Cookies.get(PidKey)
}

export function setPid (pid) {
  return Cookies.set(PidKey, pid)
}

export function removePid () {
  return Cookies.remove(PidKey)
}

export function getPpur () {
  return Cookies.get(PpurKey)
}

export function setPpur (ppur) {
  return Cookies.set(PpurKey, ppur)
}

export function removePpur () {
  return Cookies.remove(PpurKey)
}
