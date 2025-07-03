import { observer } from 'mobx-react-lite'
import React, { useRef, useState } from 'react'
import styles from './HomePage.module.css'
import classNames from 'classnames'
import SectionTwo from '@/pages/HomePage/SectionTwo.tsx'
import SectionThree from '@/pages/HomePage/SectionThree.tsx'
import SectionFour from '@/pages/HomePage/SectionFour.tsx'
import SectionFive from '@/pages/HomePage/SectionFive.tsx'
import SectionSix from '@/pages/HomePage/SectionSix.tsx'
import SectionOne from '@/pages/HomePage/SectionOne.tsx'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {
  GsapMediaQueryCondition,
  type GsapMediaQueryConditionType,
} from '@/utils/mediaQueryHelper.ts'
import { useMobxStore } from '@/stores/StoreProvider.tsx'

const HomePage: React.FC = () => {
  const {
    modalStore: { changeWaitlistModalVisible },
  } = useMobxStore()
  const pageRef = useRef<HTMLDivElement>(null)
  const heroesCoverRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const heroItemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [mobileFlag, setMobileFlag] = useState(false)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(GsapMediaQueryCondition, (context) => {
        const { isDesktop } = context.conditions as unknown as GsapMediaQueryConditionType
        if (isDesktop) {
          setMobileFlag(false)
          gsap.from(heroItemRefs.current, {
            autoAlpha: 0,
            yPercent: 40,
            duration: 1.6,
            stagger: {
              each: 0.2,
              from: 'center',
            },
            ease: 'power2.out',
            delay: 0.4,
          })
          gsap.fromTo(
            headerRef.current,
            { autoAlpha: 0, y: -100 },
            { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.4 },
          )
          gsap.fromTo(
            heroesCoverRef.current,
            { autoAlpha: 0, yPercent: 50 },
            { autoAlpha: 1, yPercent: 0, duration: 1, ease: 'power2.out', delay: 0.4 },
          )
        } else {
          setMobileFlag(true)
        }
      })
    },
    {
      scope: pageRef,
      dependencies: [],
    },
  )

  const goGamePage = () => {
    window.open('https://fantasy.defed.network')
  }

  const handleJoinWaitlist = () => {
    changeWaitlistModalVisible(true)
  }

  return (
    <div className={styles.pageContainer} ref={pageRef}>
      <div className={styles.heroesPartContainer}>
        {mobileFlag ? (
          <div className={styles.heroesContainerMobile}></div>
        ) : (
          <div className={styles.heroesContainer}>
            {new Array(5).fill(0).map((_, index) => (
              <div
                key={index}
                className={styles[`hero${index + 1}`]}
                ref={(el) => {
                  heroItemRefs.current[index] = el
                }}
              ></div>
            ))}
          </div>
        )}
        <div className={styles.heroesCover} ref={heroesCoverRef}></div>
      </div>
      <div className={styles.header} ref={headerRef}>
        <button className={classNames(styles.gameIcon, 'button')} onClick={goGamePage}></button>
        <div className={styles.headerRightButtonGroup}>
          <div
            className={classNames('button', styles.joinWaitlistButton)}
            onClick={handleJoinWaitlist}
          >
            Join Waitlist
          </div>
          <button className={classNames('button', styles.playButton)} onClick={goGamePage}>
            Play Game
          </button>
        </div>
      </div>
      <SectionOne mobileFlag={mobileFlag}></SectionOne>
      <SectionTwo mobileFlag={mobileFlag}></SectionTwo>
      <SectionThree mobileFlag={mobileFlag}></SectionThree>
      <SectionFour mobileFlag={mobileFlag}></SectionFour>
      <SectionFive mobileFlag={mobileFlag}></SectionFive>
      <SectionSix></SectionSix>
      <footer className={styles.footer}>© Address Fantasy 2025</footer>
    </div>
  )
}
export default observer(HomePage)
