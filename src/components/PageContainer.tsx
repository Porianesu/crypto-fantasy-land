import { observer } from 'mobx-react-lite'
import React, { type PropsWithChildren, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'
import classNames from 'classnames'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const PageContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const mainRef = useRef<HTMLDivElement>(null)
  const scrollSoother = useRef<ScrollSmoother>(null)

  useGSAP(
    () => {
      scrollSoother.current = ScrollSmoother.create({
        smooth: 2,
        effects: true,
        normalizeScroll: true,
      })
    },
    {
      dependencies: [],
      scope: mainRef,
    },
  )

  return (
    <main id={'smooth-wrapper'} ref={mainRef}>
      <div id={'smooth-content'} className={classNames('w-full')}>
        {children}
      </div>
    </main>
  )
}
export default observer(PageContainer)
