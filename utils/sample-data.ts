import { User } from '../interfaces'

/** Dummy user data. */
export const sampleUserData: User[] = [
  { id: 101, name: 'Alice' },
  { id: 102, name: 'Bob' },
  { id: 103, name: 'Caroline' },
  { id: 104, name: 'Dave' },
]

export const findData = (id: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      sampleUserData.forEach(item => {
        if (item.id === id) {
          return resolve(item)
        }
      })
      resolve({})
    }, 1000)
  })
}
