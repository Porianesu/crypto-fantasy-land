import { observer } from 'mobx-react-lite'
import React, { type MouseEventHandler, type RefObject, useRef, useState } from 'react'
import styles from './SectionThree.module.css'
import TournamentImage from '@/assets/images/home_page/section_three/tournament.png'
import TradingAbyssImage from '@/assets/images/home_page/section_three/trading_abyss.png'
import AreneDuelImage from '@/assets/images/home_page/section_three/arena_duel.png'
import TournamentImageDynamics from '@/assets/images/home_page/section_three/tournament.gif'
import TradingAbyssImageDynamics from '@/assets/images/home_page/section_three/trading_abyss.gif'
import AreneDuelImageDynamics from '@/assets/images/home_page/section_three/arena_duel.gif'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import classNames from 'classnames'
import {
  GsapMediaQueryCondition,
  type GsapMediaQueryConditionType,
} from '@/utils/mediaQueryHelper.ts'
import { horizontalLoop } from '@/utils/gsapUtils.ts'

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

const GameBlock = React.forwardRef<
  HTMLDivElement,
  { game: IGameData; isAnimationRef: RefObject<boolean>; mobileFlag: boolean }
>(({ game, isAnimationRef, mobileFlag }, ref) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const dynamicsImageRef = useRef<HTMLImageElement>(null)
  const handleMouseEnter: MouseEventHandler = (event) => {
    if (isAnimationRef.current || mobileFlag) return
    gsap.to(event.currentTarget, {
      scale: 1.04,
    })
  }
  const handleMouseLeave: MouseEventHandler = (event) => {
    if (isAnimationRef.current || mobileFlag) return
    gsap.to(event.currentTarget, {
      scale: 1,
    })
  }
  const handleImageLoad = () => {
    if (imageRef.current && dynamicsImageRef.current) {
      gsap.set(imageRef.current, {
        autoAlpha: 0,
        duration: 0.4,
      })
      gsap.set(dynamicsImageRef.current, {
        autoAlpha: 1,
        duration: 0.4,
      })
    }
  }

  return (
    <div
      className={styles.gameContainer}
      key={game.title}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.gameImageContainer}>
        <img
          alt={`game-image-${game.title}`}
          className={classNames(styles.gameImage, 'z-10')}
          src={game.image}
          ref={imageRef}
        ></img>
        <img
          alt={`game-image-dynamics-${game.title}`}
          className={classNames(styles.gameImage, 'invisible', 'opacity-0', 'z-0')}
          src={game.dynamicsImage}
          onLoad={handleImageLoad}
          ref={dynamicsImageRef}
        ></img>
      </div>
      <div className={styles.gameTitle}>{game.title}</div>
      <div className={styles.gameDescription}>{game.description}</div>
    </div>
  )
})

const SectionThree: React.FC<{ mobileFlag: boolean }> = ({ mobileFlag }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const gameBlockRefs = useRef<Array<HTMLDivElement | null>>([])
  const isAnimationRef = useRef(false)
  const loopRef = useRef<gsap.core.Timeline>(null)
  const [loopIndex, setLoopIndex] = useState(0)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(GsapMediaQueryCondition, (context) => {
        const { isDesktop } = context.conditions as unknown as GsapMediaQueryConditionType
        if (isDesktop) {
          // Pin the section
          gsap.timeline({
            scrollTrigger: {
              id: 'sectionThree-pin',
              trigger: sectionRef.current,
              start: 'center center',
              end: 'bottom 20%',
              pin: true,
              pinSpacing: true,
              scrub: 0.4,
            },
          })
          const animationInTimeline = gsap.timeline({
            scrollTrigger: {
              id: 'sectionThree-animation-in',
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 0.4,
            },
            onStart: () => {
              isAnimationRef.current = true
            },
            onComplete: () => {
              isAnimationRef.current = false
            },
          })
          animationInTimeline
            .from(titleRef.current, {
              id: 'title',
              y: 40,
              autoAlpha: 0,
              duration: 0.8,
            })
            .from(
              descriptionRef.current,
              {
                id: 'description',
                y: 40,
                autoAlpha: 0,
                duration: 0.8,
              },
              '0',
            )
            .from(
              gameBlockRefs.current,
              {
                id: 'gameBlocks',
                autoAlpha: 0,
                xPercent: 100,
                duration: 1,
                stagger: {
                  each: 0.2,
                },
              },
              '0',
            )
            .to(titleRef.current, {
              duration: 0.4,
            })
        } else {
          loopRef.current = horizontalLoop(gameBlockRefs.current, {
            paused: true,
            draggable: true,
            center: true,
            speed: 0.1,
            paddingRight: 10,
            onChange: (_element: HTMLElement, index: number) => {
              setLoopIndex(index)
            },
          })
        }
      })
    },
    {
      dependencies: [],
      scope: sectionRef,
    },
  )
  return (
    <section className={styles.sectionContainer} ref={sectionRef}>
      <div className={styles.title} ref={titleRef}>
        Gameplay Introduction
      </div>
      <div className={styles.description} ref={descriptionRef}>
        A Web3-based collectible card game combining smart wallet behavior data with an RPG-inspired
        world.
      </div>
      <div className={styles.gamePartContainer}>
        {GAME_DATA.map((game, index) => {
          return (
            <GameBlock
              key={game.title}
              game={game}
              ref={(el) => {
                gameBlockRefs.current[index] = el
              }}
              isAnimationRef={isAnimationRef}
              mobileFlag={mobileFlag}
            ></GameBlock>
          )
        })}
      </div>
      {mobileFlag ? (
        <div className={styles.dotContainer}>
          {GAME_DATA.map((_data, index) => {
            return (
              <div
                key={index}
                className={classNames(styles.dot, {
                  [styles.dotSelected]: index === loopIndex,
                })}
              ></div>
            )
          })}
        </div>
      ) : null}
    </section>
  )
}

export default observer(SectionThree)
