import { observer } from 'mobx-react-lite'
import React from 'react'
import styles from './TestPage.module.css'

const TestPage: React.FC = () => {
  return (
    <div className={styles.imgGroup}>
      <div data-speed="clamp(1.25)"></div>
      <div data-speed="0.8"></div>
      <div data-speed="1"></div>
      <div data-speed="1.2"></div>
      <div data-speed="clamp(0.9)"></div>
    </div>
  )
}
export default observer(TestPage)
