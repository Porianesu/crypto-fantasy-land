import { observer } from 'mobx-react-lite'
import React, { type RefObject, useRef } from 'react'
import styles from './SectionOne.module.css'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import { gsap } from 'gsap'

const SectionOne: React.FC<{
  pageRef: RefObject<HTMLDivElement>
}> = ({ pageRef }) => {
  const descriptionRef = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      SplitText.create(descriptionRef.current, {
        type: 'lines',
        autoSplit: true,
        mask: 'lines',
        smartWrap: true,
        linesClass: 'line',
        reduceWhiteSpace: false,
        onSplit: (self) => {
          gsap.from(self.lines, {
            autoAlpha: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            ease: 'power1.out',
          })
        },
      })
    },
    {
      dependencies: [],
      scope: pageRef,
      revertOnUpdate: true,
    },
  )
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.title}>Legends Aren't Born. They're Minted.</div>
      <div className={styles.description} ref={descriptionRef}>
        Summon mighty heroes, forge your deck, and claim your destiny in the battle for the Crypto
        Throne.
      </div>
    </section>
  )
}
export default observer(SectionOne)
