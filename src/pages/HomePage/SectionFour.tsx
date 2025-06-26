import { observer } from 'mobx-react-lite'
import React, { Fragment, useImperativeHandle, useRef } from 'react'
import styles from './SectionFour.module.css'
import Line1 from '@/assets/images/home_page/section_four/card_template_line_1.svg?react'
import Line2 from '@/assets/images/home_page/section_four/card_template_line_2.svg?react'
import Line3 from '@/assets/images/home_page/section_four/card_template_line_3.svg?react'
import Line4 from '@/assets/images/home_page/section_four/card_template_line_4.svg?react'
import classNames from 'classnames'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

interface ICardTemplateData {
  title: string
  description: string
  line: React.ReactNode
}
const CARD_TEMPLATE_DATA: Array<ICardTemplateData> = [
  {
    title: 'Card Base Score',
    description:
      'Calculated based on the Chainspirit ’s quantified performance in the trading market.',
    line: <Line1 className={styles.line} />,
  },
  {
    title: 'Chainspirit Name',
    description: 'Generated through AI analysis of social tags from platforms like Twitter.',
    line: <Line2 className={styles.line} />,
  },
  {
    title: 'Chainspirit Portrait',
    description: 'Each Chainspirit has a unique and meaningful presence in the Interchain Realm.',
    line: <Line3 className={styles.line} />,
  },
  {
    title: 'Card Rarity Frame',
    description:
      'Four rarity levels, each with a distinct card frame. Lower-rarity cards can be fused into higher-rarity ones.',
    line: <Line4 className={styles.line} />,
  },
]

interface ICardInfoHandle {
  timelineAnimation: React.RefObject<gsap.core.Timeline | null>
}
const CardInfo = React.forwardRef<
  ICardInfoHandle,
  {
    cardData: ICardTemplateData
    index: number
  }
>(({ cardData, index }, ref) => {
  const timelineAnimation = useRef<gsap.core.Timeline>(null)
  const cardInfoRef = useRef<HTMLDivElement>(null)
  const startDotRef = useRef<HTMLDivElement>(null)
  const endDotRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const lineId = `#section_four_line_${index + 1}`
      gsap.set(startDotRef.current, {
        scale: 0,
        autoAlpha: 0,
      })
      gsap.set(endDotRef.current, {
        scale: 0,
        autoAlpha: 0,
      })
      gsap.set(cardInfoRef.current, {
        y: 40,
        scale: 0.85,
        rotateY: 120,
        autoAlpha: 0,
      })
      gsap.set(lineId, {
        drawSVG: 0,
      })
      timelineAnimation.current = gsap.timeline({})
      timelineAnimation.current
        .to(startDotRef.current, {
          scale: 1,
          autoAlpha: 1,
          duration: 0.4,
        })
        .to(lineId, {
          id: `line${index + 1}`,
          drawSVG: true,
          duration: 1,
          ease: 'power1.inOut',
        })
        .to(endDotRef.current, {
          scale: 1,
          autoAlpha: 1,
          duration: 0.4,
        })
        .to(cardInfoRef.current, {
          y: 0,
          scale: 1,
          rotateY: 0,
          autoAlpha: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
        })
        .revert()
    },
    {
      dependencies: [],
    },
  )

  useImperativeHandle(ref, () => {
    return {
      timelineAnimation,
    }
  }, [])

  return (
    <Fragment>
      <div
        className={classNames(styles.cardInfoContainer, styles[`cardInfoContainer${index + 1}`])}
        ref={cardInfoRef}
      >
        <div className={styles.cardInfoNumber}>0{index + 1}</div>
        <div className={styles.cardInfoTitle}>{cardData.title}</div>
        <div className={styles.cardInfoDescription}>{cardData.description}</div>
      </div>
      <div className={classNames(styles.lineContainer, styles[`lineContainer${index + 1}`])}>
        <div
          className={classNames({
            [styles.startDot]: [0, 1].includes(index),
            [styles.startDotReversed]: [2, 3].includes(index),
          })}
          ref={startDotRef}
        ></div>
        {cardData.line}
        <div
          className={classNames({
            [styles.endDot]: [0, 1].includes(index),
            [styles.endDotReversed]: [2, 3].includes(index),
          })}
          ref={endDotRef}
        ></div>
      </div>
    </Fragment>
  )
})

const SectionFour: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const backgroundRotateRef = useRef<gsap.core.Tween>(null)
  const cardTemplateBackgroundRef = useRef<HTMLDivElement>(null)
  const cardsInfoRefs = useRef<Array<ICardInfoHandle | null>>([])

  useGSAP(
    () => {
      if (!cardsInfoRefs.current.length) return
      // Pin the section
      gsap.timeline({
        scrollTrigger: {
          id: 'sectionFour-pin',
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
          id: 'sectionFour-animation-in',
          trigger: sectionRef.current,
          start: 'center 80%',
          end: 'bottom 20%',
          scrub: 0.4,
        },
      })
      animationInTimeline
        .from(backgroundRef.current, {
          id: 'background',
          rotate: -360,
          scale: 0,
          autoAlpha: 0,
          duration: 1.2,
          onComplete: () => {
            if (!backgroundRotateRef.current) {
              backgroundRotateRef.current = gsap.to(backgroundRef.current, {
                rotate: 360,
                duration: 10,
                ease: 'linear',
                repeat: -1,
              })
            }
          },
          onUpdate: () => {
            if (backgroundRotateRef.current) {
              backgroundRotateRef.current.revert()
              backgroundRotateRef.current = null
            }
          },
        })
        .from(cardTemplateBackgroundRef.current, {
          id: 'cardTemplateBackground',
          scale: 0,
          autoAlpha: 0,
          duration: 1.2,
          ease: 'back.out(1.7)',
        })
      cardsInfoRefs.current.forEach((cardsInfoRef, index) => {
        if (cardsInfoRef?.timelineAnimation.current) {
          animationInTimeline.add(cardsInfoRef.timelineAnimation.current, `${1.6 + index * 0.2}`)
        }
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
      dependencies: [cardsInfoRefs.current.length],
      scope: sectionRef,
    },
  )

  return (
    <section className={styles.sectionContainer} ref={sectionRef}>
      <div className={styles.title} ref={titleRef}>
        Fantasy Card System
      </div>
      <div className={styles.description} ref={descriptionRef}>
        Forge your destiny on-chain – become a legend in Fantasy Crypto.
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.contentBackground} ref={backgroundRef}></div>
        <div className={styles.cardTemplate}>
          <div className={styles.cardTemplateBackground} ref={cardTemplateBackgroundRef}></div>
          {CARD_TEMPLATE_DATA.map((cardData, index) => {
            return (
              <CardInfo
                key={cardData.title}
                cardData={cardData}
                index={index}
                ref={(el) => {
                  if (el) {
                    cardsInfoRefs.current[index] = el
                  }
                }}
              ></CardInfo>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default observer(SectionFour)
