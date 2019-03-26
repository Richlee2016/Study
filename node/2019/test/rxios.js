import axios from 'axios'
import qs from 'querystring'
const PREFIX = 'https://validate.xinyong.com.cn/fcgi-bin/'
// 请求超时 8s
axios.defaults.timeout = 8000
// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
/**
 * 加密
 * @param {object} data
 */
const aesCrypto = (data) => {
  const baseData = qs.stringify(data)
  // 加密过程
  return baseData
}

/**
 * 流水号缓存
 * @param time 储存时间 9 分钟
 * @returns seq_no 流水号
 */
const getSeqNo = async () => {
  let sessionStorage = window.sessionStorage
  const TimeRange = 9 * 60 * 60 * 1000
  const now = Date.now()
  let seqNo = sessionStorage.getItem('SeqNoCache')
  seqNo = seqNo ? JSON.parse(seqNo) : null
  if (now - seqNo.mate < TimeRange) return seqNo.seq
  try {
    // let res = await axios.get('XXX')
    let res = 123456
    res = { seq: res, mate: Date.now() }
    sessionStorage.setItem('SeqNoCache', JSON.stringify(res))
    return res
  } catch (error) {
    console.log(error)
  }
}
/**
 * 请求函数
 * @param method 'get' 请求方式
 * @param data:{entNo,reqData} 数据
 * @param url api地址
 */
export default async ({ method = 'get', url, data }) => {
  const { entNo, reqData } = data
  try {
    const seqNo = await getSeqNo()
    const req = aesCrypto(reqData)
    const res = await axios({
      method,
      url: `${PREFIX}${url}?ent_no=${entNo}&seq_no=${seqNo}req_no=${req}`
    })
    return res
  } catch (error) {
    console.log(error)
  }
}
