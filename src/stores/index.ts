import { makeObservable, action, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react-lite'
import AppStore from './app-store.ts'
import PreloadStore from '@/stores/preload-store.ts'
import ModalStore from '@/stores/modal-store.ts'

enableStaticRendering(typeof window === 'undefined')

export class Store {
  initSearchParams?: URLSearchParams = undefined

  appStore: AppStore

  preloadStore: PreloadStore

  modalStore: ModalStore

  constructor() {
    this.appStore = new AppStore(this)
    this.preloadStore = new PreloadStore(this)
    this.modalStore = new ModalStore(this)
    makeObservable(this, {
      hydrate: action,
      appStore: observable,
      preloadStore: observable,
      modalStore: observable,
    })
  }

  setInitSearchParams = (urlSearchParams: URLSearchParams) => {
    console.log('setInitSearchParams', urlSearchParams.toString())
    this.initSearchParams = urlSearchParams
  }

  hydrate = (initData: never) => {
    console.log('hydrate', initData)
  }

  resetStore = () => {
    this.initSearchParams = undefined
    this.appStore.resetStore()
    this.preloadStore.resetStore()
    this.modalStore.resetStore()
  }
}
