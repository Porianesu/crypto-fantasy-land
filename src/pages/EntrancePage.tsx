import { observer } from 'mobx-react-lite'
import React from 'react'
import styles from '@/pages/EntrancePage.module.css'

const EntrancePage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.gameIcon}></div>
      <div className={styles.progressBarWrapper}>
        <div className={styles.progressBarBg}>
          <div className={styles.progressBarFill} style={{ width: '80%' }}></div>
        </div>
      </div>
    </div>
  )
}
export default observer(EntrancePage)
