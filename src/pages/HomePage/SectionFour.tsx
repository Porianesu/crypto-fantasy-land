import { observer } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import styles from './SectionFour.module.css'
import Line1 from '@/assets/images/home_page/section_four/card_template_line_1.svg?react'
import Line2 from '@/assets/images/home_page/section_four/card_template_line_2.svg?react'
import Line3 from '@/assets/images/home_page/section_four/card_template_line_3.svg?react'
import Line4 from '@/assets/images/home_page/section_four/card_template_line_4.svg?react'
import classNames from 'classnames'

const CARD_TEMPLATE_DATA = [
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
const SectionFour: React.FC = () => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.title}>Fantasy Card System</div>
      <div className={styles.description}>
        Forge your destiny on-chain – become a legend in Fantasy Crypto.
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.cardTemplate}>
          {CARD_TEMPLATE_DATA.map((cardData, index) => {
            return (
              <Fragment key={cardData.title}>
                <div
                  className={classNames(
                    styles.cardInfoContainer,
                    styles[`cardInfoContainer${index + 1}`],
                  )}
                >
                  <div className={styles.cardInfoNumber}>0{index + 1}</div>
                  <div className={styles.cardInfoTitle}>{cardData.title}</div>
                  <div className={styles.cardInfoDescription}>{cardData.description}</div>
                </div>
                <div
                  className={classNames(styles.lineContainer, styles[`lineContainer${index + 1}`])}
                >
                  <div
                    className={classNames({
                      [styles.startDot]: [0, 1].includes(index),
                      [styles.startDotReversed]: [2, 3].includes(index),
                    })}
                  ></div>
                  {cardData.line}
                  <div
                    className={classNames({
                      [styles.endDot]: [0, 1].includes(index),
                      [styles.endDotReversed]: [2, 3].includes(index),
                    })}
                  ></div>
                </div>
              </Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default observer(SectionFour)
