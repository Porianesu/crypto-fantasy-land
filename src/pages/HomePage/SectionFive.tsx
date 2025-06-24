import { observer } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import styles from './SectionFive.module.css'
import classNames from 'classnames'

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

const TextData = [
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

const TriangleData = [
  {
    title: 'USDx',
    description: 'Buy Faithcoins with USDx',
  },
  {
    title: 'Faithcoins',
    description: 'Buy Packs with Faithcoins',
    center: true,
  },
  {
    title: 'Card Pack',
    description: 'Open Packs to Collect Cards',
  },
  {
    title: 'Card',
    description: 'Burn Cards to Earn Faithcoins',
  },
  {
    description: 'Use Faithcoins to Fuse Cards',
  },
]
const SectionFive: React.FC = () => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.title}>Economic System</div>
      <div className={styles.description}>A player-owned economy governed by blockchain magic.</div>
      <div className={styles.contentContainer}>
        {TextData.map((data, index) => (
          <div
            key={data.title}
            className={classNames(styles.infoContainer, styles[`infoContainer${index + 1}`])}
          >
            <div className={styles.infoTitle}>{data.title}</div>
            {data.description.map((item, index) => (
              <div key={item} className={styles.infoDescription}>
                <div>{toRoman(index + 1)}</div>
                {item}
              </div>
            ))}
          </div>
        ))}
        <div className={styles.content}>
          {TriangleData.map((data, index) => {
            const number = index + 1
            return (
              <Fragment key={`${index}-${data.title}`}>
                {data.title ? (
                  data.center ? (
                    <div className={styles.titleCenterContainer}>
                      <div className={styles.titleEllipse}></div>
                      <div className={styles.titleCenterInsideContainer}>{data.title}</div>
                    </div>
                  ) : (
                    <div
                      className={classNames(
                        styles.titleContainer,
                        styles[`titleContainer${number}`],
                      )}
                    >
                      {data.title}
                    </div>
                  )
                ) : null}
                <div
                  className={classNames(styles.dataDescription, styles[`dataDescription${number}`])}
                >
                  {data.description}
                </div>
                <div className={classNames(styles.dataArrow, styles[`dataArrow${number}`])}></div>
              </Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default observer(SectionFive)
