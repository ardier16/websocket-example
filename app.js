const WebSocketServer = require('websocket').server
const http = require('http')

const WS_PORT = 1337
const clients = []

const httpServer = http.createServer()
httpServer.listen(WS_PORT, () => {
  console.log(`Server is listening on port ${WS_PORT}`)
})

const wsServer = new WebSocketServer({ httpServer })

wsServer.on('request', function(request) {
  const connection = request.accept(null, request.origin) 
  console.log(`New connection from origin ${request.origin}`)
  const index = clients.push(connection) - 1;

  connection.on('message', function(message) {
    clients.forEach(client => {
      client.send(message.utf8Data)
    })
  })

  connection.on('close', function(connection) {
    console.log(`${connection.remoteAddress} disconnected`)
    clients.splice(index, 1);
  })
})
