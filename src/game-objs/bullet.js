// @ts-check
import { messageManager } from "../msg-manager/msg-manager.js"
import { Message, MessageType } from "../msg-manager/message.js"
import { game } from "../game.js"
import { GameObject, GameObjectType } from "./gameobj.js"
import { gameObjPool } from "./gameobjpool.js"

/**
 * Bala disparada pelo jogador.
 */
export class Bullet extends GameObject {
  /**
   * @param {number} x Coordenada X da bala.
   * @param {number} y Coordenada Y da bala.
   * @param {number} dir Ângulo para o qual a bala vai seguir.
   */
  constructor(x, y, dir) {
    super(GameObjectType.Bullet, x, y, dir, 2, 10)
    this.fill = 'rgb(255, 255, 255)'
  }

  /**
   * Atualiza sua posição em função de sua direção e velocidade.
   * @override
   */
  update() {
    // se sair do mundo, pode se excluir dele
    if (!this.moveForward()) {
      this.destroy()
    }
    // se bater em algum objeto, remove o objeto e a si mesmo... e cadastra uma mensagem informando que
    // esse evento ocorreu.
    gameObjPool.objs.find(obj => {
      if (obj !== this && obj.inBoundingBox(this.pos)) {
        const message = new Message(this, GameObjectType.Unit, MessageType.BulletHit)
        messageManager.add(message)
        this.destroy()
      }
    })
  }

  /**
   * Desenha a bala como um ponto branco.
   * @override
   */
  draw() {
    const ctx = game.canvas.context2d
    if (ctx) {
      ctx.fillStyle = 'rgb(255, 255, 255)'
      ctx.strokeStyle = 'rgb(255, 255, 255)'
      ctx.beginPath()
      ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI)
      ctx.fill()
    }
  }
}
