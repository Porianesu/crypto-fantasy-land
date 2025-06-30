import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import styles from './SectionOne.module.css'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import { gsap } from 'gsap'
import {
  GsapMediaQueryCondition,
  type GsapMediaQueryConditionType,
} from '@/utils/mediaQueryHelper.ts'

const SectionOne: React.FC<{ mobileFlag: boolean }> = ({ mobileFlag }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const hasScrolledRef = useRef(false)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(GsapMediaQueryCondition, (context) => {
        const { isDesktop } = context.conditions as unknown as GsapMediaQueryConditionType
        if (isDesktop) {
          SplitText.create(descriptionRef.current, {
            type: 'lines',
            autoSplit: true,
            mask: 'lines',
            smartWrap: true,
            linesClass: 'line',
            reduceWhiteSpace: false,
            onSplit: (self) => {
              const tl = gsap.timeline({})
              tl.from(self.lines, {
                autoAlpha: 0,
                y: 50,
                duration: 1,
                stagger: 0.2,
                ease: 'power1.out',
              })
                .from(scrollHintRef.current, {
                  autoAlpha: 0,
                  duration: 0.8,
                })
                .to(scrollHintRef.current, {
                  autoAlpha: 0,
                  duration: 0.8,
                  repeat: -1,
                  yoyo: true,
                  ease: 'power1.inOut',
                })
              return tl
            },
          })
        }
      })
      const handleWheel = () => {
        if (!hasScrolledRef.current && scrollHintRef.current) {
          hasScrolledRef.current = true
          gsap.killTweensOf(scrollHintRef.current)
          gsap.to(scrollHintRef.current, {
            autoAlpha: 0,
            duration: 0.5,
            ease: 'power1.inOut',
          })
          window.removeEventListener('wheel', handleWheel)
        }
      }

      window.addEventListener('wheel', handleWheel)
      return () => {
        window.removeEventListener('wheel', handleWheel)
      }
    },
    {
      dependencies: [],
      scope: sectionRef,
    },
  )

  return (
    <section className={styles.sectionContainer} ref={sectionRef}>
      <div className={styles.title}>Legends Aren't Born. They're Minted.</div>
      <div className={styles.description} ref={descriptionRef}>
        Summon mighty heroes, forge your deck, and claim your destiny in the battle for the Crypto
        Throne.
      </div>
      {mobileFlag ? null : (
        <div className={styles.scrollHint} ref={scrollHintRef}>
          <div className={styles.mouseContainer}></div>
          Scroll to Explore
        </div>
      )}
    </section>
  )
}
export default observer(SectionOne)
