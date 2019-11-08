class Ajax {
  constructor ({ method, url, data = {}, success, fail }) {
    if (window.XMLHttpRequest) {
      this.request = new window.XMLHttpRequest()
    } else {
      this.request = new window.ActiveXObject('Microsoft.XMLHTTP')
    }
    this.method = method
    this.url = url
    this.data = data
    this.success = success
    this.fail = fail
    this.init()
  }

  init () {
    this.on()
    this.open()
  }

  open () {
    this.request.open(this.method, this.url)
    switch (this.method) {
      case 'GET':
        this.request.send(null)
        break
      case 'POST':
        this.request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
        // this.request.setRequestHeader('Content-Type', 'application/json')
        this.request.send(this._encodeData())
        break
    }
  }

  on () {
    /*
        this.request.readyState
        0 未调取open
        1 已调用 open 但还未发送请求
        2 已发送请求
        3 已接收到请求返回的数据
        4 请求已完成
    */
    /*
        this.request.status
        // HTTP 状态在 200-300 之间表示请求成功
        // HTTP 状态为 304 表示请求内容未发生改变，可直接从缓存中读取
    */
    this.request.onreadystatechange = () => {
      if (this.request.readyState === 4) {
        if ((this.request.status >= 200 && this.request.status < 300) || this.request.status === 304) {
          this.success(this.request.responseText)
        } else {
          this.fail(this.request.status)
        }
      }
    }
  }

  _encodeData () {
    let value = ''
    for (const key in this.data) {
      if (this.data.hasOwnProperty(key)) {
        const val = this.data[key]
        value = `${value}&${key}=${val}`
      }
    }
    return value.substr(1, value.length)
  }
}

window.ajax = (opt) => {
  return new Ajax(opt)
}
