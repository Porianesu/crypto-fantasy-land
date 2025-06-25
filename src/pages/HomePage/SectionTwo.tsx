import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import styles from './SectionTwo.module.css'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

const SectionTwo: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const contentTextRef = useRef<HTMLDivElement>(null)
  const cardsTemplateRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Pin the section
      gsap.timeline({
        scrollTrigger: {
          id: 'sectionTwo-pin',
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
          id: 'sectionTwo-animation-in',
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 0.4,
        },
      })
      SplitText.create(contentTextRef.current, {
        type: 'lines',
        autoSplit: true,
        mask: 'lines',
        smartWrap: true,
        linesClass: 'line',
        reduceWhiteSpace: false,
        onSplit: (splitText) => {
          animationInTimeline
            .from(
              splitText.lines,
              {
                id: 'contentText',
                y: 100,
                autoAlpha: 0,
                duration: 0.8,
                stagger: {
                  each: 0.2,
                },
              },
              '1.6',
            )
            .to(titleRef.current, {
              duration: 0.8,
            })
        },
      })
      animationInTimeline
        .from(
          titleRef.current,
          {
            id: 'title',
            y: 100,
            autoAlpha: 0,
            duration: 0.8,
          },
          '0',
        )
        .from(
          descriptionRef.current,
          {
            id: 'description',
            y: 100,
            autoAlpha: 0,
            duration: 0.8,
          },
          '0.8',
        )
        .from(
          cardsTemplateRef.current,
          {
            id: 'cardsTemplate',
            y: 100,
            autoAlpha: 0,
            duration: 2,
          },
          '1.6',
        )
    },
    {
      dependencies: [],
      scope: sectionRef,
    },
  )

  return (
    <section className={styles.sectionContainer} ref={sectionRef}>
      <div className={styles.title} ref={titleRef}>
        Legend of Web3
      </div>
      <div className={styles.description} ref={descriptionRef}>
        Real influencers become your in-game Heroes – the champions of our realm.
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.cardsTemplate} ref={cardsTemplateRef}></div>
        <div className={styles.content} ref={contentTextRef}>
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
