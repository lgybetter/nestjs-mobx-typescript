import { action, observable } from 'mobx'
import Base from './base'

export default class UserStore extends Base {
  @observable name: string = 'Client'

  @action setName(name: string) {
    this.name = name
  }
}
