import { getToken, getType, getName, getPid, getPpur } from '@/utils/auth'
export default {
  token: getToken(),
  name: getName(),
  type: getType(),
  pid: getPid(),
  ppur:  getPpur(),
  haveMessage: false,
  haveOpened: false,
  isCollapse: false,
}
