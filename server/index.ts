import Koa from 'koa'
import next from 'next'
import Router from 'koa-router'
import { User } from '../interfaces'
const dev = process.env.NODE_ENV !== 'production'

const app = next({
  dev
})
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  router.get('/api/user/:id', async(ctx) => {
    const id = ctx.params.id
    const sampleUserData: User[] = [
      { id: 101, name: 'Alice' },
      { id: 102, name: 'Bob' },
      { id: 103, name: 'Caroline' },
      { id: 104, name: 'Dave' },
    ]
    let data: User | undefined =  undefined
    sampleUserData.forEach(item => {
      if (item.id === parseInt(id)) {
        data = { id: 101, name: 'Alice' }
      }
    })
    ctx.body = data || {}
  })

  server.use(router.routes())

  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.listen(3000, () => {
    console.log('koa next server listening on 3000')
  })
})