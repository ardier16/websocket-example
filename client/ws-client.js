const SOCKET_URL = 'ws://127.0.0.1:1337'

class WSClient extends EventEmitter3 {
  constructor () {
    super()

    this.ws = null
  }

  init () {
    this.ws = new WebSocket(SOCKET_URL)

    this.ws.onopen = (e) => {
      this.emit('open', e)
    }

    this.ws.onerror = (err) => {
      this.emit('error', err)
    }

    this.ws.onclose = (e) => {
      this.emit('close', e.code)
    }

    this.ws.onmessage = (e) =>
      this.emit('message', e)
  }

  send (message) {
    this.ws.send(message)
  }
}

window.wsClient = new WSClient()
