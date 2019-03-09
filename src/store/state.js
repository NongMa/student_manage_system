import { getToken, getType, getName, getPid } from '@/utils/auth'
export default {
  token: getToken(),
  name: getName(),
  type: getType(),
  pid: getPid()
}
