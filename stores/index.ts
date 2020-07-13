import { useStaticRendering } from 'mobx-react'
import config from './config'

const isServer = typeof window === 'undefined'

/**
 * Next.js首屏渲染是在服务端执行的，
 * MobX所创建的状态是可观察的对象，
 * 使用MobX创建的可观察对象会在内存中使用listener来监听对象的变化，
 * 但实际上在服务端是没有必要监听变化的，
 * 因为首屏渲染完成得到html文件后，后续的工作都由客户端接手，
 * 所以如果在服务端的对象是可观察的，将有可能造成内存泄漏
 */
useStaticRendering(isServer)

export class Store {
  [key: string]: any

  constructor (initialState: any = {}) {
    for (const k in config) {
      if (config.hasOwnProperty(k)) {
        this[k] = new config[k](initialState[k])
      }
    }
  }
}

let store: any = null

export function initializeStore(initialState = {}) {
  if (isServer) {
    return new Store(initialState)
  }
  if (store === null) {
    store = new Store(initialState)
  }

  return store
}