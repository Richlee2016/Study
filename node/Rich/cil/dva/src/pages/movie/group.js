import React from 'react'
import { connect } from 'dva'
import styles from './zstyle.less'

function IndexPage () {
  return (
    <div className={styles.normal}>
     321
    </div>
  )
}

IndexPage.propTypes = {
}

export default connect()(IndexPage)
