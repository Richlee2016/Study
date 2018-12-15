import { validator } from '../../assets/middlewares/validator'
// 电影查询 字段
export const MovieDtoList = validator({
  type: 'query',
  valid: J => J.object().keys({
    page: J.number(),
    size: J.number(),
    year: J.number(),
    director: J.string(),
    actor: J.string(),
    classify: J.string(),
    catalog: J.string()
  })
})
