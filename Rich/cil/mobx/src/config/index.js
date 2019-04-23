export default {
  formItemLayout : {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 12
    }
  }
}

// FORM 表单 格式
export const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 12
  }
}

// 手机验证
export const phoneVali = {
  len:11,
  pattern:/^1[3|6|7|4|5|8]\d{9}$/
}

// 特殊字符验证
export const stringVali = {
  pattern:/^[\u4e00-\u9fa5a-z0-9A-Z][\u4e00-\u9fa5a-z0-9A-Z]*[\u4e00-\u9fa5a-z0-9A-Z]*$/
}

