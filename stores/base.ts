export default class Base {
  [key: string]: any

  constructor(initState: { [key: string]: any } = {}) {
     for (const k in initState) {
       if(initState.hasOwnProperty(k)) {
         this[k] = initState[k]
       }
     }
  }
}