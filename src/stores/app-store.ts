import type { Store } from '@/stores/index.ts'
import { action, flow, makeAutoObservable, observable } from 'mobx'

export default class StoresStore {
  rootStoreRef: Store

  isAppLoading = true

  constructor(rootStore: Store) {
    this.rootStoreRef = rootStore
    makeAutoObservable(this, {
      rootStoreRef: observable,
      resetStore: action,
      isAppLoading: observable,
      initData: flow.bound,
    })
  }

  resetStore = () => {};

  *initData() {
    if (!this.isAppLoading) return
    this.isAppLoading = true
    try {
      // preloadPages().then(() => {
      //   this.rootStoreRef.preloadStore.preloadResult.pagesPreloadProgress = 1
      // })
      this.rootStoreRef.preloadStore.loadCreateJS().then(() => {
        this.rootStoreRef.preloadStore.preloadAssets()
      })
    } catch (e) {
      console.log('Error preloading assets:', e)
    }
    this.isAppLoading = false
  }
}
