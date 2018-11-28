import { validator } from '../middleware/validator'

export const IndexDto = validator({
  type: 'query',
  valid: J => J.object().keys({
    a: J.number(),
    b: J.string()
  }).requiredKeys('a', 'b')
})
