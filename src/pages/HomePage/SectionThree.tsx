import { observer } from 'mobx-react-lite'
import React from 'react'
import styles from './SectionThree.module.css'
import TournamentImage from '@/assets/images/home_page/section_three/tournament.png'
import TradingAbyssImage from '@/assets/images/home_page/section_three/trading_abyss.png'
import AreneDuelImage from '@/assets/images/home_page/section_three/arena_duel.png'
import TournamentImageDynamics from '@/assets/images/home_page/section_three/tournament.gif'
import TradingAbyssImageDynamics from '@/assets/images/home_page/section_three/trading_abyss.gif'
import AreneDuelImageDynamics from '@/assets/images/home_page/section_three/arena_duel.gif'

interface IGameData {
  image: string
  dynamicsImage: string
  title: string
  description: React.ReactNode
}
const GAME_DATA: Array<IGameData> = [
  {
    image: TournamentImage,
    dynamicsImage: TournamentImageDynamics,
    title: 'Tournament',
    description: (
      <>
        Glory isn’t reserved for the top — rewards await every summoner.
        <div className={styles.divideLine}></div>
        Tournament is the heart of battle in Address Fantasy — a time-limited on-chain contest held
        every three days, where summoners assemble their mightiest five-card deck to compete for
        leaderboard glory and rich rewards.
      </>
    ),
  },
  {
    image: TradingAbyssImage,
    dynamicsImage: TradingAbyssImageDynamics,
    title: 'Trading Abyss',
    description: (
      <>
        Explore the unknown. Loot forgotten relics. Survive the volatility.
        <div className={styles.divideLine}></div>
        Welcome to the Trading Abyss — a mysterious PvE realm shrouded in volatility and reward,
        where you battle through cryptic zones filled with AI-controlled decks shaped by historical
        blockchain anomalies.
      </>
    ),
  },
  {
    image: AreneDuelImage,
    dynamicsImage: AreneDuelImageDynamics,
    title: 'Arene Duel',
    description: (
      <>
        One summoner. One deck. No excuses.
        <div className={styles.divideLine}></div>
        The Arena Duel is the purest form of combat in Fantasy Crypto — real-time PvP battles, where
        two summoners clash card-to-card in a fight for honor, rating, and precious loot.
      </>
    ),
  },
]

const GameBlock = React.forwardRef<any, { game: IGameData }>(({ game }, ref) => {
  return (
    <div className={styles.gameContainer} key={game.title} ref={ref}>
      <img alt={`game-${game.title}`} className={styles.gameImage} src={game.image}></img>
      <div className={styles.gameTitle}>{game.title}</div>
      <div className={styles.gameDescription}>{game.description}</div>
    </div>
  )
})

const SectionThree: React.FC = () => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.title}>Gameplay Introduction</div>
      <div className={styles.description}>
        A Web3-based collectible card game combining smart wallet behavior data with an RPG-inspired
        world.
      </div>
      <div className={styles.gamePartContainer}>
        {GAME_DATA.map((game) => {
          return <GameBlock key={game.title} game={game}></GameBlock>
        })}
      </div>
    </section>
  )
}
export default observer(SectionThree)
