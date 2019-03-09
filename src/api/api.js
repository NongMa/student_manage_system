import axios from 'axios'
import { HOST } from './config.js'

export const getQuestionList = params => { return axios.get(`${HOST}/example/queryList.do`, { params: params }) }

export const removeQuestion = params => { return axios.get(`${HOST}/example/delExample.do`, { params: params }) }

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }) }

export const editQuestion = params => { return axios.post(`${HOST}/example/updateExample.do`, params) }

export const addQuestion = params => { return axios.post(`${HOST}/example/insertExample.do`, params) }

export const studentGetQuestion = params => { return axios.post(`${HOST}/example/queryExampleInfo.do`, params) }

export const studentPostQuestion = params => { return axios.post(`${HOST}/example/insertExample.do`,  params) }

export const uploadLesson = params => { return axios.post(`${HOST}/file/uploadFile.do`,  params) }