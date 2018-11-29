import { validator } from '../../assets/middlewares/validator'

export const IndexDto = validator({
  type: 'query',
  valid: J => J.object().keys({
    a: J.number(),
    b: J.string()
  })
})
