import { observer } from 'mobx-react-lite'
import React, { type PropsWithChildren, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { useGSAP } from '@gsap/react'
import {
  GsapMediaQueryCondition,
  type GsapMediaQueryConditionType,
} from '@/utils/mediaQueryHelper.ts'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, DrawSVGPlugin)

const PageContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const mainRef = useRef<HTMLDivElement>(null)
  const scrollSmoother = useRef<ScrollSmoother>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(GsapMediaQueryCondition, (context) => {
        const { isDesktop } = context.conditions as unknown as GsapMediaQueryConditionType
        if (isDesktop) {
          scrollSmoother.current = ScrollSmoother.create({
            smooth: 2,
            effects: true,
            normalizeScroll: true,
          })
        }
        return () => {
          if (scrollSmoother.current) {
            scrollSmoother.current.kill()
            scrollSmoother.current = null
          }
        }
      })
    },
    {
      dependencies: [],
      scope: mainRef,
    },
  )

  return (
    <main id={'smooth-wrapper'} ref={mainRef}>
      <div id={'smooth-content'}>{children}</div>
    </main>
  )
}
export default observer(PageContainer)
