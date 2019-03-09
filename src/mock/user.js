import { param2Obj } from './utils'

const tokens = {
  student: {
    token: 'student'
  },
  teacher: {
    token: 'teacher'
  }
}

const users = {
  'student-token': {
    roles: ['student'],
    introduction: 'I am a super student',
    name: 'student'
  },
  'teacher-token': {
    roles: ['teacher'],
    introduction: 'I am an teacher',
    name: 'teacher'
  }
}

export default {
  register: res => {
    const data = res.data
    if (data) {
      return {
        code: 20000,
        data
      }
    }
    return {
      code: 60204,
      message: 'Account and password are incorrect.'
    }
  },
  login: res => {
    const { username } = JSON.parse(res.body)
    const data = tokens[username]

    if (data) {
      return {
        code: 20000,
        data
      }
    }
    return {
      code: 60204,
      message: 'Account and password are incorrect.'
    }
  },
  getInfo: res => {
    const { token } = param2Obj(res.url)
    const info = users[token]

    if (info) {
      return {
        code: 20000,
        data: info
      }
    }
    return {
      code: 50008,
      message: 'Login failed, unable to get user details.'
    }
  },
  logout: () => {
    return {
      code: 20000,
      data: 'success'
    }
  }
}
