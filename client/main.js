window.wsClient.init()


window.wsClient.on('open', e => {
  addToLog(`Opened connection on ${e.target.url}`)
})

window.wsClient.on('close', code => {
  addToLog(`Connection closed with code ${code}`)
})

window.wsClient.on('error', e => {
  addToLog(`ERROR: ${e.message}`)
})

window.wsClient.on('message', msg => {
  addToLog(`New message: ${msg.data}`)
})


function addToLog (message) {
  const p = document.createElement('pre')
  p.innerHTML = message
  document.querySelector('.log').appendChild(p)
}


const form = document.querySelector('.form')
const input = document.querySelector('.input')

form.addEventListener('submit', e => {
  e.preventDefault()

  if (input.value) {
    window.wsClient.send(input.value)
    input.value = ''
  }
})