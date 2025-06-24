import { observer } from 'mobx-react-lite'
import React from 'react'
import styles from './SectionOne.module.css'

const SectionOne: React.FC = () => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.title}>Legends Aren't Born. They're Minted.</div>
      <div className={styles.description}>
        Summon mighty heroes, forge your deck, and claim your destiny in the battle for the Crypto
        Throne.
      </div>
    </section>
  )
}
export default observer(SectionOne)
