import axios from 'axios'
import { HOST } from './config.js'

export const getQuestionList = params => { return axios.get(`${HOST}/example/queryList.do`, { params: params }) }

export const removeQuestion = params => { return axios.get(`${HOST}/example/delExample.do`, { params: params }) }

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }) }

export const editQuestion = params => { return axios.post(`${HOST}/example/updateExample.do`, params) }

export const addQuestion = params => { return axios.post(`${HOST}/example/insertExample.do`, params) }

export const studentGetQuestion = params => { return axios.post(`${HOST}/example/queryExampleInfo.do`, params) }

export const studentPostQuestion = params => { return axios.post(`${HOST}/example/insertExample.do`,  params) }

export const getStudentFileList = params => { return axios.get(`${HOST}/file/studentQueryFile.do`, { params: params }) }

export const getTeacherFileList = params => { return axios.get(`${HOST}/file/teacherSelectFile.do`, { params: params }) }

export const uploadFile = params => { return axios.get(`${HOST}/file/downloadFile.do`, { params: params}) }

export const getNewMsg = params => { return axios.get(`${HOST}/mess/getNewMsg.do`,  { params: params }) }

export const getMessageList = params => { return axios.get(`${HOST}/mess/queryMesList.do`,  { params: params }) }

export const editMessage = params => { return axios.post(`${HOST}/mess/updateMsgCont.do`, params) }

export const addMessage = params => { return axios.post(`${HOST}/mess/insertMesg.do`, params) }

export const removeMessage = params => { return axios.get(`${HOST}/mess/deleMsgByT2.do`, { params: params }) }

export const getStudentMsgList = params => { return axios.get(`${HOST}/mess/queryMesList.do`,  { params: params }) }

export const postMsgToTeacher = params => { return axios.get(`${HOST}/mess/updateMesFlag.do`,  { params: params }) }