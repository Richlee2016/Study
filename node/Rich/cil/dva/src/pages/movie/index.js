import React from 'react'
import { connect } from 'dva'
import styles from './zstyle.less'
import { Button } from 'antd'

function IndexPage ({ dispatch, movie }) {
  return (
    <div className={styles.normal}>
      <Button onClick={() => { dispatch({ type: 'movie/minus' }) }}>-</Button>
      <span>{movie.num}</span>
      <Button onClick={() => { dispatch({ type: 'movie/asyncAdd' }) }}>+</Button>
    </div>
  )
}

IndexPage.propTypes = {
}

export default connect(({ movie }) => ({ movie }))(IndexPage)
