import Mock from 'mockjs'
import userAPI from './user'
import tableAPI from './table'

// Fix an issue with setting withCredentials = true, cross-domain request lost cookies
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function () {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}
// Mock.setup({
//   timeout: '350-600'
// })

// 注册数据
let allData = {
  type: {
    student: [
      {
        username: 'admin',
        password: 12345,
        college: '理学院',
        sclass: '信计1301班'
      }
    ],
    teacher: [
      {
        username: 'admin',
        password: 12345,
        college: '理学院',
        sclass: '信计1301班'
      }
    ]
  }
}

window.localStorage.setItem('allDate', JSON.stringify(allData))

// User

Mock.mock('/userLogin.do', 'post', userAPI.login)
Mock.mock('/getUserInfo.do', 'get', userAPI.getInfo)
Mock.mock('/registerUser.do', 'post', userAPI.register)
Mock.mock('/cancelUserInfo.do', 'post', userAPI.logout)

// Table
Mock.mock(/\/table\/list/, 'get', tableAPI.list)

export default Mock
