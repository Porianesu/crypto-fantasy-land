import { observer } from 'mobx-react-lite'
import React from 'react'
import styles from './HomePage.module.css'
import classNames from 'classnames'
import SectionTwo from '@/pages/ HomePage/SectionTwo.tsx'
import SectionThree from '@/pages/ HomePage/SectionThree.tsx'
import SectionFour from '@/pages/ HomePage/SectionFour.tsx'
import SectionFive from '@/pages/ HomePage/SectionFive.tsx'

const HomePage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.heroesPartContainer}>
        <div className={styles.heroesContainer}>
          {new Array(5).fill(0).map((_, index) => (
            <div key={index} className={styles[`hero${index + 1}`]}></div>
          ))}
        </div>
        <div className={styles.heroesCover}></div>
      </div>
      <div className={styles.header}>
        <div className={styles.gameIcon}></div>
        <button className={classNames('button', styles.playButton)}>Play Game</button>
      </div>
      <section className={styles.sectionContainer}>
        <div className={styles.title}>Legends Aren't Born. They're Minted.</div>
        <div className={styles.description}>
          Summon mighty heroes, forge your deck, and claim your destiny in the battle for the Crypto
          Throne.
        </div>
      </section>
      <SectionTwo></SectionTwo>
      <SectionThree></SectionThree>
      <SectionFour></SectionFour>
      <SectionFive></SectionFive>
      <footer className={styles.footer}>© Address Fantasy 2025</footer>
    </div>
  )
}
export default observer(HomePage)
