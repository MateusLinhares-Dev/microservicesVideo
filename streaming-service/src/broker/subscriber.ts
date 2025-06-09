import { channels } from "./channels/index.ts"

channels.streaming.consume('users', async message => {
    if(!message) {
        return null
    }
    
    console.log(message?.content.toString())

    channels.streaming.ack(message)
}, {
    noAck: false,
})