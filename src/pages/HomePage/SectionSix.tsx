import { observer } from 'mobx-react-lite'
import React, { useImperativeHandle, useRef } from 'react'
import styles from './SectionSix.module.css'
import classNames from 'classnames'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import {
  GsapMediaQueryCondition,
  type GsapMediaQueryConditionType,
} from '@/utils/mediaQueryHelper.ts'

interface IRoadmapData {
  time: string
  title: string
  target: string[]
}

const ROADMAP_DATA: Array<IRoadmapData> = [
  {
    time: '2025Q2',
    title: 'Chapter I  The Summoning Begins',
    target: [
      '· Launch basic TCG gameplay',
      '· OG whitelist airdrop',
      '· Quiz tasks for cold start',
    ],
  },
  {
    time: '2025Q3',
    title: 'Chapter II  Echoes in the Mist',
    target: [
      '· Launch PVE dungeon gameplay',
      '· Equipment system and character    attributes',
      '· co-branded card promotions',
    ],
  },
  {
    time: '2025Q4',
    title: 'Chapter III The Clash of Faith',
    target: [
      '· Launch PVP battle system',
      '· ChatFi system, support trading in chat',
      '· Limited-time drops and limited edition',
    ],
  },
  {
    time: '2026Q1',
    title: 'Chapter IV The Realms Beyond',
    target: [
      '· Achieve multi-chain support',
      '· Integrate across platforms (App, PC, Web)',
      '· Release co-branded cards with KOLs',
    ],
  },
]

interface IRoadmapHandle {
  timelineAnimation: React.RefObject<gsap.core.Timeline | null>
}

const RoadmapCard = React.forwardRef<IRoadmapHandle, { data: IRoadmapData; index: number }>(
  ({ data, index }, ref) => {
    const timelineAnimation = useRef<gsap.core.Timeline>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const timeRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const descriptionRefs = useRef<Array<HTMLDivElement | null>>([])

    useGSAP(
      () => {
        const mm = gsap.matchMedia()
        mm.add(GsapMediaQueryCondition, (context) => {
          const { isDesktop } = context.conditions as unknown as GsapMediaQueryConditionType
          if (isDesktop) {
            gsap.set(containerRef.current, {
              autoAlpha: 0,
              xPercent: [0, 2].includes(index) ? -60 : 60,
            })
            gsap.set(timeRef.current, {
              autoAlpha: 0,
              scale: 0,
            })
            gsap.set([titleRef.current, ...descriptionRefs.current], {
              y: 60,
              autoAlpha: 0,
            })
            timelineAnimation.current = gsap.timeline({})
            timelineAnimation.current
              .to(containerRef.current, {
                autoAlpha: 1,
                xPercent: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
              })
              .to(
                timeRef.current,
                {
                  autoAlpha: 1,
                  scale: 1,
                  duration: 0.8,
                  ease: 'back.out(1.7)',
                },
                '<+=0.2',
              )
              .to([titleRef.current, ...descriptionRefs.current], {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: 'back.out(1.7)',
                stagger: 0.2,
              })
              .revert()
          }
        })
      },
      {
        dependencies: [],
        scope: containerRef,
      },
    )

    useImperativeHandle(
      ref,
      () => ({
        timelineAnimation,
      }),
      [],
    )

    return (
      <div
        className={classNames(styles.roadmapContainer, styles[`roadmapContainer${index + 1}`])}
        ref={containerRef}
      >
        <div
          className={classNames(styles.roadmapTime, styles[`roadmapTime${index + 1}`])}
          ref={timeRef}
        >
          {data.time}
        </div>
        <div className={styles.roadmapInfoContainer}>
          <div className={styles.roadmapInfoTitle} ref={titleRef}>
            {data.title}
          </div>
          {data.target.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className={styles.roadmapTarget}
              ref={(el) => {
                if (el) {
                  descriptionRefs.current[itemIndex] = el
                }
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    )
  },
)

const SectionSix: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<IRoadmapHandle>>([])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(GsapMediaQueryCondition, (context) => {
        const { isDesktop } = context.conditions as unknown as GsapMediaQueryConditionType
        if (isDesktop) {
          if (cardRefs.current.length !== 4) return
          // Pin the section
          gsap.timeline({
            scrollTrigger: {
              id: 'sectionSix-pin',
              trigger: sectionRef.current,
              start: 'center center',
              end: 'bottom+=800px',
              pin: true,
              pinSpacing: true,
              scrub: 0.4,
            },
          })
          const animationInTimeline = gsap.timeline({
            scrollTrigger: {
              id: 'sectionSix-animation-in',
              trigger: sectionRef.current,
              start: 'center 80%',
              end: 'bottom+=800px',
              scrub: 0.4,
            },
          })
          animationInTimeline.from(titleRef.current, {
            id: 'title',
            y: 40,
            autoAlpha: 0,
            duration: 0.8,
          })
          cardRefs.current.forEach((cardRefs) => {
            if (cardRefs.timelineAnimation.current) {
              animationInTimeline.add(cardRefs.timelineAnimation.current, '<+=0.2')
            }
          })
        }
      })
    },
    {
      dependencies: [cardRefs.current.length],
      scope: sectionRef,
    },
  )

  return (
    <section className={styles.sectionContainer} ref={sectionRef}>
      <div className={styles.title} ref={titleRef}>
        Roadmap
      </div>
      <div className={styles.content}>
        {ROADMAP_DATA.map((data, index) => (
          <RoadmapCard
            key={`${index}-${data.title}`}
            data={data}
            index={index}
            ref={(el) => {
              if (el) {
                cardRefs.current[index] = el
              }
            }}
          ></RoadmapCard>
        ))}
      </div>
      <div className={styles.startDescription}>Your Legend Starts Here</div>
      <button className={classNames('button', styles.startButton)}>Join Waitlist</button>
    </section>
  )
}
export default observer(SectionSix)
