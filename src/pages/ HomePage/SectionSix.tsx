import { observer } from 'mobx-react-lite'
import React from 'react'
import styles from './SectionSix.module.css'
import classNames from 'classnames'

const ROADMAP_DATA = [
  {
    time: '2025Q2',
    title: 'Chapter I  The Summoning Begins',
    target: [
      '· Launch basic TCG gameplay',
      '· OG whitelist airdrop',
      '· Quiz tasks for cold start',
    ],
  },
  {
    time: '2025Q3',
    title: 'Chapter II  Echoes in the Mist',
    target: [
      '· Launch PVE dungeon gameplay',
      '· Equipment system and character    attributes',
      '· co-branded card promotions',
    ],
  },
  {
    time: '2025Q4',
    title: 'Chapter III The Clash of Faith',
    target: [
      '· Launch PVP battle system',
      '· ChatFi system, support trading in chat',
      '· Limited-time drops and limited edition',
    ],
  },
  {
    time: '2026Q1',
    title: 'Chapter IV The Realms Beyond',
    target: [
      '· Achieve multi-chain support',
      '· Integrate across platforms (App, PC, Web)',
      '· Release co-branded cards with KOLs',
    ],
  },
]

const SectionSix: React.FC = () => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.title}>Roadmap</div>
      <div className={styles.content}>
        {ROADMAP_DATA.map((data, index) => (
          <div
            key={`${index}-${data.title}`}
            className={classNames(styles.roadmapContainer, styles[`roadmapContainer${index + 1}`])}
          >
            <div className={styles.roadmapTime}>{data.time}</div>
            <div className={styles.roadmapInfoContainer}>
              <div className={styles.roadmapInfoTitle}>{data.title}</div>
              {data.target.map((item, itemIndex) => (
                <div key={itemIndex} className={styles.roadmapTarget}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
export default observer(SectionSix)
