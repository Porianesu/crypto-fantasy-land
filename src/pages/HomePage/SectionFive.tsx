import { observer } from 'mobx-react-lite'
import React, { Fragment, useImperativeHandle, useRef } from 'react'
import styles from './SectionFive.module.css'
import classNames from 'classnames'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

function toRoman(num: number): string {
  const romanMap: [number, string][] = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ]
  let result = ''
  for (const [value, numeral] of romanMap) {
    while (num >= value) {
      result += numeral
      num -= value
    }
  }
  return result
}

interface ITextData {
  title: string
  description: string[]
}
const TextData: Array<ITextData> = [
  {
    title: 'Faithcoin Generation',
    description: [
      'Earn Faithcoin by completing quests, crafting items, and trading with other players.',
      'Earned by completing daily and weekly missions',
      'Earn Faithcoins through top-ups',
      'In-Game Battle Rewards',
      'Pity System in Card Draws',
    ],
  },
  {
    title: 'Faithcoin Consumption',
    description: [
      'Card Pack Purchase',
      'Fusion Rate Bonus',
      'In-Game Item Purchase',
      'Join Draws and Spin Events',
      'Join Special Challenges and Trials',
    ],
  },
]

interface ITextCardHandle {
  timelineAnimation: React.RefObject<gsap.core.Timeline | null>
}
const TextCard = React.forwardRef<ITextCardHandle, { data: ITextData; index: number }>(
  ({ data, index }, ref) => {
    const timelineAnimation = useRef<gsap.core.Timeline>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useGSAP(
      () => {
        gsap.set(containerRef.current, {
          xPercent: index === 0 ? -100 : 100,
          autoAlpha: 0,
        })
        timelineAnimation.current = gsap.timeline({})
        timelineAnimation.current.to(containerRef.current, {
          xPercent: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
        })
        SplitText.create(containerRef.current, {
          type: 'lines',
          autoSplit: true,
          mask: 'lines',
          smartWrap: true,
          linesClass: 'line',
          reduceWhiteSpace: false,
          onSplit: (splitText) => {
            if (!timelineAnimation.current) return
            timelineAnimation.current
              .from(
                splitText.lines,
                {
                  y: 100,
                  autoAlpha: 0,
                  duration: 0.8,
                  stagger: {
                    each: 0.2,
                  },
                },
                '1.6',
              )
              .revert()
          },
        })
      },
      {
        dependencies: [],
        scope: containerRef,
      },
    )

    useImperativeHandle(ref, () => {
      return {
        timelineAnimation,
      }
    }, [])

    return (
      <div
        className={classNames(styles.infoContainer, styles[`infoContainer${index + 1}`])}
        ref={containerRef}
      >
        <div className={styles.infoTitle}>{data.title}</div>
        {data.description.map((item, index) => (
          <div key={item} className={styles.infoDescription}>
            <div>{toRoman(index + 1)}</div>
            {item}
          </div>
        ))}
      </div>
    )
  },
)

const TriangleData = [
  {
    title: 'USDx',
    description: 'Buy Faithcoins with USDx',
  },
  {
    title: 'Faithcoins',
    description: 'Buy Packs with Faithcoins',
    center: true,
  },
  {
    title: 'Card Pack',
    description: 'Open Packs to Collect Cards',
  },
  {
    title: 'Card',
    description: 'Burn Cards to Earn Faithcoins',
  },
  {
    description: 'Use Faithcoins to Fuse Cards',
  },
]
const SectionFive: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const textCardRefs = useRef<Array<ITextCardHandle>>([])

  useGSAP(
    () => {
      if (!textCardRefs.current.length) return
      // Pin the section
      gsap.timeline({
        scrollTrigger: {
          id: 'sectionFive-pin',
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
          id: 'sectionFive-animation-in',
          trigger: sectionRef.current,
          start: 'center 80%',
          end: 'bottom 20%',
          scrub: 0.4,
        },
      })
      if (textCardRefs.current[0]?.timelineAnimation.current) {
        console.log(
          'Adding first text card animation',
          textCardRefs.current[0].timelineAnimation.current,
        )
        animationInTimeline.add(textCardRefs.current[0].timelineAnimation.current)
      }
      if (textCardRefs.current[1]?.timelineAnimation.current) {
        animationInTimeline.add(textCardRefs.current[1].timelineAnimation.current)
      }
      animationInTimeline
        .from(
          titleRef.current,
          {
            id: 'title',
            y: 40,
            autoAlpha: 0,
            duration: 0.8,
          },
          '0',
        )
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
        .to(titleRef.current, {
          duration: 0.8,
        })
    },
    {
      dependencies: [textCardRefs.current.length],
      scope: sectionRef,
    },
  )

  return (
    <section className={styles.sectionContainer} ref={sectionRef}>
      <div className={styles.title} ref={titleRef}>
        Economic System
      </div>
      <div className={styles.description} ref={descriptionRef}>
        A player-owned economy governed by blockchain magic.
      </div>
      <div className={styles.contentContainer}>
        {TextData.map((data, index) => (
          <TextCard
            key={data.title}
            data={data}
            index={index}
            ref={(el) => {
              if (el) {
                textCardRefs.current[index] = el
              }
            }}
          ></TextCard>
        ))}
        <div className={styles.content}>
          {TriangleData.map((data, index) => {
            const number = index + 1
            return (
              <Fragment key={`${index}-${data.title}`}>
                {data.title ? (
                  data.center ? (
                    <div className={styles.titleCenterContainer}>
                      <div className={styles.titleEllipse}></div>
                      <div className={styles.titleCenterInsideContainer}>{data.title}</div>
                    </div>
                  ) : (
                    <div
                      className={classNames(
                        styles.titleContainer,
                        styles[`titleContainer${number}`],
                      )}
                    >
                      {data.title}
                    </div>
                  )
                ) : null}
                <div
                  className={classNames(styles.dataDescription, styles[`dataDescription${number}`])}
                >
                  {data.description}
                </div>
                <div className={classNames(styles.dataArrow, styles[`dataArrow${number}`])}></div>
              </Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default observer(SectionFive)
