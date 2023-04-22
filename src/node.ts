import { createServer } from 'http'
import { Server } from 'socket.io'
import createRouter, { createList } from './createRouter'

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: { origin: /.*/ },
})

const router = createRouter(io.of('/'))
router.use(
  (client, next) => {
    console.log('Middleware-1')
    next()
  },
  async (client, next) => {
    console.log('Middleware-2')
    next()
  }
)

router.on('test', async (client, next) => {
  console.log('Final:', client.body)
})

httpServer.listen(3000)
