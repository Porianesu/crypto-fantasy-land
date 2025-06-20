import type { Store } from '@/stores/index.ts'
import { action, makeAutoObservable, observable } from 'mobx'

export default class StoresStore {
  rootStoreRef: Store

  count: number = 0

  constructor(rootStore: Store) {
    this.rootStoreRef = rootStore
    makeAutoObservable(this, {
      rootStoreRef: observable,
      resetStore: action,
      count: observable,
      setCount: action,
    })
  }

  resetStore = () => {
    this.count = 0
  }

  setCount = (count: number) => {
    this.count = count
  }
}
