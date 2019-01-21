import mongoose from 'mongoose'
import { Injectable } from '../assets/decorator'
import qs from 'querystring'
@Injectable()
class Usre {
  constructor () {
    this.User = mongoose.model('t_oauth_users')
    const { QQauth: { appID, appKey, prefix } } = this.ctx.config
    this.config = {
      appID,
      appKey,
      token: prefix + '/oauth2.0/token',
      openID: prefix + '/oauth2.0/me',
      get_user_info: prefix + '/user/get_user_info'
    }
  }
  async oauthHandle (code, state) {
    const accessToken = await this.fetchAccessToken(code)
    console.log('accessToken', accessToken)
    const openID = await this.fetchOpenId(accessToken)
    const userInfo = await this.getUserInfo(accessToken, openID)
    const nowUser = await this.User.saveUser(openID, userInfo)
    return nowUser
  }

  async fetchAccessToken (code) {
    const sendData = {
      grant_type: 'authorization_code',
      client_id: this.config.appID,
      client_secret: this.config.appKey,
      code,
      redirect_uri: encodeURI('http://173gg43187.iok.la/oauth/qq')
    }
    const opt = {
      url: `${this.config.token}?${qs.stringify(sendData)}`,
      method: 'GET'
    }
    try {
      const res = await this.ctx.axios(opt)
      let accessToken = qs.parse(res)
      return accessToken.access_token
    } catch (error) {
      console.log(error)
    }
  }

  async fetchOpenId (accessToken) {
    const opt = {
      url: `${this.config.openID}?access_token=${accessToken}`,
      method: 'GET'
    }
    try {
      const res = await this.ctx.axios(opt)
      let { openid } = JSON.parse(res.replace(/callback\(|\)|;/g, ''))
      return openid
    } catch (error) {
      console.log('openid==>', error)
    }
  }

  async getUserInfo (accessToken, openid) {
    const sendData = {
      accessToken,
      oauth_consumer_key: this.config.appID,
      openid
    }
    const opt = {
      url: `${this.config.get_user_info}?${qs.stringify(sendData)}`,
      method: 'GET'
    }
    console.log(opt)
    try {
      const res = await this.ctx.axios(opt)
      console.log('the user is===> ', res)
      return JSON.parse(res)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new Usre()
