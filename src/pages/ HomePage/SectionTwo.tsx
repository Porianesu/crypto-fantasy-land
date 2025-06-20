import { observer } from 'mobx-react-lite'
import React from 'react'
import styles from './SectionTwo.module.css'

const SectionTwo: React.FC = () => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.title}>Legend of Web3</div>
      <div className={styles.description}>
        Real influencers become your in-game Heroes – the champions of our realm.
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.cardsTemplate}></div>
        <div className={styles.content}>
          In Address Fantasy, every card is a real blockchain address — a wallet with a track
          record, a story, a soul.
          <div className={styles.divideLine}></div> These are not avatars or fictional figures. They
          are living wallets, personified through art and battle stats, shaped by real on-chain
          actions: high-risk trades, sniper entries, diamond hands, and degen glory.{' '}
          <div className={styles.divideLine}></div>
          We summon the trendsetters — the whales, the wizards, the wallets that moved markets.
          <div className={styles.divideLine}></div> Each card is a tribute to the fearless, the
          speculative, the legendary. And when you play them, you’re not just building a deck.
          You’re commanding the future of Web3, one block at a time.
        </div>
      </div>
    </section>
  )
}
export default observer(SectionTwo)
