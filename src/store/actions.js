import { login, register, logout, getInfo } from '@/api/login'
import { setToken, removeToken, setType, removeType, setName, removeName, setPid, removePid, setPpur, removePpur} from '@/utils/auth'

export default {
  // 登录
  Login ({ commit }, userInfo) {
    const username = userInfo.username.trim()
    return new Promise((resolve, reject) => {
      login(username, userInfo.password).then(response => {
        const data = response.data
        setToken(data.token)
        setType(data.type)
        setName(data.pName)
        setPid(data.pId)
        setPpur(data.pPur)
        commit('SET_TOKEN', data.token)
        commit('SET_TYPE', data.type)
        commit('SET_NAME', data.pName)
        commit('SET_PID', data.pId)
        commit('SET_PPUR', data.pPur)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  Register ({ commit }, registerDate) {
    const username = registerDate.username.trim()
    return new Promise((resolve, reject) => {
      register(username, registerDate.password, registerDate.college, registerDate.sclass, registerDate.typeValue).then(response => {
        const data = response.data
        setToken(data.token)
        setType(data.type)
        setName(data.pName)
        setPid(data.pId)
        setPpur(data.pPur)
        commit('SET_TOKEN', data.token)
        commit('SET_TYPE', data.type)
        commit('SET_NAME', data.pName)
        commit('SET_PID', data.pId)
        commit('SET_PPUR', data.pPur)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取用户信息
  GetInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 登出
  LogOut ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_TYPE', '')
        commit('SET_Name', '')
        commit('SET_PID', '')
        commit('SET_PPUR', '')
        removeToken()
        removeType()
        removeName()
        removePid()
        removePpur()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 前端 登出
  FedLogOut ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
        commit('SET_TYPE', '')
        commit('SET_Name', '')
        commit('SET_PID', '')
        commit('SET_PPUR', '')
        removeToken()
        removeType()
        removeName()
        removePid()
        removePpur()
        resolve()
      resolve()
    })
  }
}
