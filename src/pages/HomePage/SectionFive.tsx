import { observer } from 'mobx-react-lite'
import React, { Fragment, useImperativeHandle, useRef } from 'react'
import styles from './SectionFive.module.css'
import classNames from 'classnames'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

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
    const titleRef = useRef<HTMLDivElement>(null)
    const descriptionRefs = useRef<Array<HTMLDivElement | null>>([])

    useGSAP(
      () => {
        gsap.set(containerRef.current, {
          xPercent: index === 0 ? -100 : 100,
          autoAlpha: 0,
        })
        gsap.set([titleRef.current, ...descriptionRefs.current], {
          y: 100,
          autoAlpha: 0,
        })
        timelineAnimation.current = gsap.timeline({})
        timelineAnimation.current
          .to(containerRef.current, {
            xPercent: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'back.out(1.7)',
          })
          .to([titleRef.current, ...descriptionRefs.current], {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: {
              each: 0.2,
            },
          })
          .revert()
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
        <div className={styles.infoTitle} ref={titleRef}>
          {data.title}
        </div>
        {data.description.map((item, index) => (
          <div
            key={item}
            className={styles.infoDescription}
            ref={(el) => {
              if (el) {
                descriptionRefs.current[index] = el
              }
            }}
          >
            <div>{toRoman(index + 1)}</div>
            {item}
          </div>
        ))}
      </div>
    )
  },
)

const TriangleData: Array<{
  title?: string
  description: string
  center?: boolean
  tweenVars: gsap.TweenVars
}> = [
  {
    title: 'USDx',
    description: 'Buy Faithcoins with USDx',
    tweenVars: {
      yPercent: -100,
      autoAlpha: 0,
      duration: 0.8,
    },
  },
  {
    title: 'Faithcoins',
    description: 'Buy Packs with Faithcoins',
    center: true,
    tweenVars: {
      xPercent: 100,
      yPercent: -100,
      autoAlpha: 0,
      duration: 0.8,
    },
  },
  {
    title: 'Card Pack',
    description: 'Open Packs to Collect Cards',
    tweenVars: {
      xPercent: -100,
      autoAlpha: 0,
      duration: 0.8,
    },
  },
  {
    title: 'Card',
    description: 'Burn Cards to Earn Faithcoins',
    tweenVars: {
      xPercent: 100,
      yPercent: 100,
      autoAlpha: 0,
      duration: 0.8,
    },
  },
  {
    description: 'Use Faithcoins to Fuse Cards',
    tweenVars: {
      yPercent: -100,
      xPercent: -100,
      autoAlpha: 0,
      duration: 0.8,
    },
  },
]
const SectionFive: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const textCardRefs = useRef<Array<ITextCardHandle>>([])
  const contentBackgroundRef = useRef<HTMLDivElement>(null)
  const contentTitleRefs = useRef<Array<HTMLDivElement | null>>([])
  const contentDescriptionRefs = useRef<Array<HTMLDivElement | null>>([])
  const contentArrowRefs = useRef<Array<HTMLDivElement | null>>([])
  const contentEllipseRef = useRef<HTMLDivElement>(null)
  const contentEllipseRotateRef = useRef<gsap.core.Tween>(null)

  useGSAP(
    () => {
      if (
        !textCardRefs.current[0]?.timelineAnimation.current ||
        !textCardRefs.current[1]?.timelineAnimation.current
      )
        return
      // Pin the section
      gsap.timeline({
        scrollTrigger: {
          id: 'sectionFive-pin',
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom+=2000px',
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
          end: 'bottom+=2000px',
          scrub: 0.4,
        },
      })
      animationInTimeline.add(textCardRefs.current[0].timelineAnimation.current)
      animationInTimeline.add(textCardRefs.current[1].timelineAnimation.current)
      animationInTimeline.from(contentBackgroundRef.current, {
        scale: 0,
        autoAlpha: 0,
        duration: 1.6,
        ease: 'back.out(1.7)',
      })
      TriangleData.forEach((data, index) => {
        if (data.title) {
          animationInTimeline.from(contentTitleRefs.current[index], {
            scale: 0,
            autoAlpha: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
          })
        }
        if (data.center) {
          animationInTimeline.from(
            contentEllipseRef.current,
            {
              rotate: -360,
              scale: 0,
              autoAlpha: 0,
              duration: 1.2,
              ease: 'back.out(1.7)',
              onComplete: () => {
                if (!contentEllipseRotateRef.current) {
                  contentEllipseRotateRef.current = gsap.to(contentEllipseRef.current, {
                    rotate: 360,
                    duration: 40,
                    ease: 'linear',
                    repeat: -1,
                  })
                }
              },
              onUpdate: () => {
                if (contentEllipseRotateRef.current) {
                  contentEllipseRotateRef.current.revert()
                  contentEllipseRotateRef.current = null
                }
              },
            },
            '<',
          )
        }
        animationInTimeline.from(contentDescriptionRefs.current[index], data.tweenVars)
        animationInTimeline.from(contentArrowRefs.current[index], data.tweenVars, '<')
      })
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
      dependencies: [
        Boolean(textCardRefs.current[0]?.timelineAnimation.current),
        Boolean(textCardRefs.current[1]?.timelineAnimation.current),
      ],
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
          <div className={styles.contentBackground} ref={contentBackgroundRef}></div>
          {TriangleData.map((data, index) => {
            const number = index + 1
            return (
              <Fragment key={`${index}-${data.title}`}>
                {data.title ? (
                  data.center ? (
                    <div className={styles.titleCenterContainer}>
                      <div className={styles.titleEllipse} ref={contentEllipseRef}></div>
                      <div
                        className={styles.titleCenterInsideContainer}
                        ref={(el) => {
                          if (el) {
                            contentTitleRefs.current[index] = el
                          }
                        }}
                      >
                        {data.title}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={classNames(
                        styles.titleContainer,
                        styles[`titleContainer${number}`],
                      )}
                      ref={(el) => {
                        if (el) {
                          contentTitleRefs.current[index] = el
                        }
                      }}
                    >
                      {data.title}
                    </div>
                  )
                ) : null}
                <div
                  className={classNames(styles.dataDescription, styles[`dataDescription${number}`])}
                  ref={(el) => {
                    if (el) {
                      contentDescriptionRefs.current[index] = el
                    }
                  }}
                >
                  {data.description}
                </div>
                <div
                  className={classNames(styles.dataArrow, styles[`dataArrow${number}`])}
                  ref={(el) => {
                    if (el) {
                      contentArrowRefs.current[index] = el
                    }
                  }}
                ></div>
              </Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default observer(SectionFive)
