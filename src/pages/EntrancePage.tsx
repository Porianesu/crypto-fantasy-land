import { observer } from 'mobx-react-lite'
import React from 'react'
import classNames from 'classnames'

const EntrancePage: React.FC = () => {
  return (
    <div className={classNames('w-full', 'h-screen', 'flex', 'items-center', 'justify-center')}>
      <div></div>
      123
    </div>
  )
}
export default observer(EntrancePage)
