//@ts-check
import { GameObject, GameObjectType } from "../game-objs/gameobj.js"

/**
 * Enumeração com os tipos de eventos tratados.
 * @readonly
 * @enum {number}
 */
export const MessageType = Object.freeze({
  BulletFired: 0,
  BulletHit: 1
})

/** Informações de uma mensagem: remetente, destinatário, tipo e conteúdo. */
export class Message {
  /**
   * @param { GameObject } sender O autor da mensagem
   * @param { GameObjectType } receiver Tipo dos destinatários da mensagem 
   * @param { MessageType } type O tipo da mensagem (tipo do evento)
   * @param { any } content Informação adicional à mensagem
   */
  constructor(sender, receiver, type, content = {}) {
    this.sender = sender
    this.receiver = receiver
    this.type = type
    this.content = content
  }
}