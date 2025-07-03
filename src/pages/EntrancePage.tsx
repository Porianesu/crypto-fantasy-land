import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef } from 'react'
import styles from '@/pages/EntrancePage.module.css'
import { useMobxStore } from '@/stores/StoreProvider.tsx'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { getHomePath } from '@/navigation/routes.tsx'

const EntrancePage: React.FC = () => {
  const {
    preloadStore: { preloadProgress },
    appStore: { initData },
  } = useMobxStore()
  const progressBarWrapperRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  console.log('preloadProgress', preloadProgress)

  useEffect(() => {
    initData()
  }, [])

  useGSAP(
    () => {
      gsap.set(progressBarRef.current, {
        xPercent: -100,
      })
    },
    {
      dependencies: [],
      scope: progressBarWrapperRef,
    },
  )

  useGSAP(
    () => {
      gsap.killTweensOf(progressBarRef.current)
      gsap.to(progressBarRef.current, {
        xPercent: -100 * (1 - preloadProgress),
        duration: 0.1,
        ease: 'power2.out',
      })
      if (preloadProgress === 1) {
        navigate(getHomePath())
      }
    },
    {
      dependencies: [preloadProgress],
      scope: progressBarWrapperRef,
    },
  )

  return (
    <div className={styles.pageContainer}>
      <div className={styles.gameIcon}></div>
      <div className={styles.progressBarWrapper} ref={progressBarWrapperRef}>
        <div className={styles.progressBarBg}>
          <div className={styles.progressBarFill} ref={progressBarRef}></div>
        </div>
      </div>
    </div>
  )
}
export default observer(EntrancePage)
