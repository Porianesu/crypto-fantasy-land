import { Store } from '@/stores/index.ts'
import { action, makeObservable, observable } from 'mobx'

export default class ModalStore {
  rootStoreRef: Store

  waitlistModalVisible = false

  constructor(rootStore: Store) {
    this.rootStoreRef = rootStore
    makeObservable(this, {
      resetStore: action,
      waitlistModalVisible: observable,
      changeWaitlistModalVisible: action,
    })
  }

  resetStore = () => {
    this.waitlistModalVisible = false
  }

  changeWaitlistModalVisible = (visible: boolean) => {
    this.waitlistModalVisible = visible
  }
}
