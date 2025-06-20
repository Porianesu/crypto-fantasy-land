import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import styles from './HomePage.module.css'
import classNames from 'classnames'
import SectionTwo from '@/pages/ HomePage/SectionTwo.tsx'
import SectionThree from '@/pages/ HomePage/SectionThree.tsx'
import SectionFour from '@/pages/ HomePage/SectionFour.tsx'
import SectionFive from '@/pages/ HomePage/SectionFive.tsx'
import SectionSix from '@/pages/ HomePage/SectionSix.tsx'
import SectionOne from '@/pages/ HomePage/SectionOne.tsx'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const HomePage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null)
  const heroesRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        heroesRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      )
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power2.out' },
      )
    },
    {
      scope: pageRef,
      dependencies: [],
    },
  )

  const goGamePage = () => {
    window.open('https://fantasy.defed.network')
  }

  return (
    <div className={styles.pageContainer} ref={pageRef}>
      <div className={styles.heroesPartContainer} ref={heroesRef}>
        <div className={styles.heroesContainer}>
          {new Array(5).fill(0).map((_, index) => (
            <div key={index} className={styles[`hero${index + 1}`]}></div>
          ))}
        </div>
        <div className={styles.heroesCover}></div>
      </div>
      <div className={styles.header} ref={headerRef}>
        <button className={classNames(styles.gameIcon, 'button')} onClick={goGamePage}></button>
        <button className={classNames('button', styles.playButton)} onClick={goGamePage}>
          Play Game
        </button>
      </div>
      <SectionOne></SectionOne>
      <SectionTwo></SectionTwo>
      <SectionThree></SectionThree>
      <SectionFour></SectionFour>
      <SectionFive></SectionFive>
      <SectionSix></SectionSix>
      <footer className={styles.footer}>© Address Fantasy 2025</footer>
    </div>
  )
}
export default observer(HomePage)
