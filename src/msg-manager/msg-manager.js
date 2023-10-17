//@ts-check
import { gameObjPool } from "../game-objs/gameobjpool.js"
import { Message } from "./message.js"

/** @type { Message[] } */
let messageQueue = []

/**
 * Gerenciador da fila de mensagens.
 */
class MessageManager {

  /**
   * Adiciona uma mensagen à fila.
   * @param { Message } message Mensagem a ser inserida na fila
   */
  add(message) {
    messageQueue.push(message)
  }

  /**
   * Processa a fila, distribuindo todas as mensagens aos seus destinatários.
   */
  process() {
    messageQueue.forEach(message => {
      // os destinatários são todos objetos cujo `type` é igual a `receiver` da mensagem
      const receivers = gameObjPool.objs.filter(obj => obj.type === message.receiver)
      // receivers.forEach(receiver => receiver.state.onMessage(message))
    })
    messageQueue = []
  }
}

/**
 * messageManager é um singleton com a fila de mensagens do jogo.
 * @type { MessageManager }
 */
export const messageManager = Object.freeze(new MessageManager())