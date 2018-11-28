import Joi from 'joi'
import { setNum } from '../common/utils'

export const validator = ({ type, valid, handle }) => async (ctx, next) => {
  let validData = {}
  let ty = type || 'body'

  if (ty === 'body') {
    validData = ctx.request.body
  }
  if (ty === 'query') {
    validData = setNum(ctx.query)
  }
  Joi.validate(validData, valid(Joi), (err, value) => {
    if (err !== null) {
      if (handle) {
        handle(err, ctx, next)
      } else {
        ctx.body = err
      }
    } else {
      next()
    }
  })
}
